import React, { useState } from 'react';
import { 
  Users, 
  Globe2, 
  Flame, 
  Trophy, 
  Swords, 
  Radio, 
  CheckCircle2, 
  Sparkles,
  Zap,
  UserCheck,
  RefreshCw,
  Signal,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { UserStats, Language, LivePlayer } from '../types';
import { translations, formatNum } from '../utils/translations';
import { sound } from '../utils/audio';

interface LivePlayersLobbyProps {
  stats: UserStats;
  lang: Language;
  onSelectTab: (tab: string) => void;
  liveCount: number;
  realCount: number;
  players: LivePlayer[];
  currentClientId: string;
  liveStreamEvents: Array<{ id: string; text: string; time: string; icon: string }>;
  onRefreshLive?: () => void;
  onOpenNameModal?: () => void;
}

export const LivePlayersLobby: React.FC<LivePlayersLobbyProps> = ({
  stats,
  lang,
  onSelectTab,
  liveCount,
  realCount,
  players,
  currentClientId,
  liveStreamEvents,
  onRefreshLive,
  onOpenNameModal,
}) => {
  const t = translations[lang];
  const [filter, setFilter] = useState<'all' | 'quiz' | 'solving' | 'videos'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleManualRefresh = () => {
    sound.playClick();
    setIsRefreshing(true);
    if (onRefreshLive) onRefreshLive();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleCopyShareLink = () => {
    sound.playClick();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const filteredPlayers = players.filter((p) => {
    if (filter === 'quiz') return p.status === 'in_quiz';
    if (filter === 'videos') return p.status === 'watching_video';
    if (filter === 'solving') return p.status === 'online' || p.status === 'in_duel';
    return true;
  });

  const otherRealPlayers = players.filter((p) => p.id !== currentClientId);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Live Counter Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{t.liveLobbyTitle}</span>
              <span>·</span>
              <span className="text-slate-400">{t.authorCredit}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.liveLobbyTitle}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              {lang === 'ar'
                ? 'شاهد فقط الطلاب الحقيقيين المتصلين بالموقع في هذه اللحظة، وتفاعل معهم مباشرة!'
                : '100% Real connected learners live on this website right now.'}
            </p>
          </div>

          {/* Genuine Real Live Count Widget */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/60 shadow-xl shadow-emerald-500/10 self-start md:self-auto">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center shrink-0">
              <Signal className="w-6 h-6 animate-pulse text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-white tracking-tight">
                  {formatNum(realCount, stats.arabicNumerals)}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/40">
                  REAL LIVE
                </span>
              </div>
              <span className="text-xs text-emerald-400/90 font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                {lang === 'ar' ? 'متعلم حقيقي متصل الآن' : 'Real Person Online Right Now'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Real Live Activity Feed (Only actual real events) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{t.liveRecentActivity}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleManualRefresh}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              title="Refresh live connected users"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Synced
            </span>
          </div>
        </div>

        {liveStreamEvents.length > 0 ? (
          <div className="space-y-2">
            {liveStreamEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs sm:text-sm animate-fade-in"
              >
                <div className="flex items-center gap-2.5 text-slate-200">
                  <span>{evt.icon}</span>
                  <span>{evt.text}</span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">{evt.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 text-center">
            {lang === 'ar'
              ? 'لا توجد أنشطة سابقة حتى الآن. ابدأ بحل مسألة لتسجيل أول نشاط حقيقي!'
              : 'No prior events yet. Solve a problem to broadcast your live achievement!'}
          </div>
        )}
      </div>

      {/* Online Learners Roster & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-emerald-400" />
              <span>{t.liveLearnersRoster}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ar'
                ? `المتواجدون الحقيقيون الآن: ${formatNum(realCount, stats.arabicNumerals)} شخص`
                : `${formatNum(realCount, stats.arabicNumerals)} real person(s) active on this site`}
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                sound.playClick();
                setFilter('all');
              }}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
                filter === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.liveFilterAll} ({formatNum(players.length, stats.arabicNumerals)})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter('quiz');
              }}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filter === 'quiz' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.liveFilterQuiz}
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter('solving');
              }}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filter === 'solving' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.liveFilterSolving}
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter('videos');
              }}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filter === 'videos' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.liveFilterVideos}
            </button>
          </div>
        </div>

        {/* Player Cards Grid (ONLY REAL CONNECTED USERS) */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlayers.map((player) => {
              const isSelf = player.id === currentClientId;

              return (
                <div
                  key={player.id}
                  className={`p-5 rounded-2xl transition-all flex flex-col justify-between space-y-4 relative overflow-hidden ${
                    isSelf
                      ? 'bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-950 border-2 border-indigo-500 shadow-xl shadow-indigo-500/20'
                      : 'bg-slate-900/90 border-2 border-emerald-500/80 shadow-lg shadow-emerald-500/10'
                  }`}
                >
                  {/* Glowing Live badge */}
                  <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 px-3 py-0.5 bg-gradient-to-l from-emerald-500 to-teal-600 text-slate-950 text-[10px] font-black rounded-bl-xl rtl:rounded-bl-none rtl:rounded-br-xl uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>{isSelf ? t.liveYouBadge : t.liveRealOnlineBadge}</span>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{player.avatar}</span>
                        <div>
                          <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                            <span>{player.name}</span>
                            <span>{player.flag}</span>
                          </h3>
                          <span className="text-[11px] text-slate-400">
                            {player.country[lang]} · <span className="text-emerald-400 font-bold">{lang === 'ar' ? 'متصل الآن' : 'Live Now'}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                      <span className="text-[10px] text-indigo-400 font-bold block uppercase mb-0.5">
                        {lang === 'ar' ? 'النشاط الحالي:' : 'Current Activity:'}
                      </span>
                      {player.activity[lang]}
                    </div>
                  </div>

                  {/* Stats Bar & Duel CTA */}
                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-amber-400 flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{formatNum(player.xp, stats.arabicNumerals)} XP</span>
                      </span>
                      <span className="text-orange-400 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        <span>{formatNum(player.streak, stats.arabicNumerals)}d</span>
                      </span>
                    </div>

                    {!isSelf ? (
                      <button
                        onClick={() => {
                          sound.playClick();
                          onSelectTab('timestable');
                        }}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                      >
                        <Swords className="w-3.5 h-3.5" />
                        <span>{t.liveDuelInvite}</span>
                      </button>
                    ) : (
                      <div className="space-y-1.5 w-full">
                        <div className="w-full py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold text-center flex items-center justify-center gap-1">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'جلسة اتصالك المباشرة' : 'Your Live Session Card'}</span>
                        </div>
                        {onOpenNameModal && (
                          <button
                            onClick={() => {
                              sound.playClick();
                              onOpenNameModal();
                            }}
                            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{t.changeName}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
            <span className="text-4xl">👥</span>
            <h3 className="text-lg font-bold text-white">
              {lang === 'ar' ? 'لا يوجد متعلمون في هذا الفلتر حالياً' : 'No learners in this filter right now'}
            </h3>
            <button
              onClick={() => setFilter('all')}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
            >
              {lang === 'ar' ? 'عرض جميع المتصلين' : 'Show All Online'}
            </button>
          </div>
        )}

        {/* Invite Friends Card when only 1 user is online */}
        {otherRealPlayers.length === 0 && (
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>
                  {lang === 'ar'
                    ? 'أنت المتصل الوحيد الآن! ادعُ أصدقاءك للدراسة معك'
                    : 'You are currently the only live user! Invite friends to study & duel together'}
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'شارك رابط موقعك مع زملائك أو افتح نافذة تصفح أخرى لمشاهدة ظهورهم فوراً في قائمة المتصلين الحقيقيين!'
                  : 'Share your website link or open another browser tab to see them appear live right here!'}
              </p>
            </div>

            <button
              onClick={handleCopyShareLink}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-600/30"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? (lang === 'ar' ? 'تم نسخ الرابط!' : 'Link Copied!') : (lang === 'ar' ? 'نسخ رابط الموقع' : 'Copy Website Link')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
