import React, { useState } from 'react';
import { 
  X, 
  Palette, 
  Volume2, 
  VolumeX, 
  Check, 
  Sparkles, 
  User, 
  Type, 
  Award,
  Sliders
} from 'lucide-react';
import { UserStats, Language, ThemeId } from '../types';
import { translations } from '../utils/translations';
import { sound } from '../utils/audio';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
  onUpdateStats: (updates: Partial<UserStats>) => void;
  onOpenCertificate: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  stats,
  lang,
  onLanguageChange,
  onUpdateStats,
  onOpenCertificate,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const [name, setName] = useState(stats.name);
  const [selectedAvatar, setSelectedAvatar] = useState(stats.avatar);
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(stats.theme);
  const [soundEnabled, setSoundEnabled] = useState(stats.soundEnabled);
  const [arabicNumerals, setArabicNumerals] = useState(stats.arabicNumerals);

  const avatars = ['🦊', '🦉', '🦁', '🚀', '🤖', '👑', '🧙‍♂️', '⚡', '🐱', '🌟', '🐼', '🦄'];

  const themes: Array<{ id: ThemeId; name: string; previewBg: string; border: string }> = [
    { id: 'cyber', name: t.themeCyber, previewBg: 'from-slate-950 via-indigo-950 to-slate-900', border: 'border-cyan-500' },
    { id: 'daylight', name: t.themeDaylight, previewBg: 'from-blue-950 via-slate-900 to-sky-950', border: 'border-blue-500' },
    { id: 'midnight', name: t.themeMidnight, previewBg: 'from-purple-950 via-slate-950 to-fuchsia-950', border: 'border-purple-500' },
    { id: 'emerald', name: t.themeEmerald, previewBg: 'from-emerald-950 via-slate-950 to-teal-950', border: 'border-emerald-500' },
    { id: 'chalkboard', name: t.themeChalkboard, previewBg: 'from-stone-950 via-zinc-950 to-stone-900', border: 'border-amber-500' },
  ];

  const handleSave = () => {
    sound.playClick();
    const trimmed = name.trim();
    onUpdateStats({
      name: trimmed || stats.name || 'Learner',
      avatar: selectedAvatar,
      theme: selectedTheme,
      soundEnabled,
      arabicNumerals,
    });
    sound.setEnabled(soundEnabled);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{t.customModalTitle}</h2>
              <span className="text-xs text-indigo-400">{t.authorCredit}</span>
            </div>
          </div>
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

        {/* Display Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            {t.learnerNameLabel}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            maxLength={25}
          />
        </div>

        {/* Avatar Picker */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            {t.avatarSelect}
          </label>
          <div className="grid grid-cols-6 gap-2">
            {avatars.map((av) => (
              <button
                key={av}
                onClick={() => {
                  sound.playClick();
                  setSelectedAvatar(av);
                }}
                className={`text-2xl p-3 rounded-xl border transition-all ${
                  selectedAvatar === av
                    ? 'bg-indigo-600/30 border-indigo-500 scale-110 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        {onLanguageChange && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              {lang === 'ar' ? 'لغة التطبيق' : lang === 'es' ? 'Idioma de la aplicación' : lang === 'fr' ? "Langue de l'application" : 'App Language'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { code: 'en' as Language, flag: '🇺🇸', label: 'English' },
                { code: 'ar' as Language, flag: '🇸🇦', label: 'العربية' },
                { code: 'es' as Language, flag: '🇪🇸', label: 'Español' },
                { code: 'fr' as Language, flag: '🇫🇷', label: 'Français' },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onLanguageChange(item.code);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all touch-manipulation ${
                    lang === item.code
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30 ring-2 ring-indigo-500/40'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-base">{item.flag}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Theme Picker */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            {t.themeSelect}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {themes.map((th) => (
              <button
                key={th.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedTheme(th.id);
                }}
                className={`p-3 rounded-xl border text-left rtl:text-right font-bold text-xs flex items-center justify-between transition-all bg-gradient-to-r ${th.previewBg} ${
                  selectedTheme === th.id
                    ? `${th.border} ring-2 ring-indigo-500/40 text-white`
                    : 'border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{th.name}</span>
                {selectedTheme === th.id && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Sound & Numerals Toggles */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-semibold text-slate-200">{t.soundEffectsLabel}</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 ${
                soundEnabled
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? t.soundOn : t.soundOff}</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-semibold text-slate-200">{t.arabicNumeralsLabel}</span>
            <button
              onClick={() => setArabicNumerals(!arabicNumerals)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                arabicNumerals
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {arabicNumerals ? '١ ٢ ٣ (مفعل)' : '1 2 3'}
            </button>
          </div>
        </div>

        {/* Certificate CTA */}
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-xs font-bold text-white">{t.certificateTitle}</div>
              <span className="text-[11px] text-amber-400/80">{t.certifiedBy}</span>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenCertificate();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors"
          >
            {lang === 'ar' ? 'عرض الشهادة' : 'View'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            {t.close}
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-colors"
          >
            {t.saveCustomizations}
          </button>
        </div>
      </div>
    </div>
  );
};
