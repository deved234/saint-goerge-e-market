// Sample product data
export const products = [
  {
    id: 1,
    name: "خبز عربي طازج",
    category: "مخبوزات و حلويات",
    price: 3.50,
    image: "./unsplashltcybocukgci518-wnjq-300w.png",
    rating: 4.5,
    reviewCount: 128,
    isNew: false,
    description: "خبز عربي طازج من الفرن، مثالي للوجبات اليومية.",
    inStock: true,
    brand: "مخبز القدس"
  },
  {
    id: 2,
    name: "حليب المراعي كامل الدسم",
    category: "الألبان و الجبن",
    price: 4.49,
    image: "./unsplashx4zrlinfdqgi518-gny-300w.png",
    rating: 4.2,
    reviewCount: 89,
    isNew: true,
    description: "حليب طازج كامل الدسم من المراعي، غني بالكالسيوم والفيتامينات.",
    inStock: true,
    brand: "المراعي"
  },
  {
    id: 3,
    name: "سمك السلمون الطازج",
    category: "مأكولات بحرية",
    price: 25.99,
    image: "./unsplashkraq7kfg7i8i518-ggk8-300w.png",
    rating: 4.7,
    reviewCount: 256,
    discount: 15,
    isNew: false,
    description: "سمك سلمون طازج من البحر، غني بأوميغا 3.",
    inStock: true,
    brand: "البحر الأحمر"
  },
  {
    id: 4,
    name: "لحم بقري مقطع",
    category: "اللحوم و الدواجن",
    price: 18.99,
    image: "./tq_joqfr8zlwk-p085-500w.png",
    rating: 4.3,
    reviewCount: 67,
    isNew: true,
    description: "لحم بقري طازج مقطع، مثالي للشواء والطبخ.",
    inStock: true,
    brand: "اللحوم الطازجة"
  },
  {
    id: 5,
    name: "دجاج كامل طازج",
    category: "اللحوم و الدواجن",
    price: 12.99,
    image: "./tq_n4qqkpcn-6-ahcb-200h.png",
    rating: 4.4,
    reviewCount: 142,
    isNew: false,
    description: "دجاج كامل طازج، خالي من الهرمونات.",
    inStock: true,
    brand: "الدجاج الطازج"
  },
  {
    id: 6,
    name: "طماطم طازجة",
    category: "منتجات طازجة",
    price: 2.99,
    image: "./tq_zn62j755xs-ybd-200h.png",
    rating: 4.1,
    reviewCount: 93,
    isNew: true,
    description: "طماطم طازجة من المزرعة، مثالية للسلطات والطبخ.",
    inStock: true,
    brand: "الخضار الطازجة"
  },
  {
    id: 7,
    name: "جبنة شيدر",
    category: "الألبان و الجبن",
    price: 8.99,
    image: "./tq_qgjdid4rxf-iqeb-500w.png",
    rating: 4.6,
    reviewCount: 178,
    isNew: false,
    description: "جبنة شيدر طازجة، مثالية للشطائر والطبخ.",
    inStock: true,
    brand: "الأجبان الطازجة"
  },
  {
    id: 8,
    name: "جمبري طازج",
    category: "مأكولات بحرية",
    price: 22.99,
    image: "./unsplashltcybocukgci518-wnjq-300w.png",
    rating: 4.3,
    reviewCount: 201,
    discount: 10,
    isNew: false,
    description: "جمبري طازج من البحر، مثالي للشواء والقلي.",
    inStock: true,
    brand: "البحر الأحمر"
  },
  {
    id: 9,
    name: "كيك الشوكولاتة",
    category: "مخبوزات و حلويات",
    price: 15.99,
    image: "./unsplashx4zrlinfdqgi518-gny-300w.png",
    rating: 4.5,
    reviewCount: 134,
    isNew: true,
    description: "كيك شوكولاتة طازج، مثالي للحلويات.",
    inStock: true,
    brand: "مخبز القدس"
  },
  {
    id: 10,
    name: "قهوة عربية",
    category: "المشروبات",
    price: 12.99,
    image: "./unsplashkraq7kfg7i8i518-ggk8-300w.png",
    rating: 4.4,
    reviewCount: 87,
    isNew: false,
    description: "قهوة عربية أصيلة، مطحونة طازجة.",
    inStock: true,
    brand: "القهوة العربية"
  },
  {
    id: 11,
    name: "فلفل حار",
    category: "التوابل و البهارات",
    price: 4.99,
    image: "./tq_joqfr8zlwk-p085-500w.png",
    rating: 4.2,
    reviewCount: 156,
    isNew: true,
    description: "فلفل حار طازج، مثالي لإضافة النكهة للطعام.",
    inStock: true,
    brand: "التوابل الطازجة"
  },
  {
    id: 12,
    name: "فاصوليا معلبة",
    category: "الأطعمة المعلبة",
    price: 3.99,
    image: "./tq_n4qqkpcn-6-ahcb-200h.png",
    rating: 4.8,
    reviewCount: 203,
    isNew: false,
    description: "فاصوليا معلبة طازجة، جاهزة للطبخ.",
    inStock: true,
    brand: "الأطعمة المعلبة"
  },
  {
    id: 13,
    name: "خضار مجمدة",
    category: "الأطعمة المجمدة",
    price: 5.99,
    image: "./tq_zn62j755xs-ybd-200h.png",
    rating: 4.3,
    reviewCount: 98,
    isNew: true,
    description: "خليط خضار مجمد، يحتفظ بالقيمة الغذائية.",
    inStock: true,
    brand: "الخضار المجمدة"
  },
  {
    id: 14,
    name: "عصير برتقال طبيعي",
    category: "المشروبات",
    price: 6.99,
    image: "./tq_qgjdid4rxf-iqeb-500w.png",
    rating: 4.5,
    reviewCount: 145,
    isNew: false,
    description: "عصير برتقال طبيعي 100%، بدون إضافات.",
    inStock: true,
    brand: "العصائر الطبيعية"
  },
  {
    id: 15,
    name: "مكسرات مختلطة",
    category: "المكسرات و البذور",
    price: 18.99,
    image: "./unsplashltcybocukgci518-wnjq-300w.png",
    rating: 4.6,
    reviewCount: 167,
    isNew: true,
    description: "مكسرات مختلطة طازجة، غنية بالبروتين.",
    inStock: true,
    brand: "المكسرات الطازجة"
  },
  {
    id: 16,
    name: "خس طازج",
    category: "منتجات طازجة",
    price: 2.49,
    image: "./unsplashx4zrlinfdqgi518-gny-300w.png",
    rating: 4.4,
    reviewCount: 89,
    isNew: false,
    description: "خس طازج من المزرعة، مثالي للسلطات.",
    inStock: true,
    brand: "الخضار الطازجة"
  }
];

// Featured products (subset of all products)
export const featuredProducts = products.slice(0, 8);

// Categories data - Updated with all categories you mentioned
export const categories = [
  {
    id: 1,
    name: {
      ar: "منتجات طازجة",
      en: "Fresh Produce"
    },
    slug: "fresh-produce",
    icon: "🥬",
    productCount: 25,
    description: {
      ar: "خضار وفواكه طازجة من المزرعة",
      en: "Fresh vegetables and fruits from the farm"
    }
  },
  {
    id: 2,
    name: {
      ar: "اللحوم و الدواجن",
      en: "Meat & Poultry"
    },
    slug: "meat-poultry",
    icon: "🥩",
    productCount: 18,
    description: {
      ar: "لحوم ودواجن طازجة عالية الجودة",
      en: "Fresh high-quality meat and poultry"
    }
  },
  {
    id: 3,
    name: {
      ar: "مأكولات بحرية",
      en: "Seafood"
    },
    slug: "seafood",
    icon: "🐟",
    productCount: 15,
    description: {
      ar: "أسماك ومأكولات بحرية طازجة",
      en: "Fresh fish and seafood"
    }
  },
  {
    id: 4,
    name: {
      ar: "الألبان و الجبن",
      en: "Dairy & Cheese"
    },
    slug: "dairy-cheese",
    icon: "🥛",
    productCount: 22,
    description: {
      ar: "ألبان وأجبان طازجة ومتنوعة",
      en: "Fresh and varied dairy and cheese"
    }
  },
  {
    id: 5,
    name: {
      ar: "مخبوزات و حلويات",
      en: "Bakery & Sweets"
    },
    slug: "bakery-sweets",
    icon: "🍰",
    productCount: 20,
    description: {
      ar: "خبز وحلويات طازجة من الفرن",
      en: "Fresh bread and sweets from the oven"
    }
  },
  {
    id: 6,
    name: {
      ar: "التوابل و البهارات",
      en: "Spices & Seasonings"
    },
    slug: "spices-seasonings",
    icon: "🌶️",
    productCount: 12,
    description: {
      ar: "توابل وبهارات طبيعية",
      en: "Natural spices and seasonings"
    }
  },
  {
    id: 7,
    name: {
      ar: "الأطعمة المعلبة",
      en: "Canned Foods"
    },
    slug: "canned-foods",
    icon: "🥫",
    productCount: 16,
    description: {
      ar: "أطعمة معلبة محفوظة طازجة",
      en: "Preserved canned foods"
    }
  },
  {
    id: 8,
    name: {
      ar: "الأطعمة المجمدة",
      en: "Frozen Foods"
    },
    slug: "frozen-foods",
    icon: "🧊",
    productCount: 14,
    description: {
      ar: "أطعمة مجمدة تحتفظ بالقيمة الغذائية",
      en: "Frozen foods that retain nutritional value"
    }
  },
  {
    id: 9,
    name: {
      ar: "المشروبات",
      en: "Beverages"
    },
    slug: "beverages",
    icon: "🥤",
    productCount: 18,
    description: {
      ar: "مشروبات طبيعية ومتنوعة",
      en: "Natural and varied beverages"
    }
  },
  {
    id: 10,
    name: {
      ar: "المكسرات و البذور",
      en: "Nuts & Seeds"
    },
    slug: "nuts-seeds",
    icon: "🥜",
    productCount: 10,
    description: {
      ar: "مكسرات وبذور طازجة ومتنوعة",
      en: "Fresh and varied nuts and seeds"
    }
  },
  {
    id: 11,
    name: {
      ar: "الخضار",
      en: "Vegetables"
    },
    slug: "vegetables",
    icon: "🥕",
    productCount: 30,
    description: {
      ar: "خضار طازجة متنوعة من المزرعة",
      en: "Fresh varied vegetables from the farm"
    }
  }
];

// Filter options
export const priceRanges = [
  { label: "أقل من 5$", min: 0, max: 5 },
  { label: "5$ - 10$", min: 5, max: 10 },
  { label: "10$ - 20$", min: 10, max: 20 },
  { label: "20$ - 50$", min: 20, max: 50 },
  { label: "أكثر من 50$", min: 50, max: Infinity }
];

export const sortOptions = [
  { value: "featured", label: "مميز" },
  { value: "price-low", label: "السعر: من الأقل للأعلى" },
  { value: "price-high", label: "السعر: من الأعلى للأقل" },
  { value: "rating", label: "تقييم العملاء" },
  { value: "newest", label: "الأحدث أولاً" },
  { value: "name", label: "الاسم أ-ي" }
];

// Helper function to get products by category
export const getProductsByCategory = (categorySlug) => {
  return products.filter(product => {
    const category = categories.find(cat => cat.slug === categorySlug);
    return category && (product.category === category.name.ar || product.category === category.name.en);
  });
};

// Helper function to get category by slug
export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};