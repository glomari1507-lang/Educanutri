import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  getFriendsRanking, 
  getPendingRequests,
  sendFriendRequest,
  acceptFriendRequest,
  searchUsers 
} from '../lib/ranking';

type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  score: number;
};

export default function FriendsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [friendsList, setFriendsList] = useState<Profile[]>([]);
  const [friendsRanking, setFriendsRanking] = useState<Profile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        await Promise.all([
          loadFriends(data.user.id),
          loadFriendsRanking(data.user.id),
          loadPendingRequests(data.user.id)
        ]);
      } else {
        navigate('/login');
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const loadFriends = async (userId: string) => {
    // Busca amigos onde o usuário é o user_id
    const { data, error } = await supabase
      .from('friends')
      .select(`
        friend_id,
        profiles!friends_friend_id_fkey (id, username, avatar_url, score)
      `)
      .eq('user_id', userId)
      .eq('status', 'accepted');

    if (error) console.error(error);

    // Busca amigos onde o usuário é o friend_id
    const { data: data2, error: error2 } = await supabase
      .from('friends')
      .select(`
        user_id,
        profiles!friends_user_id_fkey (id, username, avatar_url, score)
      `)
      .eq('friend_id', userId)
      .eq('status', 'accepted');

    if (error2) console.error(error2);

    const friends = data?.map(f => f.profiles).filter(Boolean) || [];
    const friends2 = data2?.map(f => f.profiles).filter(Boolean) || [];
    const all = [...friends, ...friends2];
    setFriendsList(all);
  };

  const loadFriendsRanking = async (userId: string) => {
    const data = await getFriendsRanking(userId);
    setFriendsRanking(data);
  };

  const loadPendingRequests = async (userId: string) => {
    const data = await getPendingRequests(userId);
    setPendingRequests(data);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const results = await searchUsers(searchQuery);
      // Filtra o próprio usuário e quem já é amigo
      const friendIds = friendsList.map(f => f.id);
      const filtered = results.filter(r => 
        r.id !== user.id && !friendIds.includes(r.id)
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar usuários');
    }
  };

  const handleSendRequest = async (friendId: string) => {
    try {
      await sendFriendRequest(user.id, friendId);
      alert('Solicitação enviada! ✅');
      setSearchResults([]);
      setSearchQuery('');
    } catch (error: any) {
      alert('Erro: ' + error.message);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await acceptFriendRequest(requestId);
      await Promise.all([
        loadPendingRequests(user.id),
        loadFriends(user.id),
        loadFriendsRanking(user.id)
      ]);
      alert('Amigo adicionado! 🎉');
    } catch (error: any) {
      alert('Erro: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-['Fredoka_One'] text-3xl text-gray-800">👥 Amigos</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-sm"
          >
            Sair
          </button>
        </div>

        {/* Lista de amigos */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="font-['Fredoka_One'] text-xl text-gray-700 mb-4">
            👫 Meus Amigos ({friendsList.length})
          </h2>
          {friendsList.length === 0 ? (
            <p className="text-gray-500">Você ainda não tem amigos. Adicione usando a busca abaixo!</p>
          ) : (
            <div className="space-y-2">
              {friendsList.map((friend) => (
                <div key={friend.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                  <span className="text-2xl">{friend.avatar_url || '👤'}</span>
                  <span className="font-bold flex-1">{friend.username}</span>
                  <span className="font-['Fredoka_One'] text-purple-600">{friend.score || 0}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ranking entre amigos */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="font-['Fredoka_One'] text-xl text-gray-700 mb-4">
            🏅 Ranking entre Amigos
          </h2>
          {friendsRanking.length === 0 ? (
            <p className="text-gray-500">Adicione amigos para ver o ranking!</p>
          ) : (
            friendsRanking.map((friend, i) => (
              <div key={friend.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                <span className="font-bold text-gray-400 w-8">#{i + 1}</span>
                <span className="text-2xl">{friend.avatar_url || '👤'}</span>
                <span className="font-bold flex-1">{friend.username}</span>
                <span className="font-['Fredoka_One'] text-purple-600">{friend.score || 0}</span>
              </div>
            ))
          )}
        </div>

        {/* Buscar amigos */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="font-['Fredoka_One'] text-xl text-gray-700 mb-4">
            🔍 Adicionar Amigos
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar pelo nome do amigo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-2xl border-2 border-purple-200 px-4 py-2 outline-none focus:border-purple-500"
            />
            <button
              onClick={handleSearch}
              className="bg-purple-600 text-white px-4 py-2 rounded-2xl font-bold"
            >
              Buscar
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2">
              {searchResults.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{user.avatar_url || '👤'}</span>
                    <span className="font-bold">{user.username}</span>
                  </div>
                  <button
                    onClick={() => handleSendRequest(user.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-xl text-sm font-bold"
                  >
                    + Adicionar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Solicitações pendentes */}
        {pendingRequests.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="font-['Fredoka_One'] text-xl text-gray-700 mb-4">
              📨 Solicitações Recebidas
            </h2>
            {pendingRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{req.profiles?.avatar_url || '👤'}</span>
                  <span className="font-bold">{req.profiles?.username || 'Usuário'}</span>
                </div>
                <button
                  onClick={() => handleAcceptRequest(req.id)}
                  className="bg-purple-600 text-white px-4 py-1 rounded-xl font-bold"
                >
                  Aceitar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  }
