import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { myths } from "../data/quizData";

export default function MythsPage() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggle = (i: number) => {
    setRevealed((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const verdictColor = (v: string) => {
    if (v === "MITO") return "bg-red-500";
    if (v === "MITO PARCIAL") return "bg-orange-500";
    return "bg-green-500";
  };

  const positives = [
    {
      text: "O açúcar fornece energia RÁPIDA para o cérebro em situações de urgência.",
      emoji: "⚡",
    },
    {
      text: "O sabor doce faz parte da nossa cultura e pode trazer momentos de prazer quando bem equilibrado.",
      emoji: "😊",
    },
    {
      text: "O açúcar das frutas (frutose) vem acompanhado de fibras, vitaminas e antioxidantes que são muito saudáveis.",
      emoji: "🍎",
    },
    {
      text: "O mel tem propriedades antibacterianas e antioxidantes além do açúcar.",
      emoji: "🍯",
    },
  ];

  const alternativas = [
    { from: "Refrigerante", to: "Água com limão ou fruta", emojiFrom: "🥤", emojiTo: "💧", saving: "38g" },
    { from: "Biscoito Recheado", to: "Castanhas ou Amendoim", emojiFrom: "🍪", emojiTo: "🥜", saving: "20g" },
    { from: "Suco de Caixinha", to: "Suco Natural sem açúcar", emojiFrom: "🧃", emojiTo: "🍊", saving: "26g" },
    { from: "Achocolatado", to: "Leite com cacau em pó", emojiFrom: "🍫", emojiTo: "☕", saving: "20g" },
    { from: "Iogurte Industrializado", to: "Iogurte Natural com Fruta", emojiFrom: "🫙", emojiTo: "🍓", saving: "10g" },
    { from: "Bolo Industrializado", to: "Banana com canela", emojiFrom: "🎂", emojiTo: "🍌", saving: "18g" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600 pb-16 pt-8">
        <div className="absolute -bottom-5 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L60 48C120 36 240 12 360 6C480 0 600 12 720 24C840 36 960 48 1080 48C1200 48 1320 36 1380 30L1440 24V60H0Z" fill="#f0fdfa" /></svg>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 font-['Nunito'] text-sm font-bold text-white backdrop-blur-sm hover:bg-white/30"
          >
            ← Voltar ao início
          </button>
          <div className="mb-3 text-6xl">🔍</div>
          <h1 className="mb-2 font-['Fredoka_One'] text-4xl font-bold text-white md:text-5xl">
            Mitos & Verdades
          </h1>
          <p className="font-['Nunito'] text-lg font-semibold text-white/85">
            Clique em cada card para revelar a verdade sobre o açúcar!
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Myths */}
        <h2 className="mb-6 flex items-center gap-3 font-['Fredoka_One'] text-3xl text-gray-800">
          <span>🤔</span> Clique e Descubra!
        </h2>

        <div className="mb-10 grid gap-5 sm:grid-cols-2">
          {myths.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="cursor-pointer"
              onClick={() => toggle(i)}
            >
              <div className={`rounded-3xl border-2 p-5 transition-all ${
                revealed.includes(i)
                  ? "border-teal-400 bg-teal-50 shadow-xl"
                  : "border-gray-200 bg-white shadow-md hover:shadow-lg hover:border-teal-300"
              }`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-3xl">{item.emoji}</span>
                  <span className={`rounded-full px-3 py-1 font-['Nunito'] text-xs font-black text-white ${verdictColor(item.verdict)}`}>
                    {item.verdict}
                  </span>
                </div>
                <h3 className="mb-2 font-['Fredoka_One'] text-lg text-gray-800">
                  "{item.myth}"
                </h3>

                <div className={`flex items-center gap-2 font-['Nunito'] text-sm font-bold ${revealed.includes(i) ? "text-teal-600" : "text-gray-400"}`}>
                  {revealed.includes(i) ? "▲ Esconder" : "▼ Ver a verdade"}
                </div>

                <AnimatePresence>
                  {revealed.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-2xl bg-white p-4 shadow-inner">
                        <p className="font-['Nunito'] text-sm font-semibold text-gray-700">
                          🔍 {item.truth}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Positivos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10 rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300 p-6"
        >
          <h2 className="mb-5 flex items-center gap-2 font-['Fredoka_One'] text-2xl text-green-700">
            <span>✅</span> Mas Tem Pontos Positivos!
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {positives.map((p, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <span className="text-2xl">{p.emoji}</span>
                <p className="font-['Nunito'] text-sm font-semibold text-gray-700">{p.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Alternativas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="mb-6 flex items-center gap-3 font-['Fredoka_One'] text-3xl text-gray-800">
            <span>🔄</span> Faça a Troca Inteligente!
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {alternativas.map((alt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-md"
              >
                <div className="text-center">
                  <div className="text-3xl">{alt.emojiFrom}</div>
                  <div className="font-['Nunito'] text-xs font-bold text-red-600">{alt.from}</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-2xl">→</div>
                  <div className="rounded-full bg-red-100 px-2 py-0.5 font-['Nunito'] text-xs font-black text-red-600">
                    -{alt.saving} açúcar
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl">{alt.emojiTo}</div>
                  <div className="font-['Nunito'] text-xs font-bold text-green-600">{alt.to}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Cardápio */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-10 overflow-hidden rounded-3xl bg-white shadow-xl"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-5">
            <h2 className="font-['Fredoka_One'] text-2xl font-bold text-white">
              🥗 Cardápio com Pouco Açúcar
            </h2>
            <p className="font-['Nunito'] text-sm font-semibold text-white/85">Um dia de refeições saudáveis e gostosas!</p>
          </div>
          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  meal: "Café da Manhã",
                  emoji: "☀️",
                  items: ["Pão integral", "Ovo mexido", "Banana", "Leite puro ou iogurte natural"],
                  sugar: "~8g",
                  color: "bg-yellow-50 border-yellow-300",
                },
                {
                  meal: "Lanche da Manhã",
                  emoji: "🌤️",
                  items: ["Mix de castanhas", "Maçã ou pera", "Água com limão"],
                  sugar: "~5g",
                  color: "bg-orange-50 border-orange-300",
                },
                {
                  meal: "Almoço",
                  emoji: "☀️",
                  items: ["Arroz integral", "Feijão", "Frango grelhado", "Salada colorida"],
                  sugar: "~3g",
                  color: "bg-green-50 border-green-300",
                },
                {
                  meal: "Lanche da Tarde",
                  emoji: "🌙",
                  items: ["Iogurte natural", "Frutas vermelhas", "Aveia simples"],
                  sugar: "~7g",
                  color: "bg-purple-50 border-purple-300",
                },
              ].map((meal) => (
                <div key={meal.meal} className={`rounded-2xl border-2 p-4 ${meal.color}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-2xl">{meal.emoji}</span>
                    <span className="rounded-full bg-green-200 px-2 py-0.5 font-['Nunito'] text-xs font-black text-green-700">
                      {meal.sugar}
                    </span>
                  </div>
                  <h3 className="mb-2 font-['Fredoka_One'] text-base text-gray-700">{meal.meal}</h3>
                  <ul className="space-y-1">
                    {meal.items.map((item) => (
                      <li key={item} className="flex items-center gap-1 font-['Nunito'] text-xs font-semibold text-gray-600">
                        <span className="text-green-500">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-green-100 p-4 text-center">
              <p className="font-['Nunito'] text-base font-bold text-green-700">
                🎯 Total do dia: ~23g de açúcar — dentro do ideal da OMS! 
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA Quiz */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/quiz")}
            className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 font-['Nunito'] text-xl font-black text-white shadow-lg hover:scale-105 transition-all"
          >
            🏆 Ir para o Quiz!
          </button>
        </div>
      </div>
    </div>
  );
}
