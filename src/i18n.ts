import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enHome from "./Local/EN/Home.json";
import enAbout from "./Local/EN/About.json";
import enProduct from "./Local/EN/AllProducts.json";
import enWhyUs from "./Local/EN/WhyUs.json";
import enLogin from "./Local/EN/Login.json";
import enCart from "./Local/EN/Cart.json"

import arHome from "./Local/AR/Home.json";
import arAbout from "./Local/AR/About.json";
import arProduct from "./Local/AR/AllProducts.json";
import arWhyUs from "./Local/AR/WhyUs.json";
import arLogin from "./Local/AR/Login.json";
import arCart from "./Local/AR/Cart.json"

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
        Cart: arCart
      },
      en: {
        Home: enHome,
        About: enAbout,
        AllProducts: enProduct,
        WhyUs: enWhyUs,
        Login: enLogin,
        Cart: enCart
      },
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"], 
    },
    fallbackLng: "ar",
    ns: ["home", "about", "allProducts", "whyUs", "Login", "cart"],
    defaultNS: "home",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
