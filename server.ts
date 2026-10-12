import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI with required User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Step-by-Step Problem Solver Endpoint
app.post('/api/ai/solve', async (req, res) => {
  try {
    const { problem, language = 'en', level = 'general' } = req.body;

    if (!problem || typeof problem !== 'string' || problem.trim().length === 0) {
      return res.status(400).json({ error: 'Math problem is required.' });
    }

    const isArabic = language === 'ar';
    const systemPrompt = isArabic
      ? `أنت المعلم الذكي الرياضي في منصة MathVerse التي صممها (fawaz alokla). 
مهمتك شرح هذه المسألة الرياضية للطالب بأسلوب تعليمي مبسط ومحفز.
المستوى الدراسي: ${level}
المطلوب منك تقديم إجابة بتنسيق JSON يحتوي على:
{
  "summary": "ملخص سريع للمسألة وما نحاول إيجاده",
  "finalAnswer": "النتيجة النهائية الواضحة",
  "steps": [
    {"stepNumber": 1, "title": "عنوان الخطوة", "detail": "شرح تفصيلي ومبسط", "math": "المعادلة أو العملية الحسابية"},
    ...
  ],
  "ruleOrConcept": "القاعدة أو القانون الرياضي المستخدم",
  "proTip": "نصيحة ذهبية للحساب الذهني أو تجنب الأخطاء الشائعة",
  "encouragement": "كلمة تشجيعية للطالب"
}
تأكد أن الشرح باللغة العربية الواضحة وبشكل رياضي دقيق.`
      : `You are the friendly expert Math AI Tutor in MathVerse created by (fawaz alokla).
Your mission is to teach and explain this math problem step-by-step for a student at level: ${level}.
Return your explanation strictly in valid JSON format with the following structure:
{
  "summary": "Brief summary of what we are solving",
  "finalAnswer": "The clean final answer (e.g. x = 5 or 56)",
  "steps": [
    {"stepNumber": 1, "title": "Step 1 title", "detail": "Clear, friendly explanation", "math": "The calculation/equation"},
    ...
  ],
  "ruleOrConcept": "The fundamental mathematical principle or formula used",
  "proTip": "A mental math shortcut, mnemonic, or pitfall to avoid",
  "encouragement": "Encouraging closing words from your tutor"
}
Ensure accurate arithmetic and pedagogical clarity.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Solve and explain this math problem:\n${problem}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const textOutput = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(textOutput);
    } catch {
      parsedData = {
        summary: problem,
        finalAnswer: 'See step-by-step solution',
        steps: [{ stepNumber: 1, title: 'Explanation', detail: textOutput, math: problem }],
        ruleOrConcept: 'Arithmetic & Problem Solving',
        proTip: 'Practice similar problems to build muscle memory!',
        encouragement: 'Great effort tackling this problem!',
      };
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Error solving math problem with Gemini:', error);
    res.status(500).json({
      error: 'Failed to generate math solution. Please check your connection or try again.',
      details: error?.message || 'Unknown error',
    });
  }
});

// Interactive AI Tutor Chat endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, language = 'en', userQuestion } = req.body;

    const isArabic = language === 'ar';
    const systemPrompt = isArabic
      ? `أنت "المعلم الذكي فواز" (Dr. Fawaz Math AI) في منصة MathVerse التي طورها fawaz alokla.
أنت معلم رياضيات ودود، صبور، يشرح المسائل بلغة سهلة مع ضرب أمثلة من الحياة اليومية.
إذا سألك الطالب سؤالاً رياضياً، أعطه تلميحاً أولاً ثم ساعده في الوصول للحل خطوة بخطوة.
لا تعطه الحل الجاهز فوراً إلا إذا طلب ذلك بوضوح، وشجعه دائماً بنقاط وعبارات حماسية!`
      : `You are "Dr. Fawaz's AI Math Assistant" in MathVerse, an educational math platform created by (fawaz alokla).
You are a warm, enthusiastic, and pedagogical math mentor.
Help students understand concepts, guide them with intuitive analogies (slices of pizza, balance scales, racing times), give hints, and celebrate their learning progress.
Always be concise, clear, and formatted with clean bullet points or steps when doing calculations.`;

    const contents = [];
    if (Array.isArray(messages) && messages.length > 0) {
      for (const msg of messages) {
        contents.push({
          role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    } else if (userQuestion) {
      contents.push({
        role: 'user',
        parts: [{ text: userQuestion }],
      });
    } else {
      return res.status(400).json({ error: 'No message provided' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || (isArabic ? 'أحسنت المحاولة! ما السؤال التالي؟' : 'Good thinking! What would you like to explore next?');
    res.json({ reply });
  } catch (error: any) {
    console.error('Error in AI chat endpoint:', error);
    res.status(500).json({
      error: 'AI assistant is temporarily unavailable. Please try again.',
      reply: req.body.language === 'ar'
        ? 'عذراً، المعلم الذكي يحتاج لحظة للاتصال. تفضل بتكرار سؤالك!'
        : 'Sorry, the AI tutor encountered a brief hiccup. Please try asking again!',
    });
  }
});

// Generate Custom Practice Questions
app.post('/api/ai/practice', async (req, res) => {
  try {
    const { topic = 'multiplication', level = 'Level 2', language = 'en' } = req.body;
    const isArabic = language === 'ar';

    const systemPrompt = isArabic
      ? `أنشئ مسألة تدريبية ممتازة في موضوع: ${topic} لمستوى: ${level}.
أرجع النتيجة بصيغة JSON فقط:
{
  "question": "نص المسألة باللغة العربية",
  "options": ["الخيار 1", "الخيار 2", "الخيار 3", "الخيار 4"],
  "correctIndex": 0,
  "explanation": "شرح مفصل لطريقة الحل الصحيحة",
  "hint": "تلميح ذكي للحل"
}`
      : `Generate an engaging practice problem about: ${topic} for student level: ${level}.
Return strictly JSON with:
{
  "question": "Problem text in English",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctIndex": 0,
  "explanation": "Clear explanation of why this answer is right",
  "hint": "Helpful hint without giving the direct answer"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Generate 1 unique practice problem for ${topic} at ${level}.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const textOutput = response.text || '{}';
    let questionData;
    try {
      questionData = JSON.parse(textOutput);
    } catch {
      questionData = {
        question: isArabic ? 'كم حاصل ضرب 8 × 7؟' : 'What is 8 × 7?',
        options: ['48', '54', '56', '64'],
        correctIndex: 2,
        explanation: isArabic ? '8 × 7 = 56 (يمكن حسابها كـ 8 × 5 = 40 ثم إضافة 8 × 2 = 16)' : '8 × 7 = 56 (Can be calculated as 8 × 5 = 40 plus 8 × 2 = 16 = 56)',
        hint: isArabic ? 'تذكر جدول ضرب 8 أو 7' : 'Think of 7 × 7 = 49, then add 7 more!',
      };
    }

    res.json(questionData);
  } catch (error: any) {
    console.error('Error generating practice problem:', error);
    res.status(500).json({ error: 'Failed to generate practice problem' });
  }
});

// Real-Time Active Learners In-Memory Store (Only genuine connected users)
interface ActiveLearnerRecord {
  id: string;
  name: string;
  avatar: string;
  country: { en: string; ar: string };
  flag: string;
  activity: { en: string; ar: string };
  xp: number;
  streak: number;
  status: 'online' | 'in_quiz' | 'watching_video' | 'in_duel';
  lastSeen: number;
  isRealUser: boolean;
}

const realLearnersMap = new Map<string, ActiveLearnerRecord>();
const liveActivityEvents: Array<{ id: string; textEn: string; textAr: string; time: string; icon: string }> = [];

// POST /api/players/heartbeat: Real connected learner registers presence & activity
app.post('/api/players/heartbeat', (req, res) => {
  try {
    const {
      id,
      name = 'Learner',
      avatar = '🦊',
      country = { en: 'Global', ar: 'عالمي' },
      flag = '🌐',
      activity = { en: 'Learning Math', ar: 'يتعلم الرياضيات' },
      xp = 0,
      streak = 1,
      status = 'online',
    } = req.body;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Valid player ID is required' });
    }

    const isNew = !realLearnersMap.has(id);

    realLearnersMap.set(id, {
      id,
      name,
      avatar,
      country,
      flag,
      activity,
      xp: Number(xp) || 0,
      streak: Number(streak) || 1,
      status,
      lastSeen: Date.now(),
      isRealUser: true,
    });

    if (isNew) {
      liveActivityEvents.unshift({
        id: `event-${Date.now()}`,
        textEn: `${name} ${flag} joined MathVerse!`,
        textAr: `${name} ${flag} انضم الآن إلى ماث فيرس!`,
        time: 'Just now',
        icon: '👋',
      });
      if (liveActivityEvents.length > 20) liveActivityEvents.pop();
    }

    res.json({
      success: true,
      activeCount: realLearnersMap.size,
      realCount: realLearnersMap.size,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record learner heartbeat' });
  }
});

// POST /api/players/activity: Real learner broadcasts an actual math event
app.post('/api/players/activity', (req, res) => {
  try {
    const { id, name, flag = '🌟', textEn, textAr, icon = '⚡' } = req.body;
    if (!textEn && !textAr) {
      return res.status(400).json({ error: 'Activity text required' });
    }

    liveActivityEvents.unshift({
      id: `act-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      textEn: textEn || `${name} solved a problem!`,
      textAr: textAr || `${name} حل مسألة رياضية بنجاح!`,
      time: 'Just now',
      icon: icon || '⚡',
    });

    if (liveActivityEvents.length > 25) liveActivityEvents.pop();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record activity' });
  }
});

// GET /api/players/live: Get ONLY real active connected learners
app.get('/api/players/live', (req, res) => {
  const now = Date.now();
  // Prune learners who haven't sent a heartbeat in 30 seconds
  for (const [key, learner] of realLearnersMap.entries()) {
    if (now - learner.lastSeen > 30000) {
      realLearnersMap.delete(key);
    }
  }

  const realList = Array.from(realLearnersMap.values()).map((l) => ({
    id: l.id,
    name: l.name,
    avatar: l.avatar,
    country: l.country,
    flag: l.flag,
    activity: l.activity,
    xp: l.xp,
    streak: l.streak,
    status: l.status,
    lastActionTime: 'Live now',
    isRealUser: true,
  }));

  const realTotal = realLearnersMap.size;

  res.json({
    activeCount: realTotal,
    realCount: realTotal,
    learners: realList,
    recentEvents: liveActivityEvents.slice(0, 10),
    timestamp: new Date().toISOString(),
  });
});

// Server setup for Vite development or production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback for any client route in dev mode
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`MathVerse server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
