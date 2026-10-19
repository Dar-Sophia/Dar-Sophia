/* بيانات المتجر — 10 أماكن للمنتجات (3 بشرة، 3 شعر، 3 جسم، 1 مميز). غيّري الاسم والسعر والصورة والوصف من هنا فقط */
// ضعي رقم واتساب الخاص بصوفيا هنا بالصيغة الدولية بدون + (مثال: 2010xxxxxxxx)
const STORE = { whatsapp: '', shipping: 80 };
const CATEGORIES = {
    all: { label: 'كل المنتجات', icon: 'fa-border-all' },
    skin: { label: 'البشرة', icon: 'fa-spa' },
    hair: { label: 'الشعر', icon: 'fa-seedling' },
    body: { label: 'الجسم', icon: 'fa-hand-holding-heart' },
    featured: { label: 'منتج مميز', icon: 'fa-star' }
};

const PRODUCTS = [
  {
    id: 1,
    name: "اسم منتج بشرة 1",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "skin",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  },
  {
    id: 2,
    name: "اسم منتج بشرة 2",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "skin",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  },
  {
    id: 3,
    name: "اسم منتج بشرة 3",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "skin",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  },
  {
    id: 4,
    name: "اسم منتج شعر 1",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "hair",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  },
  {
    id: 5,
    name: "اسم منتج شعر 2",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "hair",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  },
  {
    id: 6,
    name: "اسم منتج شعر 3",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "hair",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  },
  {
    id: 7,
    name: "اسم منتج جسم 1",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "body",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  },
  {
    id: 8,
    name: "اسم منتج جسم 2",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "body",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  },
  {
    id: 9,
    name: "اسم منتج جسم 3",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "body",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  },
  {
    id: 10,
    name: "اسم المنتج المميز",
    short: "",            // الحجم، مثال: "50 مل"
    price: 100,           // غيّري السعر
    category: "featured",
    image: "images/placeholder.svg",   // غيّري مسار الصورة
    details: {
      intro: ["اكتبي وصف المنتج هنا."],
      features: ["الميزة الأولى", "الميزة الثانية"],
      ingredients: [],
      usage: ""
    }
  }
];
