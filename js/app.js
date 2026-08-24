/* =============================================================
    SmartScholar Calculator — js/app.js
   Complete application logic in vanilla JavaScript
   ============================================================= */

/* =============================================================
   SECTION 1: DATA
   ============================================================= */

const FORMULAS = [
  { id: 1, category: "Percentage", title: "Basic Percentage", formula: "P = (Part / Whole) × 100", difficulty: "Easy", trick: "Divide first, then multiply by 100", example: "20 out of 80 = (20/80)×100 = 25%", explanation: "Use this for any percentage calculation. Always express the part as a fraction of the whole." },
  { id: 2, category: "Percentage", title: "Percentage Change", formula: "Change% = ((New - Old) / Old) × 100", difficulty: "Medium", trick: "New minus Old, divided by Old", example: "Price from 50 to 65: ((65-50)/50)×100 = 30%", explanation: "Positive = increase, negative = decrease. Always divide by the original (Old) value." },
  { id: 3, category: "Percentage", title: "Discount", formula: "Discount = MRP × (Discount% / 100)", difficulty: "Easy", trick: "MRP × discount fraction", example: "₹800 at 20% off = 800 × 0.20 = ₹160 discount", explanation: "Subtract discount from MRP to get selling price." },
  { id: 4, category: "Ratio", title: "Proportion", formula: "a/b = c/d ⟹ a×d = b×c", difficulty: "Medium", trick: "Cross multiply!", example: "2/3 = x/9 → 2×9 = 3x → x = 6", explanation: "Cross multiplication is the fastest way to solve proportions." },
  { id: 5, category: "Ratio", title: "Compound Ratio", formula: "a:b and c:d → ac:bd", difficulty: "Medium", trick: "Multiply corresponding terms", example: "2:3 and 4:5 → 8:15", explanation: "Multiply antecedents together and consequents together." },
  { id: 6, category: "Algebra", title: "Quadratic Formula", formula: "x = (-b ± √(b²-4ac)) / 2a", difficulty: "Hard", trick: "Use D = b²-4ac first to check roots", example: "x²-5x+6=0 → D=25-24=1, x=(5±1)/2 → x=3 or 2", explanation: "Discriminant D>0 means two real roots, D=0 means one root, D<0 means no real roots." },
  { id: 7, category: "Algebra", title: "Sum of AP", formula: "Sₙ = n/2 × (a + l) or n/2 × (2a + (n-1)d)", difficulty: "Medium", trick: "Average × count", example: "1+2+...+10 = 10/2 × (1+10) = 55", explanation: "n = number of terms, a = first term, l = last term, d = common difference." },
  { id: 8, category: "Algebra", title: "Sum of GP", formula: "Sₙ = a(1-rⁿ)/(1-r)", difficulty: "Hard", trick: "a × (1 - rⁿ) / (1 - r)", example: "2+6+18+54 = 2(1-3⁴)/(1-3) = 2×(-80)/(-2) = 80", explanation: "r ≠ 1. If |r| < 1, infinite sum = a/(1-r)." },
  { id: 9, category: "Geometry", title: "Area of Triangle", formula: "A = ½ × base × height", difficulty: "Easy", trick: "Half the rectangle", example: "Base=10, Height=6 → A = 30 sq units", explanation: "Height must be perpendicular to the base." },
  { id: 10, category: "Geometry", title: "Area of Circle", formula: "A = πr²", difficulty: "Easy", trick: "Pi × radius squared", example: "r=7 → A = (22/7)×49 = 154 sq units", explanation: "Use π = 22/7 for easy calculation in exams." },
  { id: 11, category: "Geometry", title: "Volume of Cylinder", formula: "V = πr²h", difficulty: "Medium", trick: "Circle area × height", example: "r=3, h=7 → V = (22/7)×9×7 = 198 cubic units", explanation: "Same as circle area times the height." },
  { id: 12, category: "Geometry", title: "Pythagoras Theorem", formula: "c² = a² + b²", difficulty: "Easy", trick: "Hypotenuse² = sum of squares", example: "3-4-5 triangle: 3²+4²=9+16=25=5² ✓", explanation: "Only applies to right-angled triangles. c is always the hypotenuse." },
  { id: 13, category: "Arithmetic", title: "Simple Interest", formula: "SI = P×R×T / 100", difficulty: "Easy", trick: "PRT/100", example: "₹1000 at 5% for 3 years = 1000×5×3/100 = ₹150", explanation: "P = principal, R = rate%, T = time in years." },
  { id: 14, category: "Arithmetic", title: "Compound Interest", formula: "A = P(1 + R/100)ⁿ", difficulty: "Medium", trick: "Multiply by (1+r) each year", example: "₹1000 at 10% for 2 years = 1000×1.1² = ₹1210", explanation: "CI = A - P. For half-yearly: R/2 and 2n periods." },
  { id: 15, category: "Arithmetic", title: "Speed-Distance-Time", formula: "S = D/T, D = S×T, T = D/S", difficulty: "Easy", trick: "Speed = Distance ÷ Time", example: "200 km in 4 hours → S = 200/4 = 50 km/h", explanation: "The triangle: D on top, S and T at bottom. Cover what you need." },
  { id: 16, category: "Scholarship", title: "LCM Shortcut", formula: "LCM(a,b) = (a×b) / HCF(a,b)", difficulty: "Easy", trick: "Product divided by HCF", example: "LCM(12,18) = (12×18)/6 = 36", explanation: "Always find HCF first, then use this formula." },
  { id: 17, category: "Scholarship", title: "Profit & Loss", formula: "Profit% = (Profit/CP) × 100", difficulty: "Easy", trick: "Always based on CP, not SP", example: "CP=200, SP=250 → Profit% = (50/200)×100 = 25%", explanation: "Loss% is calculated the same way with Loss = CP - SP." },
  { id: 18, category: "Scholarship", title: "Average", formula: "Avg = Sum of values / Number of values", difficulty: "Easy", trick: "Add all, divide by count", example: "Average of 4,6,8,10 = (4+6+8+10)/4 = 7", explanation: "The arithmetic mean is the most common type of average." },
  { id: 19, category: "Scholarship", title: "Time & Work", formula: "If A does in x days, B in y days → Together = xy/(x+y) days", difficulty: "Medium", trick: "Product / Sum", example: "A=6 days, B=12 days → Together = 72/18 = 4 days", explanation: "Work rate = 1/time. Add rates for combined work." },
];

const SQUARES = [];
for (let n = 1; n <= 30; n++) {
  SQUARES.push({ n, square: n * n, cube: n * n * n });
}

const GK_DAYS = [
  { date: "26 January", name: "Republic Day", category: "National" },
  { date: "15 August", name: "Independence Day", category: "National" },
  { date: "2 October", name: "Gandhi Jayanti", category: "National" },
  { date: "1 May", name: "Maharashtra Day", category: "Maharashtra" },
  { date: "8 March", name: "International Women's Day", category: "International" },
  { date: "22 March", name: "World Water Day", category: "International" },
  { date: "22 April", name: "Earth Day", category: "International" },
  { date: "5 June", name: "World Environment Day", category: "International" },
  { date: "14 November", name: "Children's Day", category: "National" },
  { date: "5 December", name: "International Volunteer Day", category: "International" },
  { date: "1 December", name: "World AIDS Day", category: "International" },
  { date: "31 October", name: "National Unity Day", category: "National" },
  { date: "24 January", name: "National Girl Child Day", category: "National" },
  { date: "21 February", name: "International Mother Language Day", category: "International" },
  { date: "22 May", name: "World Biodiversity Day", category: "International" },
];

const MEMORY_TRICKS = [
  { icon: "🧮", title: "π (Pi) = 3.14159", mnemonic: "How I Wish I Could Calculate Pi", meaning: "Count letters: How(3) I(1) Wish(4) Could(1) Calculate(5) Pi(9) = 3.14159" },
  { icon: "📐", title: "Trig: SOH CAH TOA", mnemonic: "Some Old Hippie Caught Another Hippie Tripping On Acid", meaning: "Sin=Opp/Hyp, Cos=Adj/Hyp, Tan=Opp/Adj" },
  { icon: "🌍", title: "Great Lakes (HOMES)", mnemonic: "HOMES: Huron, Ontario, Michigan, Erie, Superior", meaning: "First letter of each lake spells HOMES" },
  { icon: "🔢", title: "BODMAS Order", mnemonic: "Brackets Of, Division, Multiplication, Addition, Subtraction", meaning: "Solve in this order: B→O→D→M→A→S" },
  { icon: "📏", title: "Metric Prefixes", mnemonic: "King Henry Died By Drinking Chocolate Milk", meaning: "kilo, hecto, deca, base, deci, centi, milli" },
  { icon: "🧠", title: "Square of 25", mnemonic: "Take tens digit n, answer = n(n+1) followed by 25", meaning: "25² → 2×3=6 → 625. 35² → 3×4=12 → 1225" },
];

const IQ_TOPICS = [
  { id: "series", name: "Number Series" },
  { id: "coding", name: "Coding-Decoding" },
  { id: "analogy", name: "Analogy" },
  { id: "odd", name: "Odd One Out" },
  { id: "blood", name: "Blood Relations" },
  { id: "direction", name: "Direction Sense" },
  { id: "pattern", name: "Pattern" },
];

const IQ_QUESTIONS = {
  series: [
    { q: "2, 6, 18, 54, ?", options: ["108", "162", "216", "148"], answer: "162", hint: "Each number is multiplied by 3", explanation: { mr: "दरएक संख्येला ३ ने गुणावे: 2×3=6, 6×3=18, 18×3=54, 54×3=162", hi: "हर संख्या को 3 से गुणा करें: 2×3=6, 6×3=18, 18×3=54, 54×3=162" } },
    { q: "1, 4, 9, 16, 25, ?", options: ["30", "36", "35", "49"], answer: "36", hint: "These are perfect squares", explanation: { mr: "ही पूर्ण वर्ग संख्या आहेत: 1², 2², 3², 4², 5², 6² = 36", hi: "ये पूर्ण वर्ग हैं: 1², 2², 3², 4², 5², 6² = 36" } },
    { q: "3, 7, 15, 31, ?", options: ["47", "63", "55", "45"], answer: "63", hint: "Each = previous × 2 + 1", explanation: { mr: "प्रत्येक = मागील × २ + १: 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63", hi: "हर = पिछला × 2 + 1: 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63" } },
  ],
  coding: [
    { q: "If CAT = 3120, then DOG = ?", options: ["4157", "41507", "40157", "41567"], answer: "4157", hint: "A=1, B=2, C=3... concatenate", explanation: { mr: "D=4, O=15, G=7 → 4157", hi: "D=4, O=15, G=7 → 4157" } },
    { q: "If APPLE = 50, BANANA = 36, then MANGO = ?", options: ["51", "49", "53", "47"], answer: "51", hint: "Sum of letter positions", explanation: { mr: "M(13)+A(1)+N(14)+G(7)+O(15) = 50. Wait: 13+1+14+7+15=50", hi: "M(13)+A(1)+N(14)+G(7)+O(15) = 50" } },
  ],
  analogy: [
    { q: "Pen : Write :: Knife : ?", options: ["Cut", "Sharp", "Blade", "Kitchen"], answer: "Cut", hint: "Pen is used to Write", explanation: { mr: "पेनचा उपयोग लिहिण्यासाठी होतो, त्याचप्रमाणे चाकूचा उपयोग कापण्यासाठी होतो.", hi: "पेन का उपयोग लिखने के लिए होता है, वैसे ही चाकू का उपयोग काटने के लिए होता है." } },
    { q: "Water : Thirst :: Food : ?", options: ["Cook", "Hunger", "Taste", "Eat"], answer: "Hunger", hint: "Water satisfies Thirst", explanation: { mr: "पाणी तहान भागवते, अन्‍न भूक भागवते.", hi: "पानी प्यास मिटाता है, भोजन भूख मिटाता है." } },
  ],
  odd: [
    { q: "Find the odd one out: 2, 3, 5, 7, 9, 11", options: ["2", "3", "9", "11"], answer: "9", hint: "All others are prime numbers", explanation: { mr: "२, ३, ५, ७, ११ ही सर्व मूळ संख्या आहेत, पण ९ = ३×३, मूळ संख्या नाही.", hi: "2, 3, 5, 7, 11 सभी अभाज्य हैं, लेकिन 9 = 3×3, अभाज्य नहीं." } },
  ],
  blood: [
    { q: "A is the son of B. B is the daughter of C. How is A related to C?", options: ["Son", "Grandson", "Nephew", "Brother"], answer: "Grandson", hint: "Trace the family tree", explanation: { mr: "A हा B चा मुलगा. B ही C ची मुलगी. म्हणून A हा C चा नातू.", hi: "A, B का बेटा है. B, C की बेटी है. तो A, C का पोता है." } },
  ],
  direction: [
    { q: "Rahul walks 5 km North, then 3 km East. He is now ? of his starting point.", options: ["North-East", "South-East", "North-West", "East"], answer: "North-East", hint: "North + East = North-East", explanation: { mr: "उत्तरेला ५ किमी आणि नंतर पूर्वेला ३ किमी गेल्यावर तो सुरुवातीच्या बिंदूच्या ईशान्येला आहे.", hi: "उत्तर 5 km और फिर पूर्व 3 km → शुरुआती बिंदु के उत्तर-पूर्व में." } },
  ],
  pattern: [
    { q: "Find the next: △□○△□○△□?", options: ["△", "○", "□", "△□"], answer: "○", hint: "Pattern repeats every 3 shapes", explanation: { mr: "त्रिकोण, चौकोन, वर्तुळ हा नमुना पुन्हा पुन्हा येतो. △□○△□○△□○", hi: "त्रिभुज, वर्ग, वृत्त का पैटर्न हर 3 में दोहराया जाता है. △□○△□○△□○" } },
  ],
};

const TRICKS_DATA = [
  { id: 1, topic: "Percentage", title: "10% and 5% shortcut", text: "10% = divide by 10. 5% = half of 10%. Add them for 15%.", example: "15% of 200 = 20 + 10 = 30", timeSaved: "80% less time" },
  { id: 2, topic: "Percentage", title: "25% shortcut", text: "25% = divide by 4. Simple!", example: "25% of 400 = 400/4 = 100", timeSaved: "70% less time" },
  { id: 3, topic: "Multiplication", title: "Multiply by 11", text: "For 2-digit number ab: a, a+b, b. If a+b > 9, carry 1.", example: "43 × 11 = 4, 4+3=7, 3 = 473", timeSaved: "90% less time" },
  { id: 4, topic: "Multiplication", title: "Multiply by 5", text: "Halve the number and multiply by 10.", example: "48 × 5 = 24 × 10 = 240", timeSaved: "75% less time" },
  { id: 5, topic: "Squares", title: "Square of numbers ending in 5", text: "Take tens digit n. Answer = n×(n+1) followed by 25.", example: "35² = 3×4=12 → 1225", timeSaved: "85% less time" },
  { id: 6, topic: "Division", title: "Divide by 25", text: "Multiply by 4 and divide by 100.", example: "300 ÷ 25 = 300×4/100 = 12", timeSaved: "65% less time" },
  { id: 7, topic: "Fractions", title: "Quick fraction to decimal", text: "1/8=0.125, 1/4=0.25, 3/8=0.375, 1/2=0.5, 5/8=0.625", example: "5/8 = 0.625 (just memorize!)", timeSaved: "95% less time" },
  { id: 8, topic: "Algebra", title: "Quick discriminant check", text: "b²-4ac: if >0 two roots, =0 one root, <0 no real roots", example: "x²-4x+4: D=16-16=0, one root x=2", timeSaved: "60% less time" },
];

const PRACTICE_QUESTIONS = {
  maths: [
    { q: "What is 15% of 240?", options: ["32", "36", "38", "42"], answer: "36", hint: "10% = 24, 5% = 12", difficulty: "Easy" },
    { q: "If a + b = 10 and ab = 21, find a² + b²", options: ["58", "62", "79", "49"], answer: "58", hint: "a²+b² = (a+b)²-2ab", difficulty: "Medium" },
    { q: "The area of a circle with radius 7 cm is?", options: ["144 sq cm", "154 sq cm", "164 sq cm", "174 sq cm"], answer: "154 sq cm", hint: "A = πr² = (22/7)×49", difficulty: "Easy" },
    { q: "Simple Interest on ₹5000 at 8% for 3 years?", options: ["₹1000", "₹1200", "₹1500", "₹800"], answer: "₹1200", hint: "SI = PRT/100", difficulty: "Easy" },
  ],
  scholarship: [
    { q: "LCM of 12 and 18 is?", options: ["24", "36", "48", "72"], answer: "36", hint: "HCF(12,18)=6, LCM=12×18/6", difficulty: "Easy" },
    { q: "If CP=400 and SP=500, profit% is?", options: ["20%", "25%", "30%", "50%"], answer: "25%", hint: "Profit% = (Profit/CP)×100", difficulty: "Easy" },
    { q: "A does work in 6 days, B in 12 days. Together?", options: ["3 days", "4 days", "6 days", "8 days"], answer: "4 days", hint: "Together = xy/(x+y)", difficulty: "Medium" },
  ],
  buddhi: [
    { q: "Complete: 1, 1, 2, 3, 5, 8, ?", options: ["11", "13", "15", "10"], answer: "13", hint: "Fibonacci: each = sum of previous two", difficulty: "Medium" },
    { q: "If MONDAY = 123, FRIDAY = ?", options: ["456", "426", "452", "465"], answer: "426", hint: "Count letter positions: F=6,R=18,I=9,D=4,A=1,Y=25... wait, try F-R-I-D-A-Y digits", difficulty: "Hard" },
    { q: "Find odd: 3, 5, 7, 9, 11", options: ["3", "7", "9", "11"], answer: "9", hint: "All others are prime", difficulty: "Easy" },
  ],
  logic: [
    { q: "All roses are flowers. Some flowers fade quickly. Therefore:", options: ["All roses fade", "Some roses may fade", "No roses fade", "Roses never fade"], answer: "Some roses may fade", hint: "Roses are subset of flowers", difficulty: "Medium" },
    { q: "If it rains, the ground is wet. The ground is wet. Therefore:", options: ["It rained", "It may have rained", "It didn't rain", "Impossible to tell"], answer: "It may have rained", hint: "Affirming the consequent is a fallacy", difficulty: "Hard" },
    { q: "A is taller than B. B is taller than C. Who is shortest?", options: ["A", "B", "C", "Can't tell"], answer: "C", hint: "A > B > C", difficulty: "Easy" },
  ],
};

/* =============================================================
   SECTION 2: NUMERIC INPUT HELPERS
   ============================================================= */

function sanitizeNumericValue(rawValue, { allowNegative = false, allowDecimal = true } = {}) {
  if (rawValue === null || rawValue === undefined) return '';
  let value = String(rawValue).trim();
  if (value === '') return '';

  value = value.replace(/[^\d.\-]/g, '');
  if (!allowDecimal) value = value.replace(/\./g, '');
  if (!allowNegative) value = value.replace(/-/g, '');

  if (value.includes('-')) {
    const minusCount = (value.match(/-/g) || []).length;
    if (minusCount > 1 || value.indexOf('-') !== 0) {
      value = value.replace(/-/g, '');
    } else {
      value = '-' + value.slice(1).replace(/-/g, '');
    }
  }

  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts.shift() + '.' + parts.join('');
  }

  if (value === '-' || value === '.') return '';
  if (value.startsWith('.')) value = '0' + value;
  if (value.startsWith('-.')) value = '-0.' + value.slice(2);

  return value;
}

function bindNumericOnlyInput(input, options = {}) {
  if (!input || input.dataset.numericBound === 'true') return;

  const settings = {
    allowNegative: false,
    allowDecimal: true,
    ...options
  };

  input.dataset.numericBound = 'true';
  input.dataset.numericInput = 'true';
  input.type = 'text';
  input.setAttribute('inputmode', settings.allowDecimal ? 'decimal' : 'numeric');
  input.setAttribute('autocomplete', 'off');

  const sanitizeAndSync = () => {
    const current = input.value;
    const sanitized = sanitizeNumericValue(current, {
      allowNegative: settings.allowNegative,
      allowDecimal: settings.allowDecimal
    });
    if (sanitized !== current) input.value = sanitized;
  };

  input.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Escape'];
    if (event.ctrlKey || event.metaKey || event.altKey || allowedKeys.includes(key)) return;

    if (key === 'Enter') return;

    const decimalAllowed = settings.allowDecimal !== false && key === '.';
    const negativeAllowed = settings.allowNegative && key === '-' && input.selectionStart === 0 && !input.value.includes('-');

    if (/\d/.test(key) || decimalAllowed || negativeAllowed) return;

    event.preventDefault();
  });

  input.addEventListener('input', sanitizeAndSync);

  input.addEventListener('paste', (event) => {
    event.preventDefault();
    const pasted = (event.clipboardData || window.clipboardData).getData('text');
    const sanitized = sanitizeNumericValue(pasted, {
      allowNegative: settings.allowNegative,
      allowDecimal: settings.allowDecimal
    });
    input.value = sanitized;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });

  input.addEventListener('blur', sanitizeAndSync);
  sanitizeAndSync();
}

function bindNumericOnlyContainer(root = document) {
  if (!root) return;

  const queue = [];
  if (root instanceof Element && root.matches && root.matches('[data-numeric-input]')) {
    queue.push(root);
  }

  if (root.querySelectorAll) {
    root.querySelectorAll('[data-numeric-input]').forEach(input => {
      if (!queue.includes(input)) queue.push(input);
    });
  }

  queue.forEach(input => {
    const options = {
      allowNegative: input.dataset.allowNegative === 'true',
      allowDecimal: input.dataset.allowDecimal !== 'false'
    };
    bindNumericOnlyInput(input, options);
  });
}

function setupGlobalNumericPolicy() {
  bindNumericOnlyContainer(document);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        bindNumericOnlyContainer(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', () => {
  setupGlobalNumericPolicy();
});

/* =============================================================
   SECTION 3: STORAGE HELPERS
   ============================================================= */

const Storage = {
  get(key, def) {
    try {
      const v = localStorage.getItem('smartscholar_' + key);
      return v !== null ? JSON.parse(v) : def;
    } catch { return def; }
  },
  set(key, val) {
    localStorage.setItem('smartscholar_' + key, JSON.stringify(val));
  },
  getArr(key, def) {
    return this.get(key, def);
  },
  remove(key) {
    localStorage.removeItem('smartscholar_' + key);
  },
  toggleFav(id) {
    const favs = this.getArr('favorites', []);
    const idx = favs.indexOf(id);
    if (idx > -1) favs.splice(idx, 1);
    else favs.push(id);
    this.set('favorites', favs);
    this.set('favoriteFormulas', favs);
    return favs;
  }
};

function normalizeAnswer(value) {
  return String(value || '').trim().toLowerCase();
}

function getTodayKey() {
  const date = new Date();
  return date.toISOString().slice(0, 10);
}

function formatDisplayDate(date) {
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function randomDifficulty() {
  const arr = ['Easy', 'Medium', 'Hard'];
  return arr[Math.floor(Math.random() * arr.length)];
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function formatSeconds(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function tokenizeExpression(expression) {
  const tokens = [];
  let index = 0;

  while (index < expression.length) {
    const char = expression[index];
    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    const numberMatch = expression.slice(index).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
    if (numberMatch) {
      tokens.push({ type: 'number', value: Number(numberMatch[0]) });
      index += numberMatch[0].length;
      continue;
    }

    const identifierMatch = expression.slice(index).match(/^[a-zA-Z]+/);
    if (identifierMatch) {
      tokens.push({ type: 'identifier', value: identifierMatch[0].toLowerCase() });
      index += identifierMatch[0].length;
      continue;
    }

    if ('()+−-×*/^%!'.includes(char)) {
      tokens.push({ type: char === '(' || char === ')' ? 'parenthesis' : 'operator', value: char });
      index += 1;
      continue;
    }

    throw new Error('Invalid expression');
  }

  tokens.push({ type: 'end', value: '' });
  return tokens;
}

function tryEvaluateExpression(expression, angleMode = 'DEG') {
  try {
    const tokens = tokenizeExpression(expression);
    let position = 0;
    const angleFactors = { DEG: Math.PI / 180, RAD: 1, GRAD: Math.PI / 200 };

    const peek = () => tokens[position];
    const consume = (value) => {
      if (value && peek().value !== value) throw new Error('Invalid expression');
      return tokens[position++];
    };
    const ensureFinite = (value) => {
      if (!Number.isFinite(value)) throw new Error('Result is not a real number');
      return value;
    };
    const factorial = (value) => {
      if (!Number.isInteger(value) || value < 0 || value > 170) throw new Error('Invalid factorial');
      let result = 1;
      for (let n = 2; n <= value; n += 1) result *= n;
      return result;
    };
    const applyFunction = (name, value) => {
      const factor = angleFactors[angleMode] || angleFactors.DEG;
      if ((name === 'log' || name === 'ln') && value <= 0) throw new Error('Log input must be positive');
      if ((name === 'sqrt' || name === 'cbrt') && name === 'sqrt' && value < 0) throw new Error('Square root input cannot be negative');
      if (name === 'inv' && value === 0) throw new Error('Division by zero');
      const functions = {
        sin: Math.sin(value * factor),
        cos: Math.cos(value * factor),
        tan: Math.tan(value * factor),
        asin: Math.asin(value) / factor,
        acos: Math.acos(value) / factor,
        atan: Math.atan(value) / factor,
        log: Math.log10(value),
        ln: Math.log(value),
        sqrt: Math.sqrt(value),
        cbrt: Math.cbrt(value),
        abs: Math.abs(value),
        inv: 1 / value
      };
      if (!(name in functions)) throw new Error('Invalid function');
      return ensureFinite(functions[name]);
    };

    const parseExpression = () => {
      let value = parseMultiplicative().value;
      while (peek().value === '+' || peek().value === '−' || peek().value === '-') {
        const operator = consume().value;
        const right = parseMultiplicative();
        value = operator === '+'
          ? value + (right.percent ? value * right.value : right.value)
          : value - (right.percent ? value * right.value : right.value);
      }
      return ensureFinite(value);
    };

    const parseMultiplicative = () => {
      const first = parseUnary();
      let value = first.value;
      let percent = first.percent;
      while (peek().value === '×' || peek().value === '*' || peek().value === '÷' || peek().value === '/') {
        const operator = consume().value;
        const right = parseUnary();
        if ((operator === '÷' || operator === '/') && right.value === 0) throw new Error('Division by zero');
        value = operator === '×' || operator === '*' ? value * right.value : value / right.value;
        value = ensureFinite(value);
        percent = false;
      }
      return { value, percent };
    };

    const parseUnary = () => {
      if (peek().value === '+' || peek().value === '−' || peek().value === '-') {
        const operator = consume().value;
        const value = parseUnary().value;
        return { value: operator === '+' ? value : -value, percent: false };
      }
      return parsePower();
    };

    const parsePower = () => {
      const base = parsePostfix();
      if (peek().value !== '^') return base;
      consume('^');
      return { value: ensureFinite(Math.pow(base.value, parseUnary().value)), percent: false };
    };

    const parsePostfix = () => {
      let value = parsePrimary();
      let percent = false;
      while (peek().value === '!' || peek().value === '%') {
        const operator = consume().value;
        if (operator === '!') value = factorial(value);
        else { value /= 100; percent = true; }
      }
      return { value: ensureFinite(value), percent };
    };

    const parsePrimary = () => {
      const token = peek();
      if (token.type === 'number') return consume().value;
      if (token.type === 'identifier') {
        const name = consume().value;
        if (name === 'pi') return Math.PI;
        if (name === 'e') return Math.E;
        if (peek().value !== '(') throw new Error('Invalid expression');
        consume('(');
        const value = parseExpression();
        consume(')');
        return applyFunction(name, value);
      }
      if (token.value === '(') {
        consume('(');
        const value = parseExpression();
        consume(')');
        return value;
      }
      throw new Error('Incomplete expression');
    };

    const value = parseExpression();
    if (peek().type !== 'end') throw new Error('Invalid expression');
    return { value: Math.round(value * 1e10) / 1e10, error: '' };
  } catch (error) {
    const errorMessage = error.message || 'Invalid expression';
    if (errorMessage === 'Invalid expression' && /(?:÷|\/)\s*0(?:$|[)%])/.test(expression)) {
      return { value: null, error: 'Division by zero' };
    }
    return { value: null, error: errorMessage };
  }
}

function evaluateMathExpression(expr) {
  const result = tryEvaluateExpression(expr);
  return result.error ? 'Error' : String(result.value);
}

const TIME_FEATURES = {
  exam: {
    label: 'Exam Mode',
    defaultOption: { value: 10, label: '10 Minutes', unit: 'minutes' },
    options: [
      { value: 10, label: '10 Minutes', unit: 'minutes' },
      { value: 15, label: '15 Minutes', unit: 'minutes' },
      { value: 20, label: '20 Minutes', unit: 'minutes' },
      { value: 30, label: '30 Minutes', unit: 'minutes' }
    ],
    supportsCustom: true,
    allowedUnits: ['seconds', 'minutes', 'hours'],
    maxSeconds: 60 * 60 * 12,
    defaultUnit: 'minutes'
  },
  speed: {
    label: 'Speed Test',
    defaultOption: { value: 60, label: '60 seconds', unit: 'seconds' },
    options: [
      { value: 30, label: '30 seconds', unit: 'seconds' },
      { value: 60, label: '60 seconds', unit: 'seconds' },
      { value: 90, label: '90 seconds', unit: 'seconds' },
      { value: 120, label: '2 minutes', unit: 'seconds' }
    ],
    supportsCustom: true,
    allowedUnits: ['seconds', 'minutes'],
    maxSeconds: 60 * 60,
    defaultUnit: 'seconds'
  },
  daily: {
    label: 'Daily Challenge',
    defaultOption: { value: 5, label: '5 Minutes', unit: 'minutes' },
    options: [
      { value: 5, label: '5 Minutes', unit: 'minutes' },
      { value: 10, label: '10 Minutes', unit: 'minutes' },
      { value: 15, label: '15 Minutes', unit: 'minutes' },
      { value: 30, label: '30 Minutes', unit: 'minutes' }
    ],
    supportsCustom: true,
    allowedUnits: ['seconds', 'minutes', 'hours'],
    maxSeconds: 60 * 60 * 6,
    defaultUnit: 'minutes'
  }
};

function getTimeUnitMultiplier(unit) {
  return {
    seconds: 1,
    minutes: 60,
    hours: 60 * 60
  }[unit] || 1;
}

function resolveCustomTimeInput(rawValue, unit, featureName) {
  const feature = TIME_FEATURES[featureName] || TIME_FEATURES.exam;
  const numericValue = Number(rawValue);

  if (!rawValue || rawValue.trim() === '') {
    return { valid: false, message: 'Please enter a time value.' };
  }

  if (!Number.isFinite(numericValue) || !Number.isInteger(numericValue) || numericValue <= 0) {
    return { valid: false, message: 'Time must be a positive whole number.' };
  }

  if (!feature.allowedUnits.includes(unit)) {
    return { valid: false, message: 'This feature does not allow that unit.' };
  }

  const seconds = numericValue * getTimeUnitMultiplier(unit);

  if (seconds > feature.maxSeconds) {
    return { valid: false, message: `Time is too high. Maximum allowed is ${Math.floor(feature.maxSeconds / 60)} minutes.` };
  }

  return { valid: true, seconds };
}

function buildTimeSelectOptions(featureName, selectedValueId) {
  const feature = TIME_FEATURES[featureName] || TIME_FEATURES.exam;
  const options = feature.options.map(item => `<option value="${item.value}:${item.unit}" ${item.value === feature.defaultOption.value && item.unit === feature.defaultOption.unit ? 'selected' : ''}>${item.label}</option>`).join('');
  return `${options}<option value="custom">Custom Time</option>`;
}

function durationFromUi(featureName, timeSelectValue, customValue, customUnit) {
  const feature = TIME_FEATURES[featureName] || TIME_FEATURES.exam;
  if (timeSelectValue === 'custom') {
    const custom = resolveCustomTimeInput(customValue, customUnit, featureName);
    if (!custom.valid) {
      return { valid: false, message: custom.message };
    }
    return { valid: true, seconds: custom.seconds };
  }

  const [value, unit] = String(timeSelectValue).split(':');
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    return { valid: false, message: 'Invalid preset time selected.' };
  }

  const seconds = Math.round(number * getTimeUnitMultiplier(unit || feature.defaultUnit));
  return { valid: true, seconds };
}

function summarizeTopicPerformance(questions) {
  const aggregate = {};
  questions.forEach(q => {
    const topic = q.topic || 'General';
    if (!aggregate[topic]) aggregate[topic] = { total: 0, correct: 0 };
    aggregate[topic].total += 1;
    if (normalizeAnswer(q.userAnswer) === normalizeAnswer(q.correctAnswer)) aggregate[topic].correct += 1;
  });
  return aggregate;
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  const diff = Date.now() - date.getTime();
  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function buildRecentActivity() {
  const history = Storage.getArr('practice_history', []);
  const dailyChallenges = Storage.getArr('daily_challenges', {});
  const examResults = Storage.getArr('exam_results', []);
  const speedTests = Storage.getArr('speed_tests', []);
  const achievements = Storage.getArr('achievements', ACHIEVEMENTS_LIST.map(a => ({ ...a, unlocked: false, unlockedDate: null })));
  const items = [];

  history.slice(-4).reverse().forEach(item => {
    items.push({
      time: item.timestamp || new Date().toISOString(),
      title: item.correct ? '✓ Completed Practice' : '⚠ Practice Attempt',
      detail: item.topic || 'Practice',
      meta: formatRelativeTime(item.timestamp)
    });
  });

  Object.values(dailyChallenges)
    .filter(c => c.status === 'completed' && c.completedAt)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 2)
    .forEach(c => {
      const total = c.totalQuestions || c.questions?.length || 0;
      items.push({
        time: c.completedAt,
        title: '🏆 Daily Challenge Completed',
        detail: `Score ${c.score}/${total}`,
        meta: formatRelativeTime(c.completedAt)
      });
    });

  examResults.slice(-2).reverse().forEach(exam => {
    items.push({
      time: exam.completedAt || new Date().toISOString(),
      title: '📝 Exam Completed',
      detail: `${Math.round(Number(exam.accuracy) || 0)}% • ${exam.score}/${exam.questionCount}`,
      meta: formatRelativeTime(exam.completedAt)
    });
  });

  speedTests.slice(-2).reverse().forEach(test => {
    items.push({
      time: test.timestamp || new Date().toISOString(),
      title: '⚡ Speed Test Completed',
      detail: `${Math.round(test.qpm || 0)} QPM • ${Math.round(test.accuracy || 0)}%`,
      meta: formatRelativeTime(test.timestamp)
    });
  });

  achievements
    .filter(a => a.unlocked)
    .sort((a, b) => new Date(b.unlockedDate) - new Date(a.unlockedDate))
    .slice(0, 2)
    .forEach(a => {
      const unlockedTime = new Date(a.unlockedDate).toISOString();
      items.push({
        time: unlockedTime,
        title: '🏅 Achievement Unlocked',
        detail: a.title.replace(/^[^\w\s]+\s*/, ''),
        meta: formatRelativeTime(unlockedTime)
      });
    });

  return items
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 4);
}

function buildStreakHistory(history, dailyChallenges) {
  const now = new Date();
  const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const streakData = [];

  for (let offset = 6; offset >= 0; offset -= 1) {
    const day = new Date(now);
    day.setDate(now.getDate() - offset);
    const key = day.toISOString().slice(0, 10);
    const hasPractice = history.some(entry => entry.timestamp && entry.timestamp.slice(0, 10) === key);
    const hasChallenge = dailyChallenges[key] && dailyChallenges[key].status === 'completed';
    streakData.push({
      label: labels[day.getDay()],
      active: hasPractice || hasChallenge
    });
  }

  return streakData;
}

function getProgressStats() {
  const history = Storage.getArr('practice_history', []);
  const correctAnswers = history.filter(h => h.correct).length;
  const incorrectAnswers = history.length - correctAnswers;
  const questionsSolved = history.length;
  const accuracy = questionsSolved ? Math.round((correctAnswers / questionsSolved) * 100) : 0;

  const topics = {};
  history.forEach(item => {
    const topic = item.topic || 'Practice';
    if (!topics[topic]) topics[topic] = { attempts: 0, correct: 0, incorrect: 0 };
    topics[topic].attempts += 1;
    if (item.correct) topics[topic].correct += 1;
    else topics[topic].incorrect += 1;
  });

  const topicPerformance = Object.entries(topics)
    .map(([topic, stat]) => ({
      topic,
      attempts: stat.attempts,
      correct: stat.correct,
      incorrect: stat.incorrect,
      accuracy: stat.attempts ? Math.round((stat.correct / stat.attempts) * 100) : 0
    }))
    .sort((a, b) => b.accuracy - a.accuracy || b.attempts - a.attempts);

  const strongTopics = topicPerformance.filter(t => t.attempts >= 3 && t.accuracy >= 85).slice(0, 4);
  const weakTopics = topicPerformance.filter(t => t.attempts >= 3 && t.accuracy < 70).slice(0, 4);

  const examResults = Storage.getArr('exam_results', []);
  const speedTests = Storage.getArr('speed_tests', []);
  const currentStreak = Number(Storage.get('practice_streak', 0));
  const bestStreak = Number(Storage.get('best_streak', 0));
  const dailyChallenges = Storage.getArr('daily_challenges', {});
  const todayKey = getTodayKey();
  const todayChallenge = dailyChallenges[todayKey] || null;

  const completedChallengeCount = Object.values(dailyChallenges).filter(c => c.status === 'completed').length;
  const challengeSummary = {
    todayChallenge,
    completedChallengeCount,
    status: todayChallenge ? todayChallenge.status : 'notStarted'
  };

  const streakHistory = buildStreakHistory(history, dailyChallenges);
  const recentActivity = buildRecentActivity();

  const achievements = Storage.getArr('achievements', ACHIEVEMENTS_LIST.map(a => ({ ...a, unlocked: false, unlockedDate: null })));
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const latestAchievements = achievements
    .slice()
    .sort((a, b) => new Date(b.unlockedDate || 0) - new Date(a.unlockedDate || 0))
    .slice(0, 4);

  return {
    questionsSolved,
    correctAnswers,
    incorrectAnswers,
    accuracy,
    currentStreak,
    bestStreak,
    topicPerformance,
    strongTopics,
    weakTopics,
    examResults,
    speedTests,
    dailyChallenges,
    todayChallenge,
    challengeSummary,
    streakHistory,
    recentActivity,
    achievements,
    unlockedCount,
    latestAchievements,
    hasData: questionsSolved > 0 || Object.keys(dailyChallenges).length > 0 || examResults.length > 0 || speedTests.length > 0
  };
}

function updateTotalPracticeStats() {
  const history = Storage.getArr('practice_history', []);
  const correctAnswers = history.filter(q => q.correct).length;
  const incorrectAnswers = history.length - correctAnswers;
  const stats = {
    questionsSolved: history.length,
    correctAnswers,
    incorrectAnswers,
    accuracy: history.length > 0 ? Math.round((correctAnswers / history.length) * 100) : 0
  };
  Storage.set('practice_stats', stats);
}

function refreshAchievementState() {
  const history = Storage.getArr('practice_history', []);
  const solved = history.length;
  const correct = history.filter(h => h.correct).length;
  const dailyChallenges = Storage.getArr('daily_challenges', {});
  const dailyCount = Object.values(dailyChallenges).filter(c => c.status === 'completed').length;
  const bestSpeed = Storage.get('speed_test_best', null);
  const favorites = Storage.getArr('favorites', []);
  const exams = Storage.getArr('exam_results', []);
  const perfectScore = exams.some(e => e.score === e.questionCount || e.accuracy >= 100);
  const achievements = Storage.getArr('achievements', ACHIEVEMENTS_LIST.map(a => ({ ...a, unlocked: false, unlockedDate: null })));

  const unlockMap = {
    first_step: solved >= 1,
    ten_questions: solved >= 10,
    hundred_questions: solved >= 100,
    perfect_score: perfectScore,
    seven_day_streak: Number(Storage.get('practice_streak', 0)) >= 7,
    speed_master: Boolean(bestSpeed && Number(bestSpeed.score) > 0),
    formula_lover: favorites.length >= 10,
    daily_champion: dailyCount >= 3
  };

  ACHIEVEMENTS_LIST.forEach(a => {
    const stored = achievements.find(x => x.id === a.id);
    if (!stored) return;
    if (unlockMap[a.id] && !stored.unlocked) {
      stored.unlocked = true;
      stored.unlockedDate = new Date().toLocaleDateString();
    }
    if (!unlockMap[a.id] && stored.unlocked) {
      stored.unlocked = false;
      stored.unlockedDate = null;
    }
  });
  Storage.set('achievements', achievements);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* =============================================================
   SECTION 4: QUESTION GENERATOR & DATA TRACKING
   ============================================================= */

const QuestionGenerator = {
  generateQuestion(topic, difficulty) {
    const generators = {
      'Percentage': this.generatePercentage,
      'Profit & Loss': this.generateProfitLoss,
      'Simple Interest': this.generateSimpleInterest,
      'Compound Interest': this.generateCompoundInterest,
      'Average': this.generateAverage,
      'Ratio': this.generateRatio,
      'Speed': this.generateSpeed,
      'Time & Work': this.generateTimeWork,
      'Basic Arithmetic': this.generateArithmetic,
      'Squares & Cubes': this.generateSquaresCubes,
    };

    const gen = generators[topic];
    if (!gen) return null;
    return gen.call(this, difficulty);
  },

  generatePercentage(difficulty) {
    const part = difficulty === 'Easy' ? Math.floor(Math.random() * 50) + 10 : difficulty === 'Medium' ? Math.floor(Math.random() * 75) + 25 : Math.floor(Math.random() * 100);
    const whole = difficulty === 'Easy' ? Math.floor(Math.random() * 50) + 50 : difficulty === 'Medium' ? Math.floor(Math.random() * 150) + 50 : Math.floor(Math.random() * 200) + 50;
    const answer = (part / whole * 100).toFixed(2);
    return {
      question: `What is ${part} as a percentage of ${whole}?`,
      options: [answer, (Math.random() * 100).toFixed(2), ((part / whole * 100) * 0.8).toFixed(2), ((part / whole * 100) * 1.2).toFixed(2)].sort(() => Math.random() - 0.5),
      correctAnswer: answer,
      explanation: `${part}/${whole} × 100 = ${answer}%`,
      topic: 'Percentage',
      difficulty
    };
  },

  generateProfitLoss(difficulty) {
    const cp = difficulty === 'Easy' ? Math.floor(Math.random() * 500) + 100 : difficulty === 'Medium' ? Math.floor(Math.random() * 1000) + 500 : Math.floor(Math.random() * 2000) + 1000;
    const profitPercent = Math.floor(Math.random() * 50) + 5;
    const sp = cp + (cp * profitPercent / 100);
    const answer = profitPercent;
    return {
      question: `Cost Price = ₹${cp}, Selling Price = ₹${sp.toFixed(0)}. Profit% = ?`,
      options: [answer, answer - 5, answer + 5, answer * 2].sort((a, b) => a - b).map(String),
      correctAnswer: String(answer),
      explanation: `Profit% = ((SP - CP) / CP) × 100 = ((${sp.toFixed(0)} - ${cp}) / ${cp}) × 100 = ${answer}%`,
      topic: 'Profit & Loss',
      difficulty
    };
  },

  generateSimpleInterest(difficulty) {
    const p = difficulty === 'Easy' ? Math.floor(Math.random() * 500) + 500 : difficulty === 'Medium' ? Math.floor(Math.random() * 2000) + 1000 : Math.floor(Math.random() * 5000) + 5000;
    const r = Math.floor(Math.random() * 15) + 2;
    const t = Math.floor(Math.random() * 5) + 1;
    const si = (p * r * t / 100).toFixed(0);
    return {
      question: `Principal = ₹${p}, Rate = ${r}%, Time = ${t} years. Simple Interest = ?`,
      options: [si, String(Math.floor(si * 0.8)), String(Math.floor(si * 1.2)), String(Math.floor(si * 1.5))].sort(() => Math.random() - 0.5),
      correctAnswer: si,
      explanation: `SI = (P × R × T) / 100 = (${p} × ${r} × ${t}) / 100 = ₹${si}`,
      topic: 'Simple Interest',
      difficulty
    };
  },

  generateCompoundInterest(difficulty) {
    const p = difficulty === 'Easy' ? Math.floor(Math.random() * 500) + 500 : difficulty === 'Medium' ? Math.floor(Math.random() * 2000) + 1000 : Math.floor(Math.random() * 5000) + 5000;
    const r = Math.floor(Math.random() * 15) + 2;
    const t = Math.floor(Math.random() * 3) + 1;
    const a = (p * Math.pow(1 + r / 100, t)).toFixed(0);
    return {
      question: `Principal = ₹${p}, Rate = ${r}%, Time = ${t} years. Amount = ?`,
      options: [a, String(Math.floor(a * 0.9)), String(Math.floor(a * 1.1)), String(p + (p * r * t / 100))].sort(() => Math.random() - 0.5),
      correctAnswer: a,
      explanation: `A = P(1 + R/100)^T = ${p}(1.${r})^${t} = ₹${a}`,
      topic: 'Compound Interest',
      difficulty
    };
  },

  generateAverage(difficulty) {
    const count = difficulty === 'Easy' ? Math.floor(Math.random() * 3) + 3 : difficulty === 'Medium' ? Math.floor(Math.random() * 3) + 5 : Math.floor(Math.random() * 5) + 5;
    const nums = Array.from({ length: count }, () => Math.floor(Math.random() * 50) + 10);
    const avg = (nums.reduce((a, b) => a + b, 0) / count).toFixed(1);
    return {
      question: `Average of ${nums.join(', ')} = ?`,
      options: [avg, (avg * 0.9).toFixed(1), (avg * 1.1).toFixed(1), (avg * 0.8).toFixed(1)].sort(() => Math.random() - 0.5),
      correctAnswer: avg,
      explanation: `Sum = ${nums.reduce((a, b) => a + b, 0)}, Count = ${count}, Average = ${nums.reduce((a, b) => a + b, 0)} / ${count} = ${avg}`,
      topic: 'Average',
      difficulty
    };
  },

  generateRatio(difficulty) {
    const a = Math.floor(Math.random() * 20) + 2;
    const b = Math.floor(Math.random() * 20) + 2;
    const x = Math.floor(Math.random() * 30) + 10;
    const y = (x * b / a).toFixed(1);
    return {
      question: `If ${a}:${b} = ${x}:y, then y = ?`,
      options: [y, (y * 0.9).toFixed(1), (y * 1.1).toFixed(1), (y * 0.8).toFixed(1)].sort(() => Math.random() - 0.5),
      correctAnswer: y,
      explanation: `${a}/​${b} = ${x}/​y → y = (${x} × ${b}) / ${a} = ${y}`,
      topic: 'Ratio',
      difficulty
    };
  },

  generateSpeed(difficulty) {
    const distance = difficulty === 'Easy' ? Math.floor(Math.random() * 200) + 100 : difficulty === 'Medium' ? Math.floor(Math.random() * 500) + 200 : Math.floor(Math.random() * 1000) + 500;
    const time = Math.floor(Math.random() * 5) + 2;
    const speed = (distance / time).toFixed(2);
    return {
      question: `Distance = ${distance} km, Time = ${time} hours. Speed = ?`,
      options: [speed, (speed * 0.8).toFixed(2), (speed * 1.2).toFixed(2), (speed * 1.1).toFixed(2)].sort(() => Math.random() - 0.5),
      correctAnswer: speed,
      explanation: `Speed = Distance / Time = ${distance} / ${time} = ${speed} km/h`,
      topic: 'Speed',
      difficulty
    };
  },

  generateTimeWork(difficulty) {
    const a_days = Math.floor(Math.random() * 10) + 3;
    const b_days = Math.floor(Math.random() * 10) + 3;
    const together = (a_days * b_days / (a_days + b_days)).toFixed(2);
    return {
      question: `A completes work in ${a_days} days, B in ${b_days} days. Together = ?`,
      options: [together, (together * 0.8).toFixed(2), (together * 1.2).toFixed(2), (together * 1.1).toFixed(2)].sort(() => Math.random() - 0.5),
      correctAnswer: together,
      explanation: `Together = (${a_days} × ${b_days}) / (${a_days} + ${b_days}) = ${together} days`,
      topic: 'Time & Work',
      difficulty
    };
  },

  generateArithmetic(difficulty) {
    const num1 = Math.floor(Math.random() * 100) + 10;
    const num2 = Math.floor(Math.random() * 100) + 10;
    const operations = [
      { op: '+', result: num1 + num2, q: `${num1} + ${num2}` },
      { op: '-', result: num1 - num2, q: `${num1} - ${num2}` },
      { op: '×', result: num1 * num2, q: `${num1} × ${num2}` },
      { op: '÷', result: (num1 / num2).toFixed(2), q: `${num1} ÷ ${num2}` },
    ];
    const chosen = operations[Math.floor(Math.random() * operations.length)];
    const answer = String(chosen.result);
    return {
      question: `${chosen.q} = ?`,
      options: [answer, String(Number(answer) - 5), String(Number(answer) + 5), String(Number(answer) * 2)].sort(() => Math.random() - 0.5),
      correctAnswer: answer,
      explanation: `${chosen.q} = ${answer}`,
      topic: 'Basic Arithmetic',
      difficulty
    };
  },

  generateSquaresCubes(difficulty) {
    const n = Math.floor(Math.random() * 20) + 1;
    const isSquare = Math.random() > 0.5;
    if (isSquare) {
      const answer = n * n;
      return {
        question: `${n}² = ?`,
        options: [String(answer), String(answer - 10), String(answer + 10), String(answer * 2)].sort(() => Math.random() - 0.5),
        correctAnswer: String(answer),
        explanation: `${n}² = ${n} × ${n} = ${answer}`,
        topic: 'Squares & Cubes',
        difficulty
      };
    } else {
      const answer = n * n * n;
      return {
        question: `${n}³ = ?`,
        options: [String(answer), String(answer - 100), String(answer + 100), String(answer / 2)].sort(() => Math.random() - 0.5),
        correctAnswer: String(answer),
        explanation: `${n}³ = ${n} × ${n} × ${n} = ${answer}`,
        topic: 'Squares & Cubes',
        difficulty
      };
    }
  }
};

const TOPICS = ['Percentage', 'Profit & Loss', 'Simple Interest', 'Compound Interest', 'Average', 'Ratio', 'Speed', 'Time & Work', 'Basic Arithmetic', 'Squares & Cubes'];

/* =============================================================
   SECTION 4: ROUTER
   ============================================================= */

const Router = {
  currentPage: 'splash',
  history: ['splash'],

  init() {
    // Handle hash routing
    window.addEventListener('hashchange', () => this.handleHash());
    // Auto-redirect from splash
    setTimeout(() => {
      if (this.currentPage === 'splash') this.go('home');
    }, 2200);
    // Check if direct hash
    if (location.hash) this.handleHash();
  },

  handleHash() {
    const hash = location.hash.replace('#', '') || 'home';
    this.go(hash, false);
  },

  go(page, pushHistory = true) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('page-active'));
    // Show target
    const target = document.getElementById('page-' + page);
    if (target) {
      target.classList.add('page-active');
      this.currentPage = page;
      if (pushHistory) {
        this.history.push(page);
        location.hash = page;
      }
      window.scrollTo(0, 0);
      // Trigger page-specific init
      this.initPage(page);
    } else {
      this.go('404');
    }
  },

  back(target) {
    if (target) {
      this.go(target);
    } else {
      const prev = this.history.length > 1 ? this.history[this.history.length - 2] : 'home';
      this.history.pop();
      this.go(prev);
    }
  },

  initPage(page) {
    switch (page) {
      case 'home': break;
      case 'calculator': Calculator.init(); break;
      case 'scientific': ScientificCalc.init(); break;
      case 'converter': Converter.init(); break;
      case 'scholar-tool': ScholarTool.init(); break;
      case 'formulas': FormulasPage.init(); break;
      case 'tricks': TricksPage.init(); break;
      case 'practice': PracticePage.init(); break;
      case 'buddhimatta': BuddhiMattaPage.init(); break;
      case 'squares-cubes': SquaresCubesPage.init(); break;
      case 'gk-revision': GKRevision.init(); break;
      case 'memory-tricks': MemoryTricks.init(); break;
      case 'fast-revision': FastRevision.init(); break;
      case 'progress-dashboard': ProgressDashboard.init(); break;
      case 'daily-challenge': DailyChallenge.init(); break;
      case 'weak-topics': WeakTopicDetector.init(); break;
      case 'exam-mode': ExamMode.init(); break;
      case 'question-generator': QuestionGeneratorPage.init(); break;
      case 'mistake-book': MistakeBook.init(); break;
      case 'speed-test': SpeedTest.init(); break;
      case 'achievements': AchievementsPage.init(); break;
      case 'settings': SettingsPage.init(); break;
      case 'about': AboutPage.init(); break;
    }
  }
};

/* =============================================================
   SECTION 5: NAVIGATION EVENT DELEGATION
   ============================================================= */

document.addEventListener('click', (e) => {
  const navBtn = e.target.closest('[data-nav]');
  if (navBtn) {
    e.preventDefault();
    Router.go(navBtn.dataset.nav);
    return;
  }
  const backBtn = e.target.closest('[data-back]');
  if (backBtn) {
    e.preventDefault();
    Router.back(backBtn.dataset.back || null);
    return;
  }
});

/* =============================================================
   SECTION 6: CALCULATOR
   ============================================================= */

const Calculator = {
  display: '0',
  expr: '',
  history: [],
  justEvaluated: false,

  KEYS: [
    { label: 'AC', type: 'action', action: 'clear' },
    { label: '⌫', type: 'action', action: 'backspace' },
    { label: '%', type: 'operator', action: 'percent' },
    { label: '÷', type: 'operator', action: 'divide' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '×', type: 'operator', action: 'multiply' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '−', type: 'operator', action: 'subtract' },
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '+', type: 'operator', action: 'add' },
    { label: '0', type: 'number', wide: true },
    { label: '.', type: 'number', action: 'decimal' },
    { label: '=', type: 'equals', action: 'equals' },
  ],

  init() {
    this.history = Storage.getArr('history', []);
    this.renderKeypad();
    this.renderHistory();
    this.display = '0';
    this.expr = '';
    this.justEvaluated = false;
    this.updateDisplay();
  },

  renderKeypad() {
    const grid = document.getElementById('calc-keypad');
    grid.innerHTML = '';
    this.KEYS.forEach(k => {
      const btn = document.createElement('button');
      btn.className = 'calc-btn';
      btn.textContent = k.label;
      if (k.type === 'operator') btn.classList.add('operator');
      if (k.type === 'action') btn.classList.add('action');
      if (k.type === 'equals') btn.classList.add('equals');
      if (k.wide) btn.classList.add('wide');
      btn.addEventListener('click', () => this.handleKey(k));
      grid.appendChild(btn);
    });
  },

  handleKey(key) {
    if (key.type === 'number') {
      if (this.justEvaluated) {
        this.display = key.action === 'decimal' ? '0.' : key.label;
        this.expr = '';
        this.justEvaluated = false;
      } else {
        if (this.display === '0' && key.action !== 'decimal') {
          this.display = key.label;
        } else if (key.action === 'decimal' && this.display.includes('.')) {
          return;
        } else {
          this.display += key.label;
        }
      }
    } else if (key.type === 'operator') {
      this.expr = this.display + ' ' + key.label + ' ';
      this.display = '0';
      this.justEvaluated = false;
    } else if (key.action === 'clear') {
      this.display = '0';
      this.expr = '';
      this.justEvaluated = false;
    } else if (key.action === 'backspace') {
      this.display = this.display.length > 1 ? this.display.slice(0, -1) : '0';
    } else if (key.action === 'percent') {
      this.display = String(parseFloat(this.display) / 100);
    } else if (key.action === 'equals') {
      if (this.expr) {
        const fullExpr = this.expr + this.display;
        const result = this.evaluate(fullExpr);
        this.history.unshift({ expr: fullExpr, result });
        if (this.history.length > 20) this.history.pop();
        Storage.set('history', this.history);
        this.renderHistory();
        this.display = result;
        this.expr = fullExpr + ' =';
        this.justEvaluated = true;
      }
    }
    this.updateDisplay();
  },

  evaluate(expr) {
    return evaluateMathExpression(expr);
  },

  updateDisplay() {
    const el = document.getElementById('calc-display');
    const exprEl = document.getElementById('calc-expr');
    exprEl.textContent = this.expr;
    el.textContent = this.display;
    el.className = 'calc-result';
    if (this.display === 'Error') el.classList.add('error');
    if (this.display.length > 10) el.classList.add('large-text');
    if (this.display.length > 14) el.classList.add('xlarge-text');
  },

  renderHistory() {
    const list = document.getElementById('calc-history-list');
    const section = document.getElementById('calc-history');
    if (this.history.length === 0) {
      section.classList.add('hidden');
      return;
    }
    section.classList.remove('hidden');
    list.innerHTML = '';
    this.history.forEach(h => {
      const div = document.createElement('div');
      div.className = 'history-entry';
      div.innerHTML = `<span class="history-entry-expr">${h.expr}</span><span class="history-entry-result">= ${h.result}</span>`;
      div.addEventListener('click', () => {
        this.display = h.result;
        this.justEvaluated = true;
        this.updateDisplay();
      });
      list.appendChild(div);
    });
  }
};

// Clear history button
document.getElementById('calc-clear-history').addEventListener('click', () => {
  Calculator.history = [];
  Storage.set('history', []);
  Calculator.renderHistory();
});

/* =============================================================
   SECTION 7: SCIENTIFIC CALCULATOR
   ============================================================= */

const ScientificCalc = {
  expression: '',
  display: '0',
  memory: 0,
  angleMode: 'DEG',
  history: [],
  sciVisible: false,
  justEvaluated: false,

  BASIC_KEYS: [
    { label: 'AC', type: 'action', action: 'clear' },
    { label: '⌫', type: 'action', action: 'backspace' },
    { label: '(', type: 'parenthesis' },
    { label: ')', type: 'parenthesis' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '÷', type: 'operator', action: 'divide' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '×', type: 'operator', action: 'multiply' },
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '−', type: 'operator', action: 'subtract' },
    { label: '0', type: 'number', wide: true },
    { label: '.', type: 'number', action: 'decimal' },
    { label: '%', type: 'operator', action: 'percent' },
    { label: '+', type: 'operator', action: 'add' },
    { label: '=', type: 'equals', action: 'equals' }
  ],

  SCI_KEYS: [
    { label: 'sin', action: 'sin' }, { label: 'cos', action: 'cos' }, { label: 'tan', action: 'tan' },
    { label: 'sin⁻¹', action: 'asin' }, { label: 'cos⁻¹', action: 'acos' }, { label: 'tan⁻¹', action: 'atan' },
    { label: 'log', action: 'log' }, { label: 'ln', action: 'ln' }, { label: '√', action: 'sqrt' },
    { label: 'x²', action: 'square' }, { label: 'x³', action: 'cube' }, { label: 'xʸ', action: 'power' },
    { label: '10ˣ', action: 'tenPower' }, { label: 'eˣ', action: 'ePower' }, { label: 'x!', action: 'factorial' },
    { label: 'π', action: 'pi' }, { label: 'e', action: 'euler' }, { label: '1/x', action: 'reciprocal' },
    { label: 'MC', action: 'mc', memory: true }, { label: 'MR', action: 'mr', memory: true },
    { label: 'M+', action: 'mplus', memory: true }, { label: 'M−', action: 'mminus', memory: true },
    { label: 'MS', action: 'ms', memory: true }
  ],

  init() {
    this.expression = '';
    this.display = '0';
    this.justEvaluated = false;
    this.history = Storage.getArr('scientific_history', []);
    this.renderKeypad();
    this.renderSciButtons();
    this.renderAngleModes();
    this.renderHistory();
    this.updateDisplay();
  },

  renderKeypad() {
    const grid = document.getElementById('sci-keypad');
    grid.innerHTML = '';
    this.BASIC_KEYS.forEach(key => {
      const button = document.createElement('button');
      button.className = 'calc-btn';
      button.textContent = key.label;
      button.setAttribute('aria-label', key.label === 'AC' ? 'All clear' : key.label);
      if (key.type === 'operator') button.classList.add('operator');
      if (key.type === 'action') button.classList.add('action');
      if (key.type === 'equals') button.classList.add('equals');
      if (key.wide) button.classList.add('wide');
      button.addEventListener('click', () => this.handleBasicKey(key));
      grid.appendChild(button);
    });
  },

  renderSciButtons() {
    const grid = document.getElementById('sci-buttons');
    grid.innerHTML = '';
    this.SCI_KEYS.forEach(key => {
      const button = document.createElement('button');
      button.className = 'sci-btn' + (key.memory ? ' memory' : '');
      button.textContent = key.label;
      button.setAttribute('aria-label', key.label);
      button.addEventListener('click', () => this.handleSciKey(key));
      grid.appendChild(button);
    });

    const toggle = document.getElementById('sci-toggle-btn');
    toggle.onclick = () => {
      this.sciVisible = !this.sciVisible;
      grid.style.display = this.sciVisible ? 'flex' : 'none';
      toggle.classList.toggle('active', this.sciVisible);
      toggle.textContent = this.sciVisible ? 'HIDE SCIENTIFIC' : 'SHOW SCIENTIFIC';
    };
    grid.style.display = this.sciVisible ? 'flex' : 'none';
    toggle.classList.toggle('active', this.sciVisible);
    toggle.textContent = this.sciVisible ? 'HIDE SCIENTIFIC' : 'SHOW SCIENTIFIC';
  },

  renderAngleModes() {
    const container = document.getElementById('sci-angle-modes');
    container.innerHTML = '';
    ['DEG', 'RAD', 'GRAD'].forEach(mode => {
      const button = document.createElement('button');
      button.className = 'sci-angle-btn' + (mode === this.angleMode ? ' active' : '');
      button.textContent = mode;
      button.setAttribute('aria-label', `${mode} angle mode`);
      button.addEventListener('click', () => {
        this.angleMode = mode;
        this.renderAngleModes();
        this.updateDisplay();
      });
      container.appendChild(button);
    });
  },

  appendToken(token) {
    if (this.display.startsWith('Error')) {
      this.expression = '';
      this.display = '0';
    }
    if (this.justEvaluated && !['+', '−', '×', '÷', '^', '%', ')', '!'].includes(token)) this.expression = '';
    this.justEvaluated = false;
    this.expression += token;
  },

  handleBasicKey(key) {
    if (key.type === 'number') {
      if (this.justEvaluated || this.display.startsWith('Error')) {
        this.expression = '';
        this.display = '0';
      }
      const currentNumber = this.expression.split(/[+−×÷*/^()]/).pop();
      if (key.action === 'decimal' && currentNumber.includes('.')) return;
      if (key.action !== 'decimal' && this.expression === '') this.expression = key.label;
      else if (key.action === 'decimal' && this.expression === '') this.expression = '0.';
      else this.expression += key.label;
      this.justEvaluated = false;
    } else if (key.type === 'parenthesis') {
      this.appendToken(key.label);
    } else if (key.type === 'operator') {
      this.appendToken(key.label);
    } else if (key.action === 'clear') {
      this.expression = '';
      this.display = '0';
      this.justEvaluated = false;
    } else if (key.action === 'backspace') {
      this.expression = this.expression.slice(0, -1);
      this.justEvaluated = false;
    } else if (key.action === 'equals') {
      this.calculate();
    }
    this.updateDisplay();
  },

  handleSciKey(key) {
    const functionTokens = { sin: 'sin(', cos: 'cos(', tan: 'tan(', asin: 'asin(', acos: 'acos(', atan: 'atan(', log: 'log(', ln: 'ln(', sqrt: 'sqrt(' };
    if (functionTokens[key.action]) this.appendToken(functionTokens[key.action]);
    else if (key.action === 'square') this.appendToken('^2');
    else if (key.action === 'cube') this.appendToken('^3');
    else if (key.action === 'power') this.appendToken('^');
    else if (key.action === 'factorial') this.appendToken('!');
    else if (key.action === 'pi') this.appendToken('pi');
    else if (key.action === 'euler') this.appendToken('e');
    else if (key.action === 'reciprocal') this.wrapCurrent('inv');
    else if (key.action === 'tenPower') this.wrapCurrent('10^');
    else if (key.action === 'ePower') this.wrapCurrent('e^');
    else if (['mc', 'mr', 'mplus', 'mminus', 'ms'].includes(key.action)) this.handleMemory(key.action);
    this.updateDisplay();
  },

  wrapCurrent(prefix) {
    const value = this.expression || (this.display !== '0' ? this.display : '');
    this.expression = value ? `${prefix}(${value})` : `${prefix}(`;
    this.display = '0';
    this.justEvaluated = false;
  },

  currentValue() {
    if (!this.expression) return Number(this.display);
    const result = tryEvaluateExpression(this.expression, this.angleMode);
    if (result.error) return null;
    return result.value;
  },

  handleMemory(action) {
    if (action === 'mc') this.memory = 0;
    else if (action === 'mr') {
      this.expression = '';
      this.display = String(Math.round(this.memory * 1e10) / 1e10);
      this.justEvaluated = true;
    }
    else {
      const value = this.currentValue();
      if (value === null || !Number.isFinite(value)) return;
      if (action === 'mplus') this.memory += value;
      if (action === 'mminus') this.memory -= value;
      if (action === 'ms') this.memory = value;
      this.expression = '';
      this.display = String(Math.round(this.memory * 1e10) / 1e10);
    }
  },

  calculate() {
    if (!this.expression) return;
    const result = tryEvaluateExpression(this.expression, this.angleMode);
    const resultText = result.error ? `Error: ${result.error}` : String(result.value);
    this.history.unshift({ expr: this.expression, result: resultText, timestamp: new Date().toISOString() });
    if (this.history.length > 50) this.history.pop();
    Storage.set('scientific_history', this.history);
    this.display = resultText;
    this.justEvaluated = true;
    this.renderHistory();
  },

  renderHistory() {
    const section = document.getElementById('sci-history');
    const list = document.getElementById('sci-history-list');
    section.classList.toggle('hidden', this.history.length === 0);
    list.innerHTML = '';
    this.history.forEach((item, index) => {
      const entry = document.createElement('div');
      entry.className = 'history-entry';
      entry.innerHTML = `<button class="sci-history-reuse" aria-label="Reuse ${escapeHtml(item.expr)}"><span class="history-entry-expr">${escapeHtml(item.expr)}</span><span class="history-entry-result">= ${escapeHtml(item.result)}</span></button><button class="sci-history-delete" aria-label="Delete history item">×</button>`;
      entry.querySelector('.sci-history-reuse').addEventListener('click', () => {
        this.expression = item.expr;
        this.display = item.result;
        this.justEvaluated = true;
        this.updateDisplay();
      });
      entry.querySelector('.sci-history-delete').addEventListener('click', () => {
        this.history.splice(index, 1);
        Storage.set('scientific_history', this.history);
        this.renderHistory();
      });
      list.appendChild(entry);
    });
    document.getElementById('sci-clear-history').onclick = () => {
      this.history = [];
      Storage.set('scientific_history', []);
      this.renderHistory();
    };
  },

  evaluate(expr) {
    return evaluateMathExpression(expr);
  },

  updateDisplay() {
    document.getElementById('sci-display').textContent = this.display;
    document.getElementById('sci-display').classList.toggle('error', this.display.startsWith('Error'));
    document.getElementById('sci-expr').textContent = this.expression;
    document.getElementById('sci-memory').textContent = this.memory !== 0 ? `M = ${this.memory}` : '';
  }
};

/* =============================================================
   SECTION 8: CONVERTER
   ============================================================= */

const Converter = {
  categories: {
    length: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5"><path d="M2 12h20"/><path d="M6 8v8"/><path d="M18 8v8"/></svg>',
      units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, ft: 0.3048, in: 0.0254, yd: 0.9144 }
    },
    weight: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="1.5"><circle cx="12" cy="5" r="3"/><path d="M6 8h12l2 12H4l2-12z"/></svg>',
      units: { kg: 1, g: 0.001, mg: 0.000001, ton: 1000, lb: 0.453592, oz: 0.0283495 }
    },
    temperature: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FF8A3D" stroke-width="1.5"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>',
      units: { '°C': 'celsius', '°F': 'fahrenheit', 'K': 'kelvin' },
      isTemp: true
    },
    area: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>',
      units: { 'm²': 1, 'km²': 1e6, 'ft²': 0.092903, acre: 4046.86, hectare: 10000 }
    },
    volume: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="1.5"><path d="M3 18h18v3H3z"/><path d="M5 18V6l7-3 7 3v12"/></svg>',
      units: { L: 1, mL: 0.001, gal: 3.78541, 'cm³': 0.001, 'm³': 1000 }
    },
    speed: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#F472B6" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      units: { 'km/h': 1, 'm/s': 3.6, 'mph': 1.60934 }
    },
    time: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      units: { s: 1, min: 60, h: 3600, day: 86400, week: 604800 }
    },
    data: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
      units: { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 }
    }
  },

  currentCat: 'length',
  swapDir: false,

  init() {
    this.swapDir = false;
    this.renderCategories();
    this.selectCategory('length');
    const input = document.getElementById('conv-input');
    input.addEventListener('input', () => {
      const sanitized = sanitizeNumericValue(input.value, { allowNegative: true, allowDecimal: true });
      if (sanitized !== input.value) input.value = sanitized;
      this.convert();
    });
    input.addEventListener('paste', (event) => {
      event.preventDefault();
      const pasted = (event.clipboardData || window.clipboardData).getData('text');
      const sanitized = sanitizeNumericValue(pasted, { allowNegative: true, allowDecimal: true });
      document.execCommand('insertText', false, sanitized);
      this.convert();
    });
    input.addEventListener('blur', () => {
      const sanitized = sanitizeNumericValue(input.value, { allowNegative: true, allowDecimal: true });
      if (sanitized !== input.value) input.value = sanitized;
      this.convert();
    });
    document.getElementById('conv-from').addEventListener('change', () => this.convert());
    document.getElementById('conv-to').addEventListener('change', () => this.convert());
    document.getElementById('conv-swap').addEventListener('click', () => {
      this.swapDir = !this.swapDir;
      const fromSel = document.getElementById('conv-from');
      const toSel = document.getElementById('conv-to');
      const temp = fromSel.value;
      fromSel.value = toSel.value;
      toSel.value = temp;
      this.convert();
    });
  },

  renderCategories() {
    const container = document.getElementById('conv-categories');
    container.innerHTML = '';
    Object.entries(this.categories).forEach(([key, cat]) => {
      const btn = document.createElement('button');
      btn.className = 'conv-cat-btn' + (key === this.currentCat ? ' active' : '');
      btn.innerHTML = `<div class="conv-cat-icon">${cat.icon}</div><span class="conv-cat-name">${key.charAt(0).toUpperCase() + key.slice(1)}</span>`;
      btn.addEventListener('click', () => this.selectCategory(key));
      container.appendChild(btn);
    });
  },

  selectCategory(cat) {
    this.currentCat = cat;
    this.renderCategories();
    const units = this.categories[cat].units;
    const fromSel = document.getElementById('conv-from');
    const toSel = document.getElementById('conv-to');
    fromSel.innerHTML = '';
    toSel.innerHTML = '';
    const keys = Object.keys(units);
    keys.forEach((u, i) => {
      fromSel.innerHTML += `<option value="${u}">${u}</option>`;
      toSel.innerHTML += `<option value="${u}" ${i === 1 ? 'selected' : ''}>${u}</option>`;
    });
    document.getElementById('conv-input').value = '1';
    this.convert();
  },

  convert() {
    const inputEl = document.getElementById('conv-input');
    const rawValue = inputEl.value;
    const sanitized = sanitizeNumericValue(rawValue, { allowNegative: true, allowDecimal: true });
    if (sanitized !== rawValue) inputEl.value = sanitized;
    const input = parseFloat(sanitized);
    const from = document.getElementById('conv-from').value;
    const to = document.getElementById('conv-to').value;
    const resultEl = document.getElementById('conv-result');

    if (sanitized === '' || isNaN(input)) {
      resultEl.textContent = '—';
      inputEl.classList.add('error');
      return;
    }

    inputEl.classList.remove('error');

    const cat = this.categories[this.currentCat];

    if (cat.isTemp) {
      let celsius;
      if (from === '°C') celsius = input;
      else if (from === '°F') celsius = (input - 32) * 5 / 9;
      else if (from === 'K') celsius = input - 273.15;

      let result;
      if (to === '°C') result = celsius;
      else if (to === '°F') result = celsius * 9 / 5 + 32;
      else if (to === 'K') result = celsius + 273.15;

      resultEl.textContent = input + ' ' + from + ' = ' + Math.round(result * 100) / 100 + ' ' + to;
    } else {
      const units = cat.units;
      const fromFactor = units[from];
      const toFactor = units[to];
      const baseValue = input * fromFactor;
      const result = baseValue / toFactor;
      resultEl.textContent = input + ' ' + from + ' = ' + (Math.round(result * 1e6) / 1e6) + ' ' + to;
    }
  }
};

/* =============================================================
   SECTION 9: SCHOLAR TOOL (5-step wizard)
   ============================================================= */

const ScholarTool = {
  step: 1,
  formula: null,
  inputs: {},

  FORMULAS: [
    { id: 'percentage', name: 'Percentage', expr: 'P = (Part / Whole) × 100', fields: [
      { key: 'part', label: 'Part', placeholder: 'e.g. 20' },
      { key: 'whole', label: 'Whole', placeholder: 'e.g. 80' }
    ]},
    { id: 'si', name: 'Simple Interest', expr: 'SI = P × R × T / 100', fields: [
      { key: 'principal', label: 'Principal (₹)', placeholder: 'e.g. 5000' },
      { key: 'rate', label: 'Rate (%)', placeholder: 'e.g. 8' },
      { key: 'time', label: 'Time (years)', placeholder: 'e.g. 3' }
    ]},
    { id: 'area_tri', name: 'Triangle Area', expr: 'A = ½ × base × height', fields: [
      { key: 'base', label: 'Base', placeholder: 'e.g. 10' },
      { key: 'height', label: 'Height', placeholder: 'e.g. 6' }
    ]},
    { id: 'speed', name: 'Speed', expr: 'S = D / T', fields: [
      { key: 'distance', label: 'Distance (km)', placeholder: 'e.g. 200' },
      { key: 'time', label: 'Time (hours)', placeholder: 'e.g. 4' }
    ]},
    { id: 'pl', name: 'Profit/Loss', expr: 'Profit% = (SP - CP) / CP × 100', fields: [
      { key: 'cp', label: 'Cost Price (₹)', placeholder: 'e.g. 200' },
      { key: 'sp', label: 'Selling Price (₹)', placeholder: 'e.g. 250' }
    ]},
    { id: 'avg', name: 'Average', expr: 'Avg = Sum / Count', fields: [
      { key: 'sum', label: 'Sum of values', placeholder: 'e.g. 28' },
      { key: 'count', label: 'Count of values', placeholder: 'e.g. 4' }
    ]},
    { id: 'tw', name: 'Time & Work', expr: 'Together = (a × b) / (a + b)', fields: [
      { key: 'a', label: 'A takes (days)', placeholder: 'e.g. 6' },
      { key: 'b', label: 'B takes (days)', placeholder: 'e.g. 12' }
    ]},
  ],

  init() {
    this.step = 1;
    this.formula = null;
    this.inputs = {};
    this.renderProgress();
    this.renderStep();
  },

  sanitizeFieldValue(rawValue, allowNegative = false) {
    return sanitizeNumericValue(rawValue, { allowNegative, allowDecimal: true });
  },

  validateFieldValue(rawValue, field, formula = this.formula) {
    const sanitized = this.sanitizeFieldValue(rawValue, false);
    if (sanitized === '') {
      return { valid: false, sanitized, message: 'Please enter a number.' };
    }

    const numeric = Number(sanitized);
    if (!Number.isFinite(numeric)) {
      return { valid: false, sanitized, message: 'Please enter a valid number.' };
    }

    if (numeric < 0) {
      return { valid: false, sanitized, message: 'Value cannot be negative.' };
    }

    const rules = {
      part: { min: 0, allowZero: true },
      whole: { min: 1 },
      principal: { min: 1 },
      rate: { min: 1 },
      time: { min: 1 },
      base: { min: 1 },
      height: { min: 1 },
      distance: { min: 1 },
      cp: { min: 1 },
      sp: { min: 0, allowZero: true },
      sum: { min: 0, allowZero: true },
      count: { min: 1 },
      a: { min: 1 },
      b: { min: 1 },
    };

    const rule = rules[field.key] || { min: 0, allowZero: true };
    if (numeric < rule.min) {
      return { valid: false, sanitized, message: 'Value must be greater than or equal to ' + rule.min + '.' };
    }
    if (!rule.allowZero && numeric === 0) {
      return { valid: false, sanitized, message: 'Value must be greater than zero.' };
    }

    if (formula?.id === 'percentage' && field.key === 'whole' && numeric === 0) {
      return { valid: false, sanitized, message: 'Whole value cannot be zero.' };
    }
    if (formula?.id === 'avg' && field.key === 'count' && numeric === 0) {
      return { valid: false, sanitized, message: 'Count cannot be zero.' };
    }

    return { valid: true, sanitized, message: '' };
  },

  showFieldError(input, message) {
    const errorEl = input.parentElement.querySelector('.scholar-input-error');
    if (errorEl) errorEl.textContent = message || '';
  },

  attachNumericInput(input, field) {
    const applyValue = () => {
      const sanitized = this.sanitizeFieldValue(input.value);
      if (sanitized !== input.value) input.value = sanitized;
      input.classList.remove('error');
      this.showFieldError(input, '');
    };

    input.addEventListener('input', applyValue);
    input.addEventListener('paste', (event) => {
      event.preventDefault();
      const pasted = (event.clipboardData || window.clipboardData).getData('text');
      const sanitized = this.sanitizeFieldValue(pasted);
      input.value = sanitized;
      input.classList.remove('error');
      this.showFieldError(input, '');
    });
    input.addEventListener('change', () => {
      const validation = this.validateFieldValue(input.value, field, this.formula);
      if (!validation.valid) {
        input.classList.add('error');
        this.showFieldError(input, validation.message);
      } else {
        input.classList.remove('error');
        this.showFieldError(input, '');
      }
    });
    input.addEventListener('blur', () => {
      const validation = this.validateFieldValue(input.value, field, this.formula);
      if (!validation.valid) {
        input.classList.add('error');
        this.showFieldError(input, validation.message);
      } else {
        input.classList.remove('error');
        this.showFieldError(input, '');
      }
    });
  },

  collectInputs() {
    const errors = [];
    this.formula.fields.forEach(field => {
      const input = document.getElementById('scholar-input-' + field.key);
      const rawValue = input ? input.value : (this.inputs[field.key] ?? '');
      const validation = this.validateFieldValue(rawValue, field, this.formula);
      if (!validation.valid) {
        if (input) {
          input.classList.add('error');
          this.showFieldError(input, validation.message);
        }
        errors.push(validation.message);
        return;
      }
      this.inputs[field.key] = validation.sanitized;
      if (input) {
        input.classList.remove('error');
        this.showFieldError(input, '');
      }
    });
    return errors.length === 0;
  },

  renderProgress() {
    const container = document.getElementById('scholar-progress');
    container.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'scholar-step-indicator';
      const num = document.createElement('span');
      num.className = 'scholar-step-num';
      if (i < this.step) num.classList.add('done');
      if (i === this.step) num.classList.add('active');
      num.textContent = i;
      indicator.appendChild(num);
      if (i < 5) {
        const line = document.createElement('div');
        line.className = 'scholar-step-line' + (i < this.step ? ' done' : '');
        indicator.appendChild(line);
      }
      container.appendChild(indicator);
    }
  },

  renderStep() {
    const container = document.getElementById('scholar-step-content');
    container.innerHTML = '';

    switch (this.step) {
      case 1: this.renderStep1(container); break;
      case 2: this.renderStep2(container); break;
      case 3: this.renderStep3(container); break;
      case 4: this.renderStep4(container); break;
      case 5: this.renderStep5(container); break;
    }
  },

  renderStep1(container) {
    container.innerHTML = `
      <h3 class="scholar-section-title">Choose Formula</h3>
      <p class="scholar-section-desc">Select the formula you want to solve.</p>
      <div id="formula-selector"></div>
      <div class="scholar-btn-row">
        <div style="flex:1"></div>
        <button class="btn-primary" id="scholar-next-1" disabled>Next →</button>
      </div>
    `;
    const selector = document.getElementById('formula-selector');
    this.FORMULAS.forEach(f => {
      const item = document.createElement('button');
      item.className = 'scholar-formula-item' + (this.formula?.id === f.id ? ' selected' : '');
      item.innerHTML = `
        <div class="scholar-formula-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#FF8A3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg></div>
        <div class="scholar-formula-text">
          <p class="scholar-formula-name">${f.name}</p>
          <p class="scholar-formula-expr">${f.expr}</p>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="#7A7A88" stroke-width="2" width="20" height="20"><path d="M9 18l6-6-6-6"/></svg>
      `;
      item.addEventListener('click', () => {
        this.formula = f;
        selector.querySelectorAll('.scholar-formula-item').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
        document.getElementById('scholar-next-1').disabled = false;
      });
      selector.appendChild(item);
    });
    document.getElementById('scholar-next-1').addEventListener('click', () => { this.step = 2; this.renderProgress(); this.renderStep(); });
  },

  renderStep2(container) {
    const f = this.formula;
    container.innerHTML = `
      <h3 class="scholar-section-title">${f.name}</h3>
      <p class="scholar-section-desc">Enter the values for each variable.</p>
      <div class="verify-card">
        <p class="verify-card-title">FORMULA</p>
        <p class="verify-formula">${f.expr}</p>
      </div>
      <div id="input-fields"></div>
      <div class="scholar-btn-row">
        <button class="btn-back" id="scholar-back-2">← Back</button>
        <button class="btn-primary" id="scholar-next-2">Next →</button>
      </div>
    `;
    const fieldsContainer = document.getElementById('input-fields');
    f.fields.forEach(field => {
      const group = document.createElement('div');
      group.className = 'scholar-input-group';
      group.innerHTML = `
        <label class="scholar-input-label">${field.label}</label>
        <input type="text" class="scholar-input" id="scholar-input-${field.key}" data-numeric-input="true" data-allow-negative="false" data-allow-decimal="true" placeholder="${field.placeholder}" inputmode="decimal" step="any">
        <div class="scholar-input-error"></div>
      `;
      fieldsContainer.appendChild(group);
      this.attachNumericInput(fieldsContainer.querySelector('#scholar-input-' + field.key), field);
    });
    document.getElementById('scholar-back-2').addEventListener('click', () => { this.step = 1; this.renderProgress(); this.renderStep(); });
    document.getElementById('scholar-next-2').addEventListener('click', () => {
      if (!this.collectInputs()) return;
      this.step = 3;
      this.renderProgress();
      this.renderStep();
    });
  },

  renderStep3(container) {
    const f = this.formula;
    container.innerHTML = `
      <h3 class="scholar-section-title">Verify & Calculate</h3>
      <p class="scholar-section-desc">Check your inputs and tap Calculate.</p>
      <div class="verify-card">
        <p class="verify-card-title">FORMULA</p>
        <p class="verify-formula">${f.expr}</p>
        ${f.fields.map(field => `
          <div class="verify-field">
            <span class="verify-field-label">${field.label}</span>
            <span class="verify-field-value">${this.inputs[field.key] || '—'}</span>
          </div>
        `).join('')}
      </div>
      <div class="tips-box">
        <div class="tips-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF8A3D" stroke-width="2"><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/><path d="M10 22h4"/></svg>
          <span class="tips-label">Tips</span>
        </div>
        <ul class="tips-list">
          <li>Double-check all values before calculating</li>
          <li>Use consistent units (all in km, all in meters, etc.)</li>
          <li>For percentage, ensure Part ≤ Whole</li>
        </ul>
      </div>
      <div class="scholar-btn-row">
        <button class="btn-back" id="scholar-back-3">← Back</button>
        <button class="btn-primary" id="scholar-calc-btn">Calculate</button>
      </div>
    `;
    document.getElementById('scholar-back-3').addEventListener('click', () => { this.step = 2; this.renderProgress(); this.renderStep(); });
    document.getElementById('scholar-calc-btn').addEventListener('click', () => {
      if (!this.collectInputs()) return;
      this.step = 4;
      this.renderProgress();
      this.renderStep();
    });
  },

  renderStep4(container) {
    const f = this.formula;
    let result = 0;
    const vals = {};
    f.fields.forEach(field => { vals[field.key] = parseFloat(this.inputs[field.key]) || 0; });

    switch (f.id) {
      case 'percentage': result = (vals.part / vals.whole) * 100; break;
      case 'si': result = (vals.principal * vals.rate * vals.time) / 100; break;
      case 'area_tri': result = 0.5 * vals.base * vals.height; break;
      case 'speed': result = vals.distance / vals.time; break;
      case 'pl':
        const profit = vals.sp - vals.cp;
        result = (profit / vals.cp) * 100;
        break;
      case 'avg': result = vals.sum / vals.count; break;
      case 'tw': result = (vals.a * vals.b) / (vals.a + vals.b); break;
    }

    const resultText = f.id === 'pl'
      ? (result >= 0 ? 'Profit: ' + result.toFixed(2) + '%' : 'Loss: ' + Math.abs(result).toFixed(2) + '%')
      : f.id === 'speed' ? result.toFixed(2) + ' km/h'
      : f.id === 'si' ? '₹' + result.toFixed(2)
      : result.toFixed(2);

    container.innerHTML = `
      <h3 class="scholar-section-title">Result</h3>
      <p class="scholar-section-desc">Here's your calculated answer.</p>
      <div class="result-card">
        <p class="result-card-label">${f.name.toUpperCase()}</p>
        <p class="result-card-value">${resultText}</p>
      </div>
      <div class="verify-card">
        <p class="verify-card-title">CALCULATION</p>
        <p class="verify-formula">${f.expr}</p>
        ${f.fields.map(field => `
          <div class="verify-field">
            <span class="verify-field-label">${field.label}</span>
            <span class="verify-field-value">${this.inputs[field.key]}</span>
          </div>
        `).join('')}
      </div>
      <div class="scholar-btn-row">
        <button class="btn-back" id="scholar-back-4">← Back</button>
        <button class="btn-primary" id="scholar-done">Done ✓</button>
      </div>
    `;
    document.getElementById('scholar-back-4').addEventListener('click', () => { this.step = 3; this.renderProgress(); this.renderStep(); });
    document.getElementById('scholar-done').addEventListener('click', () => { this.step = 5; this.renderProgress(); this.renderStep(); });
  },

  renderStep5(container) {
    const f = this.formula;
    container.innerHTML = `
      <h3 class="scholar-section-title">Done!</h3>
      <p class="scholar-section-desc">Your calculation is complete. What next?</p>
      <div class="result-card" style="margin-bottom:16px">
        <p class="result-card-label">${f.name.toUpperCase()} — SOLVED</p>
      </div>
      <div class="tips-box">
        <div class="tips-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF8A3D" stroke-width="2"><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/><path d="M10 22h4"/></svg>
          <span class="tips-label">Next Steps</span>
        </div>
        <ul class="tips-list">
          <li>Practice similar problems in the Practice section</li>
          <li>Review the formula in Formulas section</li>
          <li>Try a different formula</li>
        </ul>
      </div>
      <div class="scholar-btn-row">
        <button class="btn-back" id="scholar-restart">Start Over</button>
        <button class="btn-primary" id="scholar-home-btn">Home</button>
      </div>
    `;
    document.getElementById('scholar-restart').addEventListener('click', () => this.init());
    document.getElementById('scholar-home-btn').addEventListener('click', () => Router.go('home'));
  }
};

/* =============================================================
   SECTION 10: FORMULAS PAGE
   ============================================================= */

const FormulasPage = {
  search: '',
  category: 'All',
  difficulty: 'All',
  showFav: false,
  favorites: [],

  init() {
    this.favorites = Storage.getArr('favorites', []);
    this.search = '';
    this.category = 'All';
    this.difficulty = 'All';
    this.showFav = false;
    document.getElementById('formula-search-input').value = '';
    this.renderChips();
    this.renderList();
  },

  renderChips() {
    const categories = ['All', ...new Set(FORMULAS.map(f => f.category))];
    const catChips = document.getElementById('formula-category-chips');
    catChips.innerHTML = '';
    categories.forEach(c => {
      const chip = document.createElement('button');
      chip.className = 'chip' + (this.category === c ? ' active' : '');
      chip.textContent = c;
      chip.addEventListener('click', () => { this.category = c; this.renderChips(); this.renderList(); });
      catChips.appendChild(chip);
    });

    const diffChips = document.getElementById('formula-difficulty-chips');
    diffChips.innerHTML = '';
    ['All', 'Easy', 'Medium', 'Hard'].forEach(d => {
      const chip = document.createElement('button');
      chip.className = 'chip difficulty-chip' + (this.difficulty === d ? ' active-' + d.toLowerCase() : '');
      chip.textContent = d === 'All' ? '★ Favorites' : d;
      if (d === 'All') {
        chip.classList.add('fav-chip');
        if (this.showFav) chip.classList.add('active');
        chip.addEventListener('click', () => { this.showFav = !this.showFav; this.renderChips(); this.renderList(); });
      } else {
        chip.addEventListener('click', () => { this.difficulty = d; this.showFav = false; this.renderChips(); this.renderList(); });
      }
      diffChips.appendChild(chip);
    });

    // Search
    document.getElementById('formula-search-input').addEventListener('input', (e) => {
      this.search = e.target.value.toLowerCase();
      this.renderList();
    });
  },

  renderList() {
    let items = FORMULAS;
    if (this.category !== 'All') items = items.filter(f => f.category === this.category);
    if (this.difficulty !== 'All') items = items.filter(f => f.difficulty === this.difficulty);
    if (this.showFav) items = items.filter(f => this.favorites.includes(f.id));
    if (this.search) {
      items = items.filter(f =>
        f.title.toLowerCase().includes(this.search) ||
        f.category.toLowerCase().includes(this.search) ||
        f.formula.toLowerCase().includes(this.search)
      );
    }

    document.getElementById('formula-count').textContent = items.length + ' found';
    const list = document.getElementById('formula-list');
    list.innerHTML = '';

    if (items.length === 0) {
      list.innerHTML = '<div class="empty-state">No formulas found</div>';
      return;
    }

    items.forEach(f => {
      const isFav = this.favorites.includes(f.id);
      const card = document.createElement('div');
      card.className = 'formula-card';
      card.innerHTML = `
        <div class="formula-card-header">
          <h3 class="formula-card-title">${f.title}</h3>
          <button class="formula-fav-btn${isFav ? ' active' : ''}" data-fav-id="${f.id}">
            <span class="star-icon">${isFav ? '★' : '☆'}</span>
            <span class="favorite-label">${isFav ? 'Added to Favorites' : 'Add to Favorites'}</span>
          </button>
        </div>
        <div class="formula-tags">
          <span class="formula-tag cat">${f.category}</span>
          <span class="formula-tag diff-${f.difficulty.toLowerCase()}">${f.difficulty}</span>
        </div>
        <div class="formula-expression">${f.formula}</div>
        <div class="formula-trick">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="2" width="14" height="14"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          <div>
            <p class="formula-trick-text">Trick: ${f.trick}</p>
            <p class="formula-example">${f.example}</p>
          </div>
        </div>
        <p class="formula-explanation">${f.explanation}</p>
      `;
      list.appendChild(card);
    });

    // Fav button handlers
    list.querySelectorAll('[data-fav-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.favId);
        this.favorites = Storage.toggleFav(id);
        this.renderList();
      });
    });
  }
};

/* =============================================================
   SECTION 11: TRICKS PAGE
   ============================================================= */

const TricksPage = {
  topic: 'All',

  init() {
    this.topic = 'All';
    const topics = ['All', ...new Set(TRICKS_DATA.map(t => t.topic))];
    const container = document.getElementById('tricks-chips');
    container.innerHTML = '';
    topics.forEach(t => {
      const chip = document.createElement('button');
      chip.className = 'chip' + (this.topic === t ? ' active' : '');
      chip.textContent = t;
      chip.addEventListener('click', () => { this.topic = t; this.render(); });
      container.appendChild(chip);
    });
    this.render();
  },

  render() {
    document.querySelectorAll('#tricks-chips .chip').forEach(c => {
      c.classList.toggle('active', c.textContent === this.topic);
    });
    const items = this.topic === 'All' ? TRICKS_DATA : TRICKS_DATA.filter(t => t.topic === this.topic);
    const list = document.getElementById('tricks-list');
    list.innerHTML = '';
    items.forEach(t => {
      const card = document.createElement('div');
      card.className = 'trick-card';
      card.innerHTML = `
        <div class="trick-card-header">
          <h3 class="trick-card-title">${t.title}</h3>
          <span class="trick-card-topic">${t.topic}</span>
        </div>
        <p class="trick-card-body">${t.text}</p>
        <div class="trick-card-example">${t.example}</div>
        <span class="trick-card-time">⚡ ${t.timeSaved}</span>
      `;
      list.appendChild(card);
    });
  }
};

/* =============================================================
   SECTION 12: PRACTICE PAGE
   ============================================================= */

const PracticePage = {
  selectedTopic: null,
  difficulty: 'Easy',
  picked: null,
  showHint: false,
  currentQ: null,
  total: 0,
  correct: 0,

  TOPIC_META: {
    maths: { name: 'Mathematics', color: '#34D399' },
    scholarship: { name: 'Scholarship', color: '#FF8A3D' },
    buddhi: { name: 'BuddhiMatta', color: '#F472B6' },
    logic: { name: 'Logic', color: '#A78BFA' },
  },

  init() {
    this.selectedTopic = null;
    this.difficulty = 'Easy';
    this.picked = null;
    this.showHint = false;
    const stats = Storage.getArr('practice_stats', { total: 0, correct: 0 });
    if (stats && typeof stats === 'object') {
      this.total = stats.total || 0;
      this.correct = stats.correct || 0;
    }
    this.render();
  },

  render() {
    const container = document.getElementById('practice-content');
    const subtitle = document.getElementById('practice-subtitle');

    if (!this.selectedTopic) {
      subtitle.textContent = 'MCQ Quiz';
      container.innerHTML = `
        <div class="practice-topics">
          ${Object.entries(this.TOPIC_META).map(([key, meta]) => `
            <button class="practice-topic-card" data-topic="${key}">
              <div class="practice-topic-icon" style="background:${meta.color}22;border:1px solid ${meta.color}44">
                <svg viewBox="0 0 24 24" fill="none" stroke="${meta.color}" stroke-width="1.5" width="20" height="20"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <div>
                <p class="practice-topic-name">${meta.name}</p>
                <p class="practice-topic-start" style="color:${meta.color}">Tap to start →</p>
              </div>
            </button>
          `).join('')}
        </div>
        ${this.total > 0 ? `
          <div class="practice-stats">
            <div>
              <p class="practice-stats-text">Session Stats</p>
              <p class="practice-stats-score">${this.correct} correct / ${this.total} total</p>
            </div>
            <button class="practice-change-btn" id="practice-reset">Reset</button>
          </div>
        ` : ''}
      `;
      container.querySelectorAll('[data-topic]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedTopic = btn.dataset.topic;
          this.nextQuestion();
          this.render();
        });
      });
      const resetBtn = document.getElementById('practice-reset');
      if (resetBtn) resetBtn.addEventListener('click', () => { this.total = 0; this.correct = 0; Storage.set('practice_stats', { total: 0, correct: 0 }); this.render(); });
      return;
    }

    const meta = this.TOPIC_META[this.selectedTopic];
    subtitle.textContent = 'Score: ' + this.correct + '/' + this.total;
    const questions = PRACTICE_QUESTIONS[this.selectedTopic];
    const q = this.currentQ;

    container.innerHTML = `
      <div class="quiz-difficulty">
        ${['Easy', 'Medium', 'Hard'].map(d => `<button class="quiz-diff-btn${this.difficulty === d ? ' active' : ''}" data-diff="${d}">${d}</button>`).join('')}
      </div>
      <div class="quiz-card">
        <p class="quiz-question-label">Question</p>
        <p class="quiz-question">${q.q}</p>
        <div id="quiz-options"></div>
        <div class="quiz-actions">
          <button class="quiz-action-btn hint" id="quiz-hint-btn">💡 Hint</button>
          <button class="quiz-action-btn explain" id="quiz-explain-btn">Explain</button>
        </div>
        <div id="quiz-hint-panel" class="hidden"></div>
        ${this.picked && this.picked !== q.answer ? `
          <button class="quiz-mistake-save" id="save-mistake-btn">📌 Save to Mistake Book</button>
        ` : ''}
        <button class="quiz-next-btn" id="quiz-next-btn" style="background:${meta.color}">Next Question →</button>
      </div>
    `;

    // Options
    const optContainer = document.getElementById('quiz-options');
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      if (this.picked) {
        if (opt === q.answer) btn.classList.add('correct');
        else if (opt === this.picked && opt !== q.answer) btn.classList.add('wrong');
      }
      if (this.picked === opt) btn.classList.add('selected');
      btn.innerHTML = `<span class="quiz-option-text">${opt}</span>`;
      if (!this.picked) {
        btn.addEventListener('click', () => { 
          this.picked = opt; 
          this.total++; 
          const isCorrect = opt === q.answer;
          if (isCorrect) this.correct++;
          
          // Track to practice_history
          const history = Storage.getArr('practice_history', []);
          history.push({
            topic: 'Practice',
            question: q.q,
            userAnswer: opt,
            correctAnswer: q.answer,
            correct: isCorrect,
            difficulty: this.difficulty,
            timestamp: new Date().toISOString()
          });
          Storage.set('practice_history', history);
          
          // Track achievement
          trackAchievement('first_step');
          if (history.length >= 10) trackAchievement('ten_questions');
          if (history.length >= 100) trackAchievement('hundred_questions');
          
          Storage.set('practice_stats', { total: this.total, correct: this.correct }); 
          this.render(); 
        });
      } else {
        btn.disabled = true;
      }
      optContainer.appendChild(btn);
    });

    // Difficulty buttons
    container.querySelectorAll('[data-diff]').forEach(btn => {
      btn.addEventListener('click', () => { this.difficulty = btn.dataset.diff; this.nextQuestion(); this.render(); });
    });

    // Hint
    document.getElementById('quiz-hint-btn').addEventListener('click', () => {
      this.showHint = !this.showHint;
      const panel = document.getElementById('quiz-hint-panel');
      if (this.showHint) {
        panel.classList.remove('hidden');
        panel.textContent = '💡 ' + q.hint;
      } else {
        panel.classList.add('hidden');
      }
    });

    // Save mistake
    const saveMistakeBtn = document.getElementById('save-mistake-btn');
    if (saveMistakeBtn) {
      saveMistakeBtn.addEventListener('click', () => {
        const mistakes = Storage.getArr('mistake_book', []);
        const selectedTopic = this.TOPIC_META[this.selectedTopic]?.name || 'Practice';
        const mistake = {
          topic: selectedTopic,
          question: q.q,
          userAnswer: this.picked,
          correctAnswer: q.answer,
          explanation: q.explanation || 'Refer to formulas for more details.',
          difficulty: this.difficulty,
          savedDate: new Date().toLocaleDateString()
        };
        mistakes.push(mistake);
        Storage.set('mistake_book', mistakes);
        saveMistakeBtn.textContent = '✓ Saved!';
        saveMistakeBtn.disabled = true;
        refreshAchievementState();
      });
    }

    // Next
    document.getElementById('quiz-next-btn').addEventListener('click', () => { this.nextQuestion(); this.render(); });
  },

  nextQuestion() {
    const questions = PRACTICE_QUESTIONS[this.selectedTopic];
    this.currentQ = questions[Math.floor(Math.random() * questions.length)];
    this.picked = null;
    this.showHint = false;
  }
};

/* =============================================================
   SECTION 13: BUDDHIMATTA PAGE
   ============================================================= */

const BuddhiMattaPage = {
  topic: null,
  idx: 0,
  picked: null,
  showHint: false,
  showExplain: false,

  TOPIC_ICONS: {
    series: '<svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5"><path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3L8 21"/><path d="M16 3l-2 18"/></svg>',
    coding: '<svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    analogy: '<svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    odd: '<svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
    blood: '<svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    direction: '<svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>',
    pattern: '<svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  },

  init() {
    this.topic = null;
    this.idx = 0;
    this.picked = null;
    this.showHint = false;
    this.showExplain = false;
    document.getElementById('buddhi-title').textContent = 'BuddhiMatta';
    document.getElementById('buddhi-subtitle').textContent = 'IQ training';
    this.render();
  },

  render() {
    const container = document.getElementById('buddhi-content');
    if (!this.topic) {
      container.innerHTML = `
        <div class="buddhi-topics">
          ${IQ_TOPICS.map(t => `
            <button class="buddhi-topic-card" data-topic="${t.id}">
              <div class="buddhi-topic-icon">${this.TOPIC_ICONS[t.id] || ''}</div>
              <div>
                <p class="buddhi-topic-name">${t.name}</p>
                <p class="buddhi-topic-count">${(IQ_QUESTIONS[t.id] || []).length} questions</p>
              </div>
            </button>
          `).join('')}
        </div>
      `;
      container.querySelectorAll('[data-topic]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.topic = btn.dataset.topic;
          this.idx = 0;
          this.picked = null;
          this.showHint = false;
          this.showExplain = false;
          const topicMeta = IQ_TOPICS.find(t => t.id === this.topic);
          document.getElementById('buddhi-title').textContent = topicMeta?.name || '';
          this.render();
        });
      });
      return;
    }

    const list = IQ_QUESTIONS[this.topic] || [];
    const q = list[this.idx];
    const topicMeta = IQ_TOPICS.find(t => t.id === this.topic);
    document.getElementById('buddhi-subtitle').textContent = `Question ${this.idx + 1} of ${list.length}`;

    if (!q) return;

    container.innerHTML = `
      <div class="iq-question-card">
        <p class="quiz-question-label">Question</p>
        <p class="quiz-question">${q.q}</p>
        <div id="iq-options"></div>
        <div class="quiz-actions">
          <button class="quiz-action-btn hint" id="iq-hint-btn">💡 Hint</button>
          <button class="quiz-action-btn explain" id="iq-explain-btn">Explain</button>
        </div>
        <div id="iq-hint-panel" class="${this.showHint ? '' : 'hidden'} quiz-hint-panel">${this.showHint ? q.hint : ''}</div>
        <div id="iq-explain-panel" class="${this.showExplain ? '' : 'hidden'}">
          <div class="iq-explanation">
            <p class="iq-explanation-label">Answer</p>
            <p class="iq-explanation-text">${q.explanation.en || q.explanation.mr || q.explanation.hi || ''}</p>
          </div>
        </div>
        <button class="quiz-next-btn" id="iq-next-btn">Next Question →</button>
      </div>
    `;

    // Options
    const optContainer = document.getElementById('iq-options');
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'iq-option';
      btn.innerHTML = `<span class="iq-option-text">${opt}</span>`;
      if (this.picked) {
        if (opt === q.answer) btn.classList.add('correct');
        else if (opt === this.picked && opt !== q.answer) btn.classList.add('wrong');
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => { this.picked = opt; this.render(); });
      }
      optContainer.appendChild(btn);
    });

    document.getElementById('iq-hint-btn').addEventListener('click', () => { this.showHint = !this.showHint; this.render(); });
    document.getElementById('iq-explain-btn').addEventListener('click', () => { this.showExplain = !this.showExplain; this.render(); });
    document.getElementById('iq-next-btn').addEventListener('click', () => {
      this.idx = (this.idx + 1) % list.length;
      this.picked = null;
      this.showHint = false;
      this.showExplain = false;
      this.render();
    });
  }
};

/* =============================================================
   SECTION 14: SQUARES & CUBES PAGE
   ============================================================= */

const SquaresCubesPage = {
  tab: 'table',

  init() {
    this.tab = 'table';
    this.render();
  },

  render() {
    const content = document.getElementById('sq-content');
    document.getElementById('sq-tab-table').classList.toggle('tab-active', this.tab === 'table');
    document.getElementById('sq-tab-tricks').classList.toggle('tab-active', this.tab === 'tricks');

    if (this.tab === 'table') {
      content.innerHTML = `<div class="module-grid">${SQUARES.map(s => `
        <div class="sq-card">
          <p class="sq-card-n">n = ${s.n}</p>
          <p class="sq-card-square">n² = ${s.square}</p>
          <p class="sq-card-cube">n³ = ${s.cube}</p>
        </div>
      `).join('')}</div>`;
    } else {
      const tricks = [
        { title: 'Squares of numbers ending in 5', text: 'Take tens digit (n). Answer = n × (n+1) followed by 25.', example: '45² → 4×5=20 → 2025' },
        { title: 'Square near a base (e.g. 100)', text: '(100+a)² = 10000 + 200a + a²', example: '103² = 10000 + 600 + 9 = 10609' },
        { title: 'Cube of small numbers', text: 'Memorize 1³ to 10³. Use them as building blocks.', example: '7³ = 343' },
      ];
      content.innerHTML = tricks.map(t => `
        <div class="sq-trick-card">
          <p class="sq-trick-title">${t.title}</p>
          <p class="sq-trick-text">${t.text}</p>
          <div class="sq-trick-example">${t.example}</div>
        </div>
      `).join('');
    }
  }
};

// Tab click handlers
document.getElementById('sq-tab-table').addEventListener('click', () => { SquaresCubesPage.tab = 'table'; SquaresCubesPage.render(); });
document.getElementById('sq-tab-tricks').addEventListener('click', () => { SquaresCubesPage.tab = 'tricks'; SquaresCubesPage.render(); });

/* =============================================================
   SECTION 15: GK REVISION PAGE
   ============================================================= */

const GKRevision = {
  category: 'All',

  CAT_COLORS: {
    National: '#FF8A3D',
    Maharashtra: '#A78BFA',
    International: '#60A5FA',
  },

  init() {
    this.category = 'All';
    const chips = document.getElementById('gk-chips');
    chips.innerHTML = '';
    ['All', 'National', 'Maharashtra', 'International'].forEach(c => {
      const chip = document.createElement('button');
      chip.className = 'chip' + (this.category === c ? ' active' : '');
      chip.textContent = c;
      chip.addEventListener('click', () => { this.category = c; this.render(); });
      chips.appendChild(chip);
    });
    this.render();
  },

  render() {
    document.querySelectorAll('#gk-chips .chip').forEach(c => c.classList.toggle('active', c.textContent === this.category));
    const items = this.category === 'All' ? GK_DAYS : GK_DAYS.filter(d => d.category === this.category);
    const list = document.getElementById('gk-list');
    list.innerHTML = '';
    items.forEach(g => {
      const parts = g.date.split(' ');
      const day = parts[0];
      const month = (parts[1] || '').substring(0, 3).toUpperCase();
      const color = this.CAT_COLORS[g.category] || '#7A7A88';
      const item = document.createElement('div');
      item.className = 'gk-item';
      item.innerHTML = `
        <div class="gk-date-tile" style="background:${color}">
          <span class="gk-date-month">${month}</span>
          <span class="gk-date-day">${day}</span>
        </div>
        <div class="gk-item-text">
          <p class="gk-item-name">${g.name}</p>
          <span class="gk-item-category" style="background:${color}22;color:${color}">${g.category}</span>
        </div>
      `;
      list.appendChild(item);
    });
  }
};

/* =============================================================
   SECTION 16: MEMORY TRICKS PAGE
   ============================================================= */

const MemoryTricks = {
  init() {
    const list = document.getElementById('memory-list');
    list.innerHTML = '';
    MEMORY_TRICKS.forEach(t => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.innerHTML = `
        <div class="memory-card-header">
          <span class="memory-card-icon">${t.icon}</span>
          <h3 class="memory-card-title">${t.title}</h3>
        </div>
        <p class="memory-mnemonic-label">MNEMONIC</p>
        <p class="memory-mnemonic-value">${t.mnemonic}</p>
        <p class="memory-meaning">${t.meaning}</p>
      `;
      list.appendChild(card);
    });
  }
};

/* =============================================================
   SECTION 17: FAST REVISION PAGE
   ============================================================= */

const FastRevision = {
  CAT_COLORS: {
    Percentage: '#FF8A3D',
    Ratio: '#22D3EE',
    Algebra: '#A78BFA',
    Geometry: '#60A5FA',
    Arithmetic: '#34D399',
    Scholarship: '#F472B6',
  },

  init() {
    const list = document.getElementById('fast-revision-list');
    list.innerHTML = '';
    const categories = [...new Set(FORMULAS.map(f => f.category))];
    categories.forEach(cat => {
      const items = FORMULAS.filter(f => f.category === cat);
      const color = this.CAT_COLORS[cat] || '#7A7A88';
      const section = document.createElement('div');
      section.className = 'fast-rev-category';
      section.innerHTML = `
        <div class="fast-rev-cat-header">
          <div class="fast-rev-cat-bar" style="background:${color}"></div>
          <h2 class="fast-rev-cat-title">${cat}</h2>
        </div>
        ${items.map(f => `
          <div class="fast-rev-item">
            <div>
              <p class="fast-rev-item-title">${f.title}</p>
              <p class="fast-rev-item-formula">${f.formula}</p>
            </div>
            <span class="fast-rev-item-diff" style="background:${color}22;color:${color}">${f.difficulty}</span>
          </div>
        `).join('')}
      `;
      list.appendChild(section);
    });
  }
};

/* =============================================================
   SECTION 18: SETTINGS PAGE
   ============================================================= */

const SettingsPage = {
  init() {
    const container = document.getElementById('settings-content');
    const settings = Storage.get('settings', { sound: true, vibration: true });
    container.innerHTML = `
      <div class="settings-section">
        <p class="settings-section-title">Preferences</p>
        <div class="settings-toggle-row">
          <div>
            <p class="settings-toggle-label">Sound Effects</p>
            <p style="font-size:12px;color:#7A7A88">Button click sounds</p>
          </div>
          <div class="toggle-switch${settings.sound ? ' active' : ''}" id="toggle-sound"></div>
        </div>
        <div class="settings-toggle-row">
          <div>
            <p class="settings-toggle-label">Vibration</p>
            <p style="font-size:12px;color:#7A7A88">Haptic feedback</p>
          </div>
          <div class="toggle-switch${settings.vibration ? ' active' : ''}" id="toggle-vibration"></div>
        </div>
      </div>
      <div class="settings-section">
        <button class="settings-danger-btn" id="clear-all-btn">Clear All Saved Data</button>
      </div>
      <div class="settings-footer">
        <p class="settings-footer-title">SmartScholar Calculator v2.1.0</p>
        <p class="settings-footer-sub">Made for scholarship students</p>
        <p class="settings-footer-sub">Developed by Prathamesh Gholap</p>
      </div>
    `;

    // Toggles
    document.getElementById('toggle-sound').addEventListener('click', function() {
      settings.sound = !settings.sound;
      Storage.set('settings', settings);
      this.classList.toggle('active', settings.sound);
    });
    document.getElementById('toggle-vibration').addEventListener('click', function() {
      settings.vibration = !settings.vibration;
      Storage.set('settings', settings);
      this.classList.toggle('active', settings.vibration);
    });

    // Clear all
    document.getElementById('clear-all-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
        localStorage.clear();
        Calculator.history = [];
        SettingsPage.init();
      }
    });
  }
};

/* =============================================================
   SECTION 18A: DAILY CHALLENGE
   ============================================================= */

const DailyChallenge = {
  init() {
    const content = document.getElementById('daily-challenge-content');
    const subtitle = document.getElementById('daily-challenge-subtitle');
    const todayKey = getTodayKey();
    const challenges = Storage.getArr('daily_challenges', {});
    const todayChallenge = challenges[todayKey] || null;

    const streak = Number(Storage.get('practice_streak', 0));
    subtitle.textContent = todayKey;

    if (!todayChallenge) {
      content.innerHTML = `
        <div class="challenge-card">
          <div class="challenge-header">
            <div>
              <p class="challenge-title">Today's Challenge</p>
              <p class="challenge-date">${formatDisplayDate(new Date())}</p>
            </div>
            <span class="challenge-status">Not Completed</span>
          </div>
          <div class="challenge-metrics">
            <div><span class="metric-label">Questions</span><span class="metric-value">5 Questions</span></div>
            <div><span class="metric-label">Difficulty</span><span class="metric-value">Mixed</span></div>
            <div><span class="metric-label">Current Streak</span><span class="metric-value">${streak} Day${streak === 1 ? '' : 's'}</span></div>
          </div>
          <div class="challenge-timer-setup">
            <div class="speed-section">
              <label>Time</label>
              <select id="daily-time" class="speed-select">
                ${buildTimeSelectOptions('daily')}
              </select>
            </div>
            <div class="time-custom-panel hidden" id="daily-custom-time-panel">
              <div class="speed-section">
                <label>Enter Time</label>
                <input type="text" id="daily-custom-time" class="speed-input" data-numeric-input="true" data-allow-decimal="false" inputmode="numeric" autocomplete="off" placeholder="25">
              </div>
              <div class="speed-section">
                <label>Unit</label>
                <select id="daily-custom-unit" class="speed-select">
                  <option value="seconds">Seconds</option>
                  <option value="minutes" selected>Minutes</option>
                  <option value="hours">Hours</option>
                </select>
              </div>
            </div>
          </div>
          <div class="empty-state compact">
            <p>Ready to start?</p>
            <button class="btn-primary start-challenge" id="daily-start-btn">Start Challenge</button>
          </div>
        </div>
      `;

      const dailyTime = document.getElementById('daily-time');
      dailyTime.addEventListener('change', () => {
        const panel = document.getElementById('daily-custom-time-panel');
        panel.classList.toggle('hidden', dailyTime.value !== 'custom');
      });

      document.getElementById('daily-start-btn').addEventListener('click', () => {
        const timeLimit = durationFromUi('daily', document.getElementById('daily-time').value, document.getElementById('daily-custom-time')?.value || '', document.getElementById('daily-custom-unit')?.value || 'minutes');
        if (!timeLimit.valid) {
          alert(timeLimit.message);
          return;
        }
        const challenge = this.buildTodayChallenge();
        challenge.timeLimitSeconds = timeLimit.seconds;
        challenge.timeRemainingSeconds = timeLimit.seconds;
        challenges[todayKey] = challenge;
        Storage.set('daily_challenges', challenges);
        this.init();
      });
      return;
    }

    if (todayChallenge.status === 'completed') {
      const score = todayChallenge.score || 0;
      const total = todayChallenge.questions.length || 5;
      const accuracy = Math.round((score / total) * 100);
      content.innerHTML = `
        <div class="challenge-card complete">
          <div class="challenge-header">
            <div>
              <p class="challenge-title">Today's Challenge</p>
              <p class="challenge-date">${formatDisplayDate(new Date())}</p>
            </div>
            <span class="challenge-status complete">Completed</span>
          </div>
          <div class="challenge-metrics">
            <div><span class="metric-label">Questions</span><span class="metric-value">${total} Questions</span></div>
            <div><span class="metric-label">Difficulty</span><span class="metric-value">Mixed</span></div>
            <div><span class="metric-label">Current Streak</span><span class="metric-value">${streak} Day${streak === 1 ? '' : 's'}</span></div>
          </div>
          <div class="result-card">
            <p class="result-title">Challenge Complete!</p>
            <p class="result-score">Score: ${score}/${total}</p>
            <p class="result-score">Accuracy: ${accuracy}%</p>
            <p class="result-score">Correct: ${score}</p>
            <p class="result-score">Incorrect: ${total - score}</p>
          </div>
          <div class="btn-row">
            <button class="btn-primary" id="daily-review-btn">Review Answers</button>
            <button class="btn-secondary" id="daily-back-btn">Back to Daily Challenge</button>
          </div>
        </div>
      `;
      document.getElementById('daily-review-btn').addEventListener('click', () => this.renderReview(todayChallenge, content));
      document.getElementById('daily-back-btn').addEventListener('click', () => this.init());
      return;
    }

    if (!Number.isFinite(Number(todayChallenge.timeLimitSeconds)) || todayChallenge.timeLimitSeconds <= 0) {
      todayChallenge.timeLimitSeconds = TIME_FEATURES.daily.defaultOption.value * getTimeUnitMultiplier(TIME_FEATURES.daily.defaultOption.unit);
      todayChallenge.timeRemainingSeconds = todayChallenge.timeLimitSeconds;
      challenges[todayKey] = todayChallenge;
      Storage.set('daily_challenges', challenges);
    }

    this.renderChallengeQuestions(todayChallenge, content);
  },

  buildTodayChallenge() {
    const chapters = ['Basic Arithmetic', 'Percentage', 'Profit & Loss', 'Simple Interest', 'Compound Interest', 'Average', 'Ratio', 'Speed', 'Time & Work', 'Squares & Cubes'];
    const chosenTopics = shuffle([...chapters]).slice(0, 5);
    const questions = chosenTopics.map(topic => {
      const difficulty = 'Mixed';
      const generated = QuestionGenerator.generateQuestion(topic, difficulty);
      if (!generated) return null;
      return {
        topic,
        difficulty,
        question: generated.question,
        options: generated.options || [],
        correctAnswer: String(generated.correctAnswer),
        explanation: generated.explanation || 'Use the related formula to solve this challenge question.',
        selectedAnswer: '',
        submitted: false,
        correct: false
      };
    }).filter(Boolean);

    return {
      date: getTodayKey(),
      status: 'active',
      difficulty: 'Mixed',
      totalQuestions: 5,
      questions,
      currentIndex: 0,
      score: 0,
      completedAt: null,
      correct: 0,
      incorrect: 0
    };
  },

  renderChallengeQuestions(challenge, content) {
    const idx = challenge.currentIndex || 0;
    const q = challenge.questions[idx];
    const total = challenge.questions.length;

    content.innerHTML = `
      <div class="challenge-card">
        <div class="challenge-header">
          <div>
            <p class="challenge-title">Today's Challenge</p>
            <p class="challenge-date">${formatDisplayDate(new Date())}</p>
          </div>
          <span class="challenge-status">${challenge.status === 'active' ? 'In Progress' : 'Not Completed'}</span>
        </div>
        <div class="challenge-metrics">
          <div><span class="metric-label">Questions</span><span class="metric-value">${total} Questions</span></div>
          <div><span class="metric-label">Difficulty</span><span class="metric-value">Mixed</span></div>
          <div><span class="metric-label">Current Streak</span><span class="metric-value">${Number(Storage.get('practice_streak', 0))} Day${Number(Storage.get('practice_streak', 0)) === 1 ? '' : 's'}</span></div>
        </div>

        <div class="quiz-card daily-question">
          <p class="quiz-question-label">Question ${idx + 1} of ${total}</p>
          <p class="quiz-question">${q.question}</p>
          <div class="daily-timer-line">
            <span class="timer-label">Time Remaining</span>
            <span class="timer-readout">${formatSeconds(Math.max(0, Number(challenge.timeRemainingSeconds || 0)))}</span>
          </div>
          <div class="daily-answer-area">
            <input class="daily-answer-input" id="daily-answer-input" type="text" data-numeric-input="true" value="${escapeHtml(q.selectedAnswer || '')}" placeholder="Enter your answer">
          </div>
          <div class="btn-row">
            <button class="btn-primary" id="daily-submit-btn">Submit</button>
          </div>
        </div>
      </div>
    `;

    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        const todayKey = getTodayKey();
        const challengeData = Storage.getArr('daily_challenges', {});
        const activeChallenge = challengeData[todayKey];
        if (!activeChallenge || activeChallenge.status !== 'active') return;

        activeChallenge.timeRemainingSeconds = Math.max(0, Number(activeChallenge.timeRemainingSeconds || activeChallenge.timeLimitSeconds || 0) - 1);
        Storage.set('daily_challenges', challengeData);

        if (activeChallenge.timeRemainingSeconds <= 0) {
          this.finishChallenge(activeChallenge, true);
          return;
        }

        this.init();
      }, 1000);
    }

    const dailyAnswerInput = document.getElementById('daily-answer-input');
    bindNumericOnlyInput(dailyAnswerInput, { allowDecimal: true, allowNegative: false });

    document.getElementById('daily-submit-btn').addEventListener('click', () => {
      const userAnswer = document.getElementById('daily-answer-input').value.trim();
      if (!userAnswer) return;

      const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(q.correctAnswer);
      q.selectedAnswer = userAnswer;
      q.submitted = true;
      q.correct = isCorrect;
      challenge.score = challenge.questions.filter(question => question.correct).length;
      challenge.incorrect = challenge.questions.length - challenge.score;

      const challengeData = Storage.getArr('daily_challenges', {});
      challengeData[getTodayKey()] = challenge;
      Storage.set('daily_challenges', challengeData);

      content.innerHTML = `
        <div class="challenge-card">
          <div class="challenge-header">
            <div>
              <p class="challenge-title">Today's Challenge</p>
              <p class="challenge-date">${formatDisplayDate(new Date())}</p>
            </div>
            <span class="challenge-status ${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? 'Correct' : 'Incorrect'}</span>
          </div>
          <div class="quiz-card">
            <p class="quiz-question-label">Question ${idx + 1} of ${total}</p>
            <p class="quiz-question">${q.question}</p>
            <p class="challenge-result-line">${isCorrect ? 'Correct' : 'Incorrect'}</p>
            <p class="challenge-result-line">Correct Answer: ${q.correctAnswer}</p>
            <p class="challenge-result-line">Explanation: ${q.explanation}</p>
            <div class="btn-row">
              ${idx < total - 1 ? `<button class="btn-primary" id="daily-next-btn">Next Question</button>` : `<button class="btn-primary" id="daily-finish-btn">Finish Challenge</button>`}
            </div>
          </div>
        </div>
      `;

      const nextOrFinish = () => {
        if (idx < total - 1) {
          challenge.currentIndex = idx + 1;
          const data = Storage.getArr('daily_challenges', {});
          data[getTodayKey()] = challenge;
          Storage.set('daily_challenges', data);
          this.init();
        } else {
          this.finishChallenge(challenge);
        }
      };

      const btn = document.getElementById(idx < total - 1 ? 'daily-next-btn' : 'daily-finish-btn');
      btn.addEventListener('click', nextOrFinish);
    });
  },

  finishChallenge(challenge, auto = false) {
    const todayKey = getTodayKey();
    const challengeData = Storage.getArr('daily_challenges', {});
    const score = challenge.questions.filter(question => question.correct).length;
    const total = challenge.questions.length;

    challenge.status = 'completed';
    challenge.score = score;
    challenge.correct = score;
    challenge.incorrect = total - score;
    challenge.completedAt = new Date().toISOString();
    challenge.autoSubmitted = Boolean(auto);
    challengeData[todayKey] = challenge;
    Storage.set('daily_challenges', challengeData);

    const data = Storage.get('scholar_stats', { questionsSolved: 0, correctAnswers: 0, incorrectAnswers: 0, currentStreak: 0, bestStreak: 0, dailyChallenges: {}, examResults: [], speedTests: [], mistakes: [], achievements: [] });
    const streakStorage = Storage.get('practice_streak', 0);
    const nextStreak = Number(streakStorage || 0) + 1;
    Storage.set('practice_streak', nextStreak);
    updateTotalPracticeStats();
    refreshAchievementState();
    this.init();
  },

  renderReview(challenge, content) {
    const score = challenge.score || 0;
    const total = challenge.questions.length;
    content.innerHTML = `
      <div class="review-list">
        ${challenge.questions.map((q, i) => `
          <div class="mistake-card">
            <p class="mistake-topic">Question ${i + 1} • ${q.topic || 'Daily'} • ${q.difficulty || 'Mixed'}</p>
            <p class="mistake-question">${q.question}</p>
            <div class="mistake-answers">
              <div class="mistake-your-answer">
                <p class="mini-label">Your Answer</p>
                <p>${escapeHtml(q.selectedAnswer || 'Unanswered')}</p>
              </div>
              <div class="mistake-correct-answer">
                <p class="mini-label">Correct Answer</p>
                <p>${q.correctAnswer}</p>
              </div>
            </div>
            <div class="mistake-explanation">
              <p class="mini-label">Explanation</p>
              <p>${q.explanation}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="btn-row">
        <button class="btn-primary" id="daily-back-home">Back to Daily Challenge</button>
      </div>
    `;
    document.getElementById('daily-back-home').addEventListener('click', () => this.init());
  }
};

/* =============================================================
   SECTION 18B: WEAK TOPIC DETECTOR
   ============================================================= */

const WeakTopicDetector = {
  renderWeakListHtml() {
    const history = Storage.getArr('practice_history', []);
    if (history.length === 0) return '';

    const statsMap = {};
    history.forEach((entry) => {
      const topic = entry.topic || 'General';
      if (!statsMap[topic]) {
        statsMap[topic] = { attempts: 0, correct: 0, incorrect: 0 };
      }
      statsMap[topic].attempts += 1;
      if (entry.correct) statsMap[topic].correct += 1;
      else statsMap[topic].incorrect += 1;
    });

    const rows = Object.entries(statsMap).map(([topic, stat]) => {
      const accuracy = stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : 0;
      const belongs = stat.attempts >= 3 && accuracy < 70;
      if (!belongs) return '';
      return `<div class="weak-row"><span>${topic}</span><small>Accuracy: ${accuracy}% • Attempts: ${stat.attempts}</small><button class="btn-primary btn-small" data-nav="practice">Practice Now</button></div>`;
    }).filter(Boolean);

    return rows.length ? rows.join('') : '';
  },

  init() {
    const content = document.getElementById('weak-topics-content');
    const history = Storage.getArr('practice_history', []);

    if (history.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>No performance data yet.</p><p>Start practicing to identify your weak topics.</p></div>`;
      return;
    }

    const statsMap = {};
    history.forEach(entry => {
      const topic = entry.topic || 'General';
      if (!statsMap[topic]) {
        statsMap[topic] = { attempts: 0, correct: 0, incorrect: 0 };
      }
      statsMap[topic].attempts += 1;
      if (entry.correct) statsMap[topic].correct += 1;
      else statsMap[topic].incorrect += 1;
    });

    const topicRows = Object.entries(statsMap).map(([topic, stat]) => {
      const accuracy = stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : 0;
      let status = 'Strong';
      if (stat.attempts >= 3 && accuracy < 70) status = 'Weak';
      else if (stat.attempts >= 3 && accuracy < 85) status = 'Improving';
      const practiceLink = status === 'Weak' ? `<button class="btn-primary btn-small" data-nav="practice">Practice Now</button>` : '';
      return `<div class="topic-row">
        <div class="topic-head">
          <span>${topic}</span>
          <span>Accuracy: ${accuracy}%</span>
          <span>Attempts: ${stat.attempts}</span>
        </div>
        <p class="topic-status">${status}</p>
        ${status === 'Weak' ? `<p class="recommendation">Recommended Practice<br>Practice ${topic} to improve your accuracy.</p>${practiceLink}` : ''}
      </div>`;
    }).join('');

    content.innerHTML = `<div class="weak-topic-list">${topicRows}</div>`;
  }
};

/* =============================================================
   SECTION 18C: EXAM MODE
   ============================================================= */

const ExamMode = {
  state: null,
  intervalId: null,

  init() {
    const content = document.getElementById('exam-content');

    if (!this.state) {
      content.innerHTML = `
        <div class="exam-setup">
          <div class="exam-grid">
            <label class="setup-label">Topic</label>
            <select class="exam-select" id="exam-topic">
              <option value="All Topics" selected>All Topics</option>
              ${TOPICS.map(topic => `<option value="${topic}">${topic}</option>`).join('')}
            </select>
          </div>
          <div class="exam-grid">
            <label class="setup-label">Difficulty</label>
            <select class="exam-select" id="exam-difficulty">
              <option value="Mixed" selected>Mixed</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div class="exam-grid">
            <label class="setup-label">Questions</label>
            <select class="exam-select" id="exam-question-count">
              <option value="10" selected>10</option>
              <option value="5">5</option>
              <option value="15">15</option>
            </select>
          </div>
          <div class="exam-grid">
            <label class="setup-label">Time</label>
            <select class="exam-select" id="exam-time">
              ${buildTimeSelectOptions('exam')}
            </select>
          </div>
          <div class="time-custom-panel hidden" id="exam-custom-time-panel">
            <div class="time-custom-row">
              <label class="setup-label">Enter Time</label>
                <input type="text" class="exam-input" id="exam-custom-time" data-numeric-input="true" data-allow-decimal="false" inputmode="numeric" autocomplete="off" placeholder="25">
            </div>
            <div class="time-custom-row">
              <label class="setup-label">Unit</label>
              <select class="exam-select" id="exam-custom-unit">
                <option value="seconds">Seconds</option>
                <option value="minutes" selected>Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
          </div>
          <button class="btn-primary" id="start-exam-btn">Start Exam</button>
        </div>
      `;

      const examTimeSelect = document.getElementById('exam-time');
      examTimeSelect.addEventListener('change', () => {
        const panel = document.getElementById('exam-custom-time-panel');
        panel.classList.toggle('hidden', examTimeSelect.value !== 'custom');
      });

      document.getElementById('start-exam-btn').addEventListener('click', () => {
        const topic = document.getElementById('exam-topic').value;
        const difficulty = document.getElementById('exam-difficulty').value;
        const questionCount = Number(document.getElementById('exam-question-count').value);
        const timeLimit = durationFromUi('exam', document.getElementById('exam-time').value, document.getElementById('exam-custom-time')?.value || '', document.getElementById('exam-custom-unit')?.value || 'minutes');
        if (!timeLimit.valid) {
          alert(timeLimit.message);
          return;
        }
        this.startExam({ topic, difficulty, questionCount, timeSeconds: timeLimit.seconds });
      });
      return;
    }

    this.renderExam(content);
  },

  startExam(config) {
    const questions = [];
    const topics = config.topic === 'All Topics' ? shuffle([...TOPICS]) : [config.topic];

    for (let i = 0; i < config.questionCount; i++) {
      const chosenTopic = topics[i % topics.length] || 'Percentage';
      const chosenDifficulty = config.difficulty === 'Mixed' ? randomDifficulty() : config.difficulty;
      const q = QuestionGenerator.generateQuestion(chosenTopic, chosenDifficulty);
      questions.push({
        topic: chosenTopic,
        difficulty: chosenDifficulty,
        question: q.question,
        options: q.options || [],
        correctAnswer: String(q.correctAnswer),
        explanation: q.explanation,
        userAnswer: '',
        submitted: false
      });
    }

    const exam = {
      topic: config.topic,
      difficulty: config.difficulty,
      questionCount: config.questionCount,
      timeSeconds: Math.max(1, Math.round(config.timeSeconds || config.time * 60)),
      timeRemaining: Math.max(1, Math.round(config.timeSeconds || config.time * 60)),
      questions,
      currentIndex: 0,
      startedAt: Date.now(),
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      finished: false
    };
    this.state = exam;
    this.init();
  },

  renderExam(content) {
    if (!this.state || this.state.finished) return;

    const exam = this.state;
    const current = exam.questions[exam.currentIndex];
    const minutes = Math.floor(exam.timeRemaining / 60);
    const seconds = exam.timeRemaining % 60;

    content.innerHTML = `
      <div class="exam-active">
        <div class="exam-header">
          <div>
            <p class="question-label">Question ${exam.currentIndex + 1} of ${exam.questionCount}</p>
            <p class="timer-text">Time Remaining: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</p>
          </div>
          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${((exam.currentIndex + 1) / exam.questionCount) * 100}%"></div></div>
        </div>
        <div class="quiz-card">
          <p class="quiz-question">${current.question}</p>
          <div class="exam-answer-area">
            <input type="text" id="exam-answer-input" class="daily-answer-input" data-numeric-input="true" value="${escapeHtml(current.userAnswer || '')}" placeholder="Enter answer">
          </div>
          <div class="btn-row">
            <button class="btn-secondary" id="exam-prev-btn" ${exam.currentIndex === 0 ? 'disabled' : ''}>Previous</button>
            <button class="btn-primary" id="exam-next-btn">Next</button>
            <button class="btn-danger" id="exam-submit-btn">Submit Exam</button>
          </div>
        </div>
      </div>
    `;

    const examAnswerInput = document.getElementById('exam-answer-input');
    bindNumericOnlyInput(examAnswerInput, { allowDecimal: true, allowNegative: false });

    document.getElementById('exam-next-btn').addEventListener('click', () => {
      this.saveCurrentAnswer();
      if (exam.currentIndex < exam.questionCount - 1) {
        exam.currentIndex += 1;
        this.renderExam(content);
      }
    });

    document.getElementById('exam-prev-btn').addEventListener('click', () => {
      this.saveCurrentAnswer();
      if (exam.currentIndex > 0) {
        exam.currentIndex -= 1;
        this.renderExam(content);
      }
    });

    document.getElementById('exam-submit-btn').addEventListener('click', () => {
      const unanswered = exam.questions.filter(q => !q.userAnswer || q.userAnswer.trim() === '').length;
      if (confirm(`Are you sure you want to submit?\n\nUnanswered questions: ${unanswered}`)) {
        this.submitExam();
      }
    });

    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        if (!this.state || this.state.finished) return;
        this.state.timeRemaining -= 1;
        if (this.state.timeRemaining <= 0) {
          this.state.timeRemaining = 0;
          this.submitExam(true);
          return;
        }
        this.renderExam(content);
      }, 1000);
    }
  },

  saveCurrentAnswer() {
    if (!this.state) return;
    const answer = document.getElementById('exam-answer-input')?.value || '';
    const q = this.state.questions[this.state.currentIndex];
    if (q) q.userAnswer = answer.trim();
  },

  submitExam(auto = false) {
    const exam = this.state;
    if (!exam || exam.finished) return;
    const questions = exam.questions;
    const correct = questions.filter(q => normalizeAnswer(q.userAnswer) === normalizeAnswer(q.correctAnswer)).length;
    const incorrect = questions.length - correct - questions.filter(q => !q.userAnswer || q.userAnswer.trim() === '').length;
    const unanswered = questions.length - questions.filter(q => q.userAnswer && q.userAnswer.trim() !== '').length;
    const elapsedSeconds = Math.round((Date.now() - exam.startedAt) / 1000);
    const timeTaken = Math.max(1, Math.round(exam.timeSeconds - exam.timeRemaining));

    const result = {
      topic: exam.topic,
      difficulty: exam.difficulty,
      questionCount: exam.questionCount,
      timeSeconds: exam.timeSeconds,
      score: correct,
      correct,
      incorrect,
      unanswered,
      accuracy: ((correct / exam.questionCount) * 100).toFixed(1),
      topicPerformance: summarizeTopicPerformance(questions),
      completedAt: new Date().toISOString(),
      timeTaken
    };

    const results = Storage.getArr('exam_results', []);
    results.push(result);
    Storage.set('exam_results', results);

    const stats = Storage.getArr('practice_history', []);
    const newAnswers = exam.questions.map(q => ({
      topic: q.topic,
      question: q.question,
      userAnswer: q.userAnswer,
      correctAnswer: q.correctAnswer,
      correct: normalizeAnswer(q.userAnswer) === normalizeAnswer(q.correctAnswer),
      difficulty: q.difficulty,
      timestamp: new Date().toISOString()
    }));
    stats.push(...newAnswers);
    Storage.set('practice_history', stats);

    const content = document.getElementById('exam-content');
    content.innerHTML = `
      <div class="exam-result">
        <h2>Exam Complete</h2>
        <p>Score: ${correct}/${exam.questionCount}</p>
        <p>Accuracy: ${Math.round((correct / exam.questionCount) * 100)}%</p>
        <p>Correct: ${correct}</p>
        <p>Incorrect: ${incorrect}</p>
        <p>Unattempted: ${unanswered}</p>
        <p>Time Taken: ${formatSeconds(timeTaken)}</p>
        <div class="topic-table">
          <table>
            <thead><tr><th>Topic</th><th>Score</th></tr></thead>
            <tbody>
              ${Object.entries(summarizeTopicPerformance(questions)).map(([t, p]) => `<tr><td>${t}</td><td>${p.correct}/${p.total}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <button class="btn-primary" data-nav="home">Back Home</button>
      </div>
    `;

    exam.finished = true;
    this.state = null;
    this.intervalId = null;
    updateTotalPracticeStats();
    refreshAchievementState();
    this.init();
  }
};

/* =============================================================
   SECTION 18D: QUESTION GENERATOR
   ============================================================= */

const QuestionGeneratorPage = {
  init() {
    const content = document.getElementById('question-gen-content');
    content.innerHTML = `
      <div class="generator-setup">
        <div class="exam-grid">
          <label class="setup-label">Topic</label>
          <select class="exam-select" id="generator-topic">
            ${TOPICS.map(topic => `<option value="${topic}" ${topic === 'Percentage' ? 'selected' : ''}>${topic}</option>`).join('')}
          </select>
        </div>
        <div class="exam-grid">
          <label class="setup-label">Difficulty</label>
          <select class="exam-select" id="generator-difficulty">
            <option value="Easy" selected>Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div class="exam-grid">
          <label class="setup-label">Questions</label>
          <select class="exam-select" id="generator-count">
            <option value="5" selected>5</option>
            <option value="3">3</option>
            <option value="10">10</option>
          </select>
        </div>
        <button class="btn-primary" id="generate-questions-btn">Generate Questions</button>
      </div>
    `;

    document.getElementById('generate-questions-btn').addEventListener('click', () => {
      const topic = document.getElementById('generator-topic').value;
      const difficulty = document.getElementById('generator-difficulty').value;
      const count = Number(document.getElementById('generator-count').value);
      const generated = [];
      const already = new Set();

      for (let i = 0; i < count; i++) {
        let q;
        let attempts = 0;
        do {
          q = QuestionGenerator.generateQuestion(topic, difficulty);
          attempts += 1;
          if (attempts > 80) break;
        } while (already.has(q.question));
        q.index = i + 1;
        already.add(q.question);
        generated.push(q);
      }

      content.innerHTML = `<div class="generator-results">
        ${generated.map((q, i) => `
          <div class="quiz-card generator-question">
            <p class="quiz-question-label">Question ${i + 1}</p>
            <p class="quiz-question">${q.question}</p>
            <p class="generator-meta">Difficulty: ${q.difficulty} • Topic: ${q.topic}</p>
            <div class="answer-input-wrap">
              <input class="daily-answer-input" id="gen-answer-${i}" type="text" data-numeric-input="true" placeholder="Answer">
              <button class="btn-primary submit-generator" data-index="${i}">Submit</button>
            </div>
            <div class="generator-result hidden" id="gen-result-${i}"></div>
          </div>
        `).join('')}
      </div>`;

      content.querySelectorAll('[data-numeric-input]').forEach(input => {
        bindNumericOnlyInput(input, { allowDecimal: true, allowNegative: false });
      });

      content.querySelectorAll('[data-index]').forEach(btn => {
        btn.addEventListener('click', () => {
          const index = Number(btn.dataset.index);
          const q = generated[index];
          const answerValue = document.getElementById(`gen-answer-${index}`).value.trim();
          const result = document.getElementById(`gen-result-${index}`);
          const correct = normalizeAnswer(answerValue) === normalizeAnswer(q.correctAnswer);

          result.classList.remove('hidden');
          result.innerHTML = `
            <p>${correct ? 'Correct' : 'Incorrect'}</p>
            <p>Correct Answer: ${q.correctAnswer}</p>
            <p>Explanation: ${q.explanation}</p>
          `;
        });
      });
    });
  }
};

/* =============================================================
   SECTION 18E: PROGRESS DASHBOARD
   ============================================================= */

const ProgressDashboard = {
  init() {
    const content = document.getElementById('progress-content');
    const stats = getProgressStats();
    const latestActivity = stats.recentActivity;
    const strongTopicsHtml = stats.strongTopics.length ? stats.strongTopics.map(topic => `
      <div class="performance-pill">
        <span>${topic.topic}</span>
        <strong>${topic.accuracy}%</strong>
      </div>
    `).join('') : '<p class="empty-state">No strong topics yet.</p>';

    const weakTopicsHtml = stats.weakTopics.length ? stats.weakTopics.map(topic => `
      <div class="performance-pill">
        <span>${topic.topic}</span>
        <strong>${topic.accuracy}%</strong>
      </div>
    `).join('') : '<p class="empty-state">No weak topics yet.</p>';

    const progressCards = [
      { label: 'Questions Solved', value: stats.questionsSolved, icon: '🧠', accent: 'var(--cyan)' },
      { label: 'Correct Answers', value: stats.correctAnswers, icon: '✅', accent: 'var(--green)' },
      { label: 'Incorrect Answers', value: stats.incorrectAnswers, icon: '❌', accent: 'var(--red)' },
      { label: 'Accuracy', value: stats.accuracy + '%', icon: '📈', accent: 'var(--yellow)' },
    ].map(card => `
      <div class="progress-stat-card" style="--accent:${card.accent}">
        <div class="stat-icon">${card.icon}</div>
        <div>
          <p class="stat-value">${card.value}</p>
          <p class="stat-label">${card.label}</p>
        </div>
      </div>
    `).join('');

    const topicListHtml = stats.topicPerformance.length ? stats.topicPerformance.map(row => `
      <div class="topic-performance-row">
        <div>
          <p>${row.topic}</p>
          <small>${row.attempts} questions</small>
        </div>
        <div class="topic-bar">
          <div class="topic-bar-fill" style="width:${row.accuracy}%"></div>
        </div>
        <span>${row.accuracy}%</span>
      </div>
    `).join('') : '<p class="empty-state">Practice questions to unlock topic performance.</p>';

    const streakItemsHtml = stats.streakHistory.map(entry => `
      <div class="streak-day${entry.active ? ' active' : ''}">${entry.label}</div>
    `).join('');

    const dailyChallengeHtml = stats.challengeSummary.status === 'completed' ? `
      <div class="progress-card-small">
        <div class="small-card-heading">✓ Challenge Completed</div>
        <p class="small-card-body">Score: ${stats.todayChallenge.score}/${stats.todayChallenge.totalQuestions || stats.todayChallenge.questions?.length || 0}</p>
        <p class="small-card-body">Accuracy: ${Math.round((stats.todayChallenge.score / Math.max(stats.todayChallenge.totalQuestions || stats.todayChallenge.questions?.length || 1)) * 100) || 0}%</p>
      </div>
    ` : stats.challengeSummary.status === 'active' ? `
      <div class="progress-card-small">
        <div class="small-card-heading">🎯 Daily Challenge</div>
        <p class="small-card-body">${stats.todayChallenge.questions?.filter(q => q.submitted).length || 0} / ${stats.todayChallenge.totalQuestions || stats.todayChallenge.questions?.length || 0} Questions</p>
        <div class="challenge-progress-bar"><div class="challenge-progress-fill" style="width:${Math.round(((stats.todayChallenge.questions?.filter(q => q.submitted).length || 0) / Math.max(stats.todayChallenge.totalQuestions || stats.todayChallenge.questions?.length || 1)) * 100)}%"></div></div>
        <p class="challenge-progress-text">${Math.round(((stats.todayChallenge.questions?.filter(q => q.submitted).length || 0) / Math.max(stats.todayChallenge.totalQuestions || stats.todayChallenge.questions?.length || 1)) * 100)}% Complete</p>
      </div>
    ` : `
      <div class="progress-card-small">
        <div class="small-card-heading">🎯 Daily Challenge</div>
        <p class="small-card-body">Today's challenge is waiting.</p>
        <p class="small-card-body">${stats.todayChallenge?.totalQuestions || 5} Questions</p>
        <button class="btn-primary" data-nav="daily-challenge">Start Challenge</button>
      </div>
    `;

    const examHtml = stats.examResults.length ? `
      <div class="progress-card-small">
        <div class="small-card-heading">📝 Exam Performance</div>
        <p class="small-card-body">Exams Completed ${stats.examResults.length}</p>
        <p class="small-card-body">Best Score ${Math.max(...stats.examResults.map(e => Number(e.accuracy) || 0))}%</p>
        <p class="small-card-body">Avg Accuracy ${Math.round(stats.examResults.reduce((sum, e) => sum + Number(e.accuracy || 0), 0) / stats.examResults.length)}%</p>
        <div class="exam-latest">
          <span>Latest</span>
          <strong>${stats.examResults.slice(-1)[0].score}/${stats.examResults.slice(-1)[0].questionCount}</strong>
          <span>${Math.round(Number(stats.examResults.slice(-1)[0].accuracy) || 0)}%</span>
        </div>
      </div>
    ` : `
      <div class="progress-card-small empty-state-card">
        <div class="small-card-heading">📝 Exam Performance</div>
        <p class="small-card-body">No exams completed yet.</p>
        <p class="small-card-body">Take your first exam to see your performance here.</p>
      </div>
    `;

    const speedHtml = stats.speedTests.length ? `
      <div class="progress-card-small">
        <div class="small-card-heading">⚡ Speed Test</div>
        <p class="small-card-body">Best Speed ${Math.round(Math.max(...stats.speedTests.map(t => Number(t.qpm) || 0)))} Questions/min</p>
        <p class="small-card-body">Best Accuracy ${Math.round(Math.max(...stats.speedTests.map(t => Number(t.accuracy) || 0)))}%</p>
        <p class="small-card-body">Tests Completed ${stats.speedTests.length}</p>
      </div>
    ` : `
      <div class="progress-card-small empty-state-card">
        <div class="small-card-heading">⚡ Speed Test</div>
        <p class="small-card-body">No Speed Tests yet.</p>
        <p class="small-card-body">Start a Speed Test to build your personal record.</p>
      </div>
    `;

    const recentHtml = latestActivity.length ? latestActivity.map(item => `
      <div class="activity-row">
        <div>
          <p>${item.title}</p>
          <small>${item.detail}</small>
        </div>
        <span>${item.meta}</span>
      </div>
    `).join('') : '<p class="empty-state">No recent activity. Your learning activity will appear here.</p>';

    const achievementCards = stats.latestAchievements.length ? stats.latestAchievements.map(a => `
      <div class="achievement-preview-card ${a.unlocked ? 'unlocked' : 'locked'}">
        <div class="achievement-icon">${a.title.split(' ')[0]}</div>
        <div>
          <p>${a.title}</p>
          <small>${a.description}</small>
          <p class="achievement-status">${a.unlocked ? 'Unlocked' : 'Locked'}</p>
        </div>
      </div>
    `).join('') : '<p class="empty-state">No achievements unlocked yet.</p>';

    const summaryText = stats.hasData ? `
      You've solved ${stats.questionsSolved} question${stats.questionsSolved === 1 ? '' : 's'} with ${stats.accuracy}% accuracy.
      Your strongest topic is ${stats.strongTopics[0]?.topic || 'Not enough data yet'}.
      ${stats.weakTopics[0] ? `${stats.weakTopics[0].topic} is currently your main topic to improve.` : 'Keep practicing to discover your next improvement area.'}
    ` : `
      Your learning journey starts here.
      Complete practice questions, Daily Challenges and Exams to build your progress statistics.
    `;

    content.innerHTML = `
      <div class="progress-dashboard">
        <section class="hero-progress-card card-glass">
          <div class="hero-info">
            <p class="section-label">Your Progress</p>
            <h1>Keep learning. Keep improving.</h1>
            <div class="hero-metrics">
              <div>
                <p class="hero-metric-label">Overall Accuracy</p>
                <p class="hero-metric-value">${stats.accuracy}%</p>
              </div>
              <div>
                <p class="hero-metric-label">Questions Solved</p>
                <p class="hero-metric-value">${stats.questionsSolved}</p>
              </div>
              <div>
                <p class="hero-metric-label">Current Streak</p>
                <p class="hero-metric-value">${stats.currentStreak} Day${stats.currentStreak === 1 ? '' : 's'}</p>
              </div>
            </div>
          </div>
          <div class="hero-chart">
            <svg viewBox="0 0 120 120" class="accuracy-ring">
              <circle cx="60" cy="60" r="52" class="ring-bg"></circle>
              <circle cx="60" cy="60" r="52" class="ring-fill" style="stroke-dasharray: 327; stroke-dashoffset: ${327 - (stats.accuracy / 100) * 327};"></circle>
            </svg>
            <div class="hero-chart-label">
              <span>${stats.accuracy}%</span>
              <small>Accuracy</small>
            </div>
          </div>
        </section>

        <section class="stats-grid">
          ${progressCards}
        </section>

        <section class="secondary-grid">
          <div class="progress-card card-glass">
            <div class="card-heading">🔥 ${stats.currentStreak || 0} Day Streak</div>
            <p class="card-copy">${stats.currentStreak ? 'You\'re on fire!' : 'Start your first practice session to begin your streak.'}</p>
            <div class="streak-visual">${streakItemsHtml}</div>
            ${stats.currentStreak ? `<p class="streak-summary">Best Streak ${stats.bestStreak} Days</p>` : ''}
          </div>

          <div class="progress-card card-glass">
            <div class="card-heading">Topic Performance</div>
            ${topicListHtml}
          </div>
        </section>

        <section class="secondary-grid">
          <div class="small-cards-column">
            <div class="progress-card card-glass">
              <div class="card-heading">💪 Strong Topics</div>
              ${strongTopicsHtml}
            </div>
            <div class="progress-card card-glass">
              <div class="card-heading">📈 Needs Improvement</div>
              ${weakTopicsHtml}
              ${stats.weakTopics.length ? '<button class="btn-primary btn-full" data-nav="practice">Practice Now</button>' : ''}
            </div>
          </div>
          <div class="small-cards-column">
            ${dailyChallengeHtml}
            ${examHtml}
            ${speedHtml}
          </div>
        </section>

        <section class="activity-section card-glass">
          <div class="activity-header">
            <div>
              <p class="section-label">Recent Activity</p>
              <h2>What you did last</h2>
            </div>
            <button class="btn-secondary" data-nav="achievements">View All</button>
          </div>
          <div class="activity-list">${recentHtml}</div>
        </section>

        <section class="achievement-preview card-glass">
          <div class="section-heading">
            <div>
              <p class="section-label">🏆 Achievements</p>
              <h2>${stats.unlockedCount} / ${stats.achievements.length} Unlocked</h2>
            </div>
            <button class="btn-primary btn-full" data-nav="achievements">View All Achievements</button>
          </div>
          <div class="achievement-list">${achievementCards}</div>
        </section>

        <section class="summary-card card-glass">
          <div class="card-heading">Your Learning Summary</div>
          <p>${summaryText}</p>
        </section>
      </div>
    `;
  }
};

/* =============================================================
   SECTION 19: MISTAKE BOOK
   ============================================================= */

const MistakeBook = {
  init() {
    const content = document.getElementById('mistake-book-content');
    const mistakes = Storage.getArr('mistake_book', []);
    const search = this.search || '';
    const topic = this.topic || 'All';
    const difficulty = this.difficulty || 'All';

    const filtered = mistakes.filter(m => {
      const matchesSearch = (m.question || '').toLowerCase().includes(search.toLowerCase()) || (m.topic || '').toLowerCase().includes(search.toLowerCase());
      const matchesTopic = topic === 'All' || m.topic === topic;
      const matchesDifficulty = difficulty === 'All' || m.difficulty === difficulty;
      return matchesSearch && matchesTopic && matchesDifficulty;
    });

    document.getElementById('mistake-count').textContent = `${mistakes.length} mistake${mistakes.length !== 1 ? 's' : ''}`;

    if (mistakes.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>Mistake Book</p><p>No mistakes saved yet.</p><p>Incorrect questions that you save will appear here.</p></div>`;
      return;
    }

    const topics = ['All', ...new Set(mistakes.map(m => m.topic).filter(Boolean))];
    const difficulties = ['All', ...new Set(mistakes.map(m => m.difficulty).filter(Boolean))];

    content.innerHTML = `
      <div class="mistake-filters">
        <input type="text" id="mistake-search" value="${escapeHtml(search)}" placeholder="Search">
        <select id="mistake-topic-filter">
          ${topics.map(t => `<option value="${t}" ${t === topic ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
        <select id="mistake-difficulty-filter">
          ${difficulties.map(t => `<option value="${t}" ${t === difficulty ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
        <button class="btn-danger" id="mistake-clear-btn">Clear All Mistakes</button>
      </div>
      <div class="mistake-list">
        ${filtered.length === 0 ? `<div class="empty-state">No mistakes found.</div>` : filtered.map((m, i) => `
          <div class="mistake-card">
            <div class="mistake-header">
              <p class="mistake-topic">${m.topic} • ${m.difficulty}</p>
              <button class="mistake-remove" data-index="${i}">×</button>
            </div>
            <p class="mistake-question">${m.question}</p>
            <div class="mistake-answers">
              <div class="mistake-your-answer" style="background:#F8717122;border-left:3px solid #F87171">
                <p style="font-size:12px;color:#7A7A88">Your Answer</p>
                <p style="color:#F87171">${m.userAnswer}</p>
              </div>
              <div class="mistake-correct-answer" style="background:#34D39922;border-left:3px solid #34D399">
                <p style="font-size:12px;color:#7A7A88">Correct Answer</p>
                <p style="color:#34D399">${m.correctAnswer}</p>
              </div>
            </div>
            <div class="mistake-explanation">
              <p style="font-size:12px;font-weight:600;color:#B4B4C0">Explanation</p>
              <p style="font-size:13px;color:#B4B4C0;margin-top:4px">${m.explanation}</p>
            </div>
            <div class="btn-row">
              <button class="btn-secondary" data-role="view-solution">View Solution</button>
              <button class="btn-primary" data-role="practice-again">Practice Again</button>
              <button class="btn-danger" data-role="remove">Remove</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    content.querySelector('#mistake-search').addEventListener('input', (e) => {
      this.search = e.target.value;
      this.init();
    });

    content.querySelector('#mistake-topic-filter').addEventListener('change', (e) => {
      this.topic = e.target.value;
      this.init();
    });

    content.querySelector('#mistake-difficulty-filter').addEventListener('change', (e) => {
      this.difficulty = e.target.value;
      this.init();
    });

    document.querySelectorAll('[data-role="remove"]').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const item = filtered[idx];
        const actualIdx = mistakes.findIndex(m => m === item);
        if (actualIdx >= 0) {
          mistakes.splice(actualIdx, 1);
          Storage.set('mistake_book', mistakes);
          this.init();
        }
      });
    });

    document.querySelectorAll('[data-role="practice-again"]').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const item = filtered[idx];
        const topic = item.topic;
        Router.go('practice');
      });
    });

    document.getElementById('mistake-clear-btn').addEventListener('click', () => {
      if (confirm('Clear all mistakes? This action cannot be undone.')) {
        Storage.set('mistake_book', []);
        this.init();
      }
    });
  }
};

/* =============================================================
   SECTION 20: SPEED TEST
   ============================================================= */

const SpeedTest = {
  init() {
    const content = document.getElementById('speed-test-content');
    const speedState = Storage.get('speed_state', null);

    if (!speedState) {
      content.innerHTML = `
        <div class="speed-setup">
          <div class="speed-section">
            <label>Duration</label>
            <select id="speed-duration" class="speed-select">
              ${buildTimeSelectOptions('speed')}
            </select>
          </div>
          <div class="speed-custom-panel hidden" id="speed-custom-time-panel">
            <div class="speed-section">
              <label>Enter Time</label>
              <input type="text" id="speed-custom-time" class="speed-input" data-numeric-input="true" data-allow-decimal="false" inputmode="numeric" autocomplete="off" placeholder="25">
            </div>
            <div class="speed-section">
              <label>Unit</label>
              <select id="speed-custom-unit" class="speed-select">
                <option value="seconds" selected>Seconds</option>
                <option value="minutes">Minutes</option>
              </select>
            </div>
          </div>

          <div class="speed-section">
            <label>Difficulty</label>
            <select id="speed-difficulty" class="speed-select">
              <option value="Easy">Easy</option>
              <option value="Medium" selected>Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div class="speed-section">
            <label>Topic</label>
            <select id="speed-topic" class="speed-select">
              ${TOPICS.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>

          <button class="btn-primary" id="speed-start-btn" style="width:100%;margin-top:20px">Start Speed Test</button>
        </div>
      `;

      const speedDuration = document.getElementById('speed-duration');
      speedDuration.addEventListener('change', () => {
        const panel = document.getElementById('speed-custom-time-panel');
        panel.classList.toggle('hidden', speedDuration.value !== 'custom');
      });

      document.getElementById('speed-start-btn').addEventListener('click', () => {
        const durationObject = durationFromUi('speed', document.getElementById('speed-duration').value, document.getElementById('speed-custom-time')?.value || '', document.getElementById('speed-custom-unit')?.value || 'seconds');
        if (!durationObject.valid) {
          alert(durationObject.message);
          return;
        }

        const duration = durationObject.seconds;
        const difficulty = document.getElementById('speed-difficulty').value;
        const topic = document.getElementById('speed-topic').value;

        const speedState = {
          duration, difficulty, topic,
          startTime: Date.now(),
          questions: [],
          currentIndex: 0,
          completed: false,
          correct: 0,
          attempted: 0
        };

        Storage.set('speed_state', speedState);
        this.init();
      });
    } else {
      this.runTest(speedState, content);
    }
  },

  runTest(speedState, content) {
    const elapsed = (Date.now() - speedState.startTime) / 1000;
    const timeLeft = Math.max(0, speedState.duration - elapsed);

    if (timeLeft <= 0) {
      this.showSpeedResults(speedState, content);
      return;
    }

    if (speedState.questions.length === 0 || !speedState.questions[speedState.currentIndex]) {
      const newQ = QuestionGenerator.generateQuestion(speedState.topic, speedState.difficulty);
      speedState.questions.push({ ...newQ, userAnswer: null, answered: false });
    }

    const q = speedState.questions[speedState.currentIndex];
    const mins = Math.floor(timeLeft / 60);
    const secs = Math.floor(timeLeft % 60);

    content.innerHTML = `
      <div class="speed-header">
        <div class="speed-stats">
          <div><p class="speed-label">Attempted</p><p class="speed-value">${speedState.attempted}</p></div>
          <div><p class="speed-label">Correct</p><p class="speed-value" style="color:#34D399">${speedState.correct}</p></div>
          <div><p class="speed-label">Time</p><p class="speed-value" style="color:${timeLeft < 5 ? '#F87171' : '#FBBF24'}">⏱ ${mins}:${String(secs).padStart(2, '0')}</p></div>
        </div>
      </div>

      <div class="speed-card">
        <p class="speed-question">${q.question}</p>

        <div class="speed-options">
          ${q.options.map((opt, i) => `
            <button class="speed-option" data-index="${i}" ${q.answered ? 'disabled' : ''}>${opt}</button>
          `).join('')}
        </div>
      </div>
    `;

    document.querySelectorAll('.speed-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const isCorrect = q.options[idx] === q.correctAnswer;
        speedState.attempted++;
        if (isCorrect) speedState.correct++;
        speedState.currentIndex++;
        Storage.set('speed_state', speedState);
        this.runTest(speedState, content);
      });
    });

    if (!speedState.speedTestInterval) {
      speedState.speedTestInterval = setInterval(() => {
        this.runTest(speedState, content);
      }, 100);
    }
  },

  showSpeedResults(speedState, content) {
    const qpm = Number(speedState.duration) ? ((speedState.attempted / speedState.duration) * 60).toFixed(2) : 0;
    const accuracy = speedState.attempted > 0 ? ((speedState.correct / speedState.attempted) * 100).toFixed(1) : 0;
    const score = Math.round((speedState.correct / Math.max(speedState.attempted, 1)) * 100) || 0;

    const bestScore = Storage.get('speed_test_best', { score: 0, qpm: 0, accuracy: 0 });
    if (speedState.attempted > 0 && score > bestScore.score) {
      bestScore.score = score;
      bestScore.qpm = Number(qpm);
      bestScore.accuracy = Number(accuracy);
      Storage.set('speed_test_best', bestScore);
      trackAchievement('speed_master');
    }

    const speedTests = Storage.getArr('speed_tests', []);
    speedTests.push({
      attempted: speedState.attempted,
      correct: speedState.correct,
      incorrect: speedState.attempted - speedState.correct,
      accuracy: Number(accuracy),
      score,
      qpm: Number(qpm),
      timestamp: new Date().toISOString()
    });
    Storage.set('speed_tests', speedTests);

    clearInterval(speedState.speedTestInterval);
    Storage.remove('speed_state');

    content.innerHTML = `
      <div class="speed-results">
        <h2>Speed Test Complete!</h2>

        <div class="speed-result-grid">
          <div class="speed-result-card">
            <p class="speed-result-label">Questions Attempted</p>
            <p class="speed-result-value">${speedState.attempted}</p>
          </div>
          <div class="speed-result-card">
            <p class="speed-result-label">Correct</p>
            <p class="speed-result-value" style="color:#34D399">${speedState.correct}</p>
          </div>
          <div class="speed-result-card">
            <p class="speed-result-label">Incorrect</p>
            <p class="speed-result-value" style="color:#F87171">${Math.max(speedState.attempted - speedState.correct, 0)}</p>
          </div>
          <div class="speed-result-card">
            <p class="speed-result-label">Accuracy</p>
            <p class="speed-result-value" style="color:#FBBF24">${accuracy}%</p>
          </div>
          <div class="speed-result-card">
            <p class="speed-result-label">Questions Per Minute</p>
            <p class="speed-result-value">${qpm}</p>
          </div>
          <div class="speed-result-card">
            <p class="speed-result-label">Score</p>
            <p class="speed-result-value">${speedState.correct}</p>
          </div>
        </div>

        ${bestScore.score > 0 ? `
          <div class="speed-best" style="margin-top:20px;background:#34D39922;padding:16px;border-radius:12px;border-left:3px solid #34D399">
            <p style="font-size:12px;color:#7A7A88">Personal Best: ${Math.round(bestScore.qpm || 0)} Questions/Minute</p>
          </div>
        ` : `<div class="speed-best" style="...">Personal Best: ${Math.round(Number(qpm) || 0)} Questions/Minute</div>`}

        <button class="btn-primary" data-nav="home" style="width:100%;margin-top:20px">Back to Home</button>
      </div>
    `;

    refreshAchievementState();
  }
};

/* =============================================================
   SECTION 21: ACHIEVEMENT SYSTEM
   ============================================================= */

const ACHIEVEMENTS_LIST = [
  { id: 'first_step', title: '🏆 First Step', description: 'Solve your first question', condition: 'questions_solved:1' },
  { id: 'ten_questions', title: '🏆 Learning', description: 'Solve 10 questions', condition: 'questions_solved:10' },
  { id: 'hundred_questions', title: '🏆 Dedication', description: 'Solve 100 questions', condition: 'questions_solved:100' },
  { id: 'perfect_score', title: '🏆 Perfect Score', description: 'Get 100% in an exam', condition: 'perfect_score:1' },
  { id: 'seven_day_streak', title: '🏆 Committed', description: 'Maintain a 7-day practice streak', condition: 'practice_streak:7' },
  { id: 'speed_master', title: '⚡ Speed Master', description: 'Achieve a personal best in Speed Test', condition: 'speed_test:1' },
  { id: 'formula_lover', title: '⭐ Formula Lover', description: 'Favorite 10 formulas', condition: 'favorites:10' },
  { id: 'daily_champion', title: '🎯 Daily Champion', description: 'Complete 3 daily challenges', condition: 'daily_challenges:3' },
];

function trackAchievement(achievementId) {
  const achievements = Storage.getArr('achievements', ACHIEVEMENTS_LIST.map(a => ({ ...a, unlocked: false, unlockedDate: null })));
  const achievement = achievements.find(a => a.id === achievementId);
  
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true;
    achievement.unlockedDate = new Date().toLocaleDateString();
    Storage.set('achievements', achievements);
  }
}

const AchievementsPage = {
  init() {
    const content = document.getElementById('achievements-content');
    const achievements = Storage.getArr('achievements', ACHIEVEMENTS_LIST.map(a => ({ ...a, unlocked: false, unlockedDate: null })));

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    content.innerHTML = `
      <div class="achievements-header">
        <p class="achievements-progress">${unlockedCount}/${achievements.length} Unlocked</p>
        <div class="achievements-progress-bar">
          <div class="achievements-progress-fill" style="width:${(unlockedCount / achievements.length) * 100}%"></div>
        </div>
      </div>

      <div class="achievements-list">
        ${achievements.map(a => `
          <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">${a.unlocked ? a.title.split(' ')[0] : '🔒'}</div>
            <div class="achievement-info">
              <p class="achievement-title">${a.title}</p>
              <p class="achievement-desc">${a.description}</p>
              ${a.unlockedDate ? `<p class="achievement-date">Unlocked: ${a.unlockedDate}</p>` : '<p class="achievement-date">Locked</p>'}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};

/* =============================================================
   SECTION 22: ABOUT PAGE
   ============================================================= */

const AboutPage = {
  FEATURES: [
    { title: 'Basic Calculator', desc: 'Simple arithmetic with history', color: '#A78BFA' },
    { title: 'Scientific Calculator', desc: 'sin, cos, tan, log, ln, √, π', color: '#60A5FA' },
    { title: 'Unit Converter', desc: '8 categories, instant conversion', color: '#22D3EE' },
    { title: 'Scholar Tool', desc: '5-step formula solver', color: '#FF8A3D' },
    { title: 'Formulas', desc: 'All scholarship formulas', color: '#F472B6' },
    { title: 'Shortcut Tricks', desc: 'Time-saving exam techniques', color: '#FBBF24' },
    { title: 'Practice', desc: 'MCQ quiz with hints', color: '#34D399' },
    { title: 'BuddhiMatta', desc: 'IQ training & reasoning', color: '#F472B6' },
    { title: 'Squares & Cubes', desc: 'Reference table + tricks', color: '#A78BFA' },
    { title: 'GK Revision', desc: 'Important days & dates', color: '#FF8A3D' },
    { title: 'Memory Tricks', desc: 'Mnemonics for retention', color: '#F472B6' },
    { title: 'Fast Revision', desc: 'Quick exam review', color: '#60A5FA' },
    { title: 'Progress Dashboard', desc: 'Track your learning journey', color: '#22D3EE' },
    { title: 'Daily Challenge', desc: 'Daily set of scholarship questions', color: '#FBBF24' },
    { title: 'Weak Topic Detector', desc: 'Analyze your performance gaps', color: '#F87171' },
    { title: 'Exam Mode', desc: 'Full-length mock exams', color: '#60A5FA' },
    { title: 'Question Generator', desc: 'Create custom practice sets', color: '#A78BFA' },
    { title: 'Mistake Book', desc: 'Learn from your errors', color: '#F472B6' },
    { title: 'Speed Test', desc: 'Timed practice & scoring', color: '#FF8A3D' },
    { title: 'Achievements', desc: 'Unlock milestones & badges', color: '#34D399' },
  ],

  init() {
    const container = document.getElementById('about-content');
    container.innerHTML = `
      <div class="about-hero">
        <div class="about-hero-glow-1"></div>
        <div class="about-hero-glow-2"></div>
        <div class="about-hero-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>
        </div>
        <h1 class="about-hero-title">SmartScholar Calculator</h1>
        <p class="about-hero-version">v2.1.0</p>
        <p class="about-hero-desc">An all-in-one educational tool built for scholarship exam aspirants. Calculators, formulas, tricks, and IQ training — in one app.</p>
      </div>

      <h2 class="about-features-title">All Features</h2>
      <div class="about-features-grid">
        ${this.FEATURES.map(f => `
          <div class="about-feature-item">
            <div class="about-feature-icon" style="background:${f.color}18;border:1px solid ${f.color}33">
              <svg viewBox="0 0 24 24" fill="none" stroke="${f.color}" stroke-width="1.5" width="16" height="16"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
            </div>
            <div>
              <p class="about-feature-name">${f.title}</p>
              <p class="about-feature-desc">${f.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="about-credits">
        <p class="about-credits-title">Credits</p>
        <p class="about-credits-text">Designed and built with ♥ for scholarship students across Maharashtra and India.</p>
        <p class="about-credits-source">Developed by <span class="about-author-name">Prathamesh Gholap</span></p>
        <p class="about-credits-source">App Name: SmartScholar Calculator • Purpose: Educational calculator and scholarship preparation platform.</p>
        <p class="about-credits-source">Formulas sourced from Maharashtra Scholarship Exam syllabus (Class 5, 8, 10).</p>
      </div>

      <div class="about-links">
        <button class="about-link-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          Source
        </button>
        <a class="about-link-btn" href="mailto:appsandwebsitedevloper@gmail.com?subject=SmartScholar%20Calculator%20-%20Suggestion%20%2F%20Feedback">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Contact Developer
        </a>
        <button class="about-link-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Share
        </button>
      </div>

      <div class="about-contact-block">
        <a class="about-contact-email" href="mailto:appsandwebsitedevloper@gmail.com?subject=SmartScholar%20Calculator%20-%20Suggestion%20%2F%20Feedback">appsandwebsitedevloper@gmail.com</a>
      </div>

      <p class="about-copyright">© 2026 SmartScholar Calculator</p>
    `;
  }
};

/* =============================================================
   SECTION 20: KEYBOARD SUPPORT
   ============================================================= */

document.addEventListener('keydown', (e) => {
  const page = Router.currentPage;
  if (page === 'calculator') {
    const keyMap = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '.': 'decimal', '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide',
      '%': 'percent', 'Enter': 'equals', 'Escape': 'clear', 'Backspace': 'backspace',
    };
    const key = keyMap[e.key];
    if (key) {
      e.preventDefault();
      const calcKey = Calculator.KEYS.find(k => k.action === key || k.label === key);
      if (calcKey) Calculator.handleKey(calcKey);
    }
  }
  if (page === 'scientific') {
    const keyMap = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '.': 'decimal', '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide',
      '%': 'percent', 'Enter': 'equals', 'Escape': 'clear', 'Backspace': 'backspace',
    };
    const key = keyMap[e.key];
    if (key) {
      e.preventDefault();
      const basicKey = ScientificCalc.BASIC_KEYS.find(k => k.action === key || k.label === key);
      if (basicKey) ScientificCalc.handleBasicKey(basicKey);
    }
  }
});

/* =============================================================
   SECTION 20: INIT
   ============================================================= */

/* =============================================================
   INITIALIZATION
   ============================================================= */

// Initialize achievements and other data on first load
function initializeAppData() {
  // Initialize achievements
  const achievements = Storage.getArr('achievements', null);
  if (!achievements || achievements.length === 0) {
    Storage.set('achievements', ACHIEVEMENTS_LIST.map(a => ({ ...a, unlocked: false, unlockedDate: null })));
  }

  // Initialize other data structures
  if (!Storage.get('practice_history', null)) Storage.set('practice_history', []);
  if (!Storage.get('mistake_book', null)) Storage.set('mistake_book', []);
  if (!Storage.get('speed_test_best', null)) Storage.set('speed_test_best', { score: 0, qpm: 0, accuracy: 0 });
  if (!Storage.get('practice_streak', null)) Storage.set('practice_streak', 0);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeAppData();
  Router.init();
});
