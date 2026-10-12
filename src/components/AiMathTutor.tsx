import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  BookOpen, 
  Copy, 
  Check, 
  Bot, 
  User, 
  Loader2,
  Lightbulb
} from 'lucide-react';
import { UserStats, Language } from '../types';
import { translations, formatNum, getLoc } from '../utils/translations';
import { sound } from '../utils/audio';

interface AiMathTutorProps {
  stats: UserStats;
  lang: Language;
  onAddXp: (amount: number, reason: string) => void;
  onIncrementSolved: () => void;
  onMissionAction?: (category: 'timestable' | 'speed' | 'quiz' | 'ai' | 'video' | 'general', count?: number) => void;
}

export const AiMathTutor: React.FC<AiMathTutorProps> = ({
  stats,
  lang,
  onAddXp,
  onIncrementSolved,
  onMissionAction,
}) => {
  const t = translations[lang];

  const [activeSubTab, setActiveSubTab] = useState<'solver' | 'chat' | 'generator'>('solver');

  // Solver State
  const [problemInput, setProblemInput] = useState('');
  const [solverLoading, setSolverLoading] = useState(false);
  const [solutionData, setSolutionData] = useState<any>(null);
  const [solverError, setSolverError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedAnswer, setCopiedAnswer] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content:
        lang === 'ar'
          ? 'مرحباً بك! أنا المعلم الذكي في منصة MathVerse بتصميم fawaz alokla. كيف أساعدك في فهم أي مسألة رياضية أو قاعدة اليوم؟'
          : "Hello! I am your MathVerse AI Tutor created by fawaz alokla. Ask me any math question, homework doubt, or concept you'd like to master!",
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Generator State
  const [genTopic, setGenTopic] = useState('Multiplication');
  const [genLevel, setGenLevel] = useState('Level 2');
  const [genLoading, setGenLoading] = useState(false);
  const [genProblem, setGenProblem] = useState<any>(null);
  const [genSelectedOpt, setGenSelectedOpt] = useState<number | null>(null);
  const [genAnswered, setGenAnswered] = useState(false);

  // Solver Sample Presets
  const samplePresets = [
    { en: 'Solve: 4x + 16 = 36', ar: 'حل المعادلة: ٤س + ١٦ = ٣٦' },
    { en: 'Why is 7 × 8 = 56? Explain mentally', ar: 'لماذا ٧ × ٨ = ٥٦؟ اشرحها ذهنياً' },
    { en: 'Add fractions: 3/4 + 2/5', ar: 'اجمع الكسرين: ٣/٤ + ٢/٥' },
    { en: 'Find hypotenuse if legs are 9 and 12', ar: 'أوجد الوتر إذا كان الضلعان ٩ و ١٢' },
    { en: 'How to find 25% discount on $140?', ar: 'كيف أحسب خصم ٢٥٪ على ١٤٠ ريال؟' },
  ];

  // Call Server-Side Gemini Solver Endpoint
  const handleSolve = async (customProblem?: string) => {
    const textToSolve = customProblem || problemInput;
    if (!textToSolve.trim()) return;

    sound.playClick();
    setSolverLoading(true);
    setSolverError(null);
    setSolutionData(null);

    try {
      const response = await fetch('/api/ai/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: textToSolve,
          language: lang,
          level: `Level ${stats.level}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      const data = await response.json();
      setSolutionData(data);
      sound.playLevelUp();
      onAddXp(35, 'AI Problem Solved & Studied');
      onIncrementSolved();
      onMissionAction?.('ai', 1);
      onMissionAction?.('general', 1);
    } catch (err: any) {
      console.error(err);
      setSolverError(
        lang === 'ar'
          ? 'تعذر الاتصال بالذكاء الاصطناعي حالياً. يرجى المحاولة مجدداً بعد لحظات.'
          : 'Could not connect to Gemini AI Tutor. Please try again in a moment.'
      );
    } finally {
      setSolverLoading(false);
    }
  };

  // Text-to-speech for solution steps
  const toggleSpeech = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!solutionData) return;

    const speechText = `${solutionData.summary || ''}. ${
      solutionData.steps
        ? solutionData.steps.map((s: any) => `${s.title}: ${s.detail}`).join('. ')
        : ''
    }. Final answer: ${solutionData.finalAnswer || ''}`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Send Chat message
  const handleSendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput.trim();
    setChatInput('');
    sound.playClick();

    const newMsgs = [...chatMessages, { role: 'user' as const, content: userText }];
    setChatMessages(newMsgs);
    setChatLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs,
          language: lang,
        }),
      });

      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            data.reply ||
            (lang === 'ar' ? 'ممتاز! ماذا تود أن نسأل عنه تالياً؟' : 'Great thinking! What next?'),
        },
      ]);
      sound.playCorrect();
      onAddXp(15, 'Engaged with AI Tutor');
      onMissionAction?.('ai', 1);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            lang === 'ar'
              ? 'حدث خطأ غير متوقع. يرجى إعادة إرسال السؤال.'
              : 'Encountered an issue reaching the assistant. Please ask again.',
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Generate Practice Problem
  const handleGenerateProblem = async () => {
    sound.playClick();
    setGenLoading(true);
    setGenProblem(null);
    setGenSelectedOpt(null);
    setGenAnswered(false);

    try {
      const response = await fetch('/api/ai/practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: genTopic,
          level: genLevel,
          language: lang,
        }),
      });

      const data = await response.json();
      setGenProblem(data);
    } catch (err) {
      console.error(err);
    } finally {
      setGenLoading(false);
    }
  };

  const handleGenAnswer = (idx: number) => {
    if (genAnswered || !genProblem) return;
    setGenSelectedOpt(idx);
    setGenAnswered(true);

    if (idx === genProblem.correctIndex) {
      sound.playCorrect();
      onAddXp(30, 'AI Practice Solved');
      onIncrementSolved();
      onMissionAction?.('ai', 1);
      onMissionAction?.('general', 1);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              <span>{t.aiHelperTitle}</span>
              <span>·</span>
              <span className="text-slate-400">{t.authorCredit}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.aiHelperTitle}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              {t.aiHelperSubtitle}
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                sound.playClick();
                setActiveSubTab('solver');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeSubTab === 'solver'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.aiTabSolver}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveSubTab('chat');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeSubTab === 'chat'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>{t.aiTabChat}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveSubTab('generator');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeSubTab === 'generator'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.aiTabGenerator}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: STEP-BY-STEP SOLVER */}
      {activeSubTab === 'solver' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'ar' ? 'اكتب أو الصق المسألة الرياضية المراد شرحها:' : 'Enter any math problem or equation:'}
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={problemInput}
                  onChange={(e) => setProblemInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSolve();
                  }}
                  placeholder={t.aiInputPlaceholder}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />

                <button
                  onClick={() => handleSolve()}
                  disabled={solverLoading || !problemInput.trim()}
                  className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  {solverLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.aiSolving}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                      <span>{t.aiSolveBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Sample Presets */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-semibold">
                {lang === 'ar' ? 'أو جرب إحدى المسائل المقترحة:' : 'Or try one of these popular problems:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const text = getLoc(preset, lang);
                      setProblemInput(text);
                      handleSolve(text);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    {getLoc(preset, lang)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Solver Error Display */}
          {solverError && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm">
              {solverError}
            </div>
          )}

          {/* Render Solution Card */}
          {solutionData && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
              {/* Header with copy & audio button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                    {t.aiSummary}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {solutionData.summary || problemInput}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleSpeech}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border ${
                      isSpeaking
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>{t.aiStopAudio}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-cyan-400" />
                        <span>{t.aiListenAudio}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Final Answer Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-indigo-900/50 to-slate-900/80 border border-indigo-500/40 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                    {t.aiFinalAnswer}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">
                    {solutionData.finalAnswer}
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(solutionData.finalAnswer || '');
                    setCopiedAnswer(true);
                    setTimeout(() => setCopiedAnswer(false), 2000);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 text-xs font-bold border border-indigo-500/30 transition-colors flex items-center gap-1.5"
                >
                  {copiedAnswer ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedAnswer ? (lang === 'ar' ? 'تم النسخ' : 'Copied!') : (lang === 'ar' ? 'نسخ الجواب' : 'Copy Answer')}</span>
                </button>
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  {t.aiStepsTitle}
                </h4>

                <div className="space-y-3">
                  {solutionData.steps &&
                    solutionData.steps.map((step: any, sIdx: number) => (
                      <div
                        key={sIdx}
                        className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-4"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-black text-sm flex items-center justify-center shrink-0">
                          {formatNum(step.stepNumber || sIdx + 1, stats.arabicNumerals)}
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <h5 className="font-bold text-white text-sm sm:text-base">
                            {step.title}
                          </h5>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {step.detail}
                          </p>
                          {step.math && (
                            <div className="mt-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs sm:text-sm inline-block">
                              {step.math}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Rule & Pro Tip Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                {solutionData.ruleOrConcept && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                      {t.aiRuleTitle}
                    </span>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      {solutionData.ruleOrConcept}
                    </p>
                  </div>
                )}

                {solutionData.proTip && (
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      {t.aiProTipTitle}
                    </span>
                    <p className="text-amber-200/90 text-xs sm:text-sm">
                      {solutionData.proTip}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: INTERACTIVE AI CHAT */}
      {activeSubTab === 'chat' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-xl">
                👨‍🏫
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">
                  {lang === 'ar' ? 'المعلم الذكي فواز (Dr. Fawaz Math AI)' : "Dr. Fawaz's AI Math Assistant"}
                </h3>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                  {lang === 'ar' ? 'جاهز للإجابة والشرح' : 'Online & ready to teach'}
                </span>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="space-y-4 max-h-[460px] overflow-y-auto p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            {chatMessages.map((msg, idx) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-sm shrink-0">
                      ∑
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-slate-900 border border-slate-800 text-slate-200'
                        : 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-sm shrink-0">
                      {stats.avatar}
                    </div>
                  )}
                </div>
              );
            })}

            {chatLoading && (
              <div className="flex gap-3 items-center text-xs text-slate-400 p-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>{lang === 'ar' ? 'المعلم يكتب الشرح...' : 'Dr. Fawaz AI is thinking...'}</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendChat();
              }}
              placeholder={t.aiChatPlaceholder}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSendChat}
              disabled={chatLoading || !chatInput.trim()}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
              <span>{t.aiSend}</span>
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 3: PRACTICE GENERATOR */}
      {activeSubTab === 'generator' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">{t.aiTabGenerator}</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {lang === 'ar'
                  ? 'اطلب من الذكاء الاصطناعي توليد مسألة تفاعلية فريدة في أي موضوع تريده!'
                  : 'Let Gemini AI synthesize unlimited practice problems customized for your skill level.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={genTopic}
                onChange={(e) => setGenTopic(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none"
              >
                <option value="Multiplication">Multiplication & Times Tables</option>
                <option value="Fractions">Fractions & Decimals</option>
                <option value="Linear Equations">Pre-Algebra & Equations</option>
                <option value="Geometry">Geometry & Right Triangles</option>
                <option value="Word Problems">Math Word Problems</option>
              </select>

              <button
                onClick={handleGenerateProblem}
                disabled={genLoading}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
              >
                {genLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{genLoading ? t.aiGenerating : t.aiGenerateBtn}</span>
              </button>
            </div>
          </div>

          {/* Generated Question Display */}
          {genProblem && (
            <div className="p-6 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  {lang === 'ar' ? 'المسألة المولدة:' : 'Generated Challenge:'}
                </span>
                <p className="text-lg sm:text-xl font-bold text-white">
                  {genProblem.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {genProblem.options &&
                  genProblem.options.map((opt: string, idx: number) => {
                    const isSelected = genSelectedOpt === idx;
                    const isCorrect = idx === genProblem.correctIndex;

                    let btnClass = 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800';
                    if (genAnswered) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-600/30 text-emerald-200 border-emerald-500';
                      } else if (isSelected) {
                        btnClass = 'bg-rose-600/30 text-rose-200 border-rose-500';
                      } else {
                        btnClass = 'opacity-50 border-slate-800 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={genAnswered}
                        onClick={() => handleGenAnswer(idx)}
                        className={`p-4 rounded-xl text-left rtl:text-right font-bold text-sm sm:text-base border transition-all flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {genAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      </button>
                    );
                  })}
              </div>

              {/* Explanation & Hint */}
              {genAnswered && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 animate-fade-in">
                  <div className="font-bold text-white text-sm">
                    {genSelectedOpt === genProblem.correctIndex ? (
                      <span className="text-emerald-400">{t.correct} (+30 XP)</span>
                    ) : (
                      <span className="text-rose-400">{t.incorrect}</span>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    {genProblem.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
