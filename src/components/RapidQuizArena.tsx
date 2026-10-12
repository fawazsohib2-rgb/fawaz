import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Flame,
  Award,
  ChevronRight,
  Brain,
  Zap,
  Play
} from 'lucide-react';
import { UserStats, Language, RapidQuizChallenge } from '../types';
import { rapidQuizChallenges } from '../data/mathCurriculum';
import { translations, formatNum, getLoc, getLocArr } from '../utils/translations';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface RapidQuizArenaProps {
  stats: UserStats;
  lang: Language;
  onAddXp: (amount: number, reason: string) => void;
  onIncrementSolved: () => void;
  onMissionAction?: (category: 'timestable' | 'speed' | 'quiz' | 'ai' | 'video' | 'general', count?: number) => void;
  onSelectTab: (tab: string) => void;
}

export const RapidQuizArena: React.FC<RapidQuizArenaProps> = ({
  stats,
  lang,
  onAddXp,
  onIncrementSolved,
  onMissionAction,
  onSelectTab,
}) => {
  const t = translations[lang];

  const [activeCategory, setActiveCategory] = useState<RapidQuizChallenge>(rapidQuizChallenges[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(30);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer helper
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Start question timer
  const startTimer = () => {
    clearTimer();
    setTimer(30);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearTimer();
          // Timeout counts as incorrect answer
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOpt(-1);
    sound.playWrong();
  };

  const startQuiz = (category: RapidQuizChallenge) => {
    sound.playClick();
    setActiveCategory(category);
    setIsPlaying(true);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setShowHint(false);
    setIsComplete(false);
    startTimer();
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    clearTimer();
    setSelectedOpt(idx);
    setIsAnswered(true);

    const currQ = activeCategory.questions[currentIdx];
    if (idx === currQ.correctIndex) {
      sound.playCorrect();
      setScore((s) => s + 1);
      onAddXp(30, `${getLoc(activeCategory.title, lang)} Q${currentIdx + 1}`);
      onIncrementSolved();
      onMissionAction?.('quiz', 1);
      onMissionAction?.('general', 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx + 1 < activeCategory.questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setShowHint(false);
      startTimer();
    } else {
      clearTimer();
      setIsComplete(true);
      onMissionAction?.('quiz', 1);
      const masteryRatio = (score + (selectedOpt === activeCategory.questions[currentIdx].correctIndex ? 1 : 0)) / activeCategory.questions.length;
      if (masteryRatio >= 0.8) {
        sound.playLevelUp();
        triggerConfetti();
        onAddXp(120, `${getLoc(activeCategory.title, lang)} Mastery Bonus`);
      }
    }
  };

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const currentQ = activeCategory.questions[currentIdx];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full max-w-full">
      {/* Hero Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.tabQuizzes}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{t.authorCredit}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.quizArenaTitle}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {t.quizArenaSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => startQuiz(activeCategory)}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>{t.startQuickQuizBtn}</span>
            </button>
          </div>
        </div>

        {/* Categories Selector Carousel / Grid */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {t.quizCategorySelect}
            </span>
            <span className="text-xs text-indigo-400 font-medium">
              {formatNum(rapidQuizChallenges.length, stats.arabicNumerals)} {t.tabQuizzes}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {rapidQuizChallenges.map((cat) => {
              const isSelected = activeCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveCategory(cat);
                    if (isPlaying) {
                      startQuiz(cat);
                    }
                  }}
                  className={`p-3 sm:p-4 rounded-2xl text-left transition-all border flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500/70 shadow-lg shadow-indigo-500/10 scale-[1.02]'
                      : 'bg-slate-950/60 hover:bg-slate-900 border-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{cat.icon}</span>
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    ></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                      {getLoc(cat.title, lang)}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {getLoc(cat.badge, lang)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* QUIZ INTERACTIVE VIEW */}
      {isPlaying && !isComplete && currentQ && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 relative shadow-2xl overflow-hidden">
          {/* Header Stats */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeCategory.icon}</span>
              <div>
                <h2 className="font-black text-sm sm:text-base text-white">
                  {getLoc(activeCategory.title, lang)}
                </h2>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>
                    {t.ttQuestionOf} {formatNum(currentIdx + 1, stats.arabicNumerals)} / {formatNum(activeCategory.questions.length, stats.arabicNumerals)}
                  </span>
                  <span>·</span>
                  <span className="text-emerald-400 font-bold">
                    {t.ttScore}: {formatNum(score, stats.arabicNumerals)}
                  </span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
                timer <= 5 
                  ? 'bg-rose-950/50 border-rose-500 text-rose-400 animate-pulse' 
                  : 'bg-slate-950/80 border-slate-800 text-slate-300'
              }`}>
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatNum(timer, stats.arabicNumerals)}s</span>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setShowHint((prev) => !prev);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-amber-400 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.hint}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden my-5 border border-slate-800/80">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 transition-all duration-300"
              style={{
                width: `${((currentIdx + 1) / activeCategory.questions.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Question Text */}
          <div className="my-6 text-center space-y-3">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {getLoc(currentQ.question, lang)}
            </h3>

            {showHint && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm animate-fade-in text-left">
                <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>{getLoc(currentQ.hint, lang)}</span>
              </div>
            )}
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto my-6">
            {getLocArr(currentQ.options, lang).map((optionText, oIdx) => {
              const isSelected = selectedOpt === oIdx;
              const isCorrectOpt = oIdx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-950/70 hover:bg-slate-800 border-slate-800 text-slate-200';

              if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 font-bold ring-2 ring-rose-500/30';
                } else {
                  btnStyle = 'opacity-40 bg-slate-950/40 border-slate-900 text-slate-500';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-sm sm:text-base font-semibold transition-all flex items-center justify-between gap-3 text-left ${btnStyle} active:scale-95`}
                >
                  <span className="font-mono">{optionText}</span>
                  {isAnswered && (
                    <span>
                      {isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isSelected && !isCorrectOpt && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="max-w-2xl mx-auto my-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 animate-fade-in">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <Brain className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-indigo-300 block">{t.explanation}:</span>
                  <p className="text-slate-300 leading-relaxed">
                    {getLoc(currentQ.explanation, lang)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Control */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-800">
            {isAnswered ? (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>{currentIdx + 1 < activeCategory.questions.length ? t.ttNextQuestion : t.quizCompletedTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs text-slate-500 italic">
                {lang === 'ar' ? 'اختر الإجابة للمتابعة' : 'Select an answer to reveal explanation'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* QUIZ COMPLETION SUMMARY */}
      {isPlaying && isComplete && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl max-w-xl mx-auto animate-scale-up">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20">
            🏆
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t.quizCompletedTitle}
            </h2>
            <p className="text-sm text-slate-400">
              {getLoc(activeCategory.title, lang)}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-around">
            <div>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {formatNum(score, stats.arabicNumerals)} / {formatNum(activeCategory.questions.length, stats.arabicNumerals)}
              </span>
              <span className="text-[11px] text-slate-400 block">{t.ttScore}</span>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <span className="text-2xl font-black text-amber-400 font-mono">
                +{formatNum(score * 30 + (score === 5 ? 120 : 0), stats.arabicNumerals)} XP
              </span>
              <span className="text-[11px] text-slate-400 block">{t.ttXpEarned}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => startQuiz(activeCategory)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.ttPlayAgain}</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setIsPlaying(false);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-colors"
            >
              <span>{t.quizCategorySelect}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUIZ CARDS GRID PREVIEW (when not in a quiz) */}
      {!isPlaying && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rapidQuizChallenges.map((cat) => (
            <div
              key={cat.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span 
                    className="text-xs font-bold px-2.5 py-1 rounded-full border text-white font-mono"
                    style={{ backgroundColor: `${cat.color}20`, borderColor: `${cat.color}50` }}
                  >
                    {getLoc(cat.badge, lang)}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-indigo-300 transition-colors">
                    {getLoc(cat.title, lang)}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                    {getLoc(cat.description, lang)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {formatNum(cat.questions.length, stats.arabicNumerals)} {lang === 'ar' ? 'أسئلة سريعة' : 'Questions'}
                </span>

                <button
                  onClick={() => startQuiz(cat)}
                  className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.quizStartCategoryBtn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
