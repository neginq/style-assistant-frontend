import type { Question } from "@/types/questionnaire";

export const questions: Question[] = [
  {
    id: "gender",
    title: "جنسیت شما چیست؟",
    gender: "both",
    stage: 1,
    type: "single",
    visualType: "question-image",
    scope: "profile",
    required: true,
    image: "/images/questions/gender/q1-gender.jpg",
    imageAlt: " انتخاب جنسیت",
    imageFit: "cover",
    imageAspect: "wide",
    options: [
      {
        label: "زن",
        value: "female",
      },
      {
        label: "مرد",
        value: "male",
      },
    ],
  },

  {
    id: "age_group",
    title: "در چه بازه سنی قرار دارید؟",
    gender: "both",
    stage: 1,
    type: "single",
    visualType: "text",
    scope: "profile",
    required: true,

    options: [
      {
        label: "کمتر از ۱۸ سال",
        value: "under_18",
      },
      {
        label: "۱۸ تا ۲۴ سال",
        value: "18_24",
      },
      {
        label: "۲۵ تا ۳۴ سال",
        value: "25_34",
      },
      {
        label: "۳۵ تا ۴۴ سال",
        value: "35_44",
      },
      {
        label: "۴۵ سال و بیشتر",
        value: "45_plus",
      },
    ],
  },

  {
    id: "skin_tone",
    title: "رنگ پوست شما به کدام گزینه نزدیک‌تر است؟",
    gender: "both",
    stage: 1,
    type: "single",
    visualType: "color-circle",
    scope: "profile",
    required: true,
    helperText: "نزدیک‌ترین گزینه را انتخاب کنید.",
    options: [
      {
        label: "بسیار روشن",
        value: "very_fair",
        colors: ["#F8DDD0"],
      },
      {
        label: "روشن",
        value: "fair",
        colors: ["#EFC5AE"],
      },
      {
        label: "روشن تا متوسط",
        value: "light_medium",
        colors: ["#DDAA87"],
      },
      {
        label: "گندمی",
        value: "medium",
        colors: ["#BF845E"],
      },
      {
        label: "سبزه",
        value: "olive",
        colors: ["#986344"],
      },
      {
        label: "تیره",
        value: "deep",
        colors: ["#613B2D"],
      },
      {
        label: "مطمئن نیستم",
        value: "unsure",
        colors: ["#D4CDD7"],
      },
    ],
  },

  {
    id: "skin_undertone",
    title: "تناژ یا زیرتن پوست شما چیست؟",
    gender: "both",
    stage: 1,
    type: "single",
    visualType: "color-palette",
    scope: "profile",
    required: true,
    helperText: "گزینه‌ای را انتخاب کنید که به تناژ پوست شما نزدیک‌تر است.",
    options: [
      {
        label: "گرم",
        value: "warm",
        description: "رگ‌های سبز",
        //colors: ["#E5C58F", "#7E8451", "#B66043", "#CDA434"],
      },
      {
        label: "سرد",
        value: "cool",
        description: "رگ‌های آبی یا بنفش",
        //colors: ["#799BC8", "#8C72B3", "#D19AB7", "#BFC3C8"],
      },
      {
        label: "خنثی",
        value: "neutral",
        description: "ترکیبی از رنگ‌های گرم و سرد",
        //colors: ["#BBAA91", "#8D91A8", "#A9827C", "#A3A587"],
      },
      {
        label: "مطمئن نیستم",
        value: "unsure",
        //description: "در ادامه از پالت‌های عمومی‌تر استفاده می‌کنیم.",
        //colors: ["#D8D2DA", "#B7ADB9", "#918795"],
      },
    ],
  },

  {
    id: "female_body_shape",
    title: "فرم بدن شما به کدام گزینه نزدیک‌تر است؟",
    gender: "female",
    stage: 1,
    type: "single",
    visualType: "question-image",
    scope: "profile",
    required: true,
    image: "/images/questions/body-shape/female/q5-female-bodyshape.png",
    imageAlt: "انواع فرم بدن زنان",
    imageFit: "contain",
    imageAspect: "medium",
    helperText:
      "اگر مطمئن نیستید، گزینه‌ای را انتخاب کنید که بیشترین شباهت را دارد.",
    options: [
      {
        label: "ساعت شنی",
        value: "hourglass",
        description: "عرض شانه و باسن نزدیک و کمر مشخص",
      },
      {
        label: "گلابی",
        value: "pear",
        description: "پایین‌تنه پهن‌تر از شانه‌ها",
      },
      {
        label: "سیبی",
        value: "apple",
        description: "بخش میانی بدن برجسته‌تر است",
      },
      {
        label: "مستطیلی",
        value: "rectangle",
        description: "شانه، کمر و باسن تقریباً هم‌عرض هستند",
      },
      {
        label: "مثلث وارونه",
        value: "inverted_triangle",
        description: "شانه‌ها پهن‌تر از پایین‌تنه هستند",
      },
      {
        label: "مطمئن نیستم",
        value: "unsure",
      },
    ],
  },

  {
    id: "male_body_shape",
    title: "فرم بدن شما به کدام گزینه نزدیک‌تر است؟",
    gender: "male",
    stage: 1,
    type: "single",
    visualType: "question-image",
    scope: "profile",
    required: true,
    image: "/images/questions/body-shape/male/q5-male-bodyshape.png",
    imageAlt: "انواع فرم بدن مردان",
    imageFit: "contain",
    imageAspect: "medium",
    helperText:
      "اگر مطمئن نیستید، گزینه‌ای را انتخاب کنید که بیشترین شباهت را دارد.",
    options: [
      {
        label: "ذوزنقه‌ای",
        value: "trapezoid",
        description: "شانه‌ها کمی پهن‌تر از کمر و فرم کلی متعادل",
      },
      {
        label: "مستطیلی",
        value: "rectangle",
        description: "شانه و کمر تقریباً هم‌عرض هستند",
      },
      {
        label: "مثلثی",
        value: "triangle",
        description: "بخش میانی یا پایین‌تنه پهن‌تر از شانه‌ها",
      },
      {
        label: "بیضی",
        value: "oval",
        description: "قسمت میانی بدن برجسته‌تر و گردتر است",
      },
      {
        label: "مثلث وارونه",
        value: "inverted_triangle",
        description: "شانه و سینه پهن‌تر از کمر هستند",
      },
      {
        label: "مطمئن نیستم",
        value: "unsure",
      },
    ],
  },
  {
    id: "occasion",
    title: "برای چه موقعیتی به دنبال استایل هستید؟",
    gender: "both",
    stage: 2,
    type: "single",
    visualType: "text",
    scope: "request",
    required: true,

    options: [
      {
        label: "استفاده روزمره",
        value: "daily",
        icon: "daily",
      },
      {
        label: "دانشگاه",
        value: "university",
        icon: "university",
      },
      {
        label: "محل کار",
        value: "work",
        icon: "work",
      },
      {
        label: "دورهمی دوستانه",
        value: "friends",
        icon: "friends",
      },
      {
        label: "مهمانی",
        value: "party",
        icon: "party",
      },
      {
        label: "قرار یا کافه",
        value: "date_cafe",
        icon: "cafe",
      },
      {
        label: "مراسم رسمی",
        value: "formal_event",
        icon: "formal",
      },
      {
        label: "سفر و گردش",
        value: "travel",
        icon: "travel",
      },
    ],
  },
  {
    id: "season",
    title: "این استایل را برای کدام فصل می‌خواهید؟",
    gender: "both",
    stage: 2,
    type: "single",
    visualType: "text",
    scope: "request",
    required: true,

    options: [
      {
        label: "بهار",
        value: "spring",
        icon: "spring",
      },
      {
        label: "تابستان",
        value: "summer",
        icon: "summer",
      },
      {
        label: "پاییز",
        value: "autumn",
        icon: "autumn",
      },
      {
        label: "زمستان",
        value: "winter",
        icon: "winter",
      },
      {
        label: "چهارفصل",
        value: "all_seasons",
        icon: "all_seasons",
      },
    ],
  },
  {
    id: "female_style_preferences",
    title: "بیشتر به کدام سبک‌های پوشش علاقه دارید؟",
    gender: "female",
    stage: 2,
    type: "multiple",
    visualType: "image",
    scope: "request",
    required: true,
    maxSelections: 2,
    helperText: "حداکثر دو سبک را انتخاب کنید.",

    options: [
      {
        label: "کژوال و روزمره",
        value: "casual",
        image: "/images/questions/styles/female/female-casual.png",
      },
      {
        label: "مینیمال",
        value: "minimal",
        image: "/images/questions/styles/female/female-minimal.png",
      },
      {
        label: "کلاسیک",
        value: "classic",
        image: "/images/questions/styles/female/female-classic.png",
      },
      {
        label: "رسمی",
        value: "formal",
        image: "/images/questions/styles/female/female-formal.png",
      },
      {
        label: "اسپرت",
        value: "sporty",
        image: "/images/questions/styles/female/female-sporty.png",
      },
      {
        label: "خیابانی",
        value: "streetwear",
        image: "/images/questions/styles/female/female-streetwear.png",
      },
      {
        label: "هنری و خلاقانه",
        value: "creative",
        image: "/images/questions/styles/female/female-creative.png",
      },
      {
        label: "رمانتیک و ظریف",
        value: "romantic",
        image: "/images/questions/styles/female/female-romantic.png",
      },
    ],
  },
  {
    id: "male_style_preferences",
    title: "بیشتر به کدام سبک‌های پوشش علاقه دارید؟",
    gender: "male",
    stage: 2,
    type: "multiple",
    visualType: "image",
    scope: "request",
    required: true,
    maxSelections: 2,
    helperText: "حداکثر دو سبک را انتخاب کنید.",

    options: [
      {
        label: "کژوال و روزمره",
        value: "casual",
        image: "/images/questions/styles/male/male-casual.png",
      },
      {
        label: "مینیمال",
        value: "minimal",
        image: "/images/questions/styles/male/male-minimal.png",
      },
      {
        label: "کلاسیک",
        value: "classic",
        image: "/images/questions/styles/male/male-classic.png",
      },
      {
        label: "رسمی",
        value: "formal",
        image: "/images/questions/styles/male/male-formal.png",
      },
      {
        label: "اسپرت",
        value: "sporty",
        image: "/images/questions/styles/male/male-sporty.png",
      },
      {
        label: "خیابانی",
        value: "streetwear",
        image: "/images/questions/styles/male/male-streetwear.png",
      },
      {
        label: "اسمارت کژوال",
        value: "smart_casual",
        image: "/images/questions/styles/male/male-smart-casual.png",
      },
      {
        label: "هنری و متفاوت",
        value: "creative",
        image: "/images/questions/styles/male/male-creative.png",
      },
    ],
  },
  {
    id: "female_fit_preference",
    title: "ترجیح می‌دهید لباس‌ها روی بدن چگونه قرار بگیرند؟",
    gender: "female",
    stage: 2,
    type: "single",
    visualType: "question-image",
    scope: "request",
    required: true,

    image: "/images/questions/fit/female/q9-female-fit.png",
    imageAlt: "راهنمای انواع فیت لباس برای زنان",

    imageFit: "contain",
    imageAspect: "natural",

    options: [
      {
        label: "آزاد و راحت",
        value: "loose",
      },
      {
        label: "نیمه‌آزاد",
        value: "semi_loose",
      },
      {
        label: "متعادل و معمولی",
        value: "regular",
      },
      {
        label: "نسبتاً جذب",
        value: "fitted",
      },
      {
        label: "بالاتنه آزاد و پایین‌تنه جذب",
        value: "loose_top_fitted_bottom",
      },
      {
        label: "بالاتنه جذب و پایین‌تنه آزاد",
        value: "fitted_top_loose_bottom",
      },
    ],
  },
  {
    id: "male_fit_preference",
    title: "ترجیح می‌دهید لباس‌ها روی بدن چگونه قرار بگیرند؟",
    gender: "male",
    stage: 2,
    type: "single",
    visualType: "question-image",
    scope: "request",
    required: true,

    image: "/images/questions/fit/male/q9-male-fit.png",
    imageAlt: "راهنمای انواع فیت لباس برای مردان",

    imageFit: "contain",
    imageAspect: "natural",

    options: [
      {
        label: "آزاد و راحت",
        value: "loose",
      },
      {
        label: "نیمه‌آزاد",
        value: "semi_loose",
      },
      {
        label: "معمولی و متعادل",
        value: "regular",
      },
      {
        label: "نسبتاً جذب",
        value: "fitted",
      },
      {
        label: "بالاتنه آزاد و شلوار متعادل",
        value: "loose_top_regular_pants",
      },
      {
        label: "بالاتنه متعادل و شلوار آزاد",
        value: "regular_top_loose_pants",
      },
    ],
  },
  {
    id: "female_coverage_preference",
    title: "میزان پوشیدگی موردنظر شما کدام است؟",
    gender: "female",
    stage: 2,
    type: "single",
    visualType: "text",
    scope: "request",
    required: true,

    options: [
      {
        label: "کاملاً پوشیده",
        value: "fully_covered",
      },
      {
        label: "پوشیده و راحت",
        value: "covered_comfortable",
      },
      {
        label: "متعادل",
        value: "balanced",
      },
      {
        label: "محدودیت خاصی ندارم",
        value: "no_specific_limit",
      },
    ],
  },
  {
    id: "male_formality_level",
    title: "در پوشش خود چه میزان رسمی‌بودن را ترجیح می‌دهید؟",
    gender: "male",
    stage: 2,
    type: "single",
    visualType: "text",
    scope: "request",
    required: true,

    options: [
      {
        label: "کاملاً راحت و غیررسمی",
        value: "very_casual",
      },
      {
        label: "بیشتر کژوال",
        value: "casual",
      },
      {
        label: "متعادل",
        value: "balanced",
      },
      {
        label: "اسمارت کژوال",
        value: "smart_casual",
      },
      {
        label: "رسمی و مرتب",
        value: "formal",
      },
    ],
  },
];
