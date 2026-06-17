import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { sugarTypes, healthyTips } from "../data/quizData";

const effects = [
  {
    title: "Cáries nos Dentes",
    desc: "Bactérias comem o açúcar que fica nos dentes e produzem ácidos que destroem o esmalte dental, causando furinhos dolorosos.",
    emoji: "🦷",
    color: "bg-red-100 border-red-300",
    textColor: "text-red-700",
  },
  {
    title: "Obesidade",
    desc: "O excesso de açúcar vira gordura no corpo. O Brasil tem 1 em cada 3 crianças com sobrepeso. O açúcar é um dos grandes culpados!",
    emoji: "⚖️",
    color: "bg-orange-100 border-orange-300",
    textColor: "text-orange-700",
  },
  {
    title: "Diabetes Tipo 2",
    desc: "Com tanto açúcar, o pâncreas trabalha demais até não aguentar mais. O resultado é o diabetes, que não tem cura e exige cuidados para sempre.",
    emoji: "💉",
    color: "bg-yellow-100 border-yellow-300",
    textColor: "text-yellow-700",
  },
  {
    title: "Problemas de Humor",
    desc: "O açúcar dá energia rápida... e depois tira tudo! Os 'picos' e 'quedas' causam irritação, cansaço e dificuldade de concentração na escola.",
    emoji: "😤",
    color: "bg-pink-100 border-pink-300",
    textColor: "text-pink-700",
  },
  {
    title: "Acne e Pele",
    desc: "Açúcar em excesso aumenta inflamação no corpo, estimulando a produção de sebo na pele e favorecendo o aparecimento de espinhas.",
    emoji: "😔",
    color: "bg-purple-100 border-purple-300",
    textColor: "text-purple-700",
  },
  {
    title: "Vício e Dependência",
    desc: "O açúcar ativa o sistema de prazer do cérebro, igual a algumas drogas! Por isso é tão difícil resistir e sempre queremos mais.",
    emoji: "🧠",
    color: "bg-blue-100 border-blue-300",
    textColor: "text-blue-700",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 pb-16 pt-8">
        <div className="absolute -bottom-5 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L60 48C120 36 240 12 360 6C480 0 600 12 720 24C840 36 960 48 1080 48C1200 48 1320 36 1380 30L1440 24V60H0Z" fill="#f5f3ff" /></svg>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 font-['Nunito'] text-sm font-bold text-white backdrop-blur-sm hover:bg-white/30"
          >
            ← Voltar ao início
          </button>
          <div className="mb-3 text-6xl">🔬</div>
          <h1 className="mb-2 font-['Fredoka_One'] text-4xl font-bold text-white md:text-5xl">
            Entendendo o Açúcar
          </h1>
          <p className="font-['Nunito'] text-lg font-semibold text-white/85">
            Descubra tudo sobre esse ingrediente que está em todo lugar!
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* O que é açúcar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 overflow-hidden rounded-3xl bg-white shadow-xl"
        >
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-5">
            <h2 className="font-['Fredoka_One'] text-2xl font-bold text-white">🍬 O que é o Açúcar?</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-4 font-['Nunito'] text-base font-semibold leading-relaxed text-gray-700">
                  O açúcar é um tipo de <strong className="text-orange-600">carboidrato</strong> que fornece energia para o nosso corpo. Tecnicamente chamado de sacarose, ele é extraído principalmente da <strong>cana-de-açúcar</strong>.
                </p>
                <p className="mb-4 font-['Nunito'] text-base font-semibold leading-relaxed text-gray-700">
                  O problema não é o açúcar em si — nosso cérebro e músculos precisam de glicose para funcionar. O problema é o <strong className="text-red-600">excesso</strong>! O brasileiro consome <strong className="text-red-600">3x mais</strong> do que deveria.
                </p>
                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="font-['Nunito'] text-sm font-bold text-amber-800">
                    ⚡ Curiosidade: O nome "açúcar" vem do árabe "sukkar", que veio do sânscrito "sharkara", significando "partícula granulada".
                  </p>
                </div>
                <div className="mt-3 rounded-2xl bg-red-50 border border-red-200 p-4">
                  <p className="font-['Nunito'] text-sm font-bold text-red-700">
                    🇧🇷 No Brasil, 1 em cada 3 crianças tem sobrepeso. O açúcar adicionado é um dos principais vilões desta estatística!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/hero-sugar.png"
                  alt="Ilustração do açúcar"
                  className="max-h-64 rounded-2xl object-contain"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tipos de Açúcar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="mb-4 flex items-center gap-3 font-['Fredoka_One'] text-3xl text-gray-800">
            <span>🧪</span> Tipos de Açúcar
          </h2>
          <div className="mb-5 flex justify-center">
            <img
              src="https://i.imgur.com/A1mEsMi.png"
              alt="Tipos de açúcar"
              className="max-h-56 rounded-3xl object-contain shadow-lg"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sugarTypes.map((type, i) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={`rounded-2xl border-2 p-5 ${type.color}`}
              >
                <div className="mb-2 text-4xl">{type.emoji}</div>
                <h3 className={`mb-0.5 font-['Fredoka_One'] text-xl ${type.textColor}`}>{type.name}</h3>
                <div className="mb-2 rounded-full bg-white/70 px-2 py-0.5 text-xs font-bold text-gray-600 inline-block">
                  {type.nickname}
                </div>
                <p className="mb-3 font-['Nunito'] text-sm font-semibold text-gray-700">{type.description}</p>
                <div className="rounded-xl bg-white/50 p-2">
                  <p className="font-['Nunito'] text-xs font-bold text-gray-600">
                    📍 Encontrado em: {type.found}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Malefícios */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="mb-6 flex items-center gap-3 font-['Fredoka_One'] text-3xl text-gray-800">
            <span>⚠️</span> Malefícios do Excesso
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {effects.map((effect, i) => (
              <motion.div
                key={effect.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className={`rounded-2xl border-2 p-5 ${effect.color}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{effect.emoji}</span>
                  <div>
                    <h3 className={`mb-1 font-['Fredoka_One'] text-xl ${effect.textColor}`}>{effect.title}</h3>
                    <p className="font-['Nunito'] text-sm font-semibold text-gray-700">{effect.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <img
              src="/images/sugar-effects.png"
              alt="Efeitos do açúcar no corpo"
              className="max-h-72 rounded-3xl object-contain shadow-xl"
            />
          </div>
        </motion.section>

        {/* Pontos Positivos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10 rounded-3xl bg-gradient-to-br from-green-100 to-teal-100 p-6 border-2 border-green-300"
        >
          <h2 className="mb-4 flex items-center gap-3 font-['Fredoka_One'] text-2xl text-green-700">
            <span>✅</span> Mas o Açúcar Tem Lados Positivos Também!
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Energia Rápida", desc: "Em situações de emergência, o açúcar fornece energia rápida para o cérebro e músculos funcionarem.", emoji: "⚡" },
              { title: "Sabor e Prazer", desc: "O sabor doce faz parte da nossa experiência humana e pode trazer felicidade quando consumido com moderação.", emoji: "😊" },
              { title: "Preservação", desc: "O açúcar é um preservativo natural que ajuda a conservar alimentos como geléias e compotas.", emoji: "🫙" },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 text-3xl">{p.emoji}</div>
                <h3 className="mb-1 font-['Fredoka_One'] text-lg text-green-700">{p.title}</h3>
                <p className="font-['Nunito'] text-sm font-semibold text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-2xl bg-white/70 p-3 font-['Nunito'] text-sm font-bold text-green-800">
            🎯 A chave é sempre a MODERAÇÃO! Não é necessário eliminar o açúcar completamente — é preciso controlar o quanto consumimos.
          </p>
        </motion.section>

        {/* Dicas Alimentares */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="mb-6 flex items-center gap-3 font-['Fredoka_One'] text-3xl text-gray-800">
            <span>🌟</span> Como Reduzir o Açúcar?
          </h2>
          <div className="mb-6 flex justify-center">
            <img
              src="/images/healthy-alternatives.png"
              alt="Alternativas saudáveis"
              className="max-h-64 rounded-3xl object-contain shadow-lg"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {healthyTips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-md"
              >
                <span className="text-2xl">{tip.emoji}</span>
                <div>
                  <span className="mb-1 inline-block rounded-full bg-purple-100 px-2 py-0.5 font-['Nunito'] text-xs font-bold text-purple-700">
                    {tip.category}
                  </span>
                  <p className="font-['Nunito'] text-sm font-bold text-gray-700">{tip.tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Quiz */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center shadow-xl"
        >
          <div className="mb-3 text-5xl">🏆</div>
          <h2 className="mb-2 font-['Fredoka_One'] text-3xl text-white">Pronto para o Quiz?</h2>
          <p className="mb-5 font-['Nunito'] text-base font-semibold text-white/85">
            Agora que você aprendeu sobre o açúcar, teste seus conhecimentos e dispute no ranking!
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="rounded-full bg-white px-10 py-3 font-['Nunito'] text-lg font-black text-purple-700 shadow-lg hover:scale-105 transition-all"
          >
            🎮 Jogar Agora!
          </button>
        </motion.div>
      </div>
    </div>
  );
}
