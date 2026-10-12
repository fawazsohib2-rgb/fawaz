import React from 'react';
import { X, Award, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserStats, Language } from '../types';
import { translations, formatNum } from '../utils/translations';
import { sound } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  lang: Language;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  stats,
  lang,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const currentDate = new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white overscroll-contain">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-10 space-y-4 sm:space-y-6 max-h-[90dvh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Close Button (Hidden when printing) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Award className="w-5 h-5" />
            <span>{t.certificateTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'ar' ? 'طباعة الشهادة' : 'Print Certificate'}</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Design */}
        <div className="relative p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/60 border-4 border-double border-amber-500/60 text-center space-y-6 shadow-2xl print:border-amber-600 print:text-black print:bg-white">
          {/* Subtle watermark badge */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="text-[180px] font-black text-amber-500 select-none">∑</span>
          </div>

          <div className="relative z-10 space-y-6">
            {/* Seal & Logo */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-3xl">
                🏆
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-extrabold print:text-amber-700">
                MathVerse International Academy
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight print:text-black">
                {t.certificateTitle}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto print:text-slate-600">
              {t.certificatePresentedTo}
            </p>

            {/* Learner Name with Avatar */}
            <div className="py-2">
              <div className="inline-block border-b-2 border-amber-500/80 px-8 pb-2">
                <span className="text-2xl sm:text-4xl font-black text-amber-300 tracking-wide print:text-amber-800 flex items-center justify-center gap-3">
                  <span>{stats.avatar}</span>
                  <span>{stats.name}</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed print:text-slate-700">
              {t.certificateFor}
            </p>

            {/* Stats Earned Strip */}
            <div className="flex items-center justify-center gap-6 py-3 border-y border-slate-800/80 max-w-md mx-auto text-xs font-bold text-slate-300 print:border-slate-300 print:text-black">
              <div>
                <span className="text-amber-400 font-black block text-base print:text-amber-800">
                  {formatNum(stats.xp, stats.arabicNumerals)}
                </span>
                <span className="text-[10px] text-slate-400">{t.xpLabel}</span>
              </div>
              <div className="h-6 w-px bg-slate-800 print:bg-slate-300"></div>
              <div>
                <span className="text-indigo-400 font-black block text-base print:text-indigo-800">
                  {formatNum(stats.level, stats.arabicNumerals)}
                </span>
                <span className="text-[10px] text-slate-400">{t.levelLabel}</span>
              </div>
              <div className="h-6 w-px bg-slate-800 print:bg-slate-300"></div>
              <div>
                <span className="text-orange-400 font-black block text-base print:text-orange-800">
                  {formatNum(stats.streak, stats.arabicNumerals)}
                </span>
                <span className="text-[10px] text-slate-400">{t.streakLabel}</span>
              </div>
            </div>

            {/* Signatures & Accreditation */}
            <div className="pt-6 grid grid-cols-2 gap-8 items-end max-w-lg mx-auto text-xs">
              <div>
                <div className="text-slate-400 print:text-slate-600 mb-1">{t.dateLabel}</div>
                <div className="font-bold text-slate-200 border-t border-slate-700 pt-1 print:text-black print:border-slate-400">
                  {currentDate}
                </div>
              </div>

              <div>
                <div className="font-serif italic text-amber-400 text-lg sm:text-xl font-bold mb-1 print:text-amber-800">
                  fawaz alokla
                </div>
                <div className="font-bold text-slate-200 border-t border-slate-700 pt-1 print:text-black print:border-slate-400">
                  {t.certifiedBy}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
