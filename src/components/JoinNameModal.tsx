import React, { useState } from 'react';
import { 
  Sparkles, 
  UserCheck, 
  Check, 
  ArrowRight, 
  Globe2, 
  X,
  Crown,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { UserStats, Language } from '../types';
import { translations } from '../utils/translations';
import { sound } from '../utils/audio';

interface JoinNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentAvatar: string;
  lang: Language;
  onSaveName: (name: string, avatar: string, isCreator?: boolean) => void;
}

const AVATARS = ['🦊', '🦁', '🐯', '🚀', '🐼', '🦄', '⚡', '🦉', '🌟', '🐬', '👑', '🎯'];

export const JoinNameModal: React.FC<JoinNameModalProps> = ({
  isOpen,
  onClose,
  currentName,
  currentAvatar,
  lang,
  onSaveName,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const [typedName, setTypedName] = useState(
    currentName && currentName !== 'Learner' && currentName !== 'New Learner' ? currentName : ''
  );
  const [avatar, setAvatar] = useState(currentAvatar || '🦊');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = typedName.trim();
    if (!clean) {
      setErrorMsg(lang === 'ar' ? 'يرجى كتابة اسمك للمتابعة!' : 'Please enter your name to continue!');
      return;
    }

    sound.playLevelUp();
    const isFawaz = clean.toLowerCase() === 'fawaz alokla';
    onSaveName(clean, avatar, isFawaz);
  };

  const handleSetCreator = () => {
    sound.playClick();
    setTypedName('fawaz alokla');
    setAvatar('🦊');
    onSaveName('fawaz alokla', '🦊', true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overscroll-contain">
      <div className="bg-slate-900 border-2 border-indigo-500/60 rounded-3xl w-full max-w-lg max-h-[90dvh] overflow-y-auto shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 relative">
        {/* Ambient background glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 text-2xl">
              {avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  {lang === 'ar' ? 'انضمام مباشر' : 'Live Presence'}
                </span>
                <span className="text-xs text-slate-400">{t.authorCredit}</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
                {t.joinModalQuestion}
              </h2>
            </div>
          </div>
          {currentName && currentName !== 'Learner' && currentName !== 'New Learner' && (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Subtitle explanation */}
        <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-white mb-1">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{lang === 'ar' ? 'ستظهر فوراً في قائمة المتواجدين الحقيقيين!' : 'You will appear live in the active learners roster!'}</span>
          </div>
          <p>{t.joinModalSubtitle}</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>{t.learnerNameLabel}</span>
              <span className="text-[11px] text-slate-500 font-normal">
                {typedName.trim().length > 0 ? `${typedName.trim().length}/25` : ''}
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={typedName}
                autoFocus
                onChange={(e) => {
                  setTypedName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder={t.joinModalPlaceholder}
                maxLength={25}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border-2 border-slate-700 focus:border-indigo-500 text-white placeholder-slate-500 text-base font-bold transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              />
              {typedName.trim() && (
                <div className="absolute right-3 rtl:right-auto rtl:left-3 top-3.5 text-emerald-400">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
            {errorMsg && (
              <p className="text-xs font-semibold text-rose-400 animate-shake">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Avatar Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              {t.joinModalPickAvatar}
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => {
                    sound.playClick();
                    setAvatar(av);
                  }}
                  className={`text-2xl p-2.5 rounded-xl border transition-all transform hover:scale-110 active:scale-95 ${
                    avatar === av
                      ? 'bg-indigo-600/30 border-indigo-500 shadow-md shadow-indigo-500/30 ring-2 ring-indigo-400/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>{t.joinModalBtn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            {/* Creator Fast-track (Only fawaz alokla gets fawaz alokla) */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {lang === 'ar' ? 'هل أنت مطور الموقع؟' : 'Are you the site creator?'}
              </span>
              <button
                type="button"
                onClick={handleSetCreator}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 hover:underline transition-colors"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>fawaz alokla (Creator)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
