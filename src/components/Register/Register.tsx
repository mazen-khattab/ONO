import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Phone } from "lucide-react";
import "./Register.css";
import { useTranslation } from "react-i18next";
import api from "../../Services/api.js";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const criteria = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const response = await api.post("/Auth/Register", criteria);
      console.log(response.data);
      window.location.href = "/";
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Create Account</h2>
          <p style={{ color: "red" }}>{error}</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <div className="register-input-group">
              <User className="register-input-icon" size={18} />
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="First name"
                required
              />
            </div>
            <div className="register-input-group">
              <User className="register-input-icon" size={18} />
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div className="register-form-group">
            <div className="register-input-group">
              <Phone className="register-input-icon" size={18} />
              <input
                type="number"
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Phone number"
                required
              />
            </div>
          </div>

          <div className="register-form-group">
            <div className="register-input-group">
              <Mail className="register-input-icon" size={18} />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="register-form-group">
            <div className="register-input-group">
              <Lock className="register-input-icon" size={18} />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div className="register-form-group">
            <div className="register-input-group">
              <Lock className="register-input-icon" size={18} />
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <div className="register-options">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                required
              />
              <span>I agree to the Terms and Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="register-button">
            {loading ? (
              <div className="spinner" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <p className="register-redirect">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
