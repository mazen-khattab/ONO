import React from 'react';
import { Timer, Gift } from 'lucide-react';
import './Discounts.css';

const Discounts = () => {
  return (
    <section className="discounts-section">
      <div className="discounts-container">
        <div className="discounts-header">
          <h2 className="discounts-title">Special Offers</h2>
          <p className="discounts-subtitle">Limited time deals on selected items</p>
        </div>
        
        <div className="offers-grid">
          <div className="offer-card">
            <div className="offer-icon">
              <Timer />
            </div>
            <div className="offer-content">
              <h3>Flash Sale</h3>
              <p>Get 30% off on all puzzle boxes</p>
              <a href='/AllProducts' className="offer-button">Shop Now</a>
            </div>
          </div>
          
          <div className="offer-card">
            <div className="offer-icon">
              <Gift />
            </div>
            <div className="offer-content">
              <h3>Bundle Deal</h3>
              <p>Buy 2 Get 1 Free on selected items</p>
              <button className="offer-button">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discounts;