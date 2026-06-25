import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "O que é Açúcar?",
      desc: "Conheça os tipos e onde se esconde",
      emoji: "🔬",
      color: "from-purple-400 to-indigo-500",
      path: "/sobre",
    },
    {
      title: "Nos Alimentos",
      desc: "Veja quanto açúcar tem cada alimento",
      emoji: "🍔",
      color: "from-orange-400 to-red-500",
      path: "/alimentos",
    },
    {
      title: "Mitos & Verdades",
      desc: "Descubra o que é real ou ilusão",
      emoji: "🔍",
      color: "from-teal-400 to-cyan-500",
      path: "/mitos",
    },
    {
      title: "Quiz Challenge!",
      desc: "Teste seus conhecimentos e marque pontos",
      emoji: "🏆",
      color: "from-yellow-400 to-amber-500",
      path: "/quiz",
      highlight: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 pb-16 pt-10">
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -top-5 right-20 h-20 w-20 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mb-4 inline-block text-7xl"
          >
            🍎
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 font-['Fredoka_One'] text-5xl font-bold text-white drop-shadow-lg md:text-6xl"
          >
            EducaNutri!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-6 max-w-2xl text-xl font-semibold text-white/90 md:text-2xl"
          >
            Tudo que você precisa saber sobre o açúcar de um jeito divertido! 🎯
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => navigate("/quiz")}
              className="rounded-full bg-white px-8 py-3 font-['Nunito'] text-lg font-black text-purple-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              🏆 Jogar o Quiz!
            </button>
            <button
              onClick={() => navigate("/sobre")}
              className="rounded-full border-2 border-white bg-white/20 px-8 py-3 font-['Nunito'] text-lg font-black text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
            >
              📚 Aprender Mais
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 48C120 36 240 12 360 6C480 0 600 12 720 24C840 36 960 48 1080 48C1200 48 1320 36 1380 30L1440 24V60H0Z" fill="#faf5ff" />
          </svg>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-4">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[
              { value: "80g", label: "Açúcar/dia no Brasil", emoji: "🇧🇷" },
              { value: "25g", label: "Recomendado pela OMS", emoji: "🌍" },
              { value: "3x", label: "Mais do que deveria", emoji: "⚠️" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-white"
              >
                <div className="font-['Fredoka_One'] text-3xl font-bold">
                  {stat.emoji} {stat.value}
                </div>
                <div className="font-['Nunito'] text-sm font-semibold text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Cards */}
      <div className="mx-auto max-w-4xl px-4 py-10">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 text-center font-['Fredoka_One'] text-3xl text-gray-800"
        >
          O que você quer explorar hoje? 🚀
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cards.map((card, i) => (
            <motion.button
              key={card.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(card.path)}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.color} p-6 text-left shadow-xl transition-shadow hover:shadow-2xl`}
            >
              {card.highlight && (
                <div className="absolute right-3 top-3 rounded-full bg-white/30 px-3 py-1 font-['Nunito'] text-xs font-bold text-white">
                  ⭐ DESTAQUE
                </div>
              )}
              <div className="mb-3 text-5xl">{card.emoji}</div>
              <h3 className="mb-1 font-['Fredoka_One'] text-2xl font-bold text-white">{card.title}</h3>
              <p className="font-['Nunito'] text-sm font-semibold text-white/80">{card.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-1.5 font-['Nunito'] text-sm font-bold text-white">
                Explorar →
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100 p-6"
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl">💡</span>
            <div>
              <h3 className="mb-1 font-['Fredoka_One'] text-xl text-purple-700">Você sabia?</h3>
              <p className="font-['Nunito'] text-base font-semibold text-gray-700">
                Uma lata de refrigerante (350ml) tem <strong className="text-red-600">38 gramas de açúcar</strong> — isso é quase o dobro do que uma criança deveria consumir no dia todo! 😱
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
