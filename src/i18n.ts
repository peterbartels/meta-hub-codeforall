import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import English from "./locales/en/translation.json";
import Dutch from "./locales/nl/translation.json";
import { initReactI18next } from "react-i18next";

i18n
.use(XHR)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    debug: true,
    lng: "nl",
    fallbackLng: "en",
    saveMissing: true,
    interpolation: {
        escapeValue: false // react already safes from xss
    },
    // we init with resources
    resources: {
        en: {
            translations: English
        },
        nl: {
            translations: Dutch
        }
    },
    react: {
        wait: true,
        useSuspense: false
    }
});

export default i18n;