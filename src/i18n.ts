import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        shop: "Shop",
        blogs: "Blogs",
        contactUs: "Contact Us",
        aboutUs: "About Us",
        toggleMenu: "Toggle Menu",
      },
      slider: {
        slide1: "Find Your Perfect Blend of Our Traditional and Modern Fashion.",
        slide2: "Unite Timeless Traditions with Fresh, Modern Styles Today.",
        slide3: "Uncover the Perfect Balance of Tradition and Trendy Pieces.",
        viewCollection: "View Collection",
      },
      home: {
        kids: "Kids",
        women: "Women",
        men: "Men",
        newCollection: "New Collection",
        bestSellers: "Best Sellers",
        highestDiscount: "Highest Discount",
        loadingNewCollection: "Loading New Collection...",
        errorNewCollection: "Error fetching New Collection.",
        loadingBestSellers: "Loading Best Sellers...",
        errorBestSellers: "Error fetching Best Sellers.",
        loadingHighestDiscount: "Loading Highest Discount...",
        errorHighestDiscount: "Error fetching Highest Discount.",
        viewCollection: "View Collection",
        viewBestSellers: "View Best Sellers",
        viewDiscounts: "View Discounts",
      },
      footer: {
        brandName: "Royal Key",
        copyright: "2024 Royal Key. All Rights Reserved",
        collection: "Collection",
        brands: "Brands",
        aboutUs: "About Us",
        contactUs: "Contact Us",
        phone: "Phone",
        email: "Email",
        website: "Website",
        visitUs: "Visit us on",
      },
    }
  },
  ar: {
    translation: {
      navbar: {
        home: "الرئيسية",
        shop: "المتجر",
        blogs: "المدونات",
        contactUs: "اتصل بنا",
        aboutUs: "من نحن",
        toggleMenu: "القائمة",
      },
      slider: {
        slide1: "اكتشف المزيج المثالي بين أزيائنا التقليدية والحديثة.",
        slide2: "اجمع بين التقاليد العريقة والأساليب العصرية الجديدة اليوم.",
        slide3: "اكتشف التوازن المثالي بين الأناقة التقليدية والقطع العصرية.",
        viewCollection: "عرض المجموعة",
      },
      home: {
        kids: "الأطفال",
        women: "النساء",
        men: "الرجال",
        newCollection: "مجموعة جديدة",
        bestSellers: "الأكثر مبيعًا",
        highestDiscount: "أعلى الخصومات",
        loadingNewCollection: "جارٍ تحميل المجموعة الجديدة...",
        errorNewCollection: "خطأ في جلب المجموعة الجديدة.",
        loadingBestSellers: "جارٍ تحميل الأكثر مبيعًا...",
        errorBestSellers: "خطأ في جلب الأكثر مبيعًا.",
        loadingHighestDiscount: "جارٍ تحميل أعلى الخصومات...",
        errorHighestDiscount: "خطأ في جلب أعلى الخصومات.",
        viewCollection: "عرض المجموعة",
        viewBestSellers: "عرض الأكثر مبيعًا",
        viewDiscounts: "عرض الخصومات",
      },
      footer: {
        brandName: "رويال كي",
        copyright: "© 2024 رويال كي. جميع الحقوق محفوظة",
        collection: "المجموعة",
        brands: "العلامات التجارية",
        aboutUs: "من نحن",
        contactUs: "اتصل بنا",
        phone: "الهاتف",
        email: "البريد الإلكتروني",
        website: "الموقع الإلكتروني",
        visitUs: "زورونا على",
      },
    }
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: localStorage.getItem("lng") || "en",
    supportedLngs: ["en", "ar"],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18next;
