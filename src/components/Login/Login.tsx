import React, { useState } from "react";
import "./Loign.css";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../Services/api.js";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { i18n, t } = useTranslation("Login");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setError(""); 

    try {
      const response = await api.post("/Auth/Login", {
        email: formData.email,
        password: formData.password,
      });

      window.location.href = "/";
    } catch (error) {
      setError("invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          {error && (
            <p className="error-message" style={{ color: "var(--main-color)" }}>
              {error}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <div className="login-input-group">
              <Mail className="login-input-icon" size={18} />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="login-form-group">
            <div className="login-input-group">
              <Lock className="login-input-icon" size={18} />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            {loading ? (
              <div className="spinner" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <p className="login-redirect">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
