import { MathLevelData, LivePlayer, Badge, RapidQuizChallenge } from '../types';

export const mathLevels: MathLevelData[] = [
  {
    id: 'level-1',
    number: 1,
    title: { en: 'Level 1: Foundations & Core Arithmetic', ar: 'المستوى ١: الأساسيات والعمليات الحسابية' },
    subtitle: { en: 'Addition, Subtraction & Number Sense', ar: 'الجمع، الطرح والحس العددي السريع' },
    description: {
      en: 'Build an unshakable foundation with place values, mental addition techniques, and real-world number sense.',
      ar: 'ابنِ أساساً متيناً في فهم المنازل العشرية، حيل الجمع الذهني، واستيعاب الأرقام بسلاسة.',
    },
    badgeName: { en: 'Arithmetic Pioneer', ar: 'رائد الحساب' },
    requiredXp: 0,
    accentColor: '#3b82f6',
    topics: [
      {
        id: 'place-value',
        title: { en: 'Place Value & Mental Regrouping', ar: 'القيمة المنزلية وإعادة التجميع الذهني' },
        summary: {
          en: 'Breaking numbers into tens and ones makes adding complex multi-digit numbers instantaneous in your head.',
          ar: 'تفكيك الأعداد إلى عشرات وآحاد يجعل جمع الأرقام الكبيرة عملية ذهنية سريعة وسهلة.',
        },
        keyRule: {
          en: 'Split & Combine: 47 + 38 = (40 + 30) + (7 + 8) = 70 + 15 = 85',
          ar: 'التفكيك والدمج: ٤٧ + ٣٨ = (٤٠ + ٣٠) + (٧ + ٨) = ٧٠ + ١٥ = ٨٥',
        },
        example: {
          problem: { en: 'Calculate 56 + 29 mentally', ar: 'احسب ذهنياً: ٥٦ + ٢٩' },
          steps: {
            en: [
              'Notice 29 is just 30 minus 1.',
              'Add 56 + 30 = 86.',
              'Subtract 1 to adjust: 86 - 1 = 85.',
            ],
            ar: [
              'لاحظ أن ٢٩ قريبة جداً من ٣٠ (أقل بواحد).',
              'اجمع ٥٦ + ٣٠ = ٨٦.',
              'اطرح ١ للتعويض: ٨٦ - ١ = ٨٥.',
            ],
          },
          answer: { en: '85', ar: '٨٥' },
        },
      },
      {
        id: 'subtraction-distance',
        title: { en: 'Subtraction as Distance on Number Line', ar: 'الطرح كمسافة على خط الأعداد' },
        summary: {
          en: 'Rather than borrowing, think of subtraction as the distance between two numbers on a number line.',
          ar: 'بدلاً من الاستلاف التقليدي، فكر في الطرح كمسافة خطية بين رقمين على خط الأعداد.',
        },
        keyRule: {
          en: 'Count up from smaller to larger: 83 - 57 is 3 (to 60) + 23 = 26.',
          ar: 'العد تصاعدياً: ٨٣ - ٥٧ = ٣ (للوصول إلى ٦٠) + ٢٣ = ٢٦.',
        },
        example: {
          problem: { en: 'Find 92 - 68', ar: 'أوجد ناتج ٩٢ - ٦٨' },
          steps: {
            en: [
              'From 68 jump +2 to reach 70.',
              'From 70 jump +22 to reach 92.',
              'Total distance = 2 + 22 = 24.',
            ],
            ar: [
              'من ٦٨ اقفز +٢ للوصول إلى ٧٠.',
              'من ٧٠ اقفز +٢٢ للوصول إلى ٩٢.',
              'المسافة الكلية = ٢ + ٢٢ = ٢٤.',
            ],
          },
          answer: { en: '24', ar: '٢٤' },
        },
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: { en: 'What is the sum of 48 + 37 using regrouping?', ar: 'ما ناتج جمع ٤٨ + ٣٧ باستخدام التجميع؟' },
        options: { en: ['85', '75', '83', '87'], ar: ['٨٥', '٧٥', '٨٣', '٨٧'] },
        correctIndex: 0,
        explanation: {
          en: '40 + 30 = 70. 8 + 7 = 15. 70 + 15 = 85.',
          ar: '٤٠ + ٣٠ = ٧٠. ٨ + ٧ = ١٥. ٧٠ + ١٥ = ٨٥.',
        },
        hint: {
          en: 'Add the tens first (40+30), then the ones (8+7).',
          ar: 'اجمع العشرات أولاً ثم الآحاد.',
        },
      },
      {
        id: 'q1-2',
        question: { en: 'What is 104 - 67?', ar: 'ما ناتج ١٠٤ - ٦٧؟' },
        options: { en: ['47', '37', '39', '34'], ar: ['٤٧', '٣٧', '٣٩', '٣٤'] },
        correctIndex: 1,
        explanation: {
          en: 'Count up: 67 to 100 is 33. Plus 4 more = 37.',
          ar: 'العد تصاعدياً: من ٦٧ إلى ١٠٠ الفرق ٣٣، بالإضافة إلى ٤ = ٣٧.',
        },
        hint: {
          en: 'From 67 to 100 is 33.',
          ar: 'كم تحتاج ٦٧ لتصل إلى ١٠٠؟',
        },
      },
      {
        id: 'q1-3',
        question: { en: 'Which digit is in the tens place in 4,892?', ar: 'ما الرقم الذي يقع في منزلة العشرات في العدد ٤٨٩٢؟' },
        options: { en: ['4', '8', '9', '2'], ar: ['٤', '٨', '٩', '٢'] },
        correctIndex: 2,
        explanation: {
          en: '2 is ones, 9 is tens (worth 90), 8 is hundreds, 4 is thousands.',
          ar: '٢ آحاد، ٩ عشرات، ٨ مئات، ٤ آلاف.',
        },
        hint: {
          en: 'Tens is the second digit from the right.',
          ar: 'منزلة العشرات هي الرقم الثاني من اليمين.',
        },
      },
    ],
    videoLesson: {
      id: 'vid-1',
      title: { en: 'Mental Math Secrets: Adding & Subtracting in Your Head', ar: 'أسرار الحساب الذهني: الجمع والطرح السريع بالرأس' },
      topic: { en: 'Addition & Subtraction Mental Strategies', ar: 'استراتيجيات الجمع والطرح الذهني' },
      duration: '7:42',
      videoUrl: 'https://www.youtube-nocookie.com/embed/fD3aK5i8W-U',
      summary: {
        en: 'Learn how math champions calculate large additions and subtractions instantly using friendly number benchmarks.',
        ar: 'تعلم كيف يحسب أبطال الرياضيات عمليات الجمع والطرح الكبيرة بلمح البصر باستخدام الأعداد الصديقة.',
      },
      keyPoints: {
        en: [
          'Round numbers to nearest 10 or 100, then adjust the difference.',
          'Left-to-right calculation is faster for mental math than paper algorithms.',
          'Double check using inverse operations.',
        ],
        ar: [
          'قرب الأرقام إلى أقرب ١٠ أو ١٠٠ ثم عدل الفرق.',
          'الحساب من اليسار إلى اليمين أسرع ذهنياً من خوارزميات الورقة.',
          'تحقق دائماً بالعملية العكسية.',
        ],
      },
      practiceQuestions: [
        {
          id: 'v1-p1',
          question: { en: 'Solve mentally: 78 + 45', ar: 'احسب ذهنياً: ٧٨ + ٤٥' },
          options: { en: ['113', '123', '128', '118'], ar: ['١١٣', '١٢٣', '١٢٨', '١١٨'] },
          correctIndex: 1,
          explanation: { en: '78 + 40 = 118, 118 + 5 = 123.', ar: '٧٨ + ٤٠ = ١١٨، ١١٨ + ٥ = ١٢٣.' },
          hint: { en: 'Add 40 first, then 5.', ar: 'اجمع ٤٠ أولاً ثم ٥.' },
        },
      ],
    },
  },
  {
    id: 'level-2',
    number: 2,
    title: { en: 'Level 2: Times Tables & Multiplication Power', ar: 'المستوى ٢: قوة جداول الضرب والقسمة' },
    subtitle: { en: 'Factors 1-10, Arrays & Division Connections', ar: 'جداول الضرب من ١ إلى ١٠ والمصفوفات البصرية' },
    description: {
      en: 'Master every single times table from 1 to 10 with geometric dot arrays, commutativity tricks, and division inverse logic.',
      ar: 'أتقن جميع جداول الضرب من ١ إلى ١٠ بنماذج بصرية هندسية وحيل ذهنية ممتعة تجعل الحفظ طبيعياً وسريعاً.',
    },
    badgeName: { en: 'Multiplication Maestro', ar: 'مايسترو الضرب' },
    requiredXp: 100,
    accentColor: '#10b981',
    topics: [
      {
        id: 'multiplication-array',
        title: { en: 'Multiplication as Rows × Columns', ar: 'الضرب كصفوف × أعمدة' },
        summary: {
          en: 'Multiplication is repeated addition organized in a grid. 6 × 7 means 6 rows of 7 dots, totaling 42 dots.',
          ar: 'الضرب هو جمع متكرر منظم في مصفوفة؛ ٦ × ٧ تعني ٦ صفوف في كل منها ٧ نقاط، بإجمالي ٤٢ نقطة.',
        },
        keyRule: {
          en: 'Commutative Property: a × b = b × a (7 × 8 is identical to 8 × 7).',
          ar: 'خاصية الإبدال: أ × ب = ب × أ (٧ × ٨ تساوي تماماً ٨ × ٧).',
        },
        example: {
          problem: { en: 'How to calculate 9 × 8 easily?', ar: 'كيف تحسب ٩ × ٨ بطريقة سهلة؟' },
          steps: {
            en: [
              'Multiply by 10 first: 10 × 8 = 80.',
              'Subtract one group of 8: 80 - 8 = 72.',
            ],
            ar: [
              'اضرب في ١٠ أولاً: ١٠ × ٨ = ٨٠.',
              'اطرح مجموعة واحدة من ٨: ٨٠ - ٨ = ٧٢.',
            ],
          },
          answer: { en: '72', ar: '٧٢' },
        },
      },
      {
        id: 'multiplication-tricks',
        title: { en: 'The Secret Tricks of 6, 7, 8 & 9', ar: 'أسرار جداول ٦، ٧، ٨، ٩' },
        summary: {
          en: 'Split difficult factors using known anchors: 7 × 6 = (5 × 6) + (2 × 6) = 30 + 12 = 42.',
          ar: 'قسم العوامل الصعبة إلى أرقام معروفة: ٧ × ٦ = (٥ × ٦) + (٢ × ٦) = ٣٠ + ١٢ = ٤٢.',
        },
        keyRule: {
          en: 'Distributive Law: a × (b + c) = (a × b) + (a × c)',
          ar: 'خاصية التوزيع: أ × (ب + ج) = (أ × ب) + (أ × ج)',
        },
        example: {
          problem: { en: 'What is 8 × 7?', ar: 'كم حاصل ٨ × ٧؟' },
          steps: {
            en: [
              'Remember the rhyme: 5, 6, 7, 8! -> 56 = 7 × 8.',
              'Or split: 8 × 7 = (8 × 5) + (8 × 2) = 40 + 16 = 56.',
            ],
            ar: [
              'تذكر التتابع: ٥، ٦، ٧، ٨! أي ٥٦ = ٧ × ٨.',
              'أو وزع: ٨ × ٧ = (٨ × ٥) + (٨ × ٢) = ٤٠ + ١٦ = ٥٦.',
            ],
          },
          answer: { en: '56', ar: '٥٦' },
        },
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: { en: 'What is 7 × 8?', ar: 'ما حاصل ضرب ٧ × ٨؟' },
        options: { en: ['54', '56', '58', '64'], ar: ['٥٤', '٥٦', '٥٨', '٦٤'] },
        correctIndex: 1,
        explanation: { en: '7 × 8 = 56. (Remember 5, 6, 7, 8 -> 56 = 7 × 8)', ar: '٧ × ٨ = ٥٦.' },
        hint: { en: 'Think: 7 × 7 = 49, then add 7 more.', ar: '٧ × ٧ = ٤٩، ثم أضف ٧.' },
      },
      {
        id: 'q2-2',
        question: { en: 'What is 63 ÷ 9?', ar: 'ما ناتج ٦٣ ÷ ٩؟' },
        options: { en: ['6', '7', '8', '9'], ar: ['٦', '٧', '٨', '٩'] },
        correctIndex: 1,
        explanation: { en: 'Since 7 × 9 = 63, 63 ÷ 9 = 7.', ar: 'بما أن ٧ × ٩ = ٦٣، فإن ٦٣ ÷ ٩ = ٧.' },
        hint: { en: 'What number multiplied by 9 gives 63?', ar: 'ما العدد الذي إذا ضربته في ٩ ينتج ٦٣؟' },
      },
      {
        id: 'q2-3',
        question: { en: 'Which property explains why 6 × 9 = 9 × 6?', ar: 'أي خاصية تفسر أن ٦ × ٩ = ٩ × ٦؟' },
        options: {
          en: ['Commutative Property', 'Associative Property', 'Identity Property', 'Zero Property'],
          ar: ['خاصية الإبدال', 'خاصية التجميع', 'خاصية العنصر المحايد', 'خاصية الضرب في صفر'],
        },
        correctIndex: 0,
        explanation: {
          en: 'The commutative property states that changing the order of factors does not change the product.',
          ar: 'خاصية الإبدال تنص على أن تغيير ترتيب العوامل لا يغير ناتج الضرب.',
        },
        hint: { en: 'Swapping positions is commuting.', ar: 'تبديل الأماكن يسمى إبدالاً.' },
      },
    ],
    videoLesson: {
      id: 'vid-2',
      title: { en: 'Multiplication & 1-10 Times Tables Secrets Made Crystal Clear', ar: 'أسرار جداول الضرب من ١ إلى ١٠ بطريقة بصرية ذكية' },
      topic: { en: 'Visual Times Table Patterns & Tricks', ar: 'أنماط وحيل جداول الضرب البصرية' },
      duration: '9:15',
      videoUrl: 'https://www.youtube-nocookie.com/embed/MVZkx45389w',
      summary: {
        en: 'Discover how the 1-10 times table isn’t about dry memorization, but beautiful geometric symmetries and finger tricks.',
        ar: 'اكتشف كيف أن جداول الضرب ليست حفظاً أصم، بل أنماط هندسية جميلة وحيل حسابية ممتعة.',
      },
      keyPoints: {
        en: [
          'The 9s table digits always sum to 9 (e.g., 9×4=36 -> 3+6=9).',
          'Multiplying by 4 is simply doubling twice (e.g., 7 doubled is 14, doubled again is 28).',
          'Multiplying by 5 always ends in 0 or 5 (half of 10).',
        ],
        ar: [
          'مجموع أرقام نواتج جدول ٩ يساوي دائماً ٩ (مثال: ٩ × ٤ = ٣٦ -> ٣ + ٦ = ٩).',
          'الضرب في ٤ هو مضاعفة العدد مرتين (٧ تتضاعف إلى ١٤ ثم إلى ٢٨).',
          'الضرب في ٥ ينتهي دائماً بـ ٠ أو ٥.',
        ],
      },
      practiceQuestions: [
        {
          id: 'v2-p1',
          question: { en: 'Using the double-double rule, what is 4 × 16?', ar: 'باستخدام قاعدة المضاعفة مرتين، كم ناتج ٤ × ١٦؟' },
          options: { en: ['64', '54', '48', '72'], ar: ['٦٤', '٥٤', '٤٨', '٧٢'] },
          correctIndex: 0,
          explanation: { en: 'Double 16 is 32. Double 32 is 64.', ar: 'ضعف ١٦ هو ٣٢، وضعف ٣٢ هو ٦٤.' },
          hint: { en: 'Double 16, then double the result.', ar: 'ضاعف ١٦ ثم ضاعف الناتج مجدداً.' },
        },
      ],
    },
  },
  {
    id: 'level-3',
    number: 3,
    title: { en: 'Level 3: Fractions, Decimals & Percentages', ar: 'المستوى ٣: الكسور، العشريات والنسب المئوية' },
    subtitle: { en: 'Pizza Slices, Equivalence & Real-Life Math', ar: 'شرائح البيتزا، الكسور المكافئة والحساب الواقعي' },
    description: {
      en: 'Conquer fractions visually! Learn how fractions, decimals, and percentages are three different uniforms for the exact same numbers.',
      ar: 'أتقن الكسور بطريقة بصرية مذهلة! واكتشف أن الكسور والعشريات والنسب هي ٣ وجوه لنفس القيمة تماماً.',
    },
    badgeName: { en: 'Fraction Wizard', ar: 'ساحر الكسور' },
    requiredXp: 250,
    accentColor: '#8b5cf6',
    topics: [
      {
        id: 'fractions-visual',
        title: { en: 'Adding & Subtracting Fractions with Common Denominators', ar: 'جمع وطرح الكسور بتوحيد المقامات' },
        summary: {
          en: 'The denominator names the size of the slice; the numerator counts how many slices you have. You can only combine slices of equal size.',
          ar: 'المقام يحدد حجم الشريحة، والبسط يحدد عدد الشرائح التي تملكها. لا يمكنك الجمع إلا إذا كانت الشرائح متساوية الحجم.',
        },
        keyRule: {
          en: '1/2 + 1/3: Common denominator is 6 -> 3/6 + 2/6 = 5/6.',
          ar: '١/٢ + ١/٣: المقام المشترك هو ٦ -> ٣/٦ + ٢/٦ = ٥/٦.',
        },
        example: {
          problem: { en: 'Add 2/5 + 1/10', ar: 'اجمع: ٢/٥ + ١/١٠' },
          steps: {
            en: [
              'Find common denominator: 5 × 2 = 10.',
              'Convert 2/5 to tenths: (2 × 2) / (5 × 2) = 4/10.',
              'Add numerators: 4/10 + 1/10 = 5/10 = 1/2.',
            ],
            ar: [
              'المقام المشترك هو ١٠ لأن ٥ × ٢ = ١٠.',
              'حول ٢/٥: (٢ × ٢) / (٥ × ٢) = ٤/١٠.',
              'اجمع البسوط: ٤/١٠ + ١/١٠ = ٥/١٠ = ١/٢.',
            ],
          },
          answer: { en: '1/2 (or 5/10)', ar: '١/٢ (أو ٥/١٠)' },
        },
      },
      {
        id: 'percentage-conversion',
        title: { en: 'The Golden Triangle: Fraction, Decimal & Percent', ar: 'المثلث الذهبي: كسر، عشري، ونسبة مئوية' },
        summary: {
          en: '1/4 = 0.25 = 25%. Understanding this bridge makes calculating shopping discounts instant.',
          ar: '١/٤ = ٠.٢٥ = ٢٥%. فهم هذا التحويل يجعل حساب التخفيضات والخصومات عملية فورية في رأسك.',
        },
        keyRule: {
          en: 'To find 20% of anything, divide by 5! (Because 20% = 1/5).',
          ar: 'لإيجاد ٢٠٪ من أي رقم، اقسم على ٥ مباشرة! (لأن ٢٠٪ = ١/٥).',
        },
        example: {
          problem: { en: 'What is 15% of $60?', ar: 'كم تبلغ ١٥٪ من ٦٠ ريال/دولار؟' },
          steps: {
            en: [
              'First find 10% of 60 by moving the decimal: 10% = 6.',
              'Find 5% (half of 10%): 6 ÷ 2 = 3.',
              'Add them together: 6 + 3 = 9.',
            ],
            ar: [
              'احسب ١٠٪ من ٦٠ بتحريك الفاصلة: ١٠٪ = ٦.',
              'احسب ٥٪ (نصف الـ ١٠٪): ٦ ÷ ٢ = ٣.',
              'اجمعهما معاً: ٦ + ٣ = ٩.',
            ],
          },
          answer: { en: '$9', ar: '٩' },
        },
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: { en: 'What is 3/4 as a percentage?', ar: 'كم تمثل ٣/٤ كنسبة مئوية؟' },
        options: { en: ['25%', '50%', '75%', '80%'], ar: ['٢٥٪', '٥٠٪', '٧٥٪', '٨٠٪'] },
        correctIndex: 2,
        explanation: { en: '3/4 = 0.75 = 75%.', ar: '٣/٤ = ٠.٧٥ = ٧٥٪.' },
        hint: { en: 'Think of 3 quarters of a dollar.', ar: 'فكر في ٣ أرباع من المئة.' },
      },
      {
        id: 'q3-2',
        question: { en: 'Simplify 12/16 to its lowest terms:', ar: 'بسط الكسر ١٢/١٦ إلى أبسط صورة:' },
        options: { en: ['3/4', '6/8', '2/3', '4/5'], ar: ['٣/٤', '٦/٨', '٢/٣', '٤/٥'] },
        correctIndex: 0,
        explanation: {
          en: 'Divide numerator and denominator by their greatest common divisor (4): 12÷4=3, 16÷4=4 -> 3/4.',
          ar: 'اقسم البسط والمقام على ٤: ١٢÷٤ = ٣، ١٦÷٤ = ٤ -> ٣/٤.',
        },
        hint: { en: 'Divide both top and bottom by 4.', ar: 'اقسم كلاً من البسط والمقام على ٤.' },
      },
      {
        id: 'q3-3',
        question: { en: 'What is 20% of 80?', ar: 'كم يساوي ٢٠٪ من ٨٠؟' },
        options: { en: ['12', '14', '16', '18'], ar: ['١٢', '١٤', '١٦', '١٨'] },
        correctIndex: 2,
        explanation: { en: '10% of 80 is 8. So 20% is 8 × 2 = 16.', ar: '١٠٪ من ٨٠ هي ٨، إذن ٢٠٪ = ٨ × ٢ = ١٦.' },
        hint: { en: 'Find 10% of 80 first, then double it.', ar: 'أوجد ١٠٪ من ٨٠ أولاً ثم ضاعفها.' },
      },
    ],
    videoLesson: {
      id: 'vid-3',
      title: { en: 'Fractions are Easy: Visualizing Numerators, Denominators & Equivalence', ar: 'الكسور سهلة وممتعة: تمثيل الكسور بصرياً وفهم توحيد المقامات' },
      topic: { en: 'Fractions Fundamentals & Visual Operations', ar: 'أساسيات الكسور والعمليات الحسابية' },
      duration: '8:30',
      videoUrl: 'https://www.youtube-nocookie.com/embed/5juto2ze8Lg',
      summary: {
        en: 'A visual journey through fraction strips, common denominators, and simplifying ratios with intuitive graphics.',
        ar: 'شرح مرئي ممتع لشرائط الكسور، توحيد المقامات، وتبسيط النسب بأشكال ورسوم تفاعلية.',
      },
      keyPoints: {
        en: [
          'Multiplying or dividing top and bottom by the same number keeps value identical.',
          'When multiplying fractions: multiply tops across and bottoms across.',
          'When dividing fractions: keep, change, flip!',
        ],
        ar: [
          'ضرب أو قسمة البسط والمقام على نفس الرقم يحافظ على نفس القيمة.',
          'عند ضرب الكسور: اضرب البسط في البسط والمقام في المقام.',
          'عند قسمة الكسور: ثبت الكسر الأول، اقلب القسمة إلى ضرب، واعكس الكسر الثاني!',
        ],
      },
      practiceQuestions: [
        {
          id: 'v3-p1',
          question: { en: 'What is 2/3 × 3/4?', ar: 'ما ناتج ٢/٣ × ٣/٤؟' },
          options: { en: ['1/2', '6/12', '5/7', '2/4'], ar: ['١/٢', '٦/١٢', '٥/٧', '٢/٤'] },
          correctIndex: 0,
          explanation: { en: '(2 × 3) / (3 × 4) = 6/12 = 1/2.', ar: '(٢ × ٣) / (٣ × ٤) = ٦/١٢ = ١/٢.' },
          hint: { en: 'Cancel out the 3 in both numerator and denominator.', ar: 'اختصر ٣ مع ٣.' },
        },
      ],
    },
  },
  {
    id: 'level-4',
    number: 4,
    title: { en: 'Level 4: Pre-Algebra & Linear Equations', ar: 'المستوى ٤: مدخل الجبر والمعادلات الخطية' },
    subtitle: { en: 'Balancing Scales, Variables & Solving for X', ar: 'ميزان المعادلات، المتغيرات وإيجاد قيمة (س)' },
    description: {
      en: 'Demystify algebra! Think of equations as balanced scales where whatever you do to one side, you must do to the other.',
      ar: 'فلسفة الجبر البسيطة! انظر للمعادلة ككفتي ميزان متعادلتين؛ ما تفعله في طرف تفعله تماماً في الطرف الآخر.',
    },
    badgeName: { en: 'Equation Conqueror', ar: 'قاهر المعادلات' },
    requiredXp: 500,
    accentColor: '#ec4899',
    topics: [
      {
        id: 'algebra-balance',
        title: { en: 'The Balance Scale Method: Solving One-Step Equations', ar: 'طريقة الميزان: حل معادلات الخطوة الواحدة' },
        summary: {
          en: 'To isolate x, perform the inverse operation. If x is added to 7, subtract 7 from both sides.',
          ar: 'لعزل المتغير س، استخدم العملية العكسية. إذا كان مجموعاً معه ٧، اطرح ٧ من الطرفين.',
        },
        keyRule: {
          en: 'Inverse Operations: Addition <-> Subtraction, Multiplication <-> Division.',
          ar: 'العمليات العكسية: الجمع يقابله الطرح، والضرب يقابله القسمة.',
        },
        example: {
          problem: { en: 'Solve for x: 3x + 12 = 27', ar: 'أوجد قيمة س: ٣س + ١٢ = ٢٧' },
          steps: {
            en: [
              'Subtract 12 from both sides: 3x = 27 - 12 -> 3x = 15.',
              'Divide both sides by 3: x = 15 ÷ 3.',
              'Result: x = 5.',
            ],
            ar: [
              'اطرح ١٢ من الطرفين: ٣س = ٢٧ - ١٢ -> ٣س = ١٥.',
              'اقسم الطرفين على ٣: س = ١٥ ÷ ٣.',
              'الناتج: س = ٥.',
            ],
          },
          answer: { en: 'x = 5', ar: 'س = ٥' },
        },
      },
      {
        id: 'order-of-operations',
        title: { en: 'Order of Operations (PEMDAS / BODMAS)', ar: 'ترتيب العمليات الحسابية (أولويات العمليات)' },
        summary: {
          en: 'Parentheses/Brackets -> Exponents/Orders -> Multiplication & Division -> Addition & Subtraction.',
          ar: 'الأقواس أولاً -> الأسس -> الضرب والقسمة (من اليسار لليمين) -> الجمع والطرح.',
        },
        keyRule: {
          en: 'Always resolve groupings and multiplications before standard additions: 5 + 3 × 4 = 5 + 12 = 17 (Not 32!)',
          ar: 'الضرب مقدم على الجمع دائماً: ٥ + ٣ × ٤ = ٥ + ١٢ = ١٧ (وليس ٣٢!)',
        },
        example: {
          problem: { en: 'Evaluate: 18 - 2 × (3 + 4)', ar: 'احسب قيمة: ١٨ - ٢ × (٣ + ٤)' },
          steps: {
            en: [
              'Inside parentheses first: 3 + 4 = 7.',
              'Multiplication next: 2 × 7 = 14.',
              'Subtraction last: 18 - 14 = 4.',
            ],
            ar: [
              'احسب ما داخل القوس أولاً: ٣ + ٤ = ٧.',
              'الضرب تالياً: ٢ × ٧ = ١٤.',
              'الطرح أخيراً: ١٨ - ١٤ = ٤.',
            ],
          },
          answer: { en: '4', ar: '٤' },
        },
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: { en: 'If 4x - 8 = 24, what is the value of x?', ar: 'إذا كان ٤س - ٨ = ٢٤، فما قيمة س؟' },
        options: { en: ['6', '7', '8', '9'], ar: ['٦', '٧', '٨', '٩'] },
        correctIndex: 2,
        explanation: {
          en: 'Add 8 to both sides: 4x = 32. Divide by 4: x = 8.',
          ar: 'أضف ٨ للطرفين: ٤س = ٣٢. اقسم على ٤: س = ٨.',
        },
        hint: { en: 'Add 8 to 24 first.', ar: 'أضف ٨ إلى ٢٤ أولاً.' },
      },
      {
        id: 'q4-2',
        question: { en: 'Evaluate: 6 + 4 × 5', ar: 'احسب الناتج: ٦ + ٤ × ٥' },
        options: { en: ['50', '26', '24', '30'], ar: ['٥٠', '٢٦', '٢٤', '٣٠'] },
        correctIndex: 1,
        explanation: { en: 'Multiplication first: 4 × 5 = 20. Then addition: 6 + 20 = 26.', ar: 'الضرب أولاً: ٤ × ٥ = ٢٠، ثم الجمع: ٦ + ٢٠ = ٢٦.' },
        hint: { en: 'Remember multiplication comes before addition!', ar: 'تذكر أن الضرب له أولوية على الجمع!' },
      },
      {
        id: 'q4-3',
        question: { en: 'What is (-7) + (-12)?', ar: 'ما ناتج (-٧) + (-١٢)؟' },
        options: { en: ['-19', '19', '-5', '5'], ar: ['-١٩', '١٩', '-٥', '٥'] },
        correctIndex: 0,
        explanation: { en: 'Adding two negative numbers yields a further negative number: -7 + -12 = -19.', ar: 'جمع عددين سالبين يعطي عدداً سالباً أكبر: -٧ + -١٢ = -١٩.' },
        hint: { en: 'Moving left on the number line twice.', ar: 'التحرك لليسار مرتين على خط الأعداد.' },
      },
    ],
    videoLesson: {
      id: 'vid-4',
      title: { en: 'Algebra Basics: What Is Algebra & Solving For X', ar: 'أساسيات الجبر: ما هو الجبر وكيف تجد قيمة س بكل ثقة' },
      topic: { en: 'Linear Equations & Variable Intuition', ar: 'المعادلات الخطية وبديهيات المتغيرات' },
      duration: '11:20',
      videoUrl: 'https://www.youtube-nocookie.com/embed/NybHckSEQBI',
      summary: {
        en: 'Learn how algebra is simply a puzzle where one number is wearing a disguise, and how inverse operations unmask it.',
        ar: 'اكتشف كيف أن الجبر مجرد لغز حيث يرتدي رقم معين قناعاً (س)، وكيف تكشفه العمليات العكسية.',
      },
      keyPoints: {
        en: [
          'An equation is a sentence asserting two expressions have the exact same value.',
          'Always preserve equality by doing the same thing to both sides.',
          'Check your answer by plugging it back into the original equation.',
        ],
        ar: [
          'المعادلة جملة رياضية تؤكد تساوي طرفين في القيمة.',
          'حافظ دائماً على التعادل بتطبيق نفس العملية على الطرفين.',
          'تحقق من إجابتك بالتعويض في المعادلة الأصلية.',
        ],
      },
      practiceQuestions: [
        {
          id: 'v4-p1',
          question: { en: 'If 2(y + 3) = 14, what is y?', ar: 'إذا كان ٢(ص + ٣) = ١٤، فما قيمة ص؟' },
          options: { en: ['4', '5', '6', '7'], ar: ['٤', '٥', '٦', '٧'] },
          correctIndex: 0,
          explanation: { en: 'Divide by 2: y + 3 = 7. Subtract 3: y = 4.', ar: 'اقسم على ٢: ص + ٣ = ٧. اطرح ٣: ص = ٤.' },
          hint: { en: 'Divide by 2 first.', ar: 'اقسم على ٢ أولاً.' },
        },
      ],
    },
  },
  {
    id: 'level-5',
    number: 5,
    title: { en: 'Level 5: Geometry, Angles & Spatial Measurement', ar: 'المستوى ٥: الهندسة، الزوايا ونظرية فيثاغورس' },
    subtitle: { en: 'Perimeters, Areas, Circles & Right Triangles', ar: 'المحيط، المساحة، الدوائر والمثلثات القائمة' },
    description: {
      en: 'Explore the spatial architecture of the universe! Master areas, perimeters, circle constant Pi, and the famous Pythagorean theorem.',
      ar: 'استكشف عمارة الكون المكانية! أتقن حساب المساحات والمحيطات، وثابت الدائرة (ط)، ونظرية فيثاغورس الشهيرة.',
    },
    badgeName: { en: 'Geometric Architect', ar: 'مهندس الهندسة' },
    requiredXp: 800,
    accentColor: '#f59e0b',
    topics: [
      {
        id: 'pythagoras-theorem',
        title: { en: 'The Pythagorean Theorem (a² + b² = c²)', ar: 'نظرية فيثاغورس (أ² + ب² = ج²)' },
        summary: {
          en: 'In any right-angled triangle, the area of the square on the hypotenuse equals the sum of areas on the other two legs.',
          ar: 'في أي مثلث قائم الزاوية، مساحة المربع المنشأ على الوتر تساوي مجموع مساحتي المربعين المنشأين على الضلعين الآخرين.',
        },
        keyRule: {
          en: 'Pythagorean Triples: (3, 4, 5), (5, 12, 13), (6, 8, 10).',
          ar: 'ثلاثيات فيثاغورس الشهيرة: (٣، ٤، ٥)، (٥، ١٢، ١٣)، (٦، ٨، ١٠).',
        },
        example: {
          problem: { en: 'A right triangle has legs 6 cm and 8 cm. Find the hypotenuse c.', ar: 'مثلث قائم طولا ضلعيه ٦ سم و ٨ سم. أوجد طول الوتر ج.' },
          steps: {
            en: [
              'Square legs: 6² = 36, 8² = 64.',
              'Add them: 36 + 64 = 100.',
              'Take square root: √100 = 10 cm.',
            ],
            ar: [
              'ربع الضلعين: ٦² = ٣٦، ٨² = ٦٤.',
              'اجمعهما: ٣٦ + ٦٤ = ١٠٠.',
              'خذ الجذر التربيعي: √١٠٠ = ١٠ سم.',
            ],
          },
          answer: { en: '10 cm', ar: '١٠ سم' },
        },
      },
      {
        id: 'area-perimeter',
        title: { en: 'Perimeter vs. Area: Fences vs. Grass', ar: 'المحيط مقابل المساحة: السياج مقابل العشب' },
        summary: {
          en: 'Perimeter is the border distance around a shape. Area is the flat surface space inside the boundary.',
          ar: 'المحيط هو طول السياج المحيط بالشكل الخارجي، بينما المساحة هي السطح المسطح الذي يملأ الشكل من الداخل.',
        },
        keyRule: {
          en: 'Rectangle: Perimeter = 2(w + l), Area = w × l. Circle: Area = πr².',
          ar: 'المستطيل: المحيط = ٢(الطول + العرض)، المساحة = الطول × العرض. الدائرة: المساحة = ط × نق².',
        },
        example: {
          problem: { en: 'Find area and perimeter of a 7m by 5m room.', ar: 'أوجد مساحة ومحيط غرفة بطول ٧م وعرض ٥م.' },
          steps: {
            en: [
              'Area = 7 × 5 = 35 square meters.',
              'Perimeter = 2 × (7 + 5) = 2 × 12 = 24 meters.',
            ],
            ar: [
              'المساحة = ٧ × ٥ = ٣٥ متراً مربعاً.',
              'المحيط = ٢ × (٧ + ٥) = ٢ × ١٢ = ٢٤ متراً.',
            ],
          },
          answer: { en: 'Area: 35 m², Perimeter: 24 m', ar: 'المساحة: ٣٥ م²، المحيط: ٢٤ م' },
        },
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        question: { en: 'What is the hypotenuse of a right triangle with legs 3 and 4?', ar: 'ما طول وتر مثلث قائم الزاوية طولا ضلعيه ٣ و ٤؟' },
        options: { en: ['5', '6', '7', '8'], ar: ['٥', '٦', '٧', '٨'] },
        correctIndex: 0,
        explanation: { en: '3² + 4² = 9 + 16 = 25. √25 = 5.', ar: '٣² + ٤² = ٩ + ١٦ = ٢٥. جذر ٢٥ = ٥.' },
        hint: { en: '3² + 4² = ?', ar: 'احسب ٣² + ٤² ثم خذ الجذر.' },
      },
      {
        id: 'q5-2',
        question: { en: 'What is the sum of interior angles in any triangle?', ar: 'ما مجموع قياسات الزوايا الداخلية في أي مثلث؟' },
        options: { en: ['90°', '180°', '270°', '360°'], ar: ['٩٠°', '١٨٠°', '٢٧٠°', '٣٦٠°'] },
        correctIndex: 1,
        explanation: { en: 'The sum of angles in any Euclidean triangle is always exactly 180 degrees.', ar: 'مجموع زوايا أي مثلث إقليدي دائماً ١٨٠ درجة.' },
        hint: { en: 'Straight line angle.', ar: 'زاوية الخط المستقيم.' },
      },
      {
        id: 'q5-3',
        question: { en: 'What is the area of a triangle with base 10 cm and height 6 cm?', ar: 'ما مساحة مثلث قاعدته ١٠ سم وارتفاعه ٦ سم؟' },
        options: { en: ['30 cm²', '60 cm²', '16 cm²', '45 cm²'], ar: ['٣٠ سم²', '٦٠ سم²', '١٦ سم²', '٤٥ سم²'] },
        correctIndex: 0,
        explanation: { en: 'Area = (base × height) / 2 = (10 × 6) / 2 = 60 / 2 = 30 cm².', ar: 'المساحة = (القاعدة × الارتفاع) ÷ ٢ = (١٠ × ٦) ÷ ٢ = ٣٠ سم².' },
        hint: { en: 'Remember to divide base times height by 2!', ar: 'تذكر القسمة على ٢ في مساحة المثلث!' },
      },
    ],
    videoLesson: {
      id: 'vid-5',
      title: { en: 'Pythagorean Theorem: Visual Proof Without Words', ar: 'نظرية فيثاغورس: برهان بصري مذهل بدون كلمات' },
      topic: { en: 'Right Triangles & Pythagorean Geometry', ar: 'المثلثات القائمة وهندسة فيثاغورس' },
      duration: '6:50',
      videoUrl: 'https://www.youtube-nocookie.com/embed/YompsDlEdtc',
      summary: {
        en: 'Witness the breathtaking visual water and tile proofs demonstrating why a squared plus b squared genuinely equals c squared.',
        ar: 'شاهد البرهان البصري الشهير بالمربعات والماء الذي يثبت لماذا مربع الضلعين يساوي بالفعل مربع الوتر.',
      },
      keyPoints: {
        en: [
          'The theorem only works for right-angled triangles (90° corner).',
          'The hypotenuse is always the longest side, directly opposite the 90° angle.',
          'Used everywhere in architecture, GPS triangulation, and gaming graphics.',
        ],
        ar: [
          'النظرية تنطبق فقط على المثلثات القائمة (زاوية ٩٠ درجة).',
          'الوتر هو دائماً أطول ضلع ويقع مقابل الزاوية القائمة مباشرة.',
          'تستخدم في العمارة، ونظام الملاحة GPS، ورسوم ألعاب الفيديو ثلاثية الأبعاد.',
        ],
      },
      practiceQuestions: [
        {
          id: 'v5-p1',
          question: { en: 'In a right triangle with hypotenuse 13 and one leg 5, what is the other leg?', ar: 'في مثلث قائم وتره ١٣ وأحد ضلعيه ٥، ما طول الضلع الآخر؟' },
          options: { en: ['12', '10', '11', '8'], ar: ['١٢', '١٠', '١١', '٨'] },
          correctIndex: 0,
          explanation: { en: '13² - 5² = 169 - 25 = 144. √144 = 12.', ar: '١٣² - ٥² = ١٦٩ - ٢٥ = ١٤٤. جذر ١٤٤ = ١٢.' },
          hint: { en: 'c² - a² = b² -> 169 - 25 = 144.', ar: 'اطرح مربع ٥ من مربع ١٣.' },
        },
      ],
    },
  },
  {
    id: 'level-6',
    number: 6,
    title: { en: 'Level 6: Master Mind & Olympiad Puzzles', ar: 'المستوى ٦: أسرار التفكير الرياضي وألغاز الأولمبياد' },
    subtitle: { en: 'Sequences, Logic, Probability & Brain Teasers', ar: 'المتتاليات، الاحتمالات، المنطق والمسائل الذكية' },
    description: {
      en: 'Level up to mathematical grandmastery! Solve clever pattern sequences, probability paradoxes, and brain-bending math challenges.',
      ar: 'ارتقِ إلى أستاذية الرياضيات! حل متتاليات الأنماط العبقرية، مفارقات الاحتمالات، وأقوى المسائل المنطقية.',
    },
    badgeName: { en: 'Grandmaster Mathematician', ar: 'أستاذ الرياضيات الأعظم' },
    requiredXp: 1200,
    accentColor: '#06b6d4',
    topics: [
      {
        id: 'fibonacci-patterns',
        title: { en: 'The Fibonacci Sequence & Golden Ratio', ar: 'متتالية فيبوناتشي والنسبة الذهبية' },
        summary: {
          en: '0, 1, 1, 2, 3, 5, 8, 13, 21, 34... Each term is the sum of the two preceding ones, appearing throughout nature in sunflowers, shells, and galaxies.',
          ar: '٠، ١، ١، ٢، ٣، ٥، ٨، ١٣، ٢١، ٣٤... كل حد هو مجموع الحدين السابقين، وتظهر في زهور دوار الشمس والمجرات.',
        },
        keyRule: {
          en: 'F(n) = F(n-1) + F(n-2). Ratio approaches Phi ~ 1.618.',
          ar: 'الحد = مجموع الحدين السابقين. وتقترب النسبة بينهما من النسبة الذهبية ١.٦١٨.',
        },
        example: {
          problem: { en: 'Find the next number: 2, 3, 5, 8, 13, ?', ar: 'ما العدد التالي في النمط: ٢، ٣، ٥، ٨، ١٣، ؟' },
          steps: {
            en: [
              'Notice 2 + 3 = 5, 3 + 5 = 8, 5 + 8 = 13.',
              'Add last two numbers: 8 + 13 = 21.',
            ],
            ar: [
              'لاحظ أن ٢ + ٣ = ٥، ٣ + ٥ = ٨، ٥ + ٨ = ١٣.',
              'اجمع آخر رقمين: ٨ + ١٣ = ٢١.',
            ],
          },
          answer: { en: '21', ar: '٢١' },
        },
      },
    ],
    quiz: [
      {
        id: 'q6-1',
        question: { en: 'What is the probability of rolling a sum of 7 with two six-sided dice?', ar: 'ما احتمال الحصول على مجموع ٧ عند رمي نردين منتظمين؟' },
        options: { en: ['1/6 (6/36)', '1/12', '1/4', '7/36'], ar: ['١/٦ (٦/٣٦)', '١/١٢', '١/٤', '٧/٣٦'] },
        correctIndex: 0,
        explanation: {
          en: 'Combinations that sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 out of 36 outcomes = 1/6.',
          ar: 'الأزواج التي مجموعها ٧: (١، ٦)، (٢، ٥)، (٣، ٤)، (٤، ٣)، (٥، ٢)، (٦، ١) = ٦ من ٣٦ = ١/٦.',
        },
        hint: { en: 'There are 36 total outcomes when rolling two dice.', ar: 'هناك ٣٦ ناتجاً ممكناً عند رمي نردين.' },
      },
      {
        id: 'q6-2',
        question: { en: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?', ar: 'مضرب وكرة سعرهما معاً ١.١٠ دولار. المضرب يزيد سعره عن الكرة بمقدار ١.٠٠ دولار. كم سعر الكرة؟' },
        options: { en: ['$0.05 (5 cents)', '$0.10 (10 cents)', '$0.01 (1 cent)', '$0.02 (2 cents)'], ar: ['٠.٠٥ دولار (٥ سنتات)', '٠.١٠ دولار (١٠ سنتات)', '٠.٠١ دولار (سنت واحد)', '٠.٠٢ دولار'] },
        correctIndex: 0,
        explanation: {
          en: 'If ball = $0.05, bat = $1.05. Total = $1.05 + $0.05 = $1.10!',
          ar: 'إذا كان سعر الكرة ٠.٠٥ دولار، فسعر المضرب ١.٠٥ دولار، ومجموعهما ١.١٠ دولار!',
        },
        hint: { en: 'If the ball was 10 cents, the bat would be $1.10, making the total $1.20.', ar: 'لو كانت الكرة بـ ١٠ سنتات لكان المضرب بـ ١.١٠ دولار والمجموع ١.٢٠ دولار.' },
      },
    ],
    videoLesson: {
      id: 'vid-6',
      title: { en: 'The Beauty of the Fibonacci Sequence & Nature’s Golden Spiral', ar: 'جمال متتالية فيبوناتشي وحلزون الطبيعة الذهبي' },
      topic: { en: 'Olympiad Thinking & Nature Patterns', ar: 'تفكير الأولمبياد وأنماط الطبيعة' },
      duration: '10:05',
      videoUrl: 'https://www.youtube-nocookie.com/embed/SjSHVDfXHQ4',
      summary: {
        en: 'Discover how nature optimizes seed packing and galactic spirals using Fibonacci numbers and the golden ratio.',
        ar: 'اكتشف كيف تصمم الطبيعة زهور النباتات وحلزونات القواقع والمجرات بالاستعانة بأرقام فيبوناتشي والنسبة الذهبية.',
      },
      keyPoints: {
        en: [
          'Fibonacci spiral is built of squares with side lengths equal to Fibonacci numbers.',
          'Golden ratio Phi (1.618) provides irrational distribution without overlaps in nature.',
          'Mathematics is the universal language of pattern discovery.',
        ],
        ar: [
          'الحلزون الذهبي يتكون من مربعات أطوال أضلاعها هي أرقام فيبوناتشي.',
          'النسبة الذهبية ١.٦١٨ تسمح بتوزيع بذور النباتات بدون تداخل.',
          'الرياضيات هي اللغة الكونية لاكتشاف الأنماط والجمال.',
        ],
      },
      practiceQuestions: [
        {
          id: 'v6-p1',
          question: { en: 'In Fibonacci: 1, 1, 2, 3, 5, 8, 13, 21... what is the 9th term?', ar: 'في متتالية فيبوناتشي: ١، ١، ٢، ٣، ٥، ٨، ١٣، ٢١... ما الحد التاسع؟' },
          options: { en: ['34', '31', '38', '29'], ar: ['٣٤', '٣١', '٣٨', '٢٩'] },
          correctIndex: 0,
          explanation: { en: '13 + 21 = 34.', ar: '١٣ + ٢١ = ٣٤.' },
          hint: { en: 'Add 13 and 21.', ar: 'اجمع ١٣ مع ٢١.' },
        },
      ],
    },
  },
];

// No fake mock learners: only real connected users are shown
export const initialLivePlayers: LivePlayer[] = [];

export const badgesList: Badge[] = [
  {
    id: 'b-first-step',
    name: { en: 'First Spark', ar: 'الشرارة الأولى' },
    description: { en: 'Solved your first math problem', ar: 'حللت أول مسألة رياضية لك' },
    icon: '✨',
    unlockedAtXp: 25,
  },
  {
    id: 'b-times-titan',
    name: { en: 'Times Table Titan', ar: 'عملاق جدول الضرب' },
    description: { en: 'Mastered multiplication factors 1 to 10', ar: 'أتقنت جداول الضرب من ١ إلى ١٠' },
    icon: '⚡',
    unlockedAtXp: 200,
  },
  {
    id: 'b-streak-fire',
    name: { en: 'Unstoppable Flame', ar: 'الشعلة التي لا تنطفئ' },
    description: { en: 'Maintained a math streak with dedication', ar: 'حافظت على سلسلة أيام متواصلة بعزيمة' },
    icon: '🔥',
    unlockedAtXp: 350,
  },
  {
    id: 'b-ai-scholar',
    name: { en: 'AI Math Scholar', ar: 'باحث الذكاء الاصطناعي' },
    description: { en: 'Learned step-by-step with the AI Tutor', ar: 'تعلمت حل المسائل خطوة بخطوة مع المعلم الذكي' },
    icon: '🧠',
    unlockedAtXp: 500,
  },
  {
    id: 'b-video-master',
    name: { en: 'Visual Master', ar: 'خبير الشروحات المرئية' },
    description: { en: 'Watched math masterclasses & aced video tests', ar: 'شاهدت دروس الفيديو وأتقنت اختباراتها' },
    icon: '🎬',
    unlockedAtXp: 750,
  },
  {
    id: 'b-grandmaster',
    name: { en: 'MathVerse Grandmaster', ar: 'أستاذ ماث فيرس الأعظم' },
    description: { en: 'Certified by: fawaz alokla for top tier math brilliance', ar: 'معتمد من fawaz alokla للتميز الرياضي الشامل' },
    icon: '👑',
    unlockedAtXp: 1200,
  },
];

export const rapidQuizChallenges: RapidQuizChallenge[] = [
  {
    id: 'quiz-speedrun',
    title: {
      en: 'Mental Math Speedrun',
      ar: 'سباق الحساب الذهني الخاطف',
      es: 'Velocidad de Cálculo Mental',
      fr: 'Course de Calcul Mental',
    },
    description: {
      en: 'Fast-paced mental addition, subtraction, and quick estimation challenges.',
      ar: 'تحديات جمع وطرح سريعة وحيل تقديرية خاطفة لاختبار سرعة بديهتك.',
      es: 'Desafíos rápidos de suma, resta y estimación mental.',
      fr: 'Défis rapides d\'addition, de soustraction et d\'estimation mentale.',
    },
    icon: '⚡',
    badge: { en: 'Speed Demon', ar: 'البرق الذهني', es: 'Rayo Veloz', fr: 'Éclair Vif' },
    color: '#eab308',
    questions: [
      {
        id: 'sr-1',
        question: {
          en: 'Calculate mentally: 98 + 47',
          ar: 'احسب ذهنياً: ٩٨ + ٤٧',
          es: 'Calcula mentalmente: 98 + 47',
          fr: 'Calculez mentalement : 98 + 47',
        },
        options: {
          en: ['145', '143', '155', '141'],
          ar: ['١٤٥', '١٤٣', '١٥٥', '١٤١'],
          es: ['145', '143', '155', '141'],
          fr: ['145', '143', '155', '141'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Think of 98 as 100 - 2. So 100 + 47 = 147, then 147 - 2 = 145.',
          ar: 'فكر في ٩٨ كـ (١٠٠ - ٢). إذن ١٠٠ + ٤٧ = ١٤٧، ثم اطرح ٢ فيصبح ١٤٥.',
          es: 'Piensa en 98 como 100 - 2. Así 100 + 47 = 147, luego 147 - 2 = 145.',
          fr: 'Pensez à 98 comme 100 - 2. Donc 100 + 47 = 147, puis 147 - 2 = 145.',
        },
        hint: {
          en: 'Round 98 up to 100 first, then subtract 2.',
          ar: 'قرّب ٩٨ إلى ١٠٠ أولاً ثم اطرح ٢.',
          es: 'Redondea 98 a 100 primero, luego resta 2.',
          fr: 'Arrondissez 98 à 100 d\'abord, puis soustrayez 2.',
        },
      },
      {
        id: 'sr-2',
        question: {
          en: 'What is 35 × 4 mentally?',
          ar: 'ما حاصل ضرب ٣٥ × ٤ ذهنياً؟',
          es: '¿Cuánto es 35 × 4 mentalmente?',
          fr: 'Combien font 35 × 4 mentalement ?',
        },
        options: {
          en: ['140', '130', '145', '120'],
          ar: ['١٤٠', '١٣٠', '١٤٥', '١٢٠'],
          es: ['140', '130', '145', '120'],
          fr: ['140', '130', '145', '120'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Double and double again: 35 × 2 = 70, then 70 × 2 = 140.',
          ar: 'ضاعف ثم ضاعف مجدداً: ٣٥ × ٢ = ٧٠، ثم ٧٠ × ٢ = ١٤٠.',
          es: 'Duplica y vuelve a duplicar: 35 × 2 = 70, luego 70 × 2 = 140.',
          fr: 'Doublez puis redoublez : 35 × 2 = 70, puis 70 × 2 = 140.',
        },
        hint: {
          en: 'Multiplying by 4 is the same as doubling twice.',
          ar: 'الضرب في ٤ هو المضاعفة مرتين.',
          es: 'Multiplicar por 4 es lo mismo que doblar dos veces.',
          fr: 'Multiplier par 4 revient à doubler deux fois.',
        },
      },
      {
        id: 'sr-3',
        question: {
          en: 'Quick subtraction: 500 - 238',
          ar: 'طرح سريع: ٥٠٠ - ٢٣٨',
          es: 'Resta rápida: 500 - 238',
          fr: 'Soustraction rapide : 500 - 238',
        },
        options: {
          en: ['262', '272', '362', '258'],
          ar: ['٢٦٢', '٢٧٢', '٣٦٢', '٢٥٨'],
          es: ['262', '272', '362', '258'],
          fr: ['262', '272', '362', '258'],
        },
        correctIndex: 0,
        explanation: {
          en: '500 - 200 = 300, 300 - 30 = 270, 270 - 8 = 262.',
          ar: '٥٠٠ - ٢٠٠ = ٣٠٠، ثم ٣٠٠ - ٣٠ = ٢٧٠، ثم ٢٧٠ - ٨ = ٢٦٢.',
          es: '500 - 200 = 300, 300 - 30 = 270, 270 - 8 = 262.',
          fr: '500 - 200 = 300, 300 - 30 = 270, 270 - 8 = 262.',
        },
        hint: {
          en: 'Subtract hundreds first, then tens, then units.',
          ar: 'اطرح المئات أولاً ثم العشرات ثم الآحاد.',
          es: 'Resta centenas primero, luego decenas, luego unidades.',
          fr: 'Soustrayez les centaines d\'abord, puis les dizaines, puis les unités.',
        },
      },
      {
        id: 'sr-4',
        question: {
          en: 'What is 15% of 80?',
          ar: 'ما هو ١٥٪ من ٨٠؟',
          es: '¿Cuánto es el 15% de 80?',
          fr: 'Combien font 15% de 80 ?',
        },
        options: {
          en: ['12', '10', '14', '16'],
          ar: ['١٢', '١٠', '١٤', '١٦'],
          es: ['12', '10', '14', '16'],
          fr: ['12', '10', '14', '16'],
        },
        correctIndex: 0,
        explanation: {
          en: '10% of 80 is 8. 5% is half of that, which is 4. 8 + 4 = 12.',
          ar: '١٠٪ من ٨٠ هو ٨. و ٥٪ نصف ذلك وهو ٤. ٨ + ٤ = ١٢.',
          es: '10% de 80 es 8. 5% es la mitad, 4. 8 + 4 = 12.',
          fr: '10% de 80 font 8. 5% font la moitié, soit 4. 8 + 4 = 12.',
        },
        hint: {
          en: 'Find 10% first, then add half of it.',
          ar: 'أوجد ١٠٪ أولاً ثم أضف نصفها.',
          es: 'Encuentra 10% primero, luego añade la mitad.',
          fr: 'Trouvez 10% d\'abord, puis ajoutez la moitié.',
        },
      },
      {
        id: 'sr-5',
        question: {
          en: 'What is 11 × 24 using the 11 shortcut?',
          ar: 'ما حاصل ضرب ١١ × ٢٤ بحيلة الرقم ١١؟',
          es: '¿Cuánto es 11 × 24 con el truco del 11?',
          fr: 'Combien font 11 × 24 avec l\'astuce du 11 ?',
        },
        options: {
          en: ['264', '254', '274', '244'],
          ar: ['٢٦٤', '٢٥٤', '٢٧٤', '٢٤٤'],
          es: ['264', '254', '274', '244'],
          fr: ['264', '254', '274', '244'],
        },
        correctIndex: 0,
        explanation: {
          en: 'For 11 × 24, place 2 and 4 on the outside, and put their sum (2 + 4 = 6) in the middle: 264.',
          ar: 'لضرب ١١ في ٢٤، ضع ٢ و ٤ على الأطراف، وضع مجموعهما (٢ + ٤ = ٦) في الوسط: ٢٦٤.',
          es: 'Para 11 × 24, pon 2 y 4 a los extremos y su suma (2 + 4 = 6) al medio: 264.',
          fr: 'Pour 11 × 24, placez 2 et 4 aux extrémités et leur somme (2 + 4 = 6) au milieu : 264.',
        },
        hint: {
          en: 'Add the digits 2 + 4 and place it between 2 and 4.',
          ar: 'اجمع الرقمين ٢ + ٤ وضعهما بين ٢ و ٤.',
          es: 'Suma los dígitos 2 + 4 y ponlo entre el 2 y el 4.',
          fr: 'Additionnez les chiffres 2 + 4 et placez-le entre 2 et 4.',
        },
      },
    ],
  },
  {
    id: 'quiz-fractions',
    title: {
      en: 'Fractions & Percentages Master',
      ar: 'أستاذ الكسور والنسب المئوية',
      es: 'Maestro de Fracciones y Porcentajes',
      fr: 'Maître des Fractions et Pourcentages',
    },
    description: {
      en: 'Master operations with fractions, simplifying ratios, and converting percentages.',
      ar: 'إتقان جمع وضرب الكسور، تبسيط النسب، والتحويل بين النسب المئوية والأعشار.',
      es: 'Domina operaciones con fracciones, simplificación y conversión de porcentajes.',
      fr: 'Maîtrisez les opérations sur les fractions, la simplification et les pourcentages.',
    },
    icon: '🍕',
    badge: { en: 'Fraction Wizard', ar: 'ساحر الكسور', es: 'Mago de Fracciones', fr: 'Sorcier des Fractions' },
    color: '#3b82f6',
    questions: [
      {
        id: 'fr-1',
        question: {
          en: 'Simplify the fraction: 18/24',
          ar: 'بسّط الكسر: ١٨ / ٢٤',
          es: 'Simplifica la fracción: 18/24',
          fr: 'Simplifiez la fraction : 18/24',
        },
        options: {
          en: ['3/4', '2/3', '4/5', '5/6'],
          ar: ['٣/٤', '٢/٣', '٤/٥', '٥/٦'],
          es: ['3/4', '2/3', '4/5', '5/6'],
          fr: ['3/4', '2/3', '4/5', '5/6'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Divide numerator and denominator by their greatest common factor (6): 18÷6 = 3, 24÷6 = 4 -> 3/4.',
          ar: 'اقسم البسط والمقام على القاسم المشترك الأكبر (٦): ١٨ ÷ ٦ = ٣، و ٢٤ ÷ ٦ = ٤ -> ٣/٤.',
          es: 'Divide numerador y denominador entre su MCD (6): 18÷6 = 3, 24÷6 = 4 -> 3/4.',
          fr: 'Divisez le numérateur et le dénominateur par leur PGCD (6) : 18÷6 = 3, 24÷6 = 4 -> 3/4.',
        },
        hint: {
          en: 'Both 18 and 24 are divisible by 6.',
          ar: 'كلا الرقمين ١٨ و ٢٤ يقبلان القسمة على ٦.',
          es: 'Tanto 18 como 24 son divisibles por 6.',
          fr: '18 et 24 sont tous deux divisibles par 6.',
        },
      },
      {
        id: 'fr-2',
        question: {
          en: 'What is 1/2 + 1/3?',
          ar: 'ما حاصل جمع: ١/٢ + ١/٣؟',
          es: '¿Cuánto es 1/2 + 1/3?',
          fr: 'Combien font 1/2 + 1/3 ?',
        },
        options: {
          en: ['5/6', '2/5', '1/5', '3/6'],
          ar: ['٥/٦', '٢/٥', '١/٥', '٣/٦'],
          es: ['5/6', '2/5', '1/5', '3/6'],
          fr: ['5/6', '2/5', '1/5', '3/6'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Find common denominator (6): 1/2 = 3/6, 1/3 = 2/6. 3/6 + 2/6 = 5/6.',
          ar: 'وحّد المقامات على ٦: ١/٢ = ٣/٦، و ١/٣ = ٢/٦. مجموع ٣/٦ + ٢/٦ = ٥/٦.',
          es: 'Mínimo común denominador (6): 3/6 + 2/6 = 5/6.',
          fr: 'Dénominateur commun (6) : 3/6 + 2/6 = 5/6.',
        },
        hint: {
          en: 'The least common multiple of 2 and 3 is 6.',
          ar: 'المضاعف المشترك الأصغر للعددين ٢ و ٣ هو ٦.',
          es: 'El mínimo común múltiplo de 2 y 3 es 6.',
          fr: 'Le plus petit dénominateur commun de 2 et 3 est 6.',
        },
      },
      {
        id: 'fr-3',
        question: {
          en: 'What is 3/4 × 2/5?',
          ar: 'ما ناتج: ٣/٤ × ٢/٥؟',
          es: '¿Cuánto es 3/4 × 2/5?',
          fr: 'Combien font 3/4 × 2/5 ?',
        },
        options: {
          en: ['3/10', '6/20', '5/9', '1/2'],
          ar: ['٣/١٠', '٦/٢٠', '٥/٩', '١/٢'],
          es: ['3/10', '6/20', '5/9', '1/2'],
          fr: ['3/10', '6/20', '5/9', '1/2'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Multiply numerators (3×2=6) and denominators (4×5=20). 6/20 simplifies to 3/10.',
          ar: 'اضرب البسطين (٣×٢=٦) والمقامين (٤×٥=٢٠). ثم بسّط ٦/٢٠ بالقسمة على ٢ فتصبح ٣/١٠.',
          es: 'Multiplica numeradores (3×2=6) y denominadores (4×5=20). 6/20 simplifica a 3/10.',
          fr: 'Multipliez les numérateurs (6) et dénominateurs (20). 6/20 se simplifie en 3/10.',
        },
        hint: {
          en: 'Multiply across and then reduce by dividing by 2.',
          ar: 'اضرب البسط في البسط والمقام في المقام ثم بسّط.',
          es: 'Multiplica directamente y simplifica dividiendo entre 2.',
          fr: 'Multipliez directement puis réduisez par 2.',
        },
      },
      {
        id: 'fr-4',
        question: {
          en: 'Express 0.75 as a simplified fraction',
          ar: 'حوّل ٠,٧٥ إلى كسر اعتيادي مبسط',
          es: 'Expresa 0.75 como fracción simplificada',
          fr: 'Exprimez 0,75 sous forme de fraction simplifiée',
        },
        options: {
          en: ['3/4', '7/10', '75/10', '4/5'],
          ar: ['٣/٤', '٧/١٠', '٧٥/١٠', '٤/٥'],
          es: ['3/4', '7/10', '75/10', '4/5'],
          fr: ['3/4', '7/10', '75/10', '4/5'],
        },
        correctIndex: 0,
        explanation: {
          en: '0.75 = 75/100. Divide both by 25 -> 3/4.',
          ar: '٠,٧٥ = ٧٥ / ١٠٠. اقسم كلاً منهما على ٢٥ فينتج ٣/٤.',
          es: '0.75 = 75/100. Divide ambos entre 25 -> 3/4.',
          fr: '0,75 = 75/100. Divisez par 25 -> 3/4.',
        },
        hint: {
          en: '75 cents is three quarters of a dollar.',
          ar: '٧٥ هللة أو قرش تمثل ثلاثة أرباع.',
          es: '0.75 es tres cuartos.',
          fr: '75 centimes représentent trois quarts.',
        },
      },
      {
        id: 'fr-5',
        question: {
          en: 'A store gives 20% off a $60 item. What is the sale price?',
          ar: 'متجر يمنح خصماً ٢٠٪ على سلعة سعرها ٦٠ دولاراً. ما سعر البيع؟',
          es: 'Una tienda ofrece 20% de descuento en un artículo de $60. ¿Cuál es el precio final?',
          fr: 'Un magasin offre 20% de réduction sur un article à 60€. Quel est le prix final ?',
        },
        options: {
          en: ['$48', '$50', '$52', '$42'],
          ar: ['٤٨ دولاراً', '٥٠ دولاراً', '٥٢ دولاراً', '٤٢ دولاراً'],
          es: ['$48', '$50', '$52', '$42'],
          fr: ['48€', '50€', '52€', '42€'],
        },
        correctIndex: 0,
        explanation: {
          en: '20% of 60 is (0.20 × 60) = 12. Sale price = 60 - 12 = $48.',
          ar: 'قيمة الخصم ٢٠٪ من ٦٠ هي ١٢. السعر النهائي = ٦٠ - ١٢ = ٤٨.',
          es: '20% de 60 es 12. Precio de venta = 60 - 12 = $48.',
          fr: '20% de 60 font 12. Prix réduit = 60 - 12 = 48€.',
        },
        hint: {
          en: '10% of 60 is 6, so 20% is 12.',
          ar: '١٠٪ من ٦٠ هو ٦، إذن ٢٠٪ هو ١٢.',
          es: '10% de 60 es 6, por lo que 20% es 12.',
          fr: '10% de 60 font 6, donc 20% font 12.',
        },
      },
    ],
  },
  {
    id: 'quiz-geometry',
    title: {
      en: 'Geometry, Angles & Shapes',
      ar: 'الهندسة، الزوايا والأشكال',
      es: 'Geometría, Ángulos y Figuras',
      fr: 'Géométrie, Angles et Formes',
    },
    description: {
      en: 'Explore angle theorems, perimeters, area formulas, and geometric logic.',
      ar: 'استكشف قوانين الزوايا، المحيط، المساحات ونظرية فيثاغورس الهندسية.',
      es: 'Explora teoremas de ángulos, perímetros, fórmulas de área y lógica geométrica.',
      fr: 'Explorez les théorèmes d\'angles, les périmètres, les aires et la géométrie.',
    },
    icon: '📐',
    badge: { en: 'Euclid Explorer', ar: 'مستكشف إقليدس', es: 'Explorador Euclídeo', fr: 'Explorateur d\'Euclide' },
    color: '#10b981',
    questions: [
      {
        id: 'geo-1',
        question: {
          en: 'What is the sum of angles inside any triangle?',
          ar: 'ما مجموع قياسات زوايا أي مثلث؟',
          es: '¿Cuál es la suma de los ángulos internos de un triángulo?',
          fr: 'Quelle est la somme des angles d\'un triangle ?',
        },
        options: {
          en: ['180°', '360°', '90°', '270°'],
          ar: ['١٨٠°', '٣٦٠°', '٩٠°', '٢٧٠°'],
          es: ['180°', '360°', '90°', '270°'],
          fr: ['180°', '360°', '90°', '270°'],
        },
        correctIndex: 0,
        explanation: {
          en: 'In Euclidean geometry, the internal angles of any planar triangle always add up to 180°.',
          ar: 'في الهندسة المستوية، مجموع الزوايا الداخلية لأي مثلث يساوي دائماً ١٨٠ درجة.',
          es: 'En geometría euclidiana, los ángulos internos de un triángulo siempre suman 180°.',
          fr: 'En géométrie euclidienne, la somme des angles d\'un triangle vaut toujours 180°.',
        },
        hint: {
          en: 'It is a straight line angle (180 degrees).',
          ar: 'يساوي قياس الزاوية المستقيمة.',
          es: 'Equivale al ángulo de una línea recta.',
          fr: 'C\'est l\'angle d\'un angle plat.',
        },
      },
      {
        id: 'geo-2',
        question: {
          en: 'A rectangle has length 8 cm and width 5 cm. What is its perimeter?',
          ar: 'مستطيل طوله ٨ سم وعرضه ٥ سم. ما محيطه؟',
          es: 'Un rectángulo mide 8 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro?',
          fr: 'Un rectangle a une longueur de 8 cm et une largeur de 5 cm. Quel est son périmètre ?',
        },
        options: {
          en: ['26 cm', '40 cm', '13 cm', '30 cm'],
          ar: ['٢٦ سم', '٤٠ سم', '١٣ سم', '٣٠ سم'],
          es: ['26 cm', '40 cm', '13 cm', '30 cm'],
          fr: ['26 cm', '40 cm', '13 cm', '30 cm'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26 cm.',
          ar: 'المحيط = ٢ × (الطول + العرض) = ٢ × (٨ + ٥) = ٢ × ١٣ = ٢٦ سم.',
          es: 'Perímetro = 2 × (largo + ancho) = 2 × (8 + 5) = 26 cm.',
          fr: 'Périmètre = 2 × (longueur + largeur) = 2 × (8 + 5) = 26 cm.',
        },
        hint: {
          en: 'Add all four sides: 8 + 5 + 8 + 5.',
          ar: 'اجمع الأضلاع الأربعة: ٨ + ٥ + ٨ + ٥.',
          es: 'Suma los cuatro lados: 8 + 5 + 8 + 5.',
          fr: 'Additionnez les quatre côtés : 8 + 5 + 8 + 5.',
        },
      },
      {
        id: 'geo-3',
        question: {
          en: 'In a right triangle with legs 3 and 4, what is the hypotenuse length?',
          ar: 'في مثلث قائم الزاوية طول ضلعيه ٣ و ٤، ما طول الوتر؟',
          es: 'En un triángulo rectángulo con catetos 3 y 4, ¿cuánto mide la hipotenusa?',
          fr: 'Dans un triangle rectangle de côtés 3 et 4, quelle est la longueur de l\'hypoténuse ?',
        },
        options: {
          en: ['5', '7', '6', '25'],
          ar: ['٥', '٧', '٦', '٢٥'],
          es: ['5', '7', '6', '25'],
          fr: ['5', '7', '6', '25'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Pythagorean Theorem: a² + b² = c². 3² + 4² = 9 + 16 = 25. √25 = 5.',
          ar: 'نظرية فيثاغورس: مربع الوتر = ٣² + ٤² = ٩ + ١٦ = ٢٥. جذر ٢٥ = ٥.',
          es: 'Teorema de Pitágoras: 3² + 4² = 9 + 16 = 25. √25 = 5.',
          fr: 'Théorème de Pythagore : 3² + 4² = 9 + 16 = 25. √25 = 5.',
        },
        hint: {
          en: 'Famous 3-4-5 Pythagorean triple.',
          ar: 'ثلاثية فيثاغورس الشهيرة: ٣ - ٤ - ٥.',
          es: 'Terna pitagórica clásica 3-4-5.',
          fr: 'Le célèbre triplet pythagoricien 3-4-5.',
        },
      },
      {
        id: 'geo-4',
        question: {
          en: 'What is the area of a triangle with base 10 cm and height 6 cm?',
          ar: 'ما مساحة مثلث قاعدته ١٠ سم وارتفاعه ٦ سم؟',
          es: '¿Cuál es el área de un triángulo con base 10 cm y altura 6 cm?',
          fr: 'Quelle est l\'aire d\'un triangle de base 10 cm et de hauteur 6 cm ?',
        },
        options: {
          en: ['30 cm²', '60 cm²', '16 cm²', '45 cm²'],
          ar: ['٣٠ سم²', '٦٠ سم²', '١٦ سم²', '٤٥ سم²'],
          es: ['30 cm²', '60 cm²', '16 cm²', '45 cm²'],
          fr: ['30 cm²', '60 cm²', '16 cm²', '45 cm²'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Area = (base × height) / 2 = (10 × 6) / 2 = 60 / 2 = 30 cm².',
          ar: 'المساحة = (القاعدة × الارتفاع) ÷ ٢ = (١٠ × ٦) ÷ ٢ = ٦٠ ÷ ٢ = ٣٠ سم².',
          es: 'Área = (base × altura) / 2 = (10 × 6) / 2 = 30 cm².',
          fr: 'Aire = (base × hauteur) / 2 = (10 × 6) / 2 = 30 cm².',
        },
        hint: {
          en: 'Half of base times height.',
          ar: 'نصف طول القاعدة في الارتفاع.',
          es: 'La mitad de base por altura.',
          fr: 'La moitié de la base multipliée par la hauteur.',
        },
      },
      {
        id: 'geo-5',
        question: {
          en: 'How many degrees are in a full circle?',
          ar: 'كم عدد الدرجات في الدائرة الكاملة؟',
          es: '¿Cuántos grados tiene una circunferencia completa?',
          fr: 'Combien de degrés compte un cercle complet ?',
        },
        options: {
          en: ['360°', '180°', '720°', '100°'],
          ar: ['٣٦٠°', '١٨٠°', '٧٢٠°', '١٠٠°'],
          es: ['360°', '180°', '720°', '100°'],
          fr: ['360°', '180°', '720°', '100°'],
        },
        correctIndex: 0,
        explanation: {
          en: 'A complete rotation or circle measures exactly 360 degrees.',
          ar: 'الدورة الكاملة للدائرة تمثل تماماً ٣٦٠ درجة.',
          es: 'Una vuelta completa mide exactamente 360 grados.',
          fr: 'Un tour complet mesure exactement 360 degrés.',
        },
        hint: {
          en: 'Two half-circles (180 + 180).',
          ar: 'نصفا دائرة (١٨٠ + ١٨٠).',
          es: 'Dos semicírculos de 180° cada uno.',
          fr: 'Deux demi-cercles de 180° chacun.',
        },
      },
    ],
  },
  {
    id: 'quiz-algebra',
    title: {
      en: 'Algebra & Linear Equations',
      ar: 'الجبر والمعادلات الخطية',
      es: 'Álgebra y Ecuaciones Lineales',
      fr: 'Algèbre et Équations Linéaires',
    },
    description: {
      en: 'Solve for unknowns, balance linear equations, and work with variable terms.',
      ar: 'أوجد قيمة المجهول س (x)، وازن المعادلات الخطية، وطبّق قواعد التبسيط الجبري.',
      es: 'Despeja incógnitas, equilibra ecuaciones lineales y simplifica expresiones.',
      fr: 'Résolvez pour les inconnues, équilibrez les équations et simplifiez les expressions.',
    },
    icon: '🧩',
    badge: { en: 'Al-Khwarizmi Disciple', ar: 'تلميذ الخوارزمي', es: 'Discípulo de Al-Juarismi', fr: 'Disciple d\'Al-Khwarizmi' },
    color: '#8b5cf6',
    questions: [
      {
        id: 'alg-1',
        question: {
          en: 'Solve for x: 3x + 9 = 24',
          ar: 'أوجد قيمة س في المعادلة: ٣س + ٩ = ٢٤',
          es: 'Resuelve para x: 3x + 9 = 24',
          fr: 'Résolvez pour x : 3x + 9 = 24',
        },
        options: {
          en: ['x = 5', 'x = 4', 'x = 6', 'x = 3'],
          ar: ['س = ٥', 'س = ٤', 'س = ٦', 'س = ٣'],
          es: ['x = 5', 'x = 4', 'x = 6', 'x = 3'],
          fr: ['x = 5', 'x = 4', 'x = 6', 'x = 3'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Subtract 9: 3x = 15. Divide by 3: x = 5.',
          ar: 'اطرح ٩ من الطرفين: ٣س = ١٥. اقسم على ٣: س = ٥.',
          es: 'Resta 9: 3x = 15. Divide entre 3: x = 5.',
          fr: 'Soustrayez 9 : 3x = 15. Divisez par 3 : x = 5.',
        },
        hint: {
          en: 'First subtract 9 from both sides.',
          ar: 'اطرح ٩ أولاً من كلا الطرفين.',
          es: 'Primero resta 9 de ambos lados.',
          fr: 'Soustrayez d\'abord 9 des deux côtés.',
        },
      },
      {
        id: 'alg-2',
        question: {
          en: 'Simplify the expression: 4(2x - 3)',
          ar: 'بسّط المقدار الجبري: ٤(٢س - ٣)',
          es: 'Simplifica la expresión: 4(2x - 3)',
          fr: 'Développez l\'expression : 4(2x - 3)',
        },
        options: {
          en: ['8x - 12', '8x - 3', '6x - 12', '8x + 12'],
          ar: ['٨س - ١٢', '٨س - ٣', '٦س - ١٢', '٨س + ١٢'],
          es: ['8x - 12', '8x - 3', '6x - 12', '8x + 12'],
          fr: ['8x - 12', '8x - 3', '6x - 12', '8x + 12'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Distribute 4: 4 × 2x = 8x, and 4 × (-3) = -12 -> 8x - 12.',
          ar: 'خاصية التوزيع: ٤ × ٢س = ٨س، و ٤ × (-٣) = -١٢ -> ٨س - ١٢.',
          es: 'Propiedad distributiva: 4 × 2x = 8x y 4 × (-3) = -12 -> 8x - 12.',
          fr: 'Distribuez le 4 : 4 × 2x = 8x et 4 × (-3) = -12 -> 8x - 12.',
        },
        hint: {
          en: 'Multiply 4 by both terms inside the parentheses.',
          ar: 'اضرب ٤ في كلا الحدين داخل القوسين.',
          es: 'Multiplica el 4 por cada término dentro del paréntesis.',
          fr: 'Multipliez 4 par chacun des termes entre parenthèses.',
        },
      },
      {
        id: 'alg-3',
        question: {
          en: 'If 2y - 5 = y + 7, what is y?',
          ar: 'إذا كان ٢ص - ٥ = ص + ٧، فما قيمة ص؟',
          es: 'Si 2y - 5 = y + 7, ¿cuánto vale y?',
          fr: 'Si 2y - 5 = y + 7, quelle est la valeur de y ?',
        },
        options: {
          en: ['y = 12', 'y = 2', 'y = 7', 'y = 10'],
          ar: ['ص = ١٢', 'ص = ٢', 'ص = ٧', 'ص = ١٠'],
          es: ['y = 12', 'y = 2', 'y = 7', 'y = 10'],
          fr: ['y = 12', 'y = 2', 'y = 7', 'y = 10'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Subtract y from both sides: y - 5 = 7. Add 5: y = 12.',
          ar: 'اطرح ص من الطرفين: ص - ٥ = ٧. أضف ٥ للطرفين: ص = ١٢.',
          es: 'Resta y de ambos lados: y - 5 = 7. Suma 5: y = 12.',
          fr: 'Soustrayez y des deux côtés : y - 5 = 7. Ajoutez 5 : y = 12.',
        },
        hint: {
          en: 'Collect all y terms on the left side.',
          ar: 'اجمع حدود ص على الطرف الأيسر والأعداد على الأيمن.',
          es: 'Agrupa los términos con y en un lado.',
          fr: 'Regroupez les termes en y d\'un côté.',
        },
      },
      {
        id: 'alg-4',
        question: {
          en: 'What is the slope of the line y = 3x - 5?',
          ar: 'ما هو ميل المستقيم ذي المعادلة: ص = ٣س - ٥؟',
          es: '¿Cuál es la pendiente de la recta y = 3x - 5?',
          fr: 'Quelle est la pente de la droite y = 3x - 5 ?',
        },
        options: {
          en: ['3', '-5', '5', '1/3'],
          ar: ['٣', '-٥', '٥', '١/٣'],
          es: ['3', '-5', '5', '1/3'],
          fr: ['3', '-5', '5', '1/3'],
        },
        correctIndex: 0,
        explanation: {
          en: 'In slope-intercept form y = mx + b, m is the slope, which is 3.',
          ar: 'في صيغة الميل والمقطع ص = م س + ب، يمثل (م) الميل وهو الرقم المضروب في س (٣).',
          es: 'En la forma y = mx + b, m representa la pendiente, que es 3.',
          fr: 'Dans la forme y = ax + b, a est la pente, soit 3.',
        },
        hint: {
          en: 'Look at the coefficient in front of x.',
          ar: 'انظر إلى معامل س.',
          es: 'Observa el coeficiente que acompaña a x.',
          fr: 'Regardez le coefficient devant x.',
        },
      },
      {
        id: 'alg-5',
        question: {
          en: 'What is the value of 2x² when x = 3?',
          ar: 'ما قيمة المقدار ٢س² عندما تكون س = ٣؟',
          es: '¿Cuál es el valor de 2x² cuando x = 3?',
          fr: 'Quelle est la valeur de 2x² quand x = 3 ?',
        },
        options: {
          en: ['18', '36', '12', '24'],
          ar: ['١٨', '٣٦', '١٢', '٢٤'],
          es: ['18', '36', '12', '24'],
          fr: ['18', '36', '12', '24'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Follow order of operations (PEMDAS): x² = 3² = 9. Then 2 × 9 = 18.',
          ar: 'حسب ترتيب العمليات الحسابية: ٣² = ٩ أولاً، ثم اضرب في ٢ فيكون الناتج ١٨.',
          es: 'Sigue el orden de operaciones: 3² = 9. Luego 2 × 9 = 18.',
          fr: 'Respectez l\'ordre des opérations : 3² = 9. Puis 2 × 9 = 18.',
        },
        hint: {
          en: 'Calculate the exponent 3² before multiplying by 2.',
          ar: 'احسب الأس ٣² أولاً قبل الضرب في ٢.',
          es: 'Calcula el exponente 3² antes de multiplicar por 2.',
          fr: 'Calculez la puissance 3² avant de multiplier par 2.',
        },
      },
    ],
  },
  {
    id: 'quiz-logic',
    title: {
      en: 'Logic, Patterns & Math Puzzles',
      ar: 'المنطق، المتتاليات والألغاز الرياضية',
      es: 'Lógica, Patrones y Acertijos',
      fr: 'Logique, Suites et Énigmes',
    },
    description: {
      en: 'Sharpen critical thinking with number sequences, logic deductions, and math riddles.',
      ar: 'طوّر تفكيرك المنطقي مع المتتاليات الحسابية، ألغاز التوازن والتفكير النقدي.',
      es: 'Desarrolla el pensamiento crítico con secuencias numéricas y acertijos lógicos.',
      fr: 'Aiguisez votre pensée logique avec des suites de nombres et énigmes.',
    },
    icon: '🧠',
    badge: { en: 'Logic Master', ar: 'عبقري المنطق', es: 'Genio de la Lógica', fr: 'Génie de la Logique' },
    color: '#ec4899',
    questions: [
      {
        id: 'log-1',
        question: {
          en: 'What is the next number in the pattern: 2, 4, 8, 16, ?',
          ar: 'ما هو الرقم التالي في النمط: ٢، ٤، ٨، ١٦، ؟',
          es: '¿Cuál es el siguiente número en la secuencia: 2, 4, 8, 16, ?',
          fr: 'Quel est le nombre suivant dans la suite : 2, 4, 8, 16, ?',
        },
        options: {
          en: ['32', '24', '30', '64'],
          ar: ['٣٢', '٢٤', '٣٠', '٦٤'],
          es: ['32', '24', '30', '64'],
          fr: ['32', '24', '30', '64'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Each number is multiplied by 2 (powers of 2): 16 × 2 = 32.',
          ar: 'كل رقم يتضاعف بالضرب في ٢: ١٦ × ٢ = ٣٢.',
          es: 'Cada número se multiplica por 2: 16 × 2 = 32.',
          fr: 'Chaque nombre est multiplié par 2 : 16 × 2 = 32.',
        },
        hint: {
          en: 'Each step doubles the previous number.',
          ar: 'كل خطوة تضاعف الرقم السابق.',
          es: 'Cada paso duplica el anterior.',
          fr: 'Chaque terme double le précédent.',
        },
      },
      {
        id: 'log-2',
        question: {
          en: 'In the Fibonacci sequence: 1, 1, 2, 3, 5, 8, what comes next?',
          ar: 'في متتالية فيبوناتشي: ١، ١، ٢، ٣، ٥، ٨، ما الرقم التالي؟',
          es: 'En la secuencia de Fibonacci: 1, 1, 2, 3, 5, 8, ¿cuál sigue?',
          fr: 'Dans la suite de Fibonacci : 1, 1, 2, 3, 5, 8, quel est le suivant ?',
        },
        options: {
          en: ['13', '11', '12', '14'],
          ar: ['١٣', '١١', '١٢', '١٤'],
          es: ['13', '11', '12', '14'],
          fr: ['13', '11', '12', '14'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Each number is the sum of the two preceding numbers: 5 + 8 = 13.',
          ar: 'كل رقم هو ناتج جمع الرقمين السابقين له: ٥ + ٨ = ١٣.',
          es: 'Cada número es la suma de los dos anteriores: 5 + 8 = 13.',
          fr: 'Chaque terme est la somme des deux précédents : 5 + 8 = 13.',
        },
        hint: {
          en: 'Add the last two numbers (5 and 8).',
          ar: 'اجمع آخر رقمين (٥ و ٨).',
          es: 'Suma los dos últimos números (5 + 8).',
          fr: 'Additionnez les deux derniers nombres (5 et 8).',
        },
      },
      {
        id: 'log-3',
        question: {
          en: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much is the ball?',
          ar: 'مضرب وكرة يكلفان معاً ١,١٠ دولار. المضرب أغلى بدولار واحد من الكرة. كم سعر الكرة؟',
          es: 'Un bate y una pelota cuestan $1.10 en total. El bate cuesta $1.00 más que la pelota. ¿Cuánto cuesta la pelota?',
          fr: 'Une batte et une balle coûtent 1,10€ au total. La batte coûte 1,00€ de plus que la balle. Combien coûte la balle ?',
        },
        options: {
          en: ['$0.05 (5 cents)', '$0.10 (10 cents)', '$0.01 (1 cent)', '$0.15 (15 cents)'],
          ar: ['٠,٠٥ دولار (٥ سنتات)', '٠,١٠ دولار (١٠ سنتات)', '٠,٠١ دولار (سنت واحد)', '٠,١٥ دولار (١٥ سنتاً)'],
          es: ['$0.05 (5 centavos)', '$0.10 (10 centavos)', '$0.01 (1 centavo)', '$0.15 (15 centavos)'],
          fr: ['0,05€ (5 centimes)', '0,10€ (10 centimes)', '0,01€ (1 centime)', '0,15€ (15 centimes)'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Let ball = x. Bat = x + 1.00. x + (x + 1.00) = 1.10 -> 2x = 0.10 -> x = $0.05.',
          ar: 'افترض الكرة = س. المضرب = س + ١,٠٠. س + س + ١,٠٠ = ١,١٠. إذن ٢س = ٠,١٠، وبالتالي س = ٠,٠٥ دولار.',
          es: 'Sea pelota = x. Bate = x + 1. x + x + 1 = 1.10 -> 2x = 0.10 -> x = $0.05.',
          fr: 'Balle = x. Batte = x + 1. x + x + 1 = 1,10 -> 2x = 0,10 -> x = 0,05€.',
        },
        hint: {
          en: 'If the ball were 10 cents, the bat would be $1.10, making the total $1.20.',
          ar: 'لو كانت الكرة بـ ١٠ سنتات لكان المضرب بـ ١,١٠ دولار والمجموع ١,٢٠.',
          es: 'Si la pelota costara 10 centavos, el total sería $1.20.',
          fr: 'Si la balle valait 10 centimes, le total serait de 1,20€.',
        },
      },
      {
        id: 'log-4',
        question: {
          en: 'What is 0 divided by any non-zero number?',
          ar: 'ما ناتج قسمة ٠ على أي عدد غير الصفر؟',
          es: '¿Cuánto es 0 dividido entre cualquier número distinto de cero?',
          fr: 'Combien fait 0 divisé par n\'importe quel nombre non nul ?',
        },
        options: {
          en: ['0', '1', 'Undefined', 'Infinity'],
          ar: ['٠', '١', 'غير معرّف', 'لا نهاية'],
          es: ['0', '1', 'Indefinido', 'Infinito'],
          fr: ['0', '1', 'Indéfini', 'Infini'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Zero divided by any valid non-zero quantity is always 0.',
          ar: 'قسمة الصفر على أي كمية غير صفرية تساوي دائماً صفر.',
          es: 'Cero dividido entre cualquier cantidad no nula siempre es 0.',
          fr: 'Zéro divisé par n\'importe quel nombre non nul est toujours 0.',
        },
        hint: {
          en: 'If you distribute 0 cookies among 5 friends, each friend gets 0.',
          ar: 'إذا وزعت ٠ كعكة على ٥ أصدقاء، فكل صديق يأخذ ٠.',
          es: 'Si repartes 0 galletas entre 5 amigos, cada uno recibe 0.',
          fr: 'Si vous partagez 0 gâteau entre 5 amis, chacun en a 0.',
        },
      },
      {
        id: 'log-5',
        question: {
          en: 'If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?',
          ar: 'إذا كانت ٣ قطط تصطاد ٣ فئران في ٣ دقائق، فكم قطة تلزم لصيد ١٠٠ فأر في ١٠٠ دقيقة؟',
          es: 'Si 3 gatos cazan 3 ratones en 3 minutos, ¿cuántos gatos se necesitan para cazar 100 ratones en 100 minutos?',
          fr: 'Si 3 chats attrapent 3 souris en 3 minutes, combien de chats faut-il pour attraper 100 souris en 100 minutes ?',
        },
        options: {
          en: ['3 cats', '100 cats', '33 cats', '1 cat'],
          ar: ['٣ قطط', '١٠٠ قطة', '٣٣ قطة', 'قطة واحدة'],
          es: ['3 gatos', '100 gatos', '33 gatos', '1 gato'],
          fr: ['3 chats', '100 chats', '33 chats', '1 chat'],
        },
        correctIndex: 0,
        explanation: {
          en: 'Each cat catches 1 mouse in 3 minutes. In 100 minutes, 1 cat catches ~33.3 mice. 3 cats will catch 100 mice!',
          ar: 'كل قطة تصطاد فأراً واحداً كل ٣ دقائق. في ١٠٠ دقيقة، تصطاد القطة الواحدة نحو ٣٣ فأراً، إذن ٣ قطط تكفي لصيد ١٠٠ فأر!',
          es: 'Cada gato caza 1 ratón en 3 minutos. En 100 minutos, 3 gatos cazan 100 ratones.',
          fr: 'Chaque chat attrape 1 souris en 3 minutes. En 100 minutes, 3 chats attrapent 100 souris.',
        },
        hint: {
          en: 'Calculate how long it takes a single cat to catch a single mouse.',
          ar: 'احسب كم دقيقة تستغرق القطة الواحدة لصيد فأر واحد.',
          es: 'Calcula cuánto tarda 1 solo gato en cazar 1 solo ratón.',
          fr: 'Calculez le temps que met un seul chat pour attraper une seule souris.',
        },
      },
    ],
  },
];
