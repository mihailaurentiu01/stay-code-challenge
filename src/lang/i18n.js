import { createI18n } from 'vue-i18n';

// Langs
import en from './en';
import es from './es';

const messages = {
  en,
  es,
};

const i18n = createI18n({
  locale: 'es',
  legacy: false,
  fallbackLocale: 'es',
  messages,
});

export default i18n;
