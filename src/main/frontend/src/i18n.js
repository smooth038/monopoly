import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		backend: {
			// translation file path
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
		fallbackLng: 'en',
		lng: 'en',
		// disabled in production
		debug: false,
		ns: ['common', 'spaces', 'properties'],
		interpolation: {
			escapeValue: false,
			formatSeparator: ',',
		},
	});

export default i18n;
