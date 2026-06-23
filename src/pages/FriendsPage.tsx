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
import { Profile } from '../lib/supabase';

export default function FriendsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [friendsRanking, setFriendsRanking] = useState<Profile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        loadFriendsRanking(data.user.id);
        loadPendingRequests(data.user.id);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });
  }, []);

  const loadFriendsRanking = async (userId: string) => {
    try {
      const data = await getFriendsRanking(userId);
      setFriendsRanking(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPendingRequests = async (userId: string) => {
    try {
      const data = await getPendingRequests(userId);
      setPendingRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const results = await searchUsers(searchQuery);
        setSearchResults(results.filter(r => r.id !== user.id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSendRequest = async (friendId: string) => {
    try {
      await sendFriendRequest(user.id, friendId);
      alert('Solicitação enviada!');
      setSearchResults([]);
      setSearchQuery('');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await acceptFriendRequest(requestId);
      loadPendingRequests(user.id);
      loadFriendsRanking(user.id);
    } catch (error: any) {
      alert(error.message);
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

        {/* Ranking dos amigos */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="font-['Fredoka_One'] text-xl text-gray-700 mb-4">
            🏅 Ranking dos Amigos
          </h2>
          {friendsRanking.length === 0 ? (
            <p className="text-gray-500">Adicione amigos para ver o ranking!</p>
          ) : (
            friendsRanking.map((friend, i) => (
              <div key={friend.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                <span className="font-bold text-gray-400 w-8">#{i + 1}</span>
                <span className="text-2xl">{friend.avatar_url || '👤'}</span>
                <span className="font-bold flex-1">{friend.username}</span>
                <span className="font-['Fredoka_One'] text-purple-600">{friend.score}</span>
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
              placeholder="Buscar por nome..."
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
          {searchResults.map((user) => (
            <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100">
              <span>{user.username}</span>
              <button
                onClick={() => handleSendRequest(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded-xl text-sm font-bold"
              >
                + Adicionar
              </button>
            </div>
          ))}
        </div>

        {/* Solicitações pendentes */}
        {pendingRequests.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="font-['Fredoka_One'] text-xl text-gray-700 mb-4">
              📨 Solicitações Recebidas
            </h2>
            {pendingRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <span>{req.profiles?.username || 'Usuário'}</span>
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
