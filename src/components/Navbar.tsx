import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../images/Logo.jpg";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const { i18n, t } = useTranslation("Home");

  const savedLang = JSON.parse(localStorage.getItem("lang"));

  const languages = [
    { code: "en", name: t("header.English"), id: 1 },
    { code: "ar", name: t("header.Arabic"), id: 2 },
  ];

  useEffect(() => {
    if (savedLang) {
      changeAllLanguage(savedLang.code);
    }
  }, []);

  const changeAllLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng.toLowerCase() === "ar" ? "rtl" : "ltr";
  };

  const dropdownLang = () => {
    setIsActive(!isActive);
  };

  const CloseMenu = () => {
    setMenuActive(!menuActive);
  };

  const changeLanguage = (lang) => {
    localStorage.setItem("lang", JSON.stringify(lang));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <a href="/" className="logo">
            <img src={logo} alt="Logo" />
          </a>

          <div className="nav-links">
            <a href="/" className={savedLang?.code === `ar` ? "link linkAr" : "link"}>
              {t("header.home")}
            </a>
            <a href="AllProducts" className={savedLang?.code === `ar` ? "link linkAr" : "link"}>
              {t("header.products")}
            </a>
            <a href="about" className={savedLang?.code === `ar` ? "link linkAr" : "link"}>
              {t("header.about")}
            </a>
            <a href="./WhyUs" className={savedLang?.code === `ar` ? "link linkAr" : "link"}>
              {t("header.why us")}
            </a>
          </div>

          <div
            className={`${menuActive ? "nav-links-menu" : "nav-links-menu disappear"} ${savedLang?.code === `ar` ? "nav-links-menu-ar" : "nav-links-menu-en"}`}
          >
            <i className="fa-solid fa-xmark close" onClick={CloseMenu}></i>
            <div className="nav-links-menu-container">
              <div className="user">
                <i className="fa-solid fa-circle-user"></i>
                <p>User_name</p>
              </div>
              <a href="/" className="link">
                {t("header.home")}
              </a>
              <a href="AllProducts" className="link">
                {t("header.products")}
              </a>
              <a href="about" className="link">
                {t("header.about")}
              </a>
              <a href="./WhyUs" className="link">
                {t("header.why us")}
              </a>
            </div>
          </div>

          <div className="nav-actions">
            <div className="icons">
              <div className="language-selector" onClick={dropdownLang}>
                <i className="fa-solid fa-language language-button"></i>
                <div
                  className={
                    isActive
                      ? "language-dropdown"
                      : "language-dropdown disappear"
                  }
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {{
                        changeAllLanguage(lang.code);
                        changeLanguage(lang);
                      }}}
                      className="language-option"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              <i className="fa-solid fa-cart-shopping icon cart"></i>
            </div>

            <div className="registration">
              <a href="register" className="register-btn">
                {t("header.register")}
              </a>
              <a href="login" className="login-btn">
                {t("header.login")}
              </a>
            </div>

            <i className="fa-solid fa-bars icon menu" onClick={CloseMenu}></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
