export type Language = 'en' | 'ar' | 'es' | 'fr';

export type ThemeId = 'cyber' | 'daylight' | 'midnight' | 'emerald' | 'chalkboard';

export interface LocalizedString {
  en: string;
  ar: string;
  es?: string;
  fr?: string;
}

export interface LocalizedStringArray {
  en: string[];
  ar: string[];
  es?: string[];
  fr?: string[];
}

export interface UserStats {
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  theme: ThemeId;
  arabicNumerals: boolean;
  completedQuizzes: string[];
  solvedProblemsCount: number;
  timesTableMastery: Record<number, number>; // 1-10 -> 0-100%
  unlockedBadges: string[];
  dailyMissionsDate?: string;
  dailyMissions?: DailyMission[];
  isCreator?: boolean;
}

export interface DailyMission {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  xpReward: number;
  streakReward: number;
  category: 'timestable' | 'quiz' | 'speed' | 'ai' | 'video' | 'general';
  icon: string;
}

export interface QuizQuestion {
  id: string;
  question: LocalizedString;
  options: LocalizedStringArray;
  correctIndex: number;
  explanation: LocalizedString;
  hint: LocalizedString;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
}

export interface RapidQuizChallenge {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  badge: LocalizedString;
  color: string;
  questions: QuizQuestion[];
}

export interface TopicLesson {
  id: string;
  title: LocalizedString;
  summary: LocalizedString;
  keyRule: LocalizedString;
  formula?: string;
  example: {
    problem: LocalizedString;
    steps: LocalizedStringArray;
    answer: LocalizedString;
  };
}

export interface VideoLesson {
  id: string;
  title: LocalizedString;
  topic: LocalizedString;
  duration: string;
  videoUrl: string; // YouTube educational embed
  summary: LocalizedString;
  keyPoints: LocalizedStringArray;
  practiceQuestions: QuizQuestion[];
}

export interface MathLevelData {
  id: string;
  number: number;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  badgeName: LocalizedString;
  requiredXp: number;
  accentColor: string;
  topics: TopicLesson[];
  quiz: QuizQuestion[];
  videoLesson: VideoLesson;
}

export interface LivePlayer {
  id: string;
  name: string;
  country: LocalizedString;
  flag: string;
  avatar: string;
  activity: LocalizedString;
  xp: number;
  streak: number;
  status: 'online' | 'in_quiz' | 'watching_video' | 'in_duel';
  lastActionTime: string;
  isRealUser?: boolean;
  isCurrentClient?: boolean;
  countryCode?: string;
}

export interface Badge {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  unlockedAtXp: number;
}
