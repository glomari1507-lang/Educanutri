import { supabase } from './supabase';

// Busca ranking global (top 10)
export async function getGlobalRanking() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, score')
    .order('score', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}

// Busca ranking apenas dos amigos do usuário
export async function getFriendsRanking(userId: string) {
  const { data: friendsData, error: friendsError } = await supabase
    .from('friends')
    .select('user_id, friend_id')
    .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
    .eq('status', 'accepted');

  if (friendsError) throw friendsError;

  const friendIds = friendsData?.map(f => 
    f.user_id === userId ? f.friend_id : f.user_id
  ) || [];

  if (friendIds.length === 0) return [];

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, score')
    .in('id', friendIds)
    .order('score', { ascending: false });

  if (error) throw error;
  return data;
}

// Envia solicitação de amizade
export async function sendFriendRequest(userId: string, friendId: string) {
  const { error } = await supabase
    .from('friends')
    .insert({ user_id: userId, friend_id: friendId, status: 'pending' });

  if (error) throw error;
}

// Aceita solicitação de amizade
export async function acceptFriendRequest(requestId: string) {
  const { error } = await supabase
    .from('friends')
    .update({ status: 'accepted' })
    .eq('id', requestId);

  if (error) throw error;
}

// Busca solicitações pendentes recebidas
export async function getPendingRequests(userId: string) {
  const { data, error } = await supabase
    .from('friends')
    .select(`
      id,
      user_id,
      profiles!friends_user_id_fkey (id, username, avatar_url)
    `)
    .eq('friend_id', userId)
    .eq('status', 'pending');

  if (error) throw error;
  return data;
}

// Busca usuários para adicionar (por nome)
export async function searchUsers(query: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url')
    .ilike('username', `%${query}%`)
    .limit(10);

  if (error) throw error;
  return data;
}
