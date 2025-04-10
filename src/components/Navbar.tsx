import { useState } from "react";
import { ShoppingCart, Menu, Globe } from "lucide-react";
import "./Navbar.css";
import logo from "../images/Logo.jpg";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [menuActive, setMenuActive] = useState(false);
  const { i18n, t } = useTranslation();
  const languages = [
    { code: "EN", name: "English" },
    { code: "AR", name: "Arabic" },
  ];

  const changeAllLanguage = (lng: string) => {
    console.log("done")
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng.toLowerCase() === "ar" ? "rtl" : "ltr";
  };

  const dropdownLang = () => {
    setIsActive(!isActive);
  };

  const CloseMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <a href="/" className="logo">
            <img src={logo} alt="Logo" />
          </a>

          <div className="nav-links">
            <a href="/" className="link">
              Home
            </a>
            <a href="AllProducts" className="link">
              Products
            </a>
            <a href="about" className="link">
              About
            </a>
            <a href="./WhyUs" className="link">
              Why Us
            </a>
          </div>

          <div className={menuActive ? "nav-links-menu" : "nav-links-menu disappear"}>
            <i className="fa-solid fa-xmark close" onClick={CloseMenu}></i>
            <div className="nav-links-menu-container">
              <div className="user">
                <i className="fa-solid fa-circle-user"></i>
                <p>User_name</p>
              </div>
              <a href="/" className="link">
                Home
              </a>
              <a href="AllProducts" className="link">
                Products
              </a>
              <a href="about" className="link">
                About
              </a>
              <a href="./WhyUs" className="link">
                Why Us
              </a>
            </div>
          </div>

          <div className="nav-actions">
            <div className="icons">
              <div className="language-selector" onClick={dropdownLang}>
                <button className="language-button">
                  <Globe className="h-5 w-5" />
                  <span>{language}</span>
                </button>
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
                      onClick={() => {setLanguage(lang.code); changeAllLanguage(lang.code)}}
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
                Register
              </a>
              <a href="login" className="login-btn">
                LogIn
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
