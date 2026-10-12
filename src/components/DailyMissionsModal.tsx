import React, { useState, useEffect } from 'react';
import { 
  X, 
  Target, 
  Flame, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Gift
} from 'lucide-react';
import { DailyMission, UserStats, Language } from '../types';
import { translations, formatNum, getLoc } from '../utils/translations';
import { sound } from '../utils/audio';

interface DailyMissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  missions: DailyMission[];
  stats: UserStats;
  lang: Language;
  onSelectTab: (tab: string) => void;
}

export const DailyMissionsModal: React.FC<DailyMissionsModalProps> = ({
  isOpen,
  onClose,
  missions,
  stats,
  lang,
  onSelectTab,
}) => {
  const t = translations[lang];

  // Calculate live countdown to midnight reset
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diffMs = Math.max(0, tomorrow.getTime() - now.getTime());
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const completedCount = missions.filter((m) => m.completed).length;
  const allCompleted = completedCount === missions.length && missions.length > 0;

  const getTabForCategory = (cat: DailyMission['category']) => {
    switch (cat) {
      case 'timestable':
      case 'speed':
        return 'timestable';
      case 'quiz':
        return 'quizzes';
      case 'ai':
        return 'aihelper';
      case 'video':
        return 'videos';
      case 'general':
      default:
        return 'curriculum';
    }
  };

  const handleActionClick = (category: DailyMission['category']) => {
    sound.playClick();
    onSelectTab(getTabForCategory(category));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overscroll-contain">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[88dvh] overflow-y-auto shadow-2xl p-4 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>{t.dailyMissionsTitle}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-600/30 text-indigo-300 font-bold border border-indigo-500/30 font-mono">
                  {formatNum(completedCount, stats.arabicNumerals)}/{formatNum(missions.length, stats.arabicNumerals)}
                </span>
              </h2>
              <span className="text-[11px] text-indigo-400 font-semibold">{t.authorCredit}</span>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Reset Countdown & Explanation */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-300">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <div className="flex items-center gap-1.5">
                <span>{t.dailyMissionsResetIn}:</span>
                <strong className="text-amber-400 font-mono font-black">
                  {formatNum(timeLeft.hours, stats.arabicNumerals)}h {formatNum(timeLeft.minutes, stats.arabicNumerals)}m {formatNum(timeLeft.seconds, stats.arabicNumerals)}s
                </strong>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {lang === 'ar' ? 'تتجدد المهام يومياً عند الساعة 00:00 منتصف الليل' : 'Resets daily every night at 00:00 midnight'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-bold text-amber-400 self-end sm:self-auto shrink-0 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
            <Gift className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>+100 XP & +1 {t.streakLabel}</span>
          </div>
        </div>

        {/* All Missions Done Callout */}
        {allCompleted && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 flex items-center gap-3 animate-fade-in shadow-lg shadow-emerald-500/10">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-emerald-300">
                {t.dailyMissionsBonusEarned}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {t.dailyMissionsAllDone}
              </p>
            </div>
          </div>
        )}

        {/* Missions List */}
        <div className="space-y-3">
          {missions.map((mission) => {
            const percent = Math.min(
              100,
              Math.round((mission.currentCount / mission.targetCount) * 100)
            );

            return (
              <div
                key={mission.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                  mission.completed
                    ? 'bg-slate-950/40 border-emerald-500/30 opacity-90'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-800 shrink-0">
                      {mission.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-white">
                          {getLoc(mission.title, lang)}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {getLoc(mission.description, lang)}
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    {mission.completed ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.dailyMissionComplete}</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleActionClick(mission.category)}
                        className="flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/30 font-bold text-xs transition-colors"
                      >
                        <span>GO</span>
                        <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar & Rewards */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                      <span>{t.dailyMissionsProgress}</span>
                      <span className="font-mono text-slate-200">
                        {formatNum(mission.currentCount, stats.arabicNumerals)} /{' '}
                        {formatNum(mission.targetCount, stats.arabicNumerals)}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-500 ${
                          mission.completed
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                        }`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* XP & Streak Reward Badges */}
                  <div className="flex items-center gap-2 shrink-0 text-xs font-bold">
                    <span className="text-amber-400 font-mono">+{formatNum(mission.xpReward, stats.arabicNumerals)} XP</span>
                    <span className="text-orange-400 flex items-center gap-0.5">
                      <Flame className="w-3 h-3 fill-orange-400" />
                      +{formatNum(mission.streakReward, stats.arabicNumerals)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
