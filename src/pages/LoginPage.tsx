import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      alert('Preencha email e senha!');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username: email.split('@')[0] }
          }
        });
        if (error) throw error;
        alert('Conta criada! Faça login para continuar.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/perfil');
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🍬</div>
          <h1 className="font-['Fredoka_One'] text-3xl text-gray-800">SugarAlert</h1>
          <p className="text-gray-500 font-semibold">
            {isSignUp ? 'Crie sua conta' : 'Faça login para continuar'}
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-purple-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 font-semibold"
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            className="w-full border-2 border-purple-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 font-semibold"
          />

          <button
            onClick={handleAuth}
            disabled={loading || !email || !password}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-bold text-lg disabled:opacity-50"
          >
            {loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </button>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-purple-600 font-semibold text-sm"
          >
            {isSignUp ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
}
