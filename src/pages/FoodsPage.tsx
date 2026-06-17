import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { sugarFoods } from "../data/quizData";

function SugarBar({ sugar, max = 40 }: { sugar: number; max?: number }) {
  const percent = Math.min((sugar / max) * 100, 100);
  const color =
    percent > 75 ? "bg-red-500" : percent > 50 ? "bg-orange-500" : percent > 30 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-gray-200">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

function Teaspoon({ filled }: { filled: boolean }) {
  return (
    <span className={`text-lg ${filled ? "opacity-100" : "opacity-20"}`}>🥄</span>
  );
}

export default function FoodsPage() {
  const navigate = useNavigate();
  const dailyLimit = 25;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 pb-16 pt-8">
        <div className="absolute -bottom-5 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L60 48C120 36 240 12 360 6C480 0 600 12 720 24C840 36 960 48 1080 48C1200 48 1320 36 1380 30L1440 24V60H0Z" fill="#fff7ed" /></svg>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 font-['Nunito'] text-sm font-bold text-white backdrop-blur-sm hover:bg-white/30"
          >
            ← Voltar ao início
          </button>
          <div className="mb-3 text-6xl">🍔</div>
          <h1 className="mb-2 font-['Fredoka_One'] text-4xl font-bold text-white md:text-5xl">
            Açúcar nos Alimentos
          </h1>
          <p className="font-['Nunito'] text-lg font-semibold text-white/85">
            Descubra quanto açúcar existe nos alimentos que você come todo dia!
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Daily limit info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-xl"
        >
          <h2 className="mb-3 font-['Fredoka_One'] text-2xl">📏 Quanto é o Limite Diário?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/20 p-4 text-center">
              <div className="font-['Fredoka_One'] text-3xl">🌍 25g</div>
              <div className="font-['Nunito'] text-sm font-bold text-white/85">Ideal (OMS)</div>
              <div className="font-['Nunito'] text-xs text-white/70">5 colheres de chá</div>
            </div>
            <div className="rounded-2xl bg-white/20 p-4 text-center">
              <div className="font-['Fredoka_One'] text-3xl">⚠️ 50g</div>
              <div className="font-['Nunito'] text-sm font-bold text-white/85">Máximo (OMS)</div>
              <div className="font-['Nunito'] text-xs text-white/70">10 colheres de chá</div>
            </div>
            <div className="rounded-2xl bg-red-400/40 p-4 text-center border-2 border-red-300">
              <div className="font-['Fredoka_One'] text-3xl">🇧🇷 80g</div>
              <div className="font-['Nunito'] text-sm font-bold text-white/85">Média do Brasileiro</div>
              <div className="font-['Nunito'] text-xs text-white/70">16 colheres de chá 😱</div>
            </div>
          </div>
        </motion.div>

        {/* Food infographic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 overflow-hidden rounded-3xl shadow-xl"
        >
          <img
            src="/images/sugar-foods-chart.png"
            alt="Gráfico de açúcar nos alimentos"
            className="w-full object-cover"
          />
        </motion.div>

        {/* Food cards */}
        <h2 className="mb-6 flex items-center gap-3 font-['Fredoka_One'] text-3xl text-gray-800">
          <span>🔎</span> Quanto Açúcar Tem em Cada Alimento?
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {sugarFoods.map((food, i) => (
            <motion.div
              key={food.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className={`rounded-3xl border-2 ${food.borderColor} ${food.bgColor} p-5 shadow-lg`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{food.emoji}</span>
                  <div>
                    <h3 className="font-['Fredoka_One'] text-xl text-gray-800">{food.name}</h3>
                    <span className="font-['Nunito'] text-xs font-bold text-gray-500">{food.amount}</span>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 font-['Nunito'] text-xs font-black text-white ${food.levelColor}`}>
                  {food.level}
                </span>
              </div>

              {/* Sugar amount */}
              <div className="mb-2 flex items-end gap-2">
                <span className="font-['Fredoka_One'] text-3xl text-gray-800">{food.sugar}g</span>
                <span className="mb-1 font-['Nunito'] text-sm font-semibold text-gray-600">de açúcar</span>
              </div>

              {/* Bar */}
              <SugarBar sugar={food.sugar} max={40} />

              {/* % of daily */}
              <div className="mt-2 font-['Nunito'] text-xs font-bold text-gray-600">
                = {Math.round((food.sugar / dailyLimit) * 100)}% da cota ideal diária
              </div>

              {/* Teaspoons */}
              <div className="mt-3 rounded-xl bg-white/60 p-3">
                <div className="mb-1 font-['Nunito'] text-xs font-bold text-gray-600">
                  🥄 Equivale a {food.teaspoons.toFixed(1)} colheres de chá de açúcar:
                </div>
                <div className="flex flex-wrap gap-0.5">
                  {Array.from({ length: Math.round(food.teaspoons) }).map((_, j) => (
                    <Teaspoon key={j} filled={true} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 rounded-2xl bg-white p-5 shadow-md"
        >
          <h3 className="mb-3 font-['Fredoka_One'] text-xl text-gray-700">🟢 Legenda de Nível</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Natural", color: "bg-green-500", desc: "Açúcar natural com fibras" },
              { label: "Médio", color: "bg-yellow-400", desc: "Consume com atenção" },
              { label: "Alto", color: "bg-orange-500", desc: "Pouco e raramente" },
              { label: "Altíssimo", color: "bg-red-500", desc: "Evite sempre que puder" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`h-4 w-4 rounded-full ${l.color}`} />
                <div>
                  <span className="font-['Nunito'] text-sm font-bold text-gray-700">{l.label}</span>
                  <span className="ml-1 font-['Nunito'] text-xs text-gray-500">– {l.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 rounded-3xl bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white shadow-xl"
        >
          <h3 className="mb-2 font-['Fredoka_One'] text-2xl">💡 Dica Importante</h3>
          <p className="font-['Nunito'] text-base font-semibold">
            Antes de comprar qualquer alimento industrializado, leia o rótulo! Procure por "açúcares totais" ou "açúcares adicionados". Quanto menor o número, melhor! E lembre: 5g de açúcar = 1 colher de chá. 🥄
          </p>
        </motion.div>

        {/* CTA */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/mitos")}
            className="rounded-full bg-teal-600 px-8 py-3 font-['Nunito'] text-lg font-black text-white shadow-lg hover:scale-105 transition-all"
          >
            🔍 Ver Mitos & Verdades
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="rounded-full bg-purple-600 px-8 py-3 font-['Nunito'] text-lg font-black text-white shadow-lg hover:scale-105 transition-all"
          >
            🏆 Jogar o Quiz!
          </button>
        </div>
      </div>
    </div>
  );
}
