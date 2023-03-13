import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import En from "./tools/locales/en/common.json";
import Th from "./tools/locales/th/common.json";

const resources = {
  en: { translation: En },
  th: { translation: Th },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export default i18next;
