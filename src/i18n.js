import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "features": "Features",
      "pricing": "Pricing",
      "login": "Login",
      "register": "Register",
      "dashboard": "Dashboard",
      "products": "Products",
      "analytics": "Analytics",
      "settings": "Settings",
      "logout": "Logout",

      // Landing Page
      "hero.title": "Automate Your Product Pricing for Maximum Profits",
      "hero.subtitle": "Connect your Shopify, WooCommerce, or Magento store and let AI optimize your pricing strategy automatically.",
      "hero.cta": "Start Free Trial",
      "hero.secondary_cta": "Watch Demo",

      // Features
      "features.title": "Powerful Features for Smart Pricing",
      "features.auto_pricing": "Automatic Pricing",
      "features.auto_pricing_desc": "AI-powered pricing optimization based on market analysis",
      "features.multi_platform": "Multi-Platform Support",
      "features.multi_platform_desc": "Works with Shopify, WooCommerce, Magento and more",
      "features.real_time": "Real-time Analytics",
      "features.real_time_desc": "Track performance and profits in real-time",

      // Auth
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.confirm_password": "Confirm Password",
      "auth.login_title": "Welcome Back",
      "auth.register_title": "Create Your Account",
      "auth.forgot_password": "Forgot Password?",
      "auth.no_account": "Don't have an account?",
      "auth.have_account": "Already have an account?",

      // Dashboard
      "dashboard.welcome": "Welcome to Autoprofitor",
      "dashboard.total_products": "Total Products",
      "dashboard.optimized_products": "Optimized Products",
      "dashboard.revenue_increase": "Revenue Increase",
      "dashboard.stores_connected": "Stores Connected",

      // Common
      "loading": "Loading...",
      "save": "Save",
      "cancel": "Cancel",
      "submit": "Submit",
      "error": "Error",
      "success": "Success",
      "try_again": "Try Again",
    }
  },
  ar: {
    translation: {
      // Navigation
      "home": "الرئيسية",
      "features": "المميزات",
      "pricing": "الأسعار",
      "login": "تسجيل الدخول",
      "register": "إنشاء حساب",
      "dashboard": "لوحة التحكم",
      "products": "المنتجات",
      "analytics": "التحليلات",
      "settings": "الإعدادات",
      "logout": "تسجيل الخروج",

      // Landing Page
      "hero.title": "أتمتة تسعير منتجاتك لتحقيق أقصى الأرباح",
      "hero.subtitle": "اربط متجرك على Shopify أو WooCommerce أو Magento ودع الذكاء الاصطناعي يحسن استراتيجية التسعير تلقائياً.",
      "hero.cta": "ابدأ التجربة المجانية",
      "hero.secondary_cta": "شاهد العرض التوضيحي",

      // Features
      "features.title": "مميزات قوية للتسعير الذكي",
      "features.auto_pricing": "التسعير التلقائي",
      "features.auto_pricing_desc": "تحسين الأسعار بالذكاء الاصطناعي بناءً على تحليل السوق",
      "features.multi_platform": "دعم متعدد المنصات",
      "features.multi_platform_desc": "يعمل مع Shopify وWooCommerce وMagento والمزيد",
      "features.real_time": "تحليلات فورية",
      "features.real_time_desc": "تتبع الأداء والأرباح في الوقت الفعلي",

      // Auth
      "auth.email": "البريد الإلكتروني",
      "auth.password": "كلمة المرور",
      "auth.confirm_password": "تأكيد كلمة المرور",
      "auth.login_title": "مرحباً بعودتك",
      "auth.register_title": "أنشئ حسابك",
      "auth.forgot_password": "نسيت كلمة المرور؟",
      "auth.no_account": "ليس لديك حساب؟",
      "auth.have_account": "لديك حساب بالفعل؟",

      // Dashboard
      "dashboard.welcome": "مرحباً بك في Autoprofitor",
      "dashboard.total_products": "إجمالي المنتجات",
      "dashboard.optimized_products": "المنتجات المحسنة",
      "dashboard.revenue_increase": "زيادة الإيرادات",
      "dashboard.stores_connected": "المتاجر المتصلة",

      // Common
      "loading": "جاري التحميل...",
      "save": "حفظ",
      "cancel": "إلغاء",
      "submit": "إرسال",
      "error": "خطأ",
      "success": "نجح",
      "try_again": "حاول مرة أخرى",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;