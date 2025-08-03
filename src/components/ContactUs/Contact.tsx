import React, { useState } from "react";
import "./Contact.css";
import { useTranslation } from "react-i18next";
import api from "../../Services/api.js"
import { Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const { i18n, t } = useTranslation("Home");
  const savedLang = JSON.parse(localStorage.getItem("lang"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    const contactUsInfo = {
      name: formData.name,
      phoneNumber: formData.phone
    }

    try {
      const response = await api.post("/User/ContactUs", contactUsInfo);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setFormData({ name: "", phone: "", message: "" });
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
              <p>ONOStore@gmail.com</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fa-solid fa-phone-flip info-icon"></i>
            <div className="info-text">
              <h4>{t("contact.phone")}</h4>
              <p>01023839637</p>
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
            <label htmlFor="phone" className="form-label">
              {t("contact.phone")}
            </label>
            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="form-input"
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
