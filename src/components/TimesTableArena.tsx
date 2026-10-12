import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Grid, 
  Clock, 
  Users, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Lightbulb, 
  Trophy, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { UserStats, Language, LivePlayer } from '../types';
import { translations, formatNum } from '../utils/translations';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { initialLivePlayers } from '../data/mathCurriculum';

interface TimesTableArenaProps {
  stats: UserStats;
  lang: Language;
  onAddXp: (amount: number, reason: string) => void;
  onUpdateTableMastery: (factor: number, scorePercent: number) => void;
  onIncrementSolved: () => void;
  onMissionAction?: (category: 'timestable' | 'speed' | 'quiz' | 'ai' | 'video' | 'general', count?: number) => void;
  livePlayers?: LivePlayer[];
}

const defaultAiOpponent: LivePlayer = {
  id: 'ai_mentor_fawaz',
  name: 'AI Math Mentor',
  country: { en: 'Global', ar: 'عالمي' },
  flag: '🤖',
  avatar: '🧠',
  activity: { en: 'Guiding learners in MathVerse', ar: 'إرشاد المتعلمين في ماث فيرس' },
  xp: 850,
  streak: 15,
  status: 'online',
  lastActionTime: 'Live now',
  isRealUser: false,
};

export const TimesTableArena: React.FC<TimesTableArenaProps> = ({
  stats,
  lang,
  onAddXp,
  onUpdateTableMastery,
  onIncrementSolved,
  onMissionAction,
  livePlayers = [],
}) => {
  const t = translations[lang];

  // Active mode: 'quiz' | 'grid' | 'speed' | 'duel'
  const [activeMode, setActiveMode] = useState<'quiz' | 'grid' | 'speed' | 'duel'>('quiz');
  const [selectedFactor, setSelectedFactor] = useState<number>(7); // Default to 7 (a classic fun challenge)

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<Array<{ a: number; b: number; correct: number; options: number[] }>>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 10x10 Grid State
  const [gridCell, setGridCell] = useState<{ row: number; col: number }>({ row: 7, col: 8 });

  // Speed Run State (60s)
  const [speedActive, setSpeedActive] = useState(false);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(60);
  const [speedQuestion, setSpeedQuestion] = useState<{ a: number; b: number; correct: number; options: number[] }>({ a: 6, b: 7, correct: 42, options: [36, 42, 48, 49] });
  const [speedScore, setSpeedScore] = useState(0);
  const [speedHighScore, setSpeedHighScore] = useState(0);
  const speedTimerRef = useRef<any>(null);

  // 1v1 Duel State
  const [duelActive, setDuelActive] = useState(false);
  const [opponent, setOpponent] = useState<LivePlayer>(defaultAiOpponent);
  const [duelRound, setDuelRound] = useState(0);
  const [userDuelScore, setUserDuelScore] = useState(0);
  const [oppDuelScore, setOppDuelScore] = useState(0);
  const [duelQuestion, setDuelQuestion] = useState<{ a: number; b: number; correct: number; options: number[] }>({ a: 8, b: 7, correct: 56, options: [48, 54, 56, 64] });
  const [duelFinished, setDuelFinished] = useState(false);

  // Generate 10 questions for selected factor (or all factors mixed if factor === 0)
  const generateQuiz = (factor: number) => {
    const list: Array<{ a: number; b: number; correct: number; options: number[] }> = [];
    const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - 0.5);

    for (let i = 0; i < 10; i++) {
      const a = factor === 0 ? Math.floor(Math.random() * 10) + 1 : factor;
      const b = factor === 0 ? Math.floor(Math.random() * 10) + 1 : multipliers[i];
      const correct = a * b;

      // Distractors
      const distSet = new Set<number>([correct]);
      while (distSet.size < 4) {
        const offset = (Math.floor(Math.random() * 5) - 2) * (Math.random() > 0.5 ? a : b);
        const candidate = correct + (offset !== 0 ? offset : (Math.random() > 0.5 ? 2 : -2));
        if (candidate > 0 && candidate <= 100) {
          distSet.add(candidate);
        } else {
          distSet.add(Math.floor(Math.random() * 80) + 1);
        }
      }

      const options = Array.from(distSet).sort(() => Math.random() - 0.5);
      list.push({ a, b, correct, options });
    }

    setQuizQuestions(list);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setShowHint(false);
  };

  useEffect(() => {
    generateQuiz(selectedFactor);
  }, [selectedFactor]);

  // Handle Quiz answer
  const handleAnswerOption = (opt: number) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const curr = quizQuestions[currentQIndex];
    if (opt === curr.correct) {
      sound.playCorrect();
      setScore((s) => s + 1);
      onAddXp(25, `Times Table ${curr.a}×${curr.b}`);
      onIncrementSolved();
      onMissionAction?.('timestable', 1);
      onMissionAction?.('general', 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex((idx) => idx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Finished!
      setQuizFinished(true);
      onMissionAction?.('quiz', 1);
      const percent = Math.round(((score + (selectedOption === quizQuestions[currentQIndex].correct ? 0 : 0)) / quizQuestions.length) * 100);
      onUpdateTableMastery(selectedFactor, percent);
      if (percent >= 80) {
        sound.playLevelUp();
        triggerConfetti();
        onAddXp(100, `Times Table Mastery Bonus (${percent}%)`);
      }
    }
  };

  // Speed run logic
  const startSpeedRun = () => {
    sound.playClick();
    setSpeedActive(true);
    setSpeedTimeLeft(60);
    setSpeedScore(0);
    onMissionAction?.('speed', 1);
    generateNextSpeedQ();

    if (speedTimerRef.current) clearInterval(speedTimerRef.current);
    speedTimerRef.current = setInterval(() => {
      setSpeedTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(speedTimerRef.current);
          setSpeedActive(false);
          sound.playLevelUp();
          triggerConfetti();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const generateNextSpeedQ = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const correct = a * b;
    const distSet = new Set<number>([correct]);
    while (distSet.size < 4) {
      const candidate = correct + (Math.floor(Math.random() * 9) - 4);
      if (candidate > 0 && candidate !== correct) distSet.add(candidate);
      else distSet.add(Math.floor(Math.random() * 90) + 1);
    }
    setSpeedQuestion({ a, b, correct, options: Array.from(distSet).sort(() => Math.random() - 0.5) });
  };

  const handleSpeedAnswer = (opt: number) => {
    if (!speedActive) return;
    if (opt === speedQuestion.correct) {
      sound.playCorrect();
      setSpeedScore((s) => {
        const next = s + 1;
        if (next > speedHighScore) setSpeedHighScore(next);
        return next;
      });
      onAddXp(15, 'Speed Multiplication');
      onIncrementSolved();
    } else {
      sound.playWrong();
    }
    generateNextSpeedQ();
  };

  useEffect(() => {
    return () => {
      if (speedTimerRef.current) clearInterval(speedTimerRef.current);
    };
  }, []);

  // Duel Logic
  const startDuelWith = (player: LivePlayer) => {
    sound.playClick();
    setOpponent(player);
    setDuelActive(true);
    setDuelRound(0);
    setUserDuelScore(0);
    setOppDuelScore(0);
    setDuelFinished(false);
    nextDuelQuestion();
  };

  const nextDuelQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const correct = a * b;
    const opts = [
      correct,
      correct + (Math.random() > 0.5 ? a : -a) || correct + 2,
      correct + (Math.random() > 0.5 ? b : -b) || correct + 4,
      correct + (Math.random() > 0.5 ? 5 : -5),
    ].filter((v, i, arr) => arr.indexOf(v) === i);
    while (opts.length < 4) opts.push(Math.floor(Math.random() * 90) + 1);
    setDuelQuestion({ a, b, correct, options: opts.sort(() => Math.random() - 0.5) });
  };

  const handleDuelAnswer = (opt: number) => {
    const isUserCorrect = opt === duelQuestion.correct;
    if (isUserCorrect) {
      sound.playCorrect();
      setUserDuelScore((s) => s + 1);
      onAddXp(30, 'Duel Round Won');
      onIncrementSolved();
    } else {
      sound.playWrong();
    }

    // Opponent random chance (80% accuracy)
    const oppCorrect = Math.random() < 0.8;
    if (oppCorrect) {
      setOppDuelScore((s) => s + 1);
    }

    if (duelRound + 1 >= 5) {
      setDuelFinished(true);
      if (isUserCorrect && userDuelScore >= oppDuelScore) {
        sound.playLevelUp();
        triggerConfetti();
        onAddXp(150, '1v1 Live Duel Victory');
      }
    } else {
      setDuelRound((r) => r + 1);
      nextDuelQuestion();
    }
  };

  // Helper pro tips for times table factors
  const getFactorProTip = (factor: number): string => {
    const tips: Record<number, { en: string; ar: string }> = {
      1: { en: 'Identity Rule: Any number multiplied by 1 stays unchanged!', ar: 'خاصية المحايد: أي عدد يضرب في ١ يبقى كما هو!' },
      2: { en: 'The Double Rule: Multiplying by 2 is just doubling (adding the number to itself).', ar: 'قاعدة الضعف: الضرب في ٢ يعني جمع العدد مع نفسه.' },
      3: { en: 'Triple It: Double the number first, then add it one more time (e.g. 3×7 = 14 + 7 = 21).', ar: 'المضاعفة وزيادة: ضاعف العدد أولاً ثم أضفه مرة واحدة (٣ × ٧ = ١٤ + ٧ = ٢١).' },
      4: { en: 'Double Double: Double the number, then double that answer! (4×6: double 6 is 12, double 12 is 24).', ar: 'المضاعفة مرتين: ضاعف العدد ثم ضاعف الناتج (٤ × ٦: ضعف ٦ هو ١٢، وضعف ١٢ هو ٢٤).' },
      5: { en: 'Always ends in 0 or 5! It is exactly half of multiplying by 10.', ar: 'ينتهي دائماً بـ ٠ أو ٥! وهو نصف حاصل الضرب في ١٠ تماماً.' },
      6: { en: 'Even Friend: Multiply by 5 first, then add the number once (6×7 = 35 + 7 = 42).', ar: 'اضرب في ٥ أولاً ثم أضف العدد مرة واحدة (٦ × ٧ = ٣٥ + ٧ = ٤٢).' },
      7: { en: 'The Legendary 7: Remember 5, 6, 7, 8! -> 56 = 7 × 8. Or split 7 into 5 + 2.', ar: 'الرقم الأسطوري ٧: تذكر النغم ٥، ٦، ٧، ٨! أي ٥٦ = ٧ × ٨، أو فكك ٧ إلى ٥ + ٢.' },
      8: { en: 'Triple Double: Double, double, and double again! (8×6: 6->12->24->48).', ar: 'ضاعف ٣ مرات متتالية! (مثال ٨ × ٦: ٦ تصبح ١٢ ثم ٢٤ ثم ٤٨).' },
      9: { en: 'Digit Sum 9: Multiply by 10 and subtract the number (9×7 = 70 - 7 = 63). Digits 6+3=9!', ar: 'اضرب في ١٠ واطرح العدد (٩ × ٧ = ٧٠ - ٧ = ٦٣). ومجموع الأرقام ٦+٣=٩!' },
      10: { en: 'The Zero Hero: Just place a zero at the end of any whole number! (10×8 = 80).', ar: 'بطل الصفر: فقط أضف صفراً على يمين أي عدد صحيح! (١٠ × ٨ = ٨٠).' },
    };
    const tip = tips[factor];
    if (tip) {
      return (tip as Record<string, string>)[lang] || tip.en || tip.ar;
    }
    return (lang === 'ar' ? 'تدرب على الربط بين العمليات لتسريع البديهة' : 'Look for patterns and symmetries across factors');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title & Modes Selector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{t.ttTitle}</span>
              <span>·</span>
              <span className="text-slate-400">{t.authorCredit}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.ttTitle}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              {t.ttSubtitle}
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('quiz');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeMode === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{t.ttFactorPractice}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('grid');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>{t.ttVisualGrid}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('speed');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeMode === 'speed'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{t.ttSpeedChallenge}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('duel');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeMode === 'duel'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.liveDuelInvite}</span>
            </button>
          </div>
        </div>

        {/* Factor Selector Bar (1 to 10 + All Factors 0) */}
        {activeMode === 'quiz' && (
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.ttSelectFactor}:
              </span>
              <span className="text-xs text-indigo-400 font-medium">
                {selectedFactor === 0
                  ? t.ttAllFactors
                  : `${t.ttMultiplicationOf} ${formatNum(selectedFactor, stats.arabicNumerals)}`}
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const mastery = stats.timesTableMastery[num] || 0;
                const isSelected = selectedFactor === num;
                return (
                  <button
                    key={num}
                    onClick={() => {
                      sound.playClick();
                      setSelectedFactor(num);
                    }}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl font-bold transition-all relative ${
                      isSelected
                        ? 'bg-gradient-to-b from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 scale-105 border border-indigo-400'
                        : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{formatNum(num, stats.arabicNumerals)}×</span>
                    {mastery > 0 && (
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        {formatNum(mastery, stats.arabicNumerals)}%
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedFactor(0);
                }}
                className={`col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  selectedFactor === 0
                    ? 'bg-gradient-to-b from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-600/30 scale-105 border border-amber-400'
                    : 'bg-slate-950/70 hover:bg-slate-800 text-amber-300 border border-slate-800'
                }`}
              >
                <span>🎲</span>
                <span className="text-[10px]">{lang === 'ar' ? 'شامل' : 'Mixed'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODE 1: FACTOR QUIZ ARENA */}
      {activeMode === 'quiz' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 relative">
          {!quizFinished && quizQuestions.length > 0 && (
            <div>
              {/* Quiz Header: Progress & Pro-Tip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs text-slate-400 font-semibold">
                    {t.ttQuestionOf}{' '}
                    <span className="text-white font-bold">
                      {formatNum(currentQIndex + 1, stats.arabicNumerals)}
                    </span>{' '}
                    / {formatNum(quizQuestions.length, stats.arabicNumerals)}
                  </span>
                  <div className="w-48 sm:w-64 h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
                      style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400">{t.ttScore}</span>
                    <div className="text-lg font-black text-amber-400">
                      {formatNum(score, stats.arabicNumerals)} / {formatNum(quizQuestions.length, stats.arabicNumerals)}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      generateQuiz(selectedFactor);
                    }}
                    title={t.ttPlayAgain}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Pro Tip Box */}
              {selectedFactor > 0 && (
                <div className="mb-6 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-start gap-3 text-xs sm:text-sm text-indigo-200">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 mr-1.5">{t.ttMultiplierTip}:</span>
                    {getFactorProTip(selectedFactor)}
                  </div>
                </div>
              )}

              {/* Main Multiplication Problem Card */}
              <div className="my-6 text-center py-8 px-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 shadow-inner">
                <div className="text-slate-400 text-xs sm:text-sm uppercase tracking-widest font-semibold mb-2">
                  {lang === 'ar' ? 'ما حاصل ضرب:' : 'Calculate the product:'}
                </div>
                <div className="text-5xl sm:text-7xl font-black text-white tracking-wider flex items-center justify-center gap-4">
                  <span className="text-indigo-400">
                    {formatNum(quizQuestions[currentQIndex].a, stats.arabicNumerals)}
                  </span>
                  <span className="text-slate-500">×</span>
                  <span className="text-cyan-400">
                    {formatNum(quizQuestions[currentQIndex].b, stats.arabicNumerals)}
                  </span>
                  <span className="text-slate-600">=</span>
                  <span className="text-amber-400">?</span>
                </div>

                {/* Hint toggle */}
                <div className="mt-4">
                  {!showHint ? (
                    <button
                      onClick={() => {
                        sound.playClick();
                        setShowHint(true);
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-semibold"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{t.hint}</span>
                    </button>
                  ) : (
                    <div className="text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg inline-block mt-1">
                      💡 {quizQuestions[currentQIndex].a} groups of {quizQuestions[currentQIndex].b} (Think:{' '}
                      {quizQuestions[currentQIndex].a} × {(quizQuestions[currentQIndex].b - 1)} + {quizQuestions[currentQIndex].a})
                    </div>
                  )}
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
                {quizQuestions[currentQIndex].options.map((opt, idx) => {
                  const isCorrect = opt === quizQuestions[currentQIndex].correct;
                  const isPicked = selectedOption === opt;

                  let btnStyle = 'bg-slate-950/70 hover:bg-slate-800 text-white border-slate-800';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600/30 text-emerald-200 border-emerald-500 shadow-md shadow-emerald-500/20';
                    } else if (isPicked) {
                      btnStyle = 'bg-rose-600/30 text-rose-200 border-rose-500';
                    } else {
                      btnStyle = 'opacity-40 border-slate-800 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerOption(opt)}
                      className={`py-5 px-4 rounded-xl text-xl sm:text-2xl font-black border transition-all flex items-center justify-center gap-2 ${btnStyle}`}
                    >
                      <span>{formatNum(opt, stats.arabicNumerals)}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isAnswered && isPicked && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Next Button */}
              {isAnswered && (
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4 animate-fade-in">
                  <div className="flex items-center gap-2">
                    {selectedOption === quizQuestions[currentQIndex].correct ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-sm sm:text-base">
                        <CheckCircle2 className="w-5 h-5" />
                        {t.correct} (+25 XP)
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold flex items-center gap-1.5 text-sm sm:text-base">
                        <XCircle className="w-5 h-5" />
                        {t.incorrect} {formatNum(quizQuestions[currentQIndex].a, stats.arabicNumerals)} ×{' '}
                        {formatNum(quizQuestions[currentQIndex].b, stats.arabicNumerals)} ={' '}
                        <span className="underline font-black">
                          {formatNum(quizQuestions[currentQIndex].correct, stats.arabicNumerals)}
                        </span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                  >
                    <span>
                      {currentQIndex + 1 < quizQuestions.length ? t.ttNextQuestion : t.ttQuizFinished}
                    </span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quiz Completed Summary */}
          {quizFinished && (
            <div className="text-center py-10 px-4 space-y-6 max-w-lg mx-auto animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-xl shadow-amber-500/30 animate-bounce">
                <Trophy className="w-10 h-10 text-slate-950" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {t.ttQuizFinished}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {selectedFactor === 0
                    ? t.ttAllFactors
                    : `${t.ttMultiplicationOf} ${formatNum(selectedFactor, stats.arabicNumerals)}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">{t.ttScore}</span>
                  <div className="text-3xl font-black text-amber-400 mt-1">
                    {formatNum(score, stats.arabicNumerals)} / {formatNum(quizQuestions.length, stats.arabicNumerals)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">{t.ttXpEarned}</span>
                  <div className="text-3xl font-black text-emerald-400 mt-1">
                    +{formatNum(score * 25 + (score === 10 ? 100 : 0), stats.arabicNumerals)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  onClick={() => {
                    sound.playClick();
                    generateQuiz(selectedFactor);
                  }}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.ttPlayAgain}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveMode('duel');
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>{t.ttChallengeFriend}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: 10×10 INTERACTIVE VISUAL MATRIX */}
      {activeMode === 'grid' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-indigo-400" />
                <span>{t.ttVisualGrid}</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {t.ttVisualArrayDesc}
              </p>
            </div>

            {/* Currently selected cell callout */}
            <div className="flex items-center gap-3 px-4 py-2 bg-indigo-950/50 border border-indigo-500/30 rounded-xl text-sm font-bold text-indigo-200">
              <span className="text-indigo-400 text-xl font-black">
                {formatNum(gridCell.row, stats.arabicNumerals)} × {formatNum(gridCell.col, stats.arabicNumerals)}
              </span>
              <span className="text-slate-500">=</span>
              <span className="text-amber-400 text-2xl font-black">
                {formatNum(gridCell.row * gridCell.col, stats.arabicNumerals)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* The 10x10 Matrix Table */}
            <div className="lg:col-span-7 overflow-x-auto pb-2">
              <div className="inline-block min-w-full p-2 bg-slate-950/70 rounded-2xl border border-slate-800 shadow-inner">
                <div className="grid grid-cols-11 gap-1 text-center font-bold text-xs sm:text-sm">
                  {/* Top-left corner */}
                  <div className="p-2 text-indigo-400 font-black">×</div>
                  {/* Column headers 1-10 */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                    <div
                      key={c}
                      className={`p-2 rounded-lg font-black ${
                        gridCell.col === c
                          ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
                          : 'text-slate-400 bg-slate-900/50'
                      }`}
                    >
                      {formatNum(c, stats.arabicNumerals)}
                    </div>
                  ))}

                  {/* Rows 1-10 */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
                    <React.Fragment key={r}>
                      {/* Row header */}
                      <div
                        className={`p-2 rounded-lg font-black ${
                          gridCell.row === r
                            ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                            : 'text-slate-400 bg-slate-900/50'
                        }`}
                      >
                        {formatNum(r, stats.arabicNumerals)}
                      </div>

                      {/* Cells */}
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => {
                        const product = r * c;
                        const isSelected = gridCell.row === r && gridCell.col === c;
                        const isHighlighted = r <= gridCell.row && c <= gridCell.col;

                        return (
                          <button
                            key={c}
                            onClick={() => {
                              sound.playClick();
                              setGridCell({ row: r, col: c });
                            }}
                            className={`p-1.5 sm:p-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 font-black scale-110 shadow-lg shadow-amber-500/40 z-10'
                                : isHighlighted
                                ? 'bg-indigo-900/50 text-indigo-200 border border-indigo-500/30'
                                : 'bg-slate-900/30 text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            {formatNum(product, stats.arabicNumerals)}
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Geometric Area Model / Dot Grid */}
            <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t.ttVisualArrayTitle}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {formatNum(gridCell.row, stats.arabicNumerals)} {t.ttArrayRows}{' '}
                  {formatNum(gridCell.col, stats.arabicNumerals)} ={' '}
                  <span className="text-amber-400 font-bold">
                    {formatNum(gridCell.row * gridCell.col, stats.arabicNumerals)}
                  </span>{' '}
                  {t.ttTotalDots}.
                </p>
              </div>

              {/* Render dynamic dots array */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-1.5 max-h-72 overflow-y-auto">
                {Array.from({ length: gridCell.row }).map((_, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-1.5">
                    {Array.from({ length: gridCell.col }).map((_, cIdx) => (
                      <span
                        key={cIdx}
                        className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-sm shadow-indigo-500/40 transform hover:scale-125 transition-transform"
                      ></span>
                    ))}
                  </div>
                ))}
              </div>

              {/* Commutativity & Inverse Division Notes */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>{lang === 'ar' ? 'خاصية الإبدال:' : 'Commutative property:'}</span>
                  <span className="font-mono text-indigo-300 font-bold">
                    {formatNum(gridCell.row, stats.arabicNumerals)} × {formatNum(gridCell.col, stats.arabicNumerals)} ={' '}
                    {formatNum(gridCell.col, stats.arabicNumerals)} × {formatNum(gridCell.row, stats.arabicNumerals)} ={' '}
                    {formatNum(gridCell.row * gridCell.col, stats.arabicNumerals)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>{lang === 'ar' ? 'القسمة العكسية:' : 'Inverse Division:'}</span>
                  <span className="font-mono text-emerald-300 font-bold">
                    {formatNum(gridCell.row * gridCell.col, stats.arabicNumerals)} ÷{' '}
                    {formatNum(gridCell.row, stats.arabicNumerals)} ={' '}
                    {formatNum(gridCell.col, stats.arabicNumerals)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: 60-SECOND SPEED RUN */}
      {activeMode === 'speed' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-center max-w-2xl mx-auto">
          <div>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-3">
              <Clock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white">{t.ttSpeedChallenge}</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {lang === 'ar'
                ? 'كم مسألة ضرب تستطيع حلها في ٦٠ ثانية؟ أسرع لتحصل على نقاط مضاعفة!'
                : 'How many multiplication problems can you solve in 60 seconds? Race the clock!'}
            </p>
          </div>

          {!speedActive ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">{lang === 'ar' ? 'أفضل نتيجة' : 'High Score'}</span>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    {formatNum(speedHighScore, stats.arabicNumerals)}
                  </div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">{lang === 'ar' ? 'الزمن' : 'Time'}</span>
                  <div className="text-2xl font-black text-cyan-400 mt-1">
                    {formatNum(60, stats.arabicNumerals)}s
                  </div>
                </div>
              </div>

              <button
                onClick={startSpeedRun}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 transition-all transform hover:scale-105"
              >
                {lang === 'ar' ? 'ابدأ تحدي الـ ٦٠ ثانية الآن!' : 'Start 60s Speed Run!'}
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Timer Bar */}
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-rose-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 animate-spin" />
                  {formatNum(speedTimeLeft, stats.arabicNumerals)}s remaining
                </span>
                <span className="text-amber-400">
                  {lang === 'ar' ? 'النقاط:' : 'Score:'} {formatNum(speedScore, stats.arabicNumerals)}
                </span>
              </div>

              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000"
                  style={{ width: `${(speedTimeLeft / 60) * 100}%` }}
                ></div>
              </div>

              {/* Speed Question */}
              <div className="py-6 px-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div className="text-5xl sm:text-6xl font-black text-white">
                  {formatNum(speedQuestion.a, stats.arabicNumerals)} ×{' '}
                  {formatNum(speedQuestion.b, stats.arabicNumerals)} = ?
                </div>
              </div>

              {/* 4 Quick Options */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {speedQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSpeedAnswer(opt)}
                    className="py-4 rounded-xl bg-indigo-950/50 hover:bg-indigo-600 border border-indigo-500/30 text-white text-2xl font-black transition-all hover:scale-105"
                  >
                    {formatNum(opt, stats.arabicNumerals)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 4: 1v1 DUEL AGAINST LIVE LEARNER */}
      {activeMode === 'duel' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>{t.liveDuelTitle}</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">{t.liveDuelDesc}</p>
            </div>
          </div>

          {!duelActive ? (
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {lang === 'ar' ? 'اختر منافساً من المتعلمين المتصلين حالياً:' : 'Select a live online learner to challenge:'}
              </span>
              {livePlayers.filter((p) => p.name !== stats.name).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {livePlayers
                    .filter((p) => p.name !== stats.name)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-xl bg-slate-900 border-2 border-emerald-500/80 shadow-md shadow-emerald-500/10 flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{p.avatar}</span>
                          <div>
                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                              <span>{p.name}</span>
                              <span>{p.flag}</span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {p.country[lang]} · {formatNum(p.xp, stats.arabicNumerals)} XP
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => startDuelWith(p)}
                          className="mt-4 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/30 text-xs font-bold transition-colors shadow-md shadow-emerald-600/20"
                        >
                          {lang === 'ar' ? 'تحدَّ الآن (مباشر)' : 'Challenge Live Now'}
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-3">
                  <span className="text-3xl">👥</span>
                  <div className="text-sm font-bold text-white">
                    {lang === 'ar'
                      ? 'أنت المتعلم الوحيد المتصل حالياً!'
                      : 'You are the only learner live right now!'}
                  </div>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {lang === 'ar'
                      ? 'افتح الموقع في نافذة تصفح أخرى أو شارك الرابط مع صديق ليبدأ تحدي الـ ١ ضد ١ فوراً.'
                      : 'Open this website in a second browser window or share the link with a classmate to duel in real-time!'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => startDuelWith(defaultAiOpponent)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <span>🤖</span>
                      <span>{lang === 'ar' ? 'تحدَّ المعلم الذكي الآن' : 'Practice Duel with AI Mentor'}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          navigator.clipboard.writeText(window.location.href);
                          sound.playClick();
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{lang === 'ar' ? 'نسخ رابط الموقع للمنافسة' : 'Copy Link to Duel a Friend'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : !duelFinished ? (
            <div className="space-y-6 max-w-xl mx-auto text-center animate-fade-in">
              {/* Head-to-Head Banner */}
              <div className="flex items-center justify-between p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{stats.avatar}</span>
                  <div className="text-left rtl:text-right">
                    <div className="text-xs font-bold text-white">{stats.name}</div>
                    <div className="text-lg font-black text-cyan-400">
                      {formatNum(userDuelScore, stats.arabicNumerals)}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-black text-amber-400 px-3 py-1 bg-amber-950/40 rounded-full border border-amber-500/30">
                  VS · {lang === 'ar' ? 'الجولة' : 'Round'} {formatNum(duelRound + 1, stats.arabicNumerals)}/5
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right rtl:text-left">
                    <div className="text-xs font-bold text-white">{opponent.name} {opponent.flag}</div>
                    <div className="text-lg font-black text-rose-400">
                      {formatNum(oppDuelScore, stats.arabicNumerals)}
                    </div>
                  </div>
                  <span className="text-2xl">{opponent.avatar}</span>
                </div>
              </div>

              {/* Problem */}
              <div className="py-6 px-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div className="text-4xl sm:text-5xl font-black text-white">
                  {formatNum(duelQuestion.a, stats.arabicNumerals)} ×{' '}
                  {formatNum(duelQuestion.b, stats.arabicNumerals)} = ?
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                {duelQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleDuelAnswer(opt)}
                    className="py-4 rounded-xl bg-slate-950/90 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-white text-xl font-black transition-all"
                  >
                    {formatNum(opt, stats.arabicNumerals)}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-5 max-w-md mx-auto animate-fade-in">
              <div className="text-5xl">
                {userDuelScore > oppDuelScore ? '🏆' : userDuelScore === oppDuelScore ? '🤝' : '💪'}
              </div>
              <h3 className="text-2xl font-black text-white">
                {userDuelScore > oppDuelScore
                  ? t.liveDuelWon
                  : userDuelScore === oppDuelScore
                  ? t.liveDuelDraw
                  : t.liveDuelLost}
              </h3>
              <p className="text-slate-400 text-sm">
                {stats.name}: {formatNum(userDuelScore, stats.arabicNumerals)} | {opponent.name}:{' '}
                {formatNum(oppDuelScore, stats.arabicNumerals)}
              </p>
              <button
                onClick={() => setDuelActive(false)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors"
              >
                {lang === 'ar' ? 'العودة لقائمة التحديات' : 'Back to Duel Lobby'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
