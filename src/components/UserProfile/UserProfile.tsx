import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Building,
  Loader as Road,
  Lock,
  Save,
  Edit3,
} from "lucide-react";
import "./UserProfile.css";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import { useAuth } from "../../Services/authContext";
import { useTranslation } from "react-i18next";
import api from "../../Services/api.js";

const UserProfile = () => {
  const { getUserProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      governorate: "",
      city: "",
      fullAddress: "",
    },
  });
  const [infoErrorMessage, setInfoErrorMessage] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { i18n, t } = useTranslation("User_profile");

  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setFormData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const userInfo = {
      fname: formData.firstName,
      lname: formData.lastName,
      phoneNumber: formData.phone,
      email: formData.email,
      Address: [formData.address],
    };

    try {
      const response = await api.post("/User/updateUserProfile", userInfo);
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setInfoErrorMessage(error.response.data)
    }

    setTimeout(() => {
      setInfoErrorMessage("")
    }, 4000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrorMessage("Passwords do not match");
      return;
    }

    const passwordInfo = {
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
      comfirmedPassword: passwordData.confirmPassword,
    };

    try {
      const response = await api.post("/User/ChangePassword", passwordInfo);

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setSuccessMessage(response.data);
      setPasswordErrorMessage("");
    } catch (error) {
      setPasswordErrorMessage(error.response.data);
      console.error(error);
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={48} />
            </div>
            <div className="profile-title">
              <h1>{t("user_profile")}</h1>
              <p>{t("manage_personal_info")}</p>
            </div>
            <div style={savedLang.code === 'ar' ? {marginRight: 'auto'} : {marginLeft: 'auto'}}>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  <Edit3 size={18} />
                  {t("edit_profile")}
                </button>
              ) : (
                <div className="edit-actions">
                  <button onClick={handleCancel} className="cancel-btn">
                    {t("cancel")}
                  </button>
                  <button onClick={handleSave} className="save-btn">
                    <Save size={18} />
                    {t("save_changes")}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h2 className="section-title">{t("personal_information")}</h2>
              <p className="error-message" style={{ marginBottom: "16px" }}>
                {infoErrorMessage}
              </p>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <User size={18} />
                    {t("first_name")}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="form-input"
                      placeholder={t("enter_first_name")}
                    />
                  ) : (
                    <div className="form-display">{formData.firstName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <User size={18} />
                    {t("last_name")}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="form-input"
                      placeholder={t("enter_last_name")}
                    />
                  ) : (
                    <div className="form-display">{formData.lastName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Mail size={18} />
                    {t("email_address")}
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="form-input"
                      placeholder={t("enter_email")}
                    />
                  ) : (
                    <div className="form-display">{formData.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Phone size={18} />
                    {t("phone_number")}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="form-input"
                      placeholder={t("enter_phone")}
                    />
                  ) : (
                    <div className="form-display">{formData.phone}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2 className="section-title">{t("address_information")}</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <Globe size={18} />
                    {t("governorate")}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address?.governorate || ""}
                      onChange={(e) =>
                        handleAddressChange("governorate", e.target.value)
                      }
                      className="form-input"
                      placeholder={t("enter_governorate")}
                    />
                  ) : (
                    <div className="form-display">
                      {formData.address?.governorate || ""}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Building size={18} />
                    {t("city")}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address?.city || ""}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                      className="form-input"
                      placeholder={t("enter_city")}
                    />
                  ) : (
                    <div className="form-display">{formData.address?.city || ""}</div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    <Road size={18} />
                    {t("full_address")}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address?.fullAddress || ""}
                      onChange={(e) =>
                        handleAddressChange("fullAddress", e.target.value)
                      }
                      className="form-input"
                      placeholder={t("enter_full_address")}
                    />
                  ) : (
                    <div className="form-display">
                      {formData.address?.fullAddress || ""}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2 className="section-title">{t("change_password")}</h2>
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <p className="error-message">{passwordErrorMessage}</p>
                <p className="success-message">{successMessage}</p>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">
                      <Lock size={18} />
                      {t("current_password")}
                    </label>
                    <input
                      type="password"
                      value={passwordData.oldPassword}
                      onChange={(e) =>
                        handlePasswordChange("oldPassword", e.target.value)
                      }
                      className="form-input"
                      placeholder={t("enter_current_password")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Lock size={18} />
                      {t("new_password")}
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        handlePasswordChange("newPassword", e.target.value)
                      }
                      className="form-input"
                      placeholder={t("enter_new_password")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Lock size={18} />
                      {t("confirm_new_password")}
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        handlePasswordChange("confirmPassword", e.target.value)
                      }
                      className="form-input"
                      placeholder={t("confirm_password_placeholder")}
                      required
                    />
                  </div>
                </div>

                <div className="password-actions">
                  <button type="submit" className="change-password-btn">
                    <Lock size={18} />
                    {t("change_password_button")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


      <Footer></Footer>
    </div>
  );
};

export default UserProfile;
