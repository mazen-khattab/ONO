import { useState } from "react";
import "./Loign.css";
import { useTranslation } from "react-i18next";

function LoginPage(props) {
  console.log(props.move)
  const [signIn, setSignIn] = useState(props.move);
  const [singUp, setSignUp] = useState(props.move);
  const { i18n, t } = useTranslation("Login");

  const handleSingIn = () => {
    setSignIn(!signIn);
    setSignUp(!singUp);
  };

  const handleSingUp = () => {
    setSignUp(!singUp);
    setSignIn(!signIn);
  };

  return (
    <div className="body">
      <h1 className="login-page">ONO</h1>
      <div className="login-container">
        <div
          className={signIn ? "slider move" : singUp ? "slider move" : "slider"}
        />

        <div
          className={
            signIn
              ? "WH-container welcome-container welcome-container-disappear"
              : "WH-container welcome-container"
          }
        >
          <h1>{t("hello")}</h1>
          <p>{t("start_journey")}</p>
          <button id="sign-in" onClick={handleSingIn} style={{ fontFamily: "cairo, serif" }}>
          {t("sign_in")}
          </button>
        </div>

        <div
          className={
            singUp
              ? "WH-container hello-container"
              : "WH-container hello-container hello-container-disappear"
          }
        >
          <h1>{t("welcome_back")}</h1>
          <p>{t("keep_connected")}</p>
          <button id="sign-up" onClick={handleSingUp} style={{ fontFamily: "cairo, serif" }}>
          {t("sign_up")}
          </button>
        </div>

        <div
          className={
            signIn
              ? "form sign-up-form sign-up-form-disappear"
              : "form sign-up-form"
          }
        >
          <h2>{t("create_account")}</h2>
          <form id="signUp-form">
            <div className="form-group">
              <label htmlFor="name">{t("name")}</label>
              <input type="text" id="name" name="name" required/>
            </div>
            <div className="form-group">
              <label htmlFor="email">{t("email")}</label>
              <input type="text" id="email" name="email" required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">{t("password")}</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">{t("sign_up")}</button>
          </form>
        </div>

        <div
          className={
            singUp
              ? "form sign-in-form"
              : "form sign-in-form sign-in-form-disappear"
          }
        >
          <h2>{t("sign_in")}</h2>
          <form id="signIn-form">
            <div className="form-group">
              <label htmlFor="email">{t("email")}</label>
              <input type="text" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">{t("password")}</label>
              <input
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit">{t("sign_in")}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
