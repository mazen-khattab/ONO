import { useState } from "react";
import "./Loign.css";

function LoginPage(props) {
  console.log(props.move)
  const [signIn, setSignIn] = useState(props.move);
  const [singUp, setSignUp] = useState(props.move);
  console.log(singUp)

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
          <h1>Hello, Friend</h1>
          <p>Enter your personal details and start journey with us</p>
          <button id="sign-in" onClick={handleSingIn}>
            SIGN IN
          </button>
        </div>

        <div
          className={
            singUp
              ? "WH-container hello-container"
              : "WH-container hello-container hello-container-disappear"
          }
        >
          <h1>Welcome Back</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button id="sign-up" onClick={handleSingUp}>
            SIGN UP
          </button>
        </div>

        <div
          className={
            signIn
              ? "form sign-up-form sign-up-form-disappear"
              : "form sign-up-form"
          }
        >
          <h2>Create Account</h2>
          <form id="signUp-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">SIGN UP</button>
          </form>
        </div>

        <div
          className={
            singUp
              ? "form sign-in-form"
              : "form sign-in-form sign-in-form-disappear"
          }
        >
          <h2>Sign in</h2>
          <form id="signIn-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit">SIGN IN</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
