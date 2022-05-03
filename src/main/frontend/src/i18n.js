import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  backend: {
    // translation file path
    loadPath: "/locales/{{lng}}/{{ns}}.json"
  },
  fallbackLng: "fr",
  lng: "fr",
  // disabled in production
  debug: false,
  ns: ["common", "squares"],
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
})

export default i18n;