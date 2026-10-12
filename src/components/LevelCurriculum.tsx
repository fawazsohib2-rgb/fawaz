import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Video, 
  Sparkles, 
  Lightbulb, 
  RotateCcw,
  HelpCircle,
  XCircle,
  Trophy
} from 'lucide-react';
import { UserStats, Language, MathLevelData, QuizQuestion } from '../types';
import { mathLevels } from '../data/mathCurriculum';
import { translations, formatNum, getLoc, getLocArr } from '../utils/translations';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface LevelCurriculumProps {
  stats: UserStats;
  lang: Language;
  onAddXp: (amount: number, reason: string) => void;
  onSelectTab: (tab: string) => void;
  onIncrementSolved: () => void;
  onMissionAction?: (category: 'timestable' | 'speed' | 'quiz' | 'ai' | 'video' | 'general', count?: number) => void;
}

export const LevelCurriculum: React.FC<LevelCurriculumProps> = ({
  stats,
  lang,
  onAddXp,
  onSelectTab,
  onIncrementSolved,
  onMissionAction,
}) => {
  const t = translations[lang];

  // Active Level inspection
  const [selectedLevelId, setSelectedLevelId] = useState<string>('level-1');
  const activeLevel = mathLevels.find((l) => l.id === selectedLevelId) || mathLevels[0];

  // Level Quiz Modal/View State
  const [inQuizMode, setInQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const startLevelQuiz = () => {
    sound.playClick();
    setInQuizMode(true);
    setQuizIdx(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizComplete(false);
  };

  const handleAnswerQuestion = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optIdx);
    setIsAnswered(true);

    const q = activeLevel.quiz[quizIdx];
    if (optIdx === q.correctIndex) {
      sound.playCorrect();
      setQuizScore((s) => s + 1);
      onAddXp(25, `${activeLevel.title.en} Quiz`);
      onIncrementSolved();
      onMissionAction?.('quiz', 1);
      onMissionAction?.('general', 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuizQuestion = () => {
    sound.playClick();
    if (quizIdx + 1 < activeLevel.quiz.length) {
      setQuizIdx((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
      onMissionAction?.('quiz', 1);
      if (quizScore + 1 >= activeLevel.quiz.length) {
        sound.playLevelUp();
        triggerConfetti();
        onAddXp(100, `Level ${activeLevel.number} Mastery Bonus`);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>{t.levelsHeader}</span>
              <span>·</span>
              <span className="text-slate-400">{t.authorCredit}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.levelsHeader}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              {t.levelsSubheader}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl self-start md:self-auto">
            <span className="text-3xl">🏆</span>
            <div>
              <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'مستواك الحالي' : 'Your Math Rank'}</span>
              <span className="text-sm font-black text-white">
                {t.levelLabel} {formatNum(stats.level, stats.arabicNumerals)} · {getLoc(mathLevels[Math.min(stats.level - 1, mathLevels.length - 1)].badgeName, lang)}
              </span>
            </div>
          </div>
        </div>

        {/* Level Progression Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 mt-6 border-t border-slate-800">
          {mathLevels.map((lvl) => {
            const isUnlocked = stats.xp >= lvl.requiredXp;
            const isSelected = selectedLevelId === lvl.id;

            return (
              <button
                key={lvl.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedLevelId(lvl.id);
                  setInQuizMode(false);
                }}
                className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20 text-white'
                    : isUnlocked
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                    : 'bg-slate-950/40 border-slate-800/40 opacity-60 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">
                    L{formatNum(lvl.number, stats.arabicNumerals)}
                  </span>
                  {isUnlocked ? (
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>
                <div className="mt-2">
                  <div className="text-xs font-extrabold truncate text-white">
                    {getLoc(lvl.subtitle, lang)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {lvl.requiredXp === 0
                      ? (lang === 'ar' ? 'مفتوح' : 'Starter')
                      : `${formatNum(lvl.requiredXp, stats.arabicNumerals)} XP`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Level Inspection & Topic Lessons */}
      {!inQuizMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Topics Breakdown */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                  {t.levelLabel} {formatNum(activeLevel.number, stats.arabicNumerals)}
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{getLoc(activeLevel.badgeName, lang)}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {getLoc(activeLevel.title, lang)}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {getLoc(activeLevel.description, lang)}
              </p>
            </div>

            {/* Topics in this Level */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                {t.levelTopics} ({formatNum(activeLevel.topics.length, stats.arabicNumerals)})
              </h3>

              <div className="space-y-4">
                {activeLevel.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-sm"
                  >
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>{getLoc(topic.title, lang)}</span>
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                        {getLoc(topic.summary, lang)}
                      </p>
                    </div>

                    {/* Key Formula / Core Rule Box */}
                    <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs sm:text-sm text-indigo-200 flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300 mr-1.5">{t.levelKeyRule}:</span>
                        <span>{getLoc(topic.keyRule, lang)}</span>
                      </div>
                    </div>

                    {/* Step-by-Step Example */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        {t.levelExample}: {getLoc(topic.example.problem, lang)}
                      </span>

                      <div className="space-y-1.5 pl-3 rtl:pl-0 rtl:pr-3 border-l-2 rtl:border-l-0 rtl:border-r-2 border-indigo-500/50">
                        {getLocArr(topic.example.steps, lang).map((step, sIdx) => (
                          <div key={sIdx} className="text-xs text-slate-300">
                            • {step}
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-xs font-bold text-emerald-400">
                        ✓ {t.aiFinalAnswer}: {getLoc(topic.example.answer, lang)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Level Actions & Quiz CTA */}
          <div className="lg:col-span-4 space-y-4">
            {/* Take Level Quiz Card */}
            <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                {lang === 'ar' ? 'تحدي إتقان المستوى' : 'Level Mastery Quiz'}
              </span>
              <h3 className="text-lg font-black text-white">
                {lang === 'ar' ? 'اختبر معلوماتك وتخطَّ المستوى' : 'Prove Your Skills & Earn XP'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'ar'
                  ? 'أجب عن أسئلة هذا المستوى لتحصل على مكافأة خبرة مميزة وشارة التميز الخاصة به.'
                  : 'Take the comprehensive multi-choice quiz to unlock mastery rewards and badges.'}
              </p>

              <button
                onClick={startLevelQuiz}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>{t.levelStartQuiz}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            {/* Watch Level Video Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.levelWatchLesson}</h4>
                  <span className="text-xs text-slate-400">
                    {activeLevel.videoLesson.duration} · {activeLevel.videoLesson.topic[lang]}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('videos');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
              >
                {t.videoWatchNow}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* LEVEL QUIZ ACTIVE SCREEN */
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
          {!quizComplete ? (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs text-slate-400 font-semibold">
                  {t.ttQuestionOf} {formatNum(quizIdx + 1, stats.arabicNumerals)} /{' '}
                  {formatNum(activeLevel.quiz.length, stats.arabicNumerals)}
                </span>
                <span className="text-xs font-bold text-amber-400">
                  {t.ttScore}: {formatNum(quizScore, stats.arabicNumerals)}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                  {getLoc(activeLevel.title, lang)}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {getLoc(activeLevel.quiz[quizIdx].question, lang)}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {getLocArr(activeLevel.quiz[quizIdx].options, lang).map((opt, optIdx) => {
                  const isCorrect = optIdx === activeLevel.quiz[quizIdx].correctIndex;
                  const isPicked = selectedOption === optIdx;

                  let style = 'bg-slate-950/70 hover:bg-slate-800 text-slate-200 border-slate-800';
                  if (isAnswered) {
                    if (isCorrect) style = 'bg-emerald-600/30 text-emerald-200 border-emerald-500';
                    else if (isPicked) style = 'bg-rose-600/30 text-rose-200 border-rose-500';
                    else style = 'opacity-40 border-slate-800 text-slate-500';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerQuestion(optIdx)}
                      className={`w-full p-4 rounded-xl text-left rtl:text-right font-bold text-sm sm:text-base border transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isAnswered && isPicked && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fade-in">
                  <div className="text-xs font-bold">
                    {selectedOption === activeLevel.quiz[quizIdx].correctIndex ? (
                      <span className="text-emerald-400">{t.correct} (+25 XP)</span>
                    ) : (
                      <span className="text-rose-400">{t.incorrect}</span>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {getLoc(activeLevel.quiz[quizIdx].explanation, lang)}
                  </p>
                  <button
                    onClick={handleNextQuizQuestion}
                    className="mt-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    {quizIdx + 1 < activeLevel.quiz.length ? t.ttNextQuestion : t.ttQuizFinished}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl">
                🏆
              </div>
              <h3 className="text-2xl font-black text-white">{t.ttQuizFinished}</h3>
              <p className="text-slate-300 text-sm">
                {t.ttScore}: {formatNum(quizScore, stats.arabicNumerals)} /{' '}
                {formatNum(activeLevel.quiz.length, stats.arabicNumerals)}
              </p>
              <button
                onClick={() => setInQuizMode(false)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors"
              >
                {lang === 'ar' ? 'العودة للمنهج' : 'Return to Curriculum'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
