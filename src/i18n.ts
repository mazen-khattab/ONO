import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enHome from "./Local/EN/Home.json";
import enAbout from "./Local/EN/About.json";
import enProduct from "./Local/EN/AllProducts.json";
import enWhyUs from "./Local/EN/WhyUs.json";
import enLogin from "./Local/EN/Login.json";

import arHome from "./Local/AR/Home.json";
import arAbout from "./Local/AR/About.json";
import arProduct from "./Local/AR/AllProducts.json";
import arWhyUs from "./Local/AR/WhyUs.json";
import arLogin from "./Local/AR/Login.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        Home: arHome,
        About: arAbout,
        AllProducts: arProduct,
        WhyUs: arWhyUs,
        Login: arLogin,
      },
      en: {
        Home: enHome,
        About: enAbout,
        AllProducts: enProduct,
        WhyUs: enWhyUs,
        Login: enLogin,
      },
    },
    fallbackLng: "ar",
    ns: ["home", "about", "allProducts", "whyUs", "Login"],
    defaultNS: "home",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
