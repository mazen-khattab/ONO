import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "./Contact.css";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { i18n, t } = useTranslation("Home");
  const savedLang = JSON.parse(localStorage.getItem("lang"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className={savedLang?.code === `ar` ? "contact contact-ar" : "contact contact-en"}>
      <div className="contact-content">
        <div className={savedLang?.code === `ar` ? "contact-info contact-info-ar" : "contact-info contact-info-en"}>
          <h3>{t("contact.getInTouch")}</h3>
          <div className="info-item">
            <i className="fa-solid fa-envelope info-icon"></i>
            <div className="info-text">
              <h4>{t("contact.email")}</h4>
              <p>------------</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fa-solid fa-phone-flip info-icon"></i>
            <div className="info-text">
              <h4>{t("contact.phone")}</h4>
              <p>------------</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fa-solid fa-location-dot info-icon"></i>
            <div className="info-text">
              <h4>{t("contact.address")}</h4>
              <p>------------</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-header">
            <h2 className="contact-title">{t("contact.contactUs")}</h2>
            <p className="contact-subtitle">{t("contact.weLoveToHear")}</p>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              {t("contact.name")}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t("contact.email")}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              {t("contact.message")}
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="form-textarea"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            <span>{t("contact.sendMessage")}</span>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
