import React from "react";
import { Brain, Heart, Users, Sparkles } from "lucide-react";
import "./About.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar";
import { useTranslation } from "react-i18next";

const About = () => {
  const { i18n, t } = useTranslation("About");

  return (
    <div>
      <Navbar activePage={2}></Navbar>

      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-header">
            <h2 className="about-title">
              {t("about")} <span>ONO</span>
            </h2>
            <p className="about-subtitle">{t("inspiring")}</p>
          </div>

          <div className="mission-grid">
            <div className="mission-text">
              <h3>{t("mission")}</h3>
              <p>
                {t("statement")}
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80"
                alt="Children playing with puzzles"
                className="mission-image"
              />
            </div>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <Brain className="feature-icon" />
              <h4 className="feature-title">{t("cognitive")}</h4>
              <p className="feature-description">
              {t("problem_solving")}
              </p>
            </div>

            <div className="feature-card">
              <Heart className="feature-icon" />
              <h4 className="feature-title">{t("emotional_growth")}</h4>
              <p className="feature-description">
              {t("confidence")}
              </p>
            </div>

            <div className="feature-card">
              <Users className="feature-icon" />
              <h4 className="feature-title">{t("social_skills")}</h4>
              <p className="feature-description">
              {t("collaboration")}
              </p>
            </div>

            <div className="feature-card">
              <Sparkles className="feature-icon" />
              <h4 className="feature-title">{t("creativity")}</h4>
              <p className="feature-description">
              {t("creativity_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default About;
