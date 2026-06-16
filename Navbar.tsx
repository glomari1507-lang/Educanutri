import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const links = [
  { path: "/", label: "Início", emoji: "🏠" },
  { path: "/sobre", label: "Sobre o Açúcar", emoji: "🔬" },
  { path: "/alimentos", label: "Nos Alimentos", emoji: "🍔" },
  { path: "/mitos", label: "Mitos & Verdades", emoji: "🔍" },
  { path: "/quiz", label: "Quiz 🏆", emoji: "🎮" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-purple-200 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-['Fredoka_One'] text-xl text-purple-700 hover:text-pink-600 transition-colors"
          >
            <span className="text-2xl">🍬</span>
            <span>SugarAlert</span>
          </button>

          {/* Desktop links */}
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
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-xl bg-purple-100 md:hidden"
          >
            <span className={`block h-0.5 w-5 bg-purple-700 transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-purple-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-purple-700 transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-purple-100 py-3 md:hidden">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => { navigate(link.path); setMenuOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-['Nunito'] text-sm font-bold transition-all ${
                  location.pathname === link.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{link.emoji}</span>
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
