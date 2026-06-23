import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "../data/quizData";
import { supabase } from "../lib/supabase";

type GameState = "register" | "playing" | "result" | "ranking";
type RankingEntry = { name: string; score: number; date: string; emoji: string };

const AVATARS = ["🦊", "🐼", "🐸", "🦁", "🐯", "🐧", "🦋", "🐳", "🦄", "🐉"];

const DIFFICULTY_COLOR: Record<string, string> = {
  Fácil: "bg-green-100 text-green-700 border-green-300",
  Médio: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Difícil: "bg-red-100 text-red-700 border-red-300",
};

const POINTS: Record<string, number> = {
  Fácil: 100,
  Médio: 150,
  Difícil: 200,
};

function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = (current / total) * 100;
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

export default function QuizPage() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>("register");
  const [playerName, setPlayerName] = useState("");
  const [playerEmoji, setPlayerEmoji] = useState(AVATARS[0]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ correct: boolean; points: number }[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sugar_quiz_ranking");
    if (stored) {
      try {
        setRanking(JSON.parse(stored));
      } catch {
        setRanking([]);
      }
    }
  }, []);

  useEffect(() => {
    if (gameState === "playing" && !confirmed) {
      setTimeLeft(20);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            handleTimeout();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current!);
  }, [gameState, currentQ, confirmed]);

  const handleTimeout = () => {
    if (!confirmed) {
      setConfirmed(true);
      setAnswers((prev) => [...prev, { correct: false, points: 0 }]);
    }
  };

  const handleSelect = (optId: string) => {
    if (confirmed) return;
    setSelected(optId);
  };

  const handleConfirm = () => {
    if (!selected || confirmed) return;
    clearInterval(timerRef.current!);
    setConfirmed(true);
    const q = quizQuestions[currentQ];
    const isCorrect = selected === q.correct;
    const bonus = Math.floor((timeLeft / 20) * 50);
    const pts = isCorrect ? POINTS[q.difficulty] + bonus : 0;
    const newScore = score + pts;
    setScore(newScore);
    setAnswers((prev) => [...prev, { correct: isCorrect, points: pts }]);
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ score: score })
        .eq('id', user.id);
      if (error) {
        console.error('Erro ao salvar pontuação no Supabase:', error);
      }
    }

    const entry: RankingEntry = {
      name: playerName,
      score: score,
      date: new Date().toLocaleDateString("pt-BR"),
      emoji: playerEmoji,
    };
    const newRanking = [...ranking, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setRanking(newRanking);
    localStorage.setItem("sugar_quiz_ranking", JSON.stringify(newRanking));
    setGameState("result");
  };

  const handleStart = () => {
    if (!playerName.trim()) return;
    setGameState("playing");
    setCurrentQ(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setAnswers([]);
  };

  const handleRestart = () => {
    setGameState("register");
    setPlayerName("");
    setPlayerEmoji(AVATARS[0]);
    setCurrentQ(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setAnswers([]);
  };

  const getGrade = (s: number) => {
    const max = quizQuestions.reduce((acc, q) => acc + POINTS[q.difficulty] + 50, 0);
    const pct = (s / max) * 100;
    if (pct >= 90) return { label: "Mestre do Açúcar! 🏆", color: "text-yellow-600", emoji: "🌟" };
    if (pct >= 70) return { label: "Expert em Nutrição! 🥇", color: "text-purple-600", emoji: "🎖️" };
    if (pct >= 50) return { label: "Bom trabalho! 🥈", color: "text-blue-600", emoji: "👍" };
    return { label: "Continue Estudando! 📚", color: "text-green-600", emoji: "💪" };
  };

  const q = quizQuestions[currentQ];
  const grade = getGrade(score);

  // Register Screen
  if (gameState === "register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <button
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-['Nunito'] text-sm font-bold text-gray-600 shadow-md hover:shadow-lg"
          >
            ← Voltar
          </button>

          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 text-center">
              <div className="mb-2 text-6xl">🏆</div>
              <h1 className="font-['Fredoka_One'] text-3xl text-gray-800">Quiz do Açúcar</h1>
              <p className="mt-1 font-['Nunito'] text-base font-semibold text-gray-500">
                15 perguntas • Conta o tempo • Ranking!
              </p>
            </div>

            <div className="mb-6 rounded-2xl bg-purple-50 p-4">
              <h3 className="mb-3 font-['Fredoka_One'] text-lg text-purple-700">📋 Regras do Jogo</h3>
              <ul className="space-y-1.5">
                {[
                  "São 15 perguntas sobre o açúcar",
                  "Você tem 20 segundos por pergunta",
                  "Responder mais rápido = mais pontos!",
                  "Pergunta Fácil: até 150 pts",
                  "Pergunta Média: até 200 pts",
                  "Pergunta Difícil: até 250 pts",
                  "Top 3 entram no ranking!",
                ].map((rule, i) => (
                  <li key={i} className="flex items-center gap-2 font-['Nunito'] text-sm font-semibold text-gray-700">
                    <span className="text-purple-500">✦</span> {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <label className="mb-2 block font-['Nunito'] text-sm font-bold text-gray-700">
                Escolha seu avatar:
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    onClick={() => setPlayerEmoji(av)}
                    className={`rounded-xl p-2 text-2xl transition-all ${
                      playerEmoji === av
                        ? "scale-110 bg-purple-200 ring-2 ring-purple-500"
                        : "bg-gray-100 hover:bg-purple-100"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block font-['Nunito'] text-sm font-bold text-gray-700">
                Seu nome ou apelido:
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                placeholder="Ex: Super Ninja da Saúde 🥷"
                maxLength={24}
                className="w-full rounded-2xl border-2 border-purple-300 bg-purple-50 px-4 py-3 font-['Nunito'] text-base font-semibold text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <button
              onClick={handleStart}
              disabled={!playerName.trim()}
              className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 font-['Fredoka_One'] text-2xl text-white shadow-lg transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {playerEmoji} Começar o Quiz!
            </button>

            <button
              onClick={() => setGameState("ranking")}
              className="mt-3 w-full rounded-2xl border-2 border-gray-200 py-3 font-['Nunito'] text-base font-bold text-gray-600 hover:bg-gray-50"
            >
              🏅 Ver Ranking
            </button>
          </div>
        </motion.div>
      </div>
    );
            }
    // Playing Screen
  if (gameState === "playing") {
    const timerPct = (timeLeft / 20) * 100;
    const timerColor = timerPct > 60 ? "bg-green-500" : timerPct > 30 ? "bg-yellow-500" : "bg-red-500";

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-md">
              <span className="text-xl">{playerEmoji}</span>
              <span className="font-['Nunito'] text-sm font-bold text-gray-700">{playerName}</span>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 shadow-md">
              <span className="font-['Fredoka_One'] text-xl text-white">⭐ {score}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-1 flex justify-between font-['Nunito'] text-xs font-bold text-gray-500">
              <span>Pergunta {currentQ + 1} de {quizQuestions.length}</span>
              <span>{answers.filter((a) => a.correct).length} corretas</span>
            </div>
            <ProgressBar current={currentQ + 1} total={quizQuestions.length} />
          </div>

          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-['Nunito'] text-xs font-bold text-gray-500">⏱️ Tempo</span>
              <span className={`font-['Fredoka_One'] text-lg ${timeLeft <= 5 ? "text-red-600" : "text-gray-700"}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <motion.div
                className={`h-full rounded-full ${timerColor} transition-colors`}
                animate={{ width: `${timerPct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-100 px-3 py-1 font-['Nunito'] text-xs font-bold text-purple-700">
                  {q.emoji} {q.category}
                </span>
                <span className={`rounded-full border px-3 py-1 font-['Nunito'] text-xs font-bold ${DIFFICULTY_COLOR[q.difficulty]}`}>
                  {q.difficulty} • {POINTS[q.difficulty]}+ pts
                </span>
              </div>

              <h2 className="mb-6 font-['Nunito'] text-xl font-black leading-snug text-gray-800">
                {q.question}
              </h2>

              <div className="grid gap-3">
                {q.options.map((opt) => {
                  let style =
                    "border-2 border-gray-200 bg-gray-50 hover:border-purple-400 hover:bg-purple-50";
                  if (selected === opt.id && !confirmed) {
                    style = "border-2 border-purple-500 bg-purple-100 ring-2 ring-purple-200";
                  }
                  if (confirmed) {
                    if (opt.id === q.correct) {
                      style = "border-2 border-green-500 bg-green-100";
                    } else if (opt.id === selected && opt.id !== q.correct) {
                      style = "border-2 border-red-500 bg-red-100";
                    } else {
                      style = "border-2 border-gray-200 bg-gray-100 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      disabled={confirmed}
                      className={`rounded-2xl p-4 text-left font-['Nunito'] text-base font-bold transition-all ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-['Fredoka_One'] text-sm font-bold ${
                          confirmed && opt.id === q.correct
                            ? "bg-green-500 text-white"
                            : confirmed && opt.id === selected && opt.id !== q.correct
                            ? "bg-red-500 text-white"
                            : selected === opt.id && !confirmed
                            ? "bg-purple-500 text-white"
                            : "bg-white text-gray-600 border-2 border-gray-300"
                        }`}>
                          {opt.id.toUpperCase()}
                        </span>
                        <span className="text-gray-800">{opt.text}</span>
                        {confirmed && opt.id === q.correct && (
                          <span className="ml-auto text-xl">✅</span>
                        )}
                        {confirmed && opt.id === selected && opt.id !== q.correct && (
                          <span className="ml-auto text-xl">❌</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {confirmed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 rounded-2xl p-4 ${
                      selected === q.correct ? "bg-green-50 border-2 border-green-300" : "bg-red-50 border-2 border-red-300"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xl">{selected === q.correct ? "🎉" : "💡"}</span>
                      <span className={`font-['Fredoka_One'] text-base ${selected === q.correct ? "text-green-700" : "text-red-700"}`}>
                        {selected === q.correct
                          ? `Correto! +${answers[answers.length - 1]?.points || POINTS[q.difficulty]} pontos!`
                          : !selected
                          ? "Tempo esgotado! ⏰"
                          : "Ops! Não foi dessa vez..."}
                      </span>
                    </div>
                    <p className="font-['Nunito'] text-sm font-semibold text-gray-700">{q.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 flex gap-3">
                {!confirmed && (
                  <button
                    onClick={handleConfirm}
                    disabled={!selected}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-['Nunito'] text-base font-black text-white shadow-lg disabled:opacity-40 hover:scale-[1.02] transition-all"
                  >
                    ✓ Confirmar Resposta
                  </button>
                )}
                {confirmed && (
                  <button
                    onClick={handleNext}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-['Nunito'] text-base font-black text-white shadow-lg hover:scale-[1.02] transition-all"
                  >
                    {currentQ < quizQuestions.length - 1 ? "Próxima Pergunta →" : "🏁 Ver Resultado!"}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {quizQuestions.map((_, i) => {
              const ans = answers[i];
              return (
                <div
                  key={i}
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    i === currentQ
                      ? "bg-purple-600 text-white ring-2 ring-purple-300"
                      : ans === undefined
                      ? "bg-gray-200 text-gray-400"
                      : ans.correct
                      ? "bg-green-500 text-white"
                      : "bg-red-400 text-white"
                  }`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (gameState === "result") {
    const correct = answers.filter((a) => a.correct).length;
    const total = quizQuestions.length;
    const myScore = score;
    const myRank = ranking.findIndex((r) => r.name === playerName && r.score === myScore) + 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 p-4">
        <div className="mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="rounded-3xl bg-white p-8 shadow-2xl text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-2 text-7xl"
            >
              {grade.emoji}
            </motion.div>

            <h1 className={`mb-1 font-['Fredoka_One'] text-3xl ${grade.color}`}>{grade.label}</h1>
            <p className="mb-5 font-['Nunito'] text-base font-semibold text-gray-500">
              {playerEmoji} {playerName}
            </p>

            <div className="mb-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-5 text-white">
              <div className="font-['Fredoka_One'] text-5xl">{myScore}</div>
              <div className="font-['Nunito'] text-sm font-bold text-white/80">pontos totais</div>
              {myRank > 0 && myRank <= 3 && (
                <div className="mt-2 rounded-full bg-white/30 px-4 py-1 font-['Nunito'] text-sm font-black">
                  {myRank === 1 ? "🥇" : myRank === 2 ? "🥈" : "🥉"} #{myRank} no Ranking!
                </div>
              )}
            </div>

            <div className="mb-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-green-100 p-3 text-center">
                <div className="font-['Fredoka_One'] text-2xl text-green-600">{correct}</div>
                <div className="font-['Nunito'] text-xs font-bold text-green-700">Corretas</div>
              </div>
              <div className="rounded-2xl bg-red-100 p-3 text-center">
                <div className="font-['Fredoka_One'] text-2xl text-red-600">{total - correct}</div>
                <div className="font-['Nunito'] text-xs font-bold text-red-700">Erradas</div>
              </div>
              <div className="rounded-2xl bg-purple-100 p-3 text-center">
                <div className="font-['Fredoka_One'] text-2xl text-purple-600">{Math.round((correct / total) * 100)}%</div>
                <div className="font-['Nunito'] text-xs font-bold text-purple-700">Acertos</div>
              </div>
            </div>

            <div className="mb-6 max-h-48 overflow-y-auto rounded-2xl bg-gray-50 p-3">
              {quizQuestions.map((q, i) => (
                <div key={i} className="mb-2 flex items-center gap-2 text-left">
                  <span className={`shrink-0 text-lg ${answers[i]?.correct ? "✅" : "❌"}`}>
                    {answers[i]?.correct ? "✅" : "❌"}
                  </span>
                  <p className="font-['Nunito'] text-xs font-semibold text-gray-700 flex-1">{q.question.slice(0, 50)}...</p>
                  <span className="font-['Fredoka_One'] text-sm text-purple-600">+{answers[i]?.points || 0}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setGameState("ranking")}
                className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 py-3 font-['Nunito'] text-lg font-black text-white shadow-lg hover:scale-[1.02] transition-all"
              >
                🏅 Ver Ranking
              </button>
              <button
                onClick={handleRestart}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-['Nunito'] text-lg font-black text-white shadow-lg hover:scale-[1.02] transition-all"
              >
                🔄 Jogar Novamente
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-2xl border-2 border-gray-200 py-3 font-['Nunito'] text-base font-bold text-gray-600 hover:bg-gray-50"
              >
                🏠 Ir para o Início
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Ranking Screen
  if (gameState === "ranking") {
    const medals = ["🥇", "🥈", "🥉"];
    const topRanking = ranking.slice(0, 10);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-4">
        <div className="mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-8 shadow-2xl"
          >
            <div className="mb-6 text-center">
              <div className="mb-2 text-6xl">🏆</div>
              <h1 className="font-['Fredoka_One'] text-3xl text-gray-800">Hall da Fama</h1>
              <p className="font-['Nunito'] text-sm font-semibold text-gray-500">
                Top 10 maiores pontuações
              </p>
            </div>

            {topRanking.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-5xl mb-3">🎯</div>
                <p className="font-['Nunito'] text-base font-bold text-gray-400">
                  Nenhuma pontuação ainda! Seja o primeiro!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {topRanking.map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`flex items-center gap-3 rounded-2xl p-4 ${
                      i === 0
                        ? "bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400"
                        : i === 1
                        ? "bg-gradient-to-r from-gray-100 to-slate-100 border-2 border-gray-400"
                        : i === 2
                        ? "bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-400"
                        : "bg-gray-50 border-2 border-gray-200"
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-['Fredoka_One'] text-xl shadow-sm">
                      {i < 3 ? medals[i] : `#${i + 1}`}
                    </div>
                    <div className="text-2xl">{entry.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-['Nunito'] text-base font-black text-gray-800 truncate">{entry.name}</div>
                      <div className="font-['Nunito'] text-xs font-semibold text-gray-400">{entry.date}</div>
                    </div>
                    <div className="font-['Fredoka_One'] text-xl text-purple-700">{entry.score}</div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => setGameState("register")}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-['Nunito'] text-lg font-black text-white shadow-lg hover:scale-[1.02] transition-all"
              >
                🎮 Jogar Agora!
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-2xl border-2 border-gray-200 py-3 font-['Nunito'] text-base font-bold text-gray-600 hover:bg-gray-50"
              >
                🏠 Início
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
        }
