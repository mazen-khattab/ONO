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
  MessageCircle 
} from "lucide-react";
import "./WhyUs.css";
import Footer from "../Footer/Footer";

function Why() {
  return (
    <div>
      <Navbar isHome={false}></Navbar>

      <div className="why-us-page">
        {/* Section 1: Why Choose Our Puzzle & Brain Games */}
        <section className="why-section">
          <div className="section-content" style={{ padding: 0 }} >
            <h2 className="section-title main-content">
              Why Buy Puzzle and <span>Intelligence Games ?</span>
            </h2>
            <p className="section-subtitle ">
              In a time where everything is becoming digital and virtual, it’s
              very important that our children have things that <span>develop their
              minds, make them think smartly, and enjoy at the same time</span>. That’s
              why we offer a unique collection of puzzles and intelligence games
              that help stimulate the brain, strengthen thinking skills, and
              enhance creativity in both children and even adults!
            </p>
          </div>
        </section>

        {/* Section 3: How Do Puzzle Games Make Kids Smarter? */}
        <section className="why-section alternate">
          <div className="section-content">
            <h2 className="section-title">
              How Do Puzzle Games Make Kids Smarter?
            </h2>
            <p className="section-subtitle">
              Understanding the impact on cognitive development
            </p>

            <div className="cards-grid">
              <div className="feature-card">
                <Lightbulb className="card-icon" />
                <h3>Problem Solving</h3>
                <p>
                When a child faces a puzzle, they start thinking logically to solve the problem
                </p>
              </div>
              <div className="feature-card">
                <Brain className="card-icon" />
                <h3>Strengthens Memory and Focus</h3>
                <p>Some puzzles require remembering details or certain steps, which helps in boosting memory</p>
              </div>
              <div className="feature-card">
                <Users className="card-icon" />
                <h3>Develops Social Skills</h3>
                <p>
                Some games require teamwork, teaching children how to interact and cooperate with others
                </p>
              </div>
              <div className="feature-card">
                <Sparkles  className="card-icon" />
                <h3>Encourages Creativity</h3>
                <p>Some puzzles require thinking outside the box and finding non-traditional solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why Buy from Us? */}
        <section className="why-section">
          <div className="section-content">
            <h2 className="section-title">What’s Special About Our Games?</h2>
            <p className="section-subtitle">
              Experience excellence in every purchase
            </p>

            <div className="cards-grid">
              <div className="feature-card">
                <ShieldCheck className="card-icon" />
                <h3>High Quality</h3>
                <p>
                  Durable and well-made games that are safe for children,
                  ensuring they last with you for a long time
                </p>
              </div>
              <div className="feature-card">
                <Truck className="card-icon" />
                <h3>Fast Delivery and Excellent Support</h3>
                <p>
                  Your order will reach you quickly, and if you face any issues,
                  we’re always here to help
                </p>
              </div>
              <div className="feature-card">
                <MessageCircle className="card-icon" />
                <h3>Exceptional Customer Support</h3>
                <p>
                We prioritize your satisfaction with fast responses, helpful assistance, and a smooth shopping experience
                </p>
              </div>
              <div className="feature-card">
                <Users className="card-icon" />
                <h3>Suitable for All Ages</h3>
                <p>We have games that both kids and adults will love</p>
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
