import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import ptTranslations from './locales/pt.json';

const resources = {
  en: {
    translation: enTranslations
  },
  pt: {
    translation: ptTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    // Prevent raw key display
    returnNull: false,
    returnEmptyString: false,
    
    detection: {
      order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      lookupCookie: 'lang',
      caches: ['localStorage', 'cookie']
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
