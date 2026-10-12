import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  BookOpen, 
  BrainCircuit, 
  Video, 
  Users, 
  Trophy, 
  Flame, 
  Award, 
  CheckCircle2, 
  Compass, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { Language, UserStats } from '../types';
import { translations, formatNum, getLoc } from '../utils/translations';
import { sound } from '../utils/audio';

interface IntroTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  stats: UserStats;
  onSelectTab: (tab: string) => void;
}

export const IntroTourModal: React.FC<IntroTourModalProps> = ({
  isOpen,
  onClose,
  lang,
  stats,
  onSelectTab,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'welcome',
      icon: '🎓',
      badge: 'MathVerse (by: fawaz alokla)',
      title: {
        en: 'Welcome to MathVerse!',
        ar: 'أهلاً بك في منصة ماث فيرس (MathVerse)!',
      },
      subtitle: {
        en: 'Your complete interactive academy to master mathematics effortlessly, created with dedication by fawaz alokla.',
        ar: 'أكاديميتك التفاعلية المتكاملة لتعلم وإتقان الرياضيات بكل سهولة، صممت وطُوّرت بواسطة fawaz alokla.',
      },
      highlights: [
        {
          icon: '⚡',
          en: '1-10 Times Table Arena with visual area models & 60s speed runs',
          ar: 'حلبة جدول الضرب (١-١٠) بنماذج مصفوفية بصرية وتحديات السرعة',
        },
        {
          icon: '📚',
          en: '6 Progressive Math Levels from Arithmetic to Olympiad puzzles',
          ar: '٦ مستويات متدرجة من أساسيات الحساب حتى ألغاز الأولمبياد',
        },
        {
          icon: '🧠',
          en: 'Gemini AI Math Tutor with step-by-step solutions & audio explanations',
          ar: 'معلم ذكاء اصطناعي (Gemini) يحل ويشرح أي مسألة بصوت وخطوات مفصلة',
        },
        {
          icon: '🎬',
          en: 'Video Masterclasses with instant comprehension check mini-quizzes',
          ar: 'شروحات فيديو تفاعلية مع اختبار فوري أسفل كل درس',
        },
        {
          icon: '🌍',
          en: 'Live Global Learners Lobby with real-time counters & 1v1 duels',
          ar: 'صالة المتعلمين المتصلين المباشرة مع تحديات ١ ضد ١',
        },
      ],
      targetTab: 'timestable',
      tabLabel: { en: 'Explore Times Tables', ar: 'استكشف جدول الضرب' },
    },
    {
      id: 'timestable',
      icon: '⚡',
      badge: t.tabTimesTable,
      title: {
        en: 'Master Times Tables 1 to 10',
        ar: 'أتقن جدول الضرب من ١ إلى ١٠ بكل متعة',
      },
      subtitle: {
        en: 'No more boring rote memorization! MathVerse gives you 4 interactive training modes:',
        ar: 'وداعاً للحفظ الجاف والممل! تقدم لك المنصة ٤ أوضاع تدريب تفاعلية فريدة:',
      },
      highlights: [
        {
          icon: '🎯',
          en: 'Factor Quizzes: Pick 1× through 10× or Mixed Blitz with instant feedback & pro-tips.',
          ar: 'اختبار الجداول: اختر أي جدول من ١ إلى ١٠ أو الاختبار الشامل مع نصائح الحساب السريع.',
        },
        {
          icon: '🧮',
          en: '10×10 Visual Matrix: Click any cell to see real-time animated dot arrays (e.g. 7×8=56 dots).',
          ar: 'مصفوفة الضرب (١٠×١٠): انقر على أي خلية لمشاهدة المصفوفة البصرية الهندسية بنقاط تفاعلية.',
        },
        {
          icon: '⏱️',
          en: '60-Second Speed Run: Race the countdown to solve as many problems as possible.',
          ar: 'تحدي الـ ٦٠ ثانية: تسابق مع الوقت لحل أكبر عدد ممكن من المسائل وحقق رقماً قياسياً.',
        },
        {
          icon: '⚔️',
          en: '1v1 Live Duels: Challenge real learners currently studying on the website.',
          ar: 'تحدي ١ ضد ١: نافس متعلمين متصلين بالمنصة في مواجهة سريعة من ٥ مسائل.',
        },
      ],
      targetTab: 'timestable',
      tabLabel: { en: 'Open Times Table Arena', ar: 'فتح حلبة جدول الضرب' },
    },
    {
      id: 'curriculum',
      icon: '📚',
      badge: t.tabCurriculum,
      title: {
        en: 'Structured Math Curriculum (Levels 1–6)',
        ar: 'منهج الرياضيات المتدرج (المستويات ١ إلى ٦)',
      },
      subtitle: {
        en: 'Climb through 6 carefully designed tiers with intuitive rules, examples, and mastery tests:',
        ar: 'تدرج عبر ٦ مستويات مدروسة تحتوي على قواعد ذهبية وأمثلة محلولة واختبارات إتقان:',
      },
      highlights: [
        {
          icon: '1️⃣',
          en: 'Level 1: Foundations, Place Values & Regrouping Mental Math.',
          ar: 'المستوى ١: أساسيات الحساب، المنازل العشرية وحيل الجمع والطرح الذهني.',
        },
        {
          icon: '2️⃣',
          en: 'Level 2: Multiplication Power, Arrays & Commutativity.',
          ar: 'المستوى ٢: قوة الضرب والقسمة وخاصية الإبدال والمصفوفات.',
        },
        {
          icon: '3️⃣',
          en: 'Level 3: Fractions, Common Denominators, Decimals & Percentages.',
          ar: 'المستوى ٣: الكسور الاعتيادية، توحيد المقامات، العشريات والنسب المئوية.',
        },
        {
          icon: '4️⃣',
          en: 'Level 4: Pre-Algebra, Balance Scale Method & Solving for X.',
          ar: 'المستوى ٤: مدخل الجبر، ميزان المعادلات وحساب قيمة المتغير (س).',
        },
        {
          icon: '5️⃣',
          en: 'Level 5: Geometry, Angles, Areas & the Pythagorean Theorem (a²+b²=c²).',
          ar: 'المستوى ٥: الهندسة والمساحات والمحيطات ونظرية فيثاغورس.',
        },
        {
          icon: '6️⃣',
          en: 'Level 6: Olympiad Puzzles, Fibonacci Sequences & Logic Brain Teasers.',
          ar: 'المستوى ٦: التفكير الرياضي المتقدم، متتالية فيبوناتشي وألغاز الأولمبياد.',
        },
      ],
      targetTab: 'curriculum',
      tabLabel: { en: 'Explore Levels', ar: 'استكشف المستويات' },
    },
    {
      id: 'aihelper',
      icon: '🧠',
      badge: t.tabAiHelper,
      title: {
        en: 'Dr. Fawaz Gemini AI Math Helper',
        ar: 'المعلم الذكي فواز المدعوم بـ Gemini AI',
      },
      subtitle: {
        en: 'Get personalized 24/7 help whenever you encounter any tricky homework problem:',
        ar: 'احصل على مساعدة فورية وشرح تربوي صبور على مدار الساعة لأي مسألة أو واجب منزلي:',
      },
      highlights: [
        {
          icon: '✨',
          en: 'Step-by-Step Solver: Type or paste any math problem to get the final answer and clear steps.',
          ar: 'حل المسائل خطوة بخطوة: اكتب أي مسألة لتحصل على الجواب النهائي مع خطوات تفصيلية.',
        },
        {
          icon: '🔊',
          en: 'Listen to Steps: Click the audio button to hear the explanation spoken out loud.',
          ar: 'الاستماع الصوتي للشرح: انقر زر الصوت للاستماع إلى الخطوات مقروءة بنقاء.',
        },
        {
          icon: '💬',
          en: 'Chat with AI Tutor: Ask questions naturally like "Why do we flip fractions in division?"',
          ar: 'محادثة المعلم الذكي: اسأله بلغة طبيعية مثل "لماذا نقلب الكسر الثاني في القسمة؟".',
        },
        {
          icon: '🎲',
          en: 'Practice Generator: Generates fresh customized problems tailored to your skill level.',
          ar: 'توليد مسائل تدريبية: ينشئ لك مسائل جديدة في أي موضوع مع تحقق فوري.',
        },
      ],
      targetTab: 'aihelper',
      tabLabel: { en: 'Try AI Math Tutor', ar: 'جرب المعلم الذكي' },
    },
    {
      id: 'videos_and_live',
      icon: '🎬',
      badge: `${t.tabVideos} & ${t.tabLivePlayers}`,
      title: {
        en: 'Videos & Live Learners Lobby',
        ar: 'دروس الفيديو المشروحة وصالة الطلاب المتصلين',
      },
      subtitle: {
        en: 'Watch visual masterclasses and study alongside active learners across the globe:',
        ar: 'شاهد الشروحات المرئية الممتعة وتدرب جنباً إلى جنب مع طلاب من مختلف أنحاء العالم:',
      },
      highlights: [
        {
          icon: '🎥',
          en: 'Video Masterclasses: High-yield visual explanations covering mental math, fractions, algebra & geometry.',
          ar: 'فيديوهات شرح ممتازة: رسوم توضيحية مبسطة للجمع السريع، الكسور، الجبر وفيثاغورس.',
        },
        {
          icon: '✍️',
          en: 'Immediate Test Checkpoint: Answer the test problem directly below each video for +50 XP.',
          ar: 'اختبار فوري أسفل الفيديو: أجب عن المسألة التدريبية تحت كل فيديو واكسب +٥٠ نقطة خبرة.',
        },
        {
          icon: '🟢',
          en: 'Real Live Presence: See genuine learners connected to the website right now with real-time duels.',
          ar: 'الاتصال الحقيقي المباشر: شاهد الطلاب المتصلين فعلياً بالموقع الآن وتنافس معهم.',
        },
      ],
      targetTab: 'videos',
      tabLabel: { en: 'Watch Videos', ar: 'مشاهدة الفيديوهات' },
    },
    {
      id: 'gamification',
      icon: '🏆',
      badge: `${t.streakLabel} & ${t.certificateTitle}`,
      title: {
        en: 'Streaks, Customizations & Your Certificate',
        ar: 'سلسلة الأيام، التخصيص وشهادة التميز المعتمدة',
      },
      subtitle: {
        en: 'Stay energized every single day and earn official recognition for your math growth:',
        ar: 'حافظ على حماسك اليومي واحصل على تكريم رسمي لإتقانك مهارات الرياضيات:',
      },
      highlights: [
        {
          icon: '🔥',
          en: 'Daily Streak Flame: Solve at least one problem every day to protect and grow your streak.',
          ar: 'شعلة الأيام المتواصلة: حل مسألة واحدة يومياً على الأقل لحماية شعلتك ورفع مستواك.',
        },
        {
          icon: '🎯',
          en: 'Daily Missions: 3 fresh math tasks generated daily for bonus XP and streak points!',
          ar: 'المهام اليومية: ٣ مهام رياضية متجددة يومياً لكسب نقاط خبرة مضاعفة وحماية الشعلة!',
        },
        {
          icon: '⭐',
          en: 'XP & Badges: Collect XP to climb from Level 1 Novice up to Level 6 Grandmaster.',
          ar: 'نقاط الخبرة والشارات: اجمع XP لتترقى من المستوى ١ حتى أستاذ الرياضيات الأعظم.',
        },
        {
          icon: '🎨',
          en: 'Cool Customizations: 5 Color themes (Cyber Neon, Daylight Royal, etc.), 12 avatars, and Arabic numerals toggle (١, ٢, ٣).',
          ar: 'تخصيص رائع: ٥ ثيمات ألوان مميزة، ١٢ شخصية رمزية، وخيار الأرقام المشرقية (١، ٢، ٣).',
        },
        {
          icon: '📜',
          en: 'Printable Certificate: Print your official MathVerse Certificate signed by fawaz alokla!',
          ar: 'شهادة تميز قابلة للطباعة: اطبع شهادة التميز الرياضي المعتمدة بتوقيع: fawaz alokla!',
        },
      ],
      targetTab: 'timestable',
      tabLabel: { en: 'Start Math Mastery!', ar: 'ابدأ التعلم الآن!' },
    },
  ];

  const current = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    sound.playClick();
    if (isLast) {
      onClose();
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleJumpToTab = (tab: string) => {
    sound.playClick();
    onSelectTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
        {/* Top Bar: Step Indicator & Close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-sm font-black">
              {formatNum(currentStep + 1, stats.arabicNumerals)}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {t.tourStep} {formatNum(currentStep + 1, stats.arabicNumerals)} {t.tourOf}{' '}
              {formatNum(steps.length, stats.arabicNumerals)}
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setCurrentStep(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentStep === idx
                    ? 'w-6 bg-indigo-500 shadow-sm shadow-indigo-500/50'
                    : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                title={`Step ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Main Card */}
        <div className="space-y-5 animate-fade-in">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600/40 via-indigo-500/20 to-cyan-400/20 border border-indigo-500/40 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/10 shrink-0">
              {current.icon}
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                {current.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {getLoc(current.title, lang)}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {getLoc(current.subtitle, lang)}
              </p>
            </div>
          </div>

          {/* Highlights List */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            {current.highlights.map((item, hIdx) => (
              <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                <span className="text-slate-200 leading-relaxed">{getLoc(item, lang)}</span>
              </div>
            ))}
          </div>

          {/* Quick Jump Action */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.tourJumpToTab}:</span>
            </div>
            <button
              onClick={() => handleJumpToTab(current.targetTab)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
            >
              {getLoc(current.tabLabel, lang)}
            </button>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            {t.tourSkip}
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{t.tourPrev}</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <span>{isLast ? t.tourFinish : t.tourNext}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
