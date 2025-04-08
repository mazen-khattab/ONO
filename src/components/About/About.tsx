import React from "react";
import { Brain, Heart, Users, Sparkles } from "lucide-react";
import "./About.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar";

const About = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-header">
            <h2 className="about-title">
              About <span>ONO</span>
            </h2>
            <p className="about-subtitle">Inspiring Young Minds Through Play</p>
          </div>

          <div className="mission-grid">
            <div className="mission-text">
              <h3>Our Mission</h3>
              <p>
                At ONO, we believe that every child deserves the opportunity to
                develop their full potential. Our carefully curated collection
                of puzzles and intelligent toys is designed to nurture young
                minds while making learning an exciting adventure. We're not
                just selling toys; we're investing in the future by providing
                tools that enhance cognitive development through play.
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
              <h4 className="feature-title">Cognitive Development</h4>
              <p className="feature-description">
                Enhances problem-solving skills and logical thinking
              </p>
            </div>

            <div className="feature-card">
              <Heart className="feature-icon" />
              <h4 className="feature-title">Emotional Growth</h4>
              <p className="feature-description">
                Builds confidence and patience through achievement
              </p>
            </div>

            <div className="feature-card">
              <Users className="feature-icon" />
              <h4 className="feature-title">Social Skills</h4>
              <p className="feature-description">
                Encourages collaboration and sharing experiences
              </p>
            </div>

            <div className="feature-card">
              <Sparkles className="feature-icon" />
              <h4 className="feature-title">Creativity</h4>
              <p className="feature-description">
                Stimulates imagination and innovative thinking
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
