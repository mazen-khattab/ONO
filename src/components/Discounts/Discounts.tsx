import React from "react";
import { Timer, Gift } from "lucide-react";
import "./Discounts.css";
import { useTranslation } from "react-i18next";


const Discounts = () => {
  const { i18n, t } = useTranslation("Home");

  return (
    <section className="discounts-section">
      <div className="discounts-container">
        <div className="discounts-header">
          <h2 className="discounts-title">{t("offers.specialOffers")}</h2>
          <p className="discounts-subtitle">
            {t("offers.limitedTimeDeals")}
          </p>
        </div>

        <div className="offers-grid">
          <div className="offer-card">
            <div className="offer-icon">
              <Timer />
            </div>
            <div className="offer-content">
              <h3>{t("offers.flashSale")}</h3>
              <p>{t("offers.30%")}</p>
              <a href="/AllProducts" className="offer-button">
                {t("offers.shopNow")}
              </a>
            </div>
          </div>

          <div className="offer-card">
            <div className="offer-icon">
              <Gift />
            </div>
            <div className="offer-content">
              <h3>{t("offers.bundleDeal")}</h3>
              <p>{t("offers.get free")}</p>
              <a href="/AllProducts" className="offer-button">{t("offers.learnMore")}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discounts;

// تخفيض يصل الي 30% 
//