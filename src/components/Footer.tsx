import React from 'react';
import { Heart, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface FooterProps {
  lang: Language;
  onOpenCertificate: () => void;
  onSelectTab: (tab: string) => void;
  onOpenIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenCertificate,
  onSelectTab,
  onOpenIntro,
}) => {
  const t = translations[lang];

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black text-lg">
            ∑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">
                {t.appTitle}
              </span>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-500/30">
                {t.authorCredit}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-4 text-xs font-semibold flex-wrap justify-center">
          <button
            onClick={onOpenIntro}
            className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
          >
            {t.tourBtn}
          </button>
          <span>·</span>
          <button
            onClick={() => onSelectTab('timestable')}
            className="hover:text-white transition-colors"
          >
            {t.tabTimesTable}
          </button>
          <span>·</span>
          <button
            onClick={() => onSelectTab('aihelper')}
            className="hover:text-white transition-colors"
          >
            {t.tabAiHelper}
          </button>
          <span>·</span>
          <button
            onClick={() => onSelectTab('videos')}
            className="hover:text-white transition-colors"
          >
            {t.tabVideos}
          </button>
          <span>·</span>
          <button
            onClick={() => onSelectTab('live')}
            className="hover:text-white transition-colors"
          >
            {t.tabLivePlayers}
          </button>
        </div>

        {/* Credit Note */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span>Developed with passion</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span className="font-bold text-slate-300">by: fawaz alokla</span>
        </div>
      </div>
    </footer>
  );
};
