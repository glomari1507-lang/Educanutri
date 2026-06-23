import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  score: number;
};

export default function FriendsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [friends, setFriends] = useState<Profile[]>([]);
  const [ranking, setRanking] = useState<Profile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!data.user) {
          navigate('/login');
          return;
        }
        setUser(data.user);
        await Promise.all([
          loadFriends(data.user.id),
          loadPendingRequests(data.user.id),
          loadRanking()
        ]);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const loadFriends = async (userId: string) => {
    // Busca amigos onde o usuário é o user_id
    const { data, error } = await supabase
      .from('friends')
      .select('friend_id')
      .eq('user_id', userId)
      .eq('status', 'accepted');

    if (error) throw new Error(error.message);

    // Busca amigos onde o usuário é o friend_id
    const { data: data2, error: error2 } = await supabase
      .from('friends')
      .select('user_id')
      .eq('friend_id', userId)
      .eq('status', 'accepted');

    if (error2) throw new Error(error2.message);

    // Junta os IDs
    const friendIds = [
      ...(data?.map(f => f.friend_id) || []),
      ...(data2?.map(f => f.user_id) || [])
    ];

    if (friendIds.length === 0) {
      setFriends([]);
      return;
    }

    // Busca os perfis desses IDs
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, score')
      .in('id', friendIds);

    if (profileError) throw new Error(profileError.message);
    setFriends(profiles || []);
  };

  const loadPendingRequests = async (userId: string) => {
    const { data, error } = await supabase
      .from('friends')
      .select(`
        id,
        user_id,
        profiles:user_id (id, username, avatar_url)
      `)
      .eq('friend_id', userId)
      .eq('status', 'pending');

    if (error) throw new Error(error.message);
    setPendingRequests(data || []);
  };

  const loadRanking = async () => {
    // Ranking global (top 10)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, score')
      .order('score', { ascending: false })
      .limit(10);

    if (error) throw new Error(error.message);
    setRanking(data || []);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .ilike('username', `%${searchQuery}%`)
        .limit(10);

      if (error) throw error;
      const friendIds = friends.map(f => f.id);
      setSearchResults((data || []).filter(p => p.id !== user.id && !friendIds.includes(p.id)));
    } catch (err: any) {
      alert('Erro na busca: ' + err.message);
    }
  };

  const sendRequest = async (friendId: string) => {
    try {
      await supabase.from('friends').insert({
        user_id: user.id,
        friend_id: friendId,
        status: 'pending'
      });
      alert('Solicitação enviada! ✅');
      setSearchResults([]);
      setSearchQuery('');
    } catch (err: any) {
      alert('Erro ao enviar: ' + err.message);
    }
  };

  const acceptRequest = async (requestId: string) => {
    try {
      await supabase
        .from('friends')
        .update({ status: 'accepted' })
        .eq('id', requestId);

      alert('Amigo adicionado! 🎉');
      await Promise.all([
        loadFriends(user.id),
        loadPendingRequests(user.id),
        loadRanking()
      ]);
    } catch (err: any) {
      alert('Erro ao aceitar: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">⏳ Carregando...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="font-['Fredoka_One'] text-xl text-red-600">Ops!</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold">
          Tentar novamente
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-['Fredoka_One'] text-3xl text-gray-800">👥 Amigos</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-sm">
            Sair
          </button>
        </div>

        {/* Lista de amigos */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="font-['Fredoka_One'] text-xl text-gray-700 mb-4">
            👫 Meus Amigos ({friends.length})
          </h2>
          {friends.length === 0 ? (
            <p className="text-gray-500">Você ainda não tem amigos. Adicione usando a busca abaixo!</p>
          ) : (
            friends.map((f) => (
              <div key={f.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                <span className="text-2xl">{f.avatar_url || '👤'}</span>
                <span className="font-bold flex-1">{f.username}</span>
                <span className="font-['Fredoka_One'] text-purple-600">{f.score || 0}</span>
              </div>
            ))
          )}
        </div>

        {/* Ranking global */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="font-['Fredoka_One'] text-xl text-gray-700 mb-4">
            🏅 Ranking Geral (Top 10)
          </h2>
          {ranking.length === 0 ? (
            <p className="text-gray-500">Nenhuma pontuação registrada ainda.</p>
          ) : (
            ranking.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                <span className="font-bold text-gray-400 w-8">#{i + 1}</span>
                <span className="text-2xl">{p.avatar_url || '👤'}</span>
                <span className="font-bold flex-1">{p.username}</span>
                <span className="font-['Fredoka_One'] text-purple-600">{p.score || 0}</span>
              </div>
            ))
          )}
        </div>

        {/* Busca */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="font-['Fredoka_One'] text-xl text-gray-700 mb-4">
            🔍 Adicionar Amigos
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar pelo nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-2xl border-2 border-purple-200 px-4 py-2 outline-none focus:border-purple-500"
            />
            <button onClick={handleSearch} className="bg-purple-600 text-white px-4 py-2 rounded-2xl font-bold">
              Buscar
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2">
              {searchResults.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{u.avatar_url || '👤'}</span>
                    <span className="font-bold">{u.username}</span>
                  </div>
                  <button onClick={() => sendRequest(u.id)} className="bg-green-500 text-white px-3 py-1 rounded-xl text-sm font-bold">
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
                <button onClick={() => acceptRequest(req.id)} className="bg-purple-600 text-white px-4 py-1 rounded-xl font-bold">
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
