import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TimesTableArena } from './components/TimesTableArena';
import { LevelCurriculum } from './components/LevelCurriculum';
import { AiMathTutor } from './components/AiMathTutor';
import { VideoClassroom } from './components/VideoClassroom';
import { LivePlayersLobby } from './components/LivePlayersLobby';
import { CustomizationModal } from './components/CustomizationModal';
import { CertificateModal } from './components/CertificateModal';
import { IntroTourModal } from './components/IntroTourModal';
import { DailyMissionsModal } from './components/DailyMissionsModal';
import { JoinNameModal } from './components/JoinNameModal';
import { Footer } from './components/Footer';
import { UserStats, Language, ThemeId, LivePlayer, DailyMission } from './types';
import { translations, formatNum } from './utils/translations';
import { sound } from './utils/audio';
import { triggerConfetti } from './utils/confetti';
import { generateDailyMissions, getTodayDateString } from './utils/dailyMissions';
import { 
  Zap, 
  Sparkles, 
  BookOpen, 
  BrainCircuit, 
  Flame, 
  Trophy, 
  ArrowRight,
  Video,
  Target
} from 'lucide-react';

const STORAGE_KEY = 'mathverse_user_stats_v1';
const LANG_STORAGE_KEY = 'mathverse_lang_v1';

export default function App() {
  // Language State
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'ar' || saved === 'en' || saved === 'es' || saved === 'fr') return saved;
    }
    return 'en';
  });

  // User Stats & Gamification (Fawaz Alokla is ONLY for the creator, every other visitor types their own name)
  const [stats, setStats] = useState<UserStats>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // If stored as Fawaz Alokla, keep Fawaz as creator
          if (parsed.name && parsed.name.toLowerCase() === 'fawaz alokla') {
            parsed.isCreator = true;
            localStorage.setItem('mathverse_is_creator', 'true');
            localStorage.setItem('mathverse_name_confirmed_v1', 'true');
            return parsed;
          }
          // If the user previously chose their own name (e.g. Sarah, Alex)
          if (parsed.name && parsed.name !== 'Math Prodigy' && parsed.name !== 'Learner' && parsed.name !== "Fawaz's Math Star") {
            return parsed;
          }
        }
        // If this browser was previously recognized as Fawaz
        if (localStorage.getItem('mathverse_is_creator') === 'true') {
          return {
            name: 'fawaz alokla',
            avatar: '🦊',
            xp: 150,
            level: 1,
            streak: 4,
            lastActiveDate: new Date().toISOString().split('T')[0],
            soundEnabled: true,
            theme: 'cyber',
            arabicNumerals: false,
            completedQuizzes: [],
            solvedProblemsCount: 8,
            timesTableMastery: { 1: 100, 2: 90, 5: 85, 7: 60, 10: 100 },
            unlockedBadges: ['b-first-step'],
            isCreator: true,
          };
        }
      } catch {}
    }
    // For anyone newly joining the site: Ask what their name is
    return {
      name: '',
      avatar: '🦊',
      xp: 50,
      level: 1,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      soundEnabled: true,
      theme: 'cyber',
      arabicNumerals: false,
      completedQuizzes: [],
      solvedProblemsCount: 0,
      timesTableMastery: {},
      unlockedBadges: [],
      isCreator: false,
    };
  });

  // Daily Missions State (3 random tasks generated each day)
  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>(() => {
    const today = getTodayDateString();
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('mathverse_daily_missions_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.date === today && Array.isArray(parsed.missions) && parsed.missions.length === 3) {
            return parsed.missions;
          }
        }
      } catch {}
    }
    return generateDailyMissions(today);
  });

  // Modals
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isIntroTourOpen, setIsIntroTourOpen] = useState(false);
  const [isDailyMissionsOpen, setIsDailyMissionsOpen] = useState(false);
  const [isJoinNameModalOpen, setIsJoinNameModalOpen] = useState(false);

  // Navigation tab: 'curriculum' | 'timestable' | 'aihelper' | 'videos' | 'live'
  const [activeTab, setActiveTab] = useState<string>('timestable');

  // Persist Daily Missions
  useEffect(() => {
    try {
      const today = getTodayDateString();
      localStorage.setItem(
        'mathverse_daily_missions_v2',
        JSON.stringify({ date: today, missions: dailyMissions })
      );
    } catch {}
  }, [dailyMissions]);

  // Prompt new joiners: "What is your name?" so their typed name appears in live people
  useEffect(() => {
    try {
      const hasConfirmed = localStorage.getItem('mathverse_name_confirmed_v1');
      const isCreator = localStorage.getItem('mathverse_is_creator') === 'true';
      // If user has not confirmed name yet, or name is empty
      if (!hasConfirmed || !stats.name) {
        setIsJoinNameModalOpen(true);
      }
    } catch {}
  }, []);

  // Auto-launch intro tour for first-time visitors after name is chosen
  useEffect(() => {
    try {
      const hasSeen = localStorage.getItem('mathverse_intro_seen_v1');
      if (!hasSeen && stats.name) {
        setIsIntroTourOpen(true);
        localStorage.setItem('mathverse_intro_seen_v1', 'true');
      }
    } catch {}
  }, [stats.name]);

  // Client Unique Persistent Identity for Real-time Presence (session-aware for multi-tab testing)
  const [clientId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      let id = sessionStorage.getItem('mathverse_session_id');
      if (!id) {
        id = localStorage.getItem('mathverse_client_id_v2');
      }
      if (!id) {
        id = 'learner_' + Math.random().toString(36).substring(2, 8) + '_' + Date.now().toString(36);
        sessionStorage.setItem('mathverse_session_id', id);
        localStorage.setItem('mathverse_client_id_v2', id);
      }
      return id;
    }
    return 'learner_guest';
  });

  // Live Online Players Count & Real Learners Roster
  const [liveCount, setLiveCount] = useState<number>(1);
  const [realOnlineCount, setRealOnlineCount] = useState<number>(1);
  const [liveLearners, setLiveLearners] = useState<LivePlayer[]>([]);
  const [liveEvents, setLiveEvents] = useState<Array<{ id: string; text: string; time: string; icon: string }>>([
    {
      id: 'e1',
      text: lang === 'ar' ? 'أنت متصل الآن كمتعلم حقيقي في MathVerse!' : 'You are now connected live as a real learner in MathVerse!',
      time: 'Just now',
      icon: '🟢',
    },
  ]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Activity Description based on activeTab
  const getActivityDescription = () => {
    if (activeTab === 'timestable') {
      return {
        en: 'Practicing 1-10 Times Table Arena',
        ar: 'يتدرب في حلبة جدول الضرب (١-١٠)',
      };
    }
    if (activeTab === 'curriculum') {
      return {
        en: `Studying Math Level ${stats.level}`,
        ar: `يدرس المستوى ${stats.level} في المنهج`,
      };
    }
    if (activeTab === 'aihelper') {
      return {
        en: 'Solving problems with Dr. Fawaz AI Tutor',
        ar: 'يحل مسائل رياضية مع المعلم الذكي',
      };
    }
    if (activeTab === 'videos') {
      return {
        en: 'Watching Math Video Masterclass',
        ar: 'يشاهد دروس الفيديو المشروحة',
      };
    }
    return {
      en: 'Exploring Live Learners Lobby',
      ar: 'في صالة المتعلمين المباشرة',
    };
  };

  // Heartbeat sender: registers genuine connected presence on server
  const sendHeartbeat = async () => {
    try {
      await fetch('/api/players/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: clientId,
          name: stats.name,
          avatar: stats.avatar,
          country:
            lang === 'ar'
              ? { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' }
              : { en: 'United States', ar: 'الولايات المتحدة' },
          flag: lang === 'ar' ? '🇸🇦' : '🇺🇸',
          activity: getActivityDescription(),
          xp: stats.xp,
          streak: stats.streak,
          status:
            activeTab === 'timestable'
              ? 'in_quiz'
              : activeTab === 'videos'
              ? 'watching_video'
              : 'online',
        }),
      });
    } catch {}
  };

  // Fetch live active learners and activity feed from server
  const fetchLive = async () => {
    try {
      const res = await fetch('/api/players/live');
      if (res.ok) {
        const data = await res.json();
        if (typeof data.activeCount === 'number') setLiveCount(data.activeCount);
        if (typeof data.realCount === 'number') setRealOnlineCount(data.realCount);
        if (Array.isArray(data.learners)) {
          setLiveLearners(data.learners);
        }
        if (Array.isArray(data.recentEvents) && data.recentEvents.length > 0) {
          setLiveEvents(
            data.recentEvents.map((e: any) => ({
              id: e.id,
              text: lang === 'ar' ? e.textAr || e.textEn : e.textEn || e.textAr,
              time: e.time || 'Just now',
              icon: e.icon || '⚡',
            }))
          );
        }
      }
    } catch {}
  };

  // Immediate Heartbeat and periodic sync
  useEffect(() => {
    sendHeartbeat();
    fetchLive();
    const interval = setInterval(() => {
      sendHeartbeat();
      fetchLive();
    }, 12000);
    return () => clearInterval(interval);
  }, [clientId, stats.name, stats.avatar, stats.xp, activeTab, lang]);

  // Persist Stats & Update Level
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {}
  }, [stats]);

  // Persist Language & Update HTML dir
  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {}
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync sound setting
  useEffect(() => {
    sound.setEnabled(stats.soundEnabled);
  }, [stats.soundEnabled]);

  // Show quick toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add XP and handle potential level ups
  const handleAddXp = (amount: number, reason: string) => {
    // Broadcast real-time activity to server lobby
    fetch('/api/players/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: clientId,
        name: stats.name,
        flag: lang === 'ar' ? '🇸🇦' : '🌟',
        textEn: `${stats.name} earned +${amount} XP on ${reason}!`,
        textAr: `${stats.name} حقق +${amount} نقطة خبرة في ${reason}!`,
        icon: '⚡',
      }),
    }).catch(() => {});

    setStats((prev) => {
      const newXp = prev.xp + amount;
      let newLevel = 1;
      if (newXp >= 1200) newLevel = 6;
      else if (newXp >= 800) newLevel = 5;
      else if (newXp >= 500) newLevel = 4;
      else if (newXp >= 250) newLevel = 3;
      else if (newXp >= 100) newLevel = 2;

      if (newLevel > prev.level) {
        sound.playLevelUp();
        triggerConfetti();
        showToast(
          lang === 'ar'
            ? `🎉 مبروك! ارتقيت إلى المستوى ${newLevel} (+${amount} XP)`
            : `🎉 Level Up! You reached Level ${newLevel} (+${amount} XP)`
        );
      } else {
        showToast(`+${amount} XP: ${reason}`);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  const handleUpdateTableMastery = (factor: number, percent: number) => {
    setStats((prev) => ({
      ...prev,
      timesTableMastery: {
        ...prev.timesTableMastery,
        [factor]: Math.max(prev.timesTableMastery[factor] || 0, percent),
      },
    }));
  };

  const handleIncrementSolved = () => {
    setStats((prev) => ({
      ...prev,
      solvedProblemsCount: prev.solvedProblemsCount + 1,
    }));
  };

  const handleUpdateStats = (updates: Partial<UserStats>) => {
    setStats((prev) => ({ ...prev, ...updates }));
  };

  // Handle saving the user's name from "What's Your Name?" onboarding/modal
  const handleSaveName = (newName: string, newAvatar: string, isCreatorFlag?: boolean) => {
    const trimmed = newName.trim() || 'Learner';
    const isFawaz = isCreatorFlag || trimmed.toLowerCase() === 'fawaz alokla';

    setStats((prev) => ({
      ...prev,
      name: trimmed,
      avatar: newAvatar,
      isCreator: isFawaz,
    }));

    try {
      localStorage.setItem('mathverse_name_confirmed_v1', 'true');
      if (isFawaz) {
        localStorage.setItem('mathverse_is_creator', 'true');
      } else {
        localStorage.removeItem('mathverse_is_creator');
      }
    } catch {}

    setIsJoinNameModalOpen(false);

    // Broadcast immediate presence with the typed name
    fetch('/api/players/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: clientId,
        name: trimmed,
        avatar: newAvatar,
        country:
          lang === 'ar'
            ? { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' }
            : { en: 'United States', ar: 'الولايات المتحدة' },
        flag: lang === 'ar' ? '🇸🇦' : '🌟',
        activity: getActivityDescription(),
        xp: stats.xp,
        streak: stats.streak,
        status: 'online',
      }),
    })
      .then(() => fetchLive())
      .catch(() => {});

    showToast(
      lang === 'ar'
        ? `🎉 أهلاً بك يا ${trimmed}! اسمك يظهر الآن في قائمة المتواجدين الحقيقيين!`
        : `🎉 Welcome, ${trimmed}! Your name now appears live on the website!`
    );
  };

  // Handle Mission Progress for Daily Tasks
  const handleMissionAction = (category: DailyMission['category'], count = 1) => {
    setDailyMissions((prevMissions) => {
      let anyUpdated = false;
      let newlyCompletedTitle: string | null = null;
      let earnedBonusXp = 0;

      const updated = prevMissions.map((m) => {
        if (m.completed) return m;
        if (m.category === category || category === 'general' || m.category === 'general') {
          anyUpdated = true;
          const nextCount = m.currentCount + count;
          if (nextCount >= m.targetCount) {
            newlyCompletedTitle = m.title[lang] || m.title.en || '';
            earnedBonusXp += m.xpReward;
            return {
              ...m,
              currentCount: m.targetCount,
              completed: true,
            };
          }
          return {
            ...m,
            currentCount: nextCount,
          };
        }
        return m;
      });

      if (newlyCompletedTitle) {
        sound.playLevelUp();
        showToast(
          lang === 'ar'
            ? `🎯 اكتملت المهمة اليومية: ${newlyCompletedTitle} (+${earnedBonusXp} XP)!`
            : `🎯 Daily Mission Done: ${newlyCompletedTitle} (+${earnedBonusXp} XP)!`
        );
        // Add mission reward XP
        handleAddXp(earnedBonusXp, 'Daily Mission Complete');

        // Check if all are now completed
        const allDone = updated.every((m) => m.completed);
        if (allDone) {
          setTimeout(() => {
            triggerConfetti();
            sound.playLevelUp();
            handleAddXp(100, 'All Daily Missions Completed Bonus');
            setStats((s) => ({ ...s, streak: s.streak + 1 }));
            showToast(
              lang === 'ar'
                ? '🔥🏆 مبروك يا فواز! أكملت جميع مهام اليوم (+100 XP وزيادة الشعلة)!'
                : '🔥🏆 High five Fawaz! All 3 daily missions completed (+100 XP & Streak +1)!'
            );
          }, 600);
        }
      }

      return anyUpdated ? updated : prevMissions;
    });
  };

  const t = translations[lang];

  // Theme styling mapping
  const themeClasses: Record<ThemeId, string> = {
    cyber: 'bg-slate-950 text-slate-100',
    daylight: 'bg-slate-950 text-slate-100', // Keep dark slate baseline with blue highlights for high contrast
    midnight: 'bg-slate-950 text-slate-100',
    emerald: 'bg-slate-950 text-slate-100',
    chalkboard: 'bg-stone-950 text-stone-100',
  };

  const completedMissionsCount = dailyMissions.filter((m) => m.completed).length;

  return (
    <div className={`min-h-screen ${themeClasses[stats.theme]} flex flex-col font-sans transition-colors duration-300 relative`}>
      {/* Background patterns */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
      <div className="fixed inset-0 bg-radial-glow pointer-events-none"></div>

      {/* Header */}
      <Header
        stats={stats}
        lang={lang}
        onLanguageChange={setLang}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenIntro={() => setIsIntroTourOpen(true)}
        onOpenDailyMissions={() => setIsDailyMissionsOpen(true)}
        onOpenNameModal={() => setIsJoinNameModalOpen(true)}
        missionsCompletedCount={completedMissionsCount}
        missionsTotalCount={dailyMissions.length}
        onToggleSound={() => {
          const next = !stats.soundEnabled;
          handleUpdateStats({ soundEnabled: next });
        }}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        liveCount={liveCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Dynamic Toast Alerts */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <div className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-indigo-600/40 border border-indigo-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Daily Missions Quick Banner */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
              <Target className="w-5 h-5 animate-pulse text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white">{t.dailyMissionsTitle}</span>
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {formatNum(completedMissionsCount, stats.arabicNumerals)}/{formatNum(dailyMissions.length, stats.arabicNumerals)} {lang === 'ar' ? 'مكتملة' : 'Done'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.dailyMissionsSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              setIsDailyMissionsOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-lg shadow-amber-500/20"
          >
            <span>{lang === 'ar' ? 'عرض تفاصيل المهام' : 'View Daily Missions'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        {/* Tab 1: 1-10 Times Table Arena (Requested explicitly by user) */}
        {activeTab === 'timestable' && (
          <TimesTableArena
            stats={stats}
            lang={lang}
            onAddXp={handleAddXp}
            onUpdateTableMastery={handleUpdateTableMastery}
            onIncrementSolved={handleIncrementSolved}
            onMissionAction={handleMissionAction}
            livePlayers={liveLearners}
          />
        )}

        {/* Tab 2: Structured Math Curriculum by Level */}
        {activeTab === 'curriculum' && (
          <LevelCurriculum
            stats={stats}
            lang={lang}
            onAddXp={handleAddXp}
            onSelectTab={setActiveTab}
            onIncrementSolved={handleIncrementSolved}
            onMissionAction={handleMissionAction}
          />
        )}

        {/* Tab 3: Gemini AI Helper Tutor */}
        {activeTab === 'aihelper' && (
          <AiMathTutor
            stats={stats}
            lang={lang}
            onAddXp={handleAddXp}
            onIncrementSolved={handleIncrementSolved}
            onMissionAction={handleMissionAction}
          />
        )}

        {/* Tab 4: Video Classroom */}
        {activeTab === 'videos' && (
          <VideoClassroom
            stats={stats}
            lang={lang}
            onAddXp={handleAddXp}
            onIncrementSolved={handleIncrementSolved}
            onMissionAction={handleMissionAction}
          />
        )}

        {/* Tab 5: Live Global Learners Lobby */}
        {activeTab === 'live' && (
          <LivePlayersLobby
            stats={stats}
            lang={lang}
            onSelectTab={setActiveTab}
            liveCount={liveCount}
            realCount={realOnlineCount}
            players={liveLearners}
            currentClientId={clientId}
            liveStreamEvents={liveEvents}
            onRefreshLive={fetchLive}
            onOpenNameModal={() => setIsJoinNameModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onSelectTab={setActiveTab}
        onOpenIntro={() => setIsIntroTourOpen(true)}
      />

      {/* What's Your Name / Onboarding Modal (Every visitor enters their own name, only Fawaz is fawaz alokla) */}
      <JoinNameModal
        isOpen={isJoinNameModalOpen}
        onClose={() => setIsJoinNameModalOpen(false)}
        currentName={stats.name}
        currentAvatar={stats.avatar}
        lang={lang}
        onSaveName={handleSaveName}
      />

      {/* Customization Modal */}
      <CustomizationModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        stats={stats}
        lang={lang}
        onUpdateStats={handleUpdateStats}
        onOpenCertificate={() => {
          setIsCustomizerOpen(false);
          setIsCertificateOpen(true);
        }}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        stats={stats}
        lang={lang}
      />

      {/* Interactive Intro & How-To-Use Tour Modal */}
      <IntroTourModal
        isOpen={isIntroTourOpen}
        onClose={() => setIsIntroTourOpen(false)}
        lang={lang}
        stats={stats}
        onSelectTab={setActiveTab}
      />

      {/* Daily Missions Modal */}
      <DailyMissionsModal
        isOpen={isDailyMissionsOpen}
        onClose={() => setIsDailyMissionsOpen(false)}
        missions={dailyMissions}
        stats={stats}
        lang={lang}
        onSelectTab={setActiveTab}
      />
    </div>
  );
}
