import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AVATARS = ["🦊", "🐼", "🐸", "🦁", "🐯", "🐧", "🦋", "🐳", "🦄", "🐉"];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("🦊");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/login');
        return;
      }
      setUser(data.user);

      // Busca perfil existente
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', data.user.id)
        .single();

      if (profileData) {
        setUsername(profileData.username || '');
        setAvatar(profileData.avatar_url || '🦊');
      } else {
        setUsername(data.user.email?.split('@')[0] || '');
      }
    };
    getUser();
  }, []);

  const handleSave = async () => {
    if (!username.trim()) {
      alert('Digite um nome para seu perfil!');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username: username.trim(),
        avatar_url: avatar
      });

    if (error) {
      alert('Erro ao salvar perfil: ' + error.message);
    } else {
      alert('Perfil salvo com sucesso! 🎉');
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">{avatar}</div>
          <h1 className="font-['Fredoka_One'] text-2xl text-gray-800">Meu Perfil</h1>
          <p className="text-gray-500 font-['Nunito'] text-sm">
            {user?.email}
          </p>
        </div>

        <div className="mb-6">
          <label className="block font-['Nunito'] text-sm font-bold text-gray-700 mb-2">
            Escolha seu avatar:
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            {AVATARS.map((av) => (
              <button
                key={av}
                onClick={() => setAvatar(av)}
                className={`text-3xl p-2 rounded-xl transition-all ${
                  avatar === av
                    ? "bg-purple-200 ring-2 ring-purple-500 scale-110"
                    : "bg-gray-100 hover:bg-purple-100"
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-['Nunito'] text-sm font-bold text-gray-700 mb-2">
            Seu nome (como vai aparecer no ranking):
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu nome"
            maxLength={30}
            className="w-full rounded-2xl border-2 border-purple-200 px-4 py-3 outline-none focus:border-purple-500 font-['Nunito'] font-semibold"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-['Fredoka_One'] text-lg disabled:opacity-50"
        >
          {loading ? 'Salvando...' : '💾 Salvar Perfil'}
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-3 text-gray-500 font-['Nunito'] text-sm font-bold hover:text-purple-600"
        >
          ← Voltar
        </button>
      </div>
    </div>
  );
}
