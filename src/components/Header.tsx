import React, { useState, useRef, useEffect } from 'react';
import { Flame, Trophy, Sparkles, Volume2, VolumeX, Palette, Award, Users, Globe2, Compass, HelpCircle, Target, Crown, Edit3, User, Check } from 'lucide-react';
import { UserStats, Language } from '../types';
import { translations, formatNum } from '../utils/translations';
import { sound } from '../utils/audio';

interface HeaderProps {
  stats: UserStats;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCustomizer: () => void;
  onOpenCertificate: () => void;
  onOpenIntro: () => void;
  onOpenDailyMissions: () => void;
  onOpenNameModal?: () => void;
  missionsCompletedCount: number;
  missionsTotalCount: number;
  onToggleSound: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  liveCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  lang,
  onLanguageChange,
  onOpenCustomizer,
  onOpenCertificate,
  onOpenIntro,
  onOpenDailyMissions,
  onOpenNameModal,
  missionsCompletedCount,
  missionsTotalCount,
  onToggleSound,
  activeTab,
  onSelectTab,
  liveCount,
}) => {
  const t = translations[lang];
  const isRTL = lang === 'ar';
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Brand, Stats, Controls */}
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Fawaz Alokla Credit */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onSelectTab('curriculum');
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl font-black text-white">∑</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-lg text-white tracking-tight">
                    {t.appTitle}
                  </span>
                  <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                    {t.authorCredit}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:block">
                  {t.tagline}
                </span>
              </div>
            </button>
          </div>

          {/* Gamification Bar: Streak, XP, Level */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Streak Flame */}
            <div
              title={t.streakTooltip}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-950/40 border border-orange-500/30 text-orange-400 font-bold text-xs sm:text-sm shadow-inner"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{formatNum(stats.streak, stats.arabicNumerals)}</span>
              <span className="hidden md:inline text-[11px] font-normal text-orange-300/80">
                {t.streakLabel}
              </span>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{formatNum(stats.xp, stats.arabicNumerals)}</span>
              <span className="text-[11px] font-normal text-amber-400/80">{t.xpLabel}</span>
            </div>

            {/* Current Level */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 font-semibold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {t.levelLabel} {formatNum(stats.level, stats.arabicNumerals)}
              </span>
            </div>

            {/* Live Learners Count Button */}
            <button
              onClick={() => {
                sound.playClick();
                onSelectTab('live');
              }}
              title={t.livePlayersOnline}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'live'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-emerald-950/30 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-900/40'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Users className="w-3.5 h-3.5" />
              <span className="font-bold">{formatNum(liveCount, stats.arabicNumerals)}</span>
              <span className="hidden xl:inline text-[11px] font-normal">{t.livePlayersOnline}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                sound.playClick();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
              title={stats.soundEnabled ? t.soundOn : t.soundOff}
            >
              {stats.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Daily Missions Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenDailyMissions();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold text-xs transition-all shadow-sm"
              title={t.dailyMissionsTitle}
            >
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{t.dailyMissionsBtn}</span>
              <span className="px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                {formatNum(missionsCompletedCount, stats.arabicNumerals)}/{formatNum(missionsTotalCount, stats.arabicNumerals)}
              </span>
            </button>

            {/* How to Use / Intro Guide */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenIntro();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 font-bold text-xs transition-all shadow-sm"
              title={t.tourBtn}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">{t.tourBtn}</span>
            </button>

            {/* Certificate of Fawaz Alokla */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 border border-amber-500/30 transition-colors"
              title={t.certificateDownload}
            >
              <Award className="w-4 h-4" />
            </button>

            {/* Learner Name & Profile Badge */}
            <button
              onClick={() => {
                sound.playClick();
                if (onOpenNameModal) onOpenNameModal();
                else onOpenCustomizer();
              }}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors shadow-sm"
              title={t.changeName}
            >
              <span className="text-sm">{stats.avatar}</span>
              <span className="text-xs font-bold text-white flex items-center gap-1 max-w-[120px] truncate">
                {(stats.isCreator || stats.name?.toLowerCase() === 'fawaz alokla') && (
                  <Crown className="w-3 h-3 text-amber-400 shrink-0" />
                )}
                <span className="truncate">{stats.name || 'Learner'}</span>
              </span>
              <Edit3 className="w-3 h-3 text-indigo-400 hidden sm:inline opacity-70 hover:opacity-100" />
            </button>

            {/* Aesthetic Customizer */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenCustomizer();
              }}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors hidden sm:flex items-center justify-center"
              title={t.customize}
            >
              <Palette className="w-3.5 h-3.5 text-indigo-400" />
            </button>

            {/* 4-Language Switcher (EN, AR, ES, FR) - Touch & Click Friendly for iPad & Mobile */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsLangMenuOpen((prev) => !prev);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-bold text-xs transition-all touch-manipulation cursor-pointer ${
                  isLangMenuOpen
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                    : 'bg-indigo-600/20 hover:bg-indigo-600/30 border-indigo-500/30 text-indigo-300'
                }`}
                title="Change language / تغيير اللغة / Cambiar idioma / Changer de langue"
                aria-expanded={isLangMenuOpen}
              >
                <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
                <span className="uppercase">{lang}</span>
                <span className={`text-[10px] opacity-70 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Language Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 py-1.5 w-40 bg-slate-900/98 backdrop-blur-xl rounded-xl border border-slate-700/80 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onLanguageChange('en');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left rtl:text-right text-xs flex items-center justify-between hover:bg-indigo-600/25 active:bg-indigo-600/40 transition-colors touch-manipulation cursor-pointer ${
                      lang === 'en' ? 'text-indigo-300 font-bold bg-indigo-950/50' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">🇺🇸</span>
                      <span>English</span>
                    </span>
                    {lang === 'en' && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onLanguageChange('ar');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left rtl:text-right text-xs flex items-center justify-between hover:bg-indigo-600/25 active:bg-indigo-600/40 transition-colors touch-manipulation cursor-pointer ${
                      lang === 'ar' ? 'text-indigo-300 font-bold bg-indigo-950/50' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">🇸🇦</span>
                      <span>العربية</span>
                    </span>
                    {lang === 'ar' && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onLanguageChange('es');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left rtl:text-right text-xs flex items-center justify-between hover:bg-indigo-600/25 active:bg-indigo-600/40 transition-colors touch-manipulation cursor-pointer ${
                      lang === 'es' ? 'text-indigo-300 font-bold bg-indigo-950/50' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">🇪🇸</span>
                      <span>Español</span>
                    </span>
                    {lang === 'es' && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onLanguageChange('fr');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left rtl:text-right text-xs flex items-center justify-between hover:bg-indigo-600/25 active:bg-indigo-600/40 transition-colors touch-manipulation cursor-pointer ${
                      lang === 'fr' ? 'text-indigo-300 font-bold bg-indigo-950/50' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">🇫🇷</span>
                      <span>Français</span>
                    </span>
                    {lang === 'fr' && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar text-xs sm:text-sm font-medium border-t border-slate-800/50">
          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('curriculum');
            }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'curriculum'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>📚</span>
            <span>{t.tabCurriculum}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('timestable');
            }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-2 relative ${
              activeTab === 'timestable'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>⚡</span>
            <span>{t.tabTimesTable}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('aihelper');
            }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'aihelper'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>🧠</span>
            <span>{t.tabAiHelper}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('videos');
            }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'videos'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>🎬</span>
            <span>{t.tabVideos}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('live');
            }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'live'
                ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>🌍</span>
            <span>{t.tabLivePlayers}</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-bold">
              {formatNum(liveCount, stats.arabicNumerals)}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
