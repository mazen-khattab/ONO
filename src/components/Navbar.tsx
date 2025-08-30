import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../images/Logo.jpg";
import { useTranslation } from "react-i18next";
import { useCart } from "../Services/CartContext.tsx";
import { useAuth } from "../Services/authContext.tsx";
import api from "../Services/api.js";

interface NavbarProps {
  activePage: number;
}

const Navbar = ({ activePage }: NavbarProps) => {
  const [isActive, setIsActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const { i18n, t } = useTranslation("Home");
  const { cartItems, cartCount } = useCart();

  const { user, setUser, loading } = useAuth();

  const totalQuantity = cartCount;

  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;

  const languages = [
    { code: "en", name: t("header.English"), id: 1 },
    { code: "ar", name: t("header.Arabic"), id: 2 },
  ];

  const navLinks = [
    { name: t("header.home"), link: "/" },
    { name: t("header.products"), link: "/AllProducts" },
    { name: t("header.about"), link: "/about" },
    { name: t("header.why us"), link: "/WhyUs" },
  ];

  useEffect(() => {
    if (savedLang) {
      changeAllLanguage(savedLang.code);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuActive(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const Logout = async () => {
    try {
      const response = await api.post("/Auth/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const changeAllLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng.toLowerCase() === "ar" ? "rtl" : "ltr";
  };

  const dropdownLang = () => {
    setIsActive(!isActive);
    setUserMenuActive(false);
  };

  const CloseMenu = () => {
    setMenuActive(!menuActive);
  };

  const CloseUserMenu = () => {
    setUserMenuActive(!userMenuActive);
    setIsActive(false);
  };

  const changeLanguage = (lang) => {
    localStorage.setItem("lang", JSON.stringify(lang));
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <a href="/" className="logo">
            <img src={logo} alt="Logo" />
          </a>

          <div className="nav-links">
            {navLinks.map((link, index) => (
              <a
                href={link.link}
                key={link.name}
                className={`${
                  savedLang?.code === `ar` ? "link linkAr" : "link"
                } ${index === activePage ? "active" : ""}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div
            className={`${
              menuActive && window.innerWidth <= 768
                ? "nav-links-menu"
                : "nav-links-menu disappear"
            } ${
              savedLang?.code === `ar`
                ? "nav-links-menu-ar"
                : "nav-links-menu-en"
            }`}
          >
            <i className="fa-solid fa-xmark close" onClick={CloseMenu}></i>
            <div className="nav-links-menu-container">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.link}
                  className={activePage === index ? "link active" : "link"}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="nav-actions">
            <div className="icons">
              <div className="language-selector" onClick={dropdownLang}>
                <i className="fa-solid fa-globe language-button"></i>
                <div
                  className={
                    isActive
                      ? "language-dropdown"
                      : "language-dropdown disappear"
                  }
                  style={savedLang?.code === "ar" ? { left: 0 } : { right: 0 }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        {
                          changeAllLanguage(lang.code);
                          changeLanguage(lang);
                        }
                      }}
                      className="language-option"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="/Cart"
                className="fa-solid fa-cart-shopping icon navbar-cart"
              >
                <span className="cart-count">{totalQuantity}</span>
              </a>
            </div>

            {user ? (
              <div className="user-info-container" onClick={CloseUserMenu}>
                <div className="user-info">{user.userName.slice(0, 2)}</div>
                <div
                  className="user-info-drop-down"
                  style={{
                    display: userMenuActive ? "flex" : "none",
                    ...(savedLang?.code === "ar" ? { left: 0 } : { right: 0 }),
                  }}
                >
                  <a href="/UserProfile">User Profile</a>
                  <a href="/OrderHistory">Order History</a>
                  <button className="logout-btn" onClick={Logout}>
                    {t("header.logout")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="registration">
                <a href="/register" className="register-btn">
                  {t("header.register")}
                </a>
                <a href="/login" className="login-btn">
                  {t("header.login")}
                </a>
              </div>
            )}

            <i className="fa-solid fa-bars icon menu" onClick={CloseMenu}></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
