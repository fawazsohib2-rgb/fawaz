import { DailyMission } from '../types';

export const MISSION_POOL: Omit<DailyMission, 'currentCount' | 'completed'>[] = [
  {
    id: 'mission-timestable-5',
    title: {
      en: 'Times Table Mastery',
      ar: 'إتقان جدول الضرب',
      es: 'Dominio de Tablas de Multiplicar',
      fr: 'Maîtrise des Tables de Multiplication',
    },
    description: {
      en: 'Solve 5 problems in the 1-10 Times Table Arena',
      ar: 'حل ٥ مسائل في حلبة جدول الضرب (١-١٠)',
      es: 'Resuelve 5 problemas en la Arena de Tablas 1-10',
      fr: 'Résolvez 5 problèmes dans l\'Arène des Tables 1-10',
    },
    targetCount: 5,
    xpReward: 40,
    streakReward: 1,
    category: 'timestable',
    icon: '⚡',
  },
  {
    id: 'mission-quiz-ace',
    title: {
      en: 'Curriculum Quiz Ace',
      ar: 'بطل اختبار المنهج',
      es: 'As del Cuestionario',
      fr: 'As des Quiz du Programme',
    },
    description: {
      en: 'Complete any level quiz or factor challenge',
      ar: 'أكمل أي اختبار في المنهج أو تحدي عامل الضرب',
      es: 'Completa cualquier cuestionario de nivel o reto de factores',
      fr: 'Terminez un quiz de niveau ou un défi de facteurs',
    },
    targetCount: 1,
    xpReward: 50,
    streakReward: 1,
    category: 'quiz',
    icon: '🎯',
  },
  {
    id: 'mission-speed-run',
    title: {
      en: 'Speed Runner',
      ar: 'عدّاء الحساب الذهني',
      es: 'Corredor Veloz',
      fr: 'Coureur Rapide',
    },
    description: {
      en: 'Play the 60-second Speed Multiplication Challenge',
      ar: 'العب تحدي الـ ٦٠ ثانية السريع في جدول الضرب',
      es: 'Juega el Reto de Velocidad de 60 segundos de multiplicación',
      fr: 'Participez au Défi Vitesse de Multiplication de 60 secondes',
    },
    targetCount: 1,
    xpReward: 45,
    streakReward: 1,
    category: 'speed',
    icon: '⏱️',
  },
  {
    id: 'mission-ai-tutor',
    title: {
      en: 'AI Math Inquirer',
      ar: 'المستكشف الذكي',
      es: 'Investigador de Matemáticas IA',
      fr: 'Chercheur en Maths avec l\'IA',
    },
    description: {
      en: 'Solve or explain 2 problems with the Gemini AI Tutor',
      ar: 'حل أو استفسر عن مسألتين مع المعلم الذكي فواز',
      es: 'Resuelve o explica 2 problemas con el Tutor IA Gemini',
      fr: 'Résolvez ou expliquez 2 problèmes avec le Tuteur IA Gemini',
    },
    targetCount: 2,
    xpReward: 60,
    streakReward: 1,
    category: 'ai',
    icon: '🧠',
  },
  {
    id: 'mission-video-class',
    title: {
      en: 'Visual Masterclass',
      ar: 'شاهد وتدرب بذكاء',
      es: 'Clase Magistral Visual',
      fr: 'Masterclasse Visuelle',
    },
    description: {
      en: 'Watch a video lesson and answer its instant quiz',
      ar: 'شاهد درساً مرئياً وأجب عن اختباره الفوري',
      es: 'Mira una lección en video y responde su cuestionario instantáneo',
      fr: 'Regardez une leçon vidéo et répondez à son mini-quiz',
    },
    targetCount: 1,
    xpReward: 50,
    streakReward: 1,
    category: 'video',
    icon: '🎬',
  },
  {
    id: 'mission-general-8',
    title: {
      en: 'Problem Solving Spree',
      ar: 'سلسلة الحلول المتتالية',
      es: 'Racha de Resolución de Problemas',
      fr: 'Série de Résolution de Problèmes',
    },
    description: {
      en: 'Solve 8 total math problems anywhere on MathVerse',
      ar: 'حل ٨ مسائل رياضية متنوعة في المنصة',
      es: 'Resuelve 8 problemas matemáticos en MathVerse',
      fr: 'Résolvez 8 problèmes de maths au total sur MathVerse',
    },
    targetCount: 8,
    xpReward: 70,
    streakReward: 1,
    category: 'general',
    icon: '🔥',
  },
];

// Simple deterministic hash function from string to pick 3 pseudo-random missions per date
function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getTimeUntilReset(): { hours: number; minutes: number; seconds: number; formatted: string } {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  const diffMs = Math.max(0, tomorrow.getTime() - now.getTime());
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  const formatted = `${hours}h ${minutes}m`;
  return { hours, minutes, seconds, formatted };
}

export function generateDailyMissions(dateStr: string = getTodayDateString()): DailyMission[] {
  const seed = hashDate(dateStr);
  const pool = [...MISSION_POOL];

  // Pseudo-random shuffle based on date seed
  for (let i = pool.length - 1; i > 0; i--) {
    const j = (seed + i * 37) % (i + 1);
    const temp = pool[i];
    pool[i] = pool[j];
    pool[j] = temp;
  }

  // Pick first 3 unique tasks
  return pool.slice(0, 3).map((item) => ({
    ...item,
    currentCount: 0,
    completed: false,
  }));
}
