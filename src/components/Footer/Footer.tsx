import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import "./Footer.css";
import logo from "../../images/Logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <img src={logo} alt="" className="footer-logo" />
          <p>Challenging minds with innovative puzzles and intelligent toys.</p>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} ONO Puzzles. All rights reserved.
          </p>

          <div className="social-links">
            <a href="/" className="fa-brands fa-facebook social-icon"></a>
            <a href="/" className="fa-brands fa-instagram social-icon"></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
