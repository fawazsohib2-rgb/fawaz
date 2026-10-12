import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  XCircle, 
  Award,
  Video
} from 'lucide-react';
import { UserStats, Language, VideoLesson } from '../types';
import { mathLevels } from '../data/mathCurriculum';
import { translations, formatNum } from '../utils/translations';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface VideoClassroomProps {
  stats: UserStats;
  lang: Language;
  onAddXp: (amount: number, reason: string) => void;
  onIncrementSolved: () => void;
  onMissionAction?: (category: 'timestable' | 'speed' | 'quiz' | 'ai' | 'video' | 'general', count?: number) => void;
}

export const VideoClassroom: React.FC<VideoClassroomProps> = ({
  stats,
  lang,
  onAddXp,
  onIncrementSolved,
  onMissionAction,
}) => {
  const t = translations[lang];

  // Currently active video lesson index
  const [selectedLevelIdx, setSelectedLevelIdx] = useState(0);
  const currentLevel = mathLevels[selectedLevelIdx];
  const video = currentLevel.videoLesson;

  // Mini-quiz question state
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  const handleSelectLevel = (idx: number) => {
    sound.playClick();
    setSelectedLevelIdx(idx);
    setActiveQuestionIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
  };

  const handleAnswerPractice = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
    setIsAnswered(true);

    const question = video.practiceQuestions[activeQuestionIdx];
    if (optIdx === question.correctIndex) {
      sound.playCorrect();
      onAddXp(50, `Completed video practice for ${video.title.en}`);
      onIncrementSolved();
      onMissionAction?.('video', 1);
      onMissionAction?.('general', 1);
      if (!completedVideos.includes(video.id)) {
        setCompletedVideos([...completedVideos, video.id]);
        triggerConfetti();
      }
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Video className="w-4 h-4 text-cyan-400" />
            <span>{t.videoHeader}</span>
            <span>·</span>
            <span className="text-slate-400">{t.authorCredit}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.videoHeader}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            {t.videoSubheader}
          </p>

          {/* Level Video Selectors */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-6 mt-6 border-t border-slate-800">
            {mathLevels.map((lvl, idx) => {
              const isSelected = selectedLevelIdx === idx;
              const isWatched = completedVideos.includes(lvl.videoLesson.id);

              return (
                <button
                  key={lvl.id}
                  onClick={() => handleSelectLevel(idx)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                      : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {t.levelLabel} {formatNum(lvl.number, stats.arabicNumerals)}: {lvl.subtitle[lang]}
                  </span>
                  {isWatched && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Video & Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Embedded Video & Takeaways */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* 16:9 Responsive Video Embed Container */}
            <div className="relative w-full pt-[56.25%] bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={video.videoUrl}
                title={video.title[lang]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Meta Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-indigo-400 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/30">
                  {currentLevel.title[lang]}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{t.videoDuration}: {formatNum(video.duration, stats.arabicNumerals)}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white">
                {video.title[lang]}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                {video.summary[lang]}
              </p>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.videoKeyPoints}</span>
            </h3>

            <ul className="space-y-2.5">
              {video.keyPoints[lang].map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {formatNum(idx + 1, stats.arabicNumerals)}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: "Test What You Learned" Immediate Quiz */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              {t.videoTestYourself}
            </span>
            <h3 className="text-lg font-black text-white">
              {lang === 'ar' ? 'اختبر فهمك لمسألة الفيديو' : 'Mastery Checkpoint'}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {lang === 'ar' ? 'حل المسألة التالية لاختبار ما تعلمته فوراً واكسب +٥٠ نقطة خبرة!' : 'Answer this problem to lock in the concept and gain +50 XP!'}
            </p>
          </div>

          {video.practiceQuestions[activeQuestionIdx] && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-indigo-400 font-semibold block mb-1">
                  {lang === 'ar' ? 'المسألة:' : 'Problem:'}
                </span>
                <p className="text-base font-bold text-white">
                  {video.practiceQuestions[activeQuestionIdx].question[lang]}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {video.practiceQuestions[activeQuestionIdx].options[lang].map((opt, optIdx) => {
                  const isCorrect = optIdx === video.practiceQuestions[activeQuestionIdx].correctIndex;
                  const isPicked = selectedOpt === optIdx;

                  let btnStyle = 'bg-slate-950/70 hover:bg-slate-800 text-slate-200 border-slate-800';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600/30 text-emerald-200 border-emerald-500';
                    } else if (isPicked) {
                      btnStyle = 'bg-rose-600/30 text-rose-200 border-rose-500';
                    } else {
                      btnStyle = 'opacity-40 border-slate-800 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerPractice(optIdx)}
                      className={`w-full p-3.5 rounded-xl text-left rtl:text-right font-bold text-sm border transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {isAnswered && isPicked && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Hint */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 animate-fade-in">
                  <div className="font-bold text-sm">
                    {selectedOpt === video.practiceQuestions[activeQuestionIdx].correctIndex ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        {t.correct} (+50 XP)
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" />
                        {t.incorrect}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {video.practiceQuestions[activeQuestionIdx].explanation[lang]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
