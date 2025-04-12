import Navbar from "../Navbar";
import "./WhyUs.css";
import {
  Brain,
  Heart,
  Users,
  Sparkles,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Clock,
  Lightbulb,
  BookOpen,
  Target,
  Puzzle,
  Rocket,
  Star,
  Award,
  Gift,
  MessageCircle,
} from "lucide-react";
import "./WhyUs.css";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

function Why() {
  const { i18n, t } = useTranslation("WhyUs");

  return (
    <div>
      <Navbar></Navbar>

      <div className="why-us-page">
        <section className="why-section">
          <div className="section-content" style={{ padding: 0 }}>
            <h2 className="section-title main-content">
              {t("why_buy")} <span>{t("games")}</span>
            </h2>
            <p className="section-subtitle ">
              {t("why_buy_desc1")}{" "}
              <span>
              {t("why_buy_desc2")}
              </span>
              {t("why_buy_desc3")}
            </p>
          </div>
        </section>

        <section className="why-section alternate">
          <div className="section-content">
            <h2 className="section-title">
            {t("how_puzzles_make_smarter")}
            </h2>
            <p className="section-subtitle">
            {t("cognitive_impact")}
            </p>

            <div className="cards-grid">
              <div className="feature-card">
                <Lightbulb className="card-icon" />
                <h3>{t("problem_solving")}</h3>
                <p>
                {t("problem_solving_desc")}
                </p>
              </div>
              <div className="feature-card">
                <Brain className="card-icon" />
                <h3>{t("strengthens_memory")}</h3>
                <p>
                {t("memory_focus_desc")}
                </p>
              </div>
              <div className="feature-card">
                <Users className="card-icon" />
                <h3>{t("develops_social_skills")}</h3>
                <p>
                {t("social_skills_desc")}
                </p>
              </div>
              <div className="feature-card">
                <Sparkles className="card-icon" />
                <h3>{t("encourages_creativity")}</h3>
                <p>
                {t("creativity_desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="why-section">
          <div className="section-content">
            <h2 className="section-title">{t("whats_special")}</h2>
            <p className="section-subtitle">
            {t("whats_special_desc")}
            </p>

            <div className="cards-grid">
              <div className="feature-card">
                <ShieldCheck className="card-icon" />
                <h3>{t("high_quality")}</h3>
                <p>
                {t("high_quality_desc")}
                </p>
              </div>
              <div className="feature-card">
                <Truck className="card-icon" />
                <h3>{t("fast_delivery")}</h3>
                <p>
                {t("fast_delivery_desc")}
                </p>
              </div>
              <div className="feature-card">
                <MessageCircle className="card-icon" />
                <h3>{t("exceptional_support")}</h3>
                <p>
                {t("exceptional_support_desc")}
                </p>
              </div>
              <div className="feature-card">
                <Users className="card-icon" />
              <h3>{t("suitable_for_all_ages")}</h3>
                <p>{t("suitable_for_all_ages_desc")}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Why;
