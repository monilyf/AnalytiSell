import en from '../assets/languages/en.json';
import gu from '../assets/languages/gu.json';

export const SERVER_URL = 'http://localhost:1337/';
export const BASE_URL = SERVER_URL + 'api';

export const LANGUAGE_CONFIGRATION = {
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: en,
        gu: gu
    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }
};
