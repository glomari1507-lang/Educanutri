import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const links = [
  { path: "/", label: "Início", emoji: "🏠" },
  { path: "/sobre", label: "Sobre", emoji: "🔬" },
  { path: "/alimentos", label: "Alimentos", emoji: "🍔" },
  { path: "/mitos", label: "Mitos", emoji: "🔍" },
  { path: "/quiz", label: "Quiz", emoji: "🎮" },
  { path: "/amigos", label: "Amigos", emoji: "👥" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', currentUser.id)
          .single();
        setProfile(profileData);
      }
      setLoading(false);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', currentUser.id)
          .single();
        setProfile(profileData);
      } else {
        setProfile(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    navigate('/');
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 border-b-2 border-purple-200 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex h-14 items-center justify-between">
            <button className="flex items-center gap-2 font-['Fredoka_One'] text-xl text-purple-700">
              <span className="text-2xl">🍎</span>
              <span>EducaNutri</span>
            </button>
            <div className="h-8 w-8 animate-pulse rounded-full bg-purple-200" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-purple-200 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-['Fredoka_One'] text-xl text-purple-700 hover:text-pink-600"
          >
            <span className="text-2xl">🍎</span>
            <span>EducaNutri</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`rounded-xl px-3 py-1.5 font-['Nunito'] text-sm font-bold transition-all ${
                  location.pathname === link.path
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                {link.label}
              </button>
            ))}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 hover:bg-purple-200"
                >
                  <span className="text-xl">{profile?.avatar_url || '👤'}</span>
                  <span className="font-['Nunito'] text-sm font-bold text-purple-700">
                    {profile?.username || user.email?.split('@')[0] || 'Usuário'}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-gray-100 py-2">
                    <button
                      onClick={() => { navigate('/perfil'); setDropdownOpen(false); }}
                      className="flex w-full items-center gap-2 px-4 py-2 font-['Nunito'] text-sm font-bold text-gray-700 hover:bg-purple-50"
                    >
                      👤 Meu Perfil
                    </button>
                    <button
                      onClick={() => { navigate('/amigos'); setDropdownOpen(false); }}
                      className="flex w-full items-center gap-2 px-4 py-2 font-['Nunito'] text-sm font-bold text-gray-700 hover:bg-purple-50"
                    >
                      👥 Amigos
                    </button>
                    <button
                      onClick={() => { handleLogout(); setDropdownOpen(false); }}
                      className="flex w-full items-center gap-2 px-4 py-2 font-['Nunito'] text-sm font-bold text-red-600 hover:bg-red-50"
                    >
                      🚪 Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="rounded-xl bg-purple-600 px-4 py-1.5 font-['Nunito'] text-sm font-bold text-white hover:bg-purple-700"
              >
                Login
              </button>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-xl bg-purple-100 md:hidden"
          >
            <span className={`block h-0.5 w-5 bg-purple-700 transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-purple-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-purple-700 transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-purple-100 py-3 md:hidden">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => { navigate(link.path); setMenuOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-['Nunito'] text-sm font-bold ${
                  location.pathname === link.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{link.emoji}</span>
                {link.label}
              </button>
            ))}
            {user ? (
              <>
                <button
                  onClick={() => { navigate('/perfil'); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-['Nunito'] text-sm font-bold text-gray-700"
                >
                  👤 Meu Perfil
                </button>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-['Nunito'] text-sm font-bold text-red-600"
                >
                  🚪 Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => { navigate('/login'); setMenuOpen(false); }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-['Nunito'] text-sm font-bold text-purple-600"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
                }
