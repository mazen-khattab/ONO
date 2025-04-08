import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-content">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <div className="info-item">
            <i className="fa-solid fa-envelope info-icon"></i>
            <div className="info-text">
              <h4>Email</h4>
              <p>info@onopuzzles.com</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fa-solid fa-phone-flip info-icon"></i>
            <div className="info-text">
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fa-solid fa-location-dot info-icon"></i>
            <div className="info-text">
              <h4>Address</h4>
              <p>123 Puzzle Street, NY 10001</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-header">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">We'd love to hear from you</p>
      </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="form-textarea"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            <span>Send Message</span>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;