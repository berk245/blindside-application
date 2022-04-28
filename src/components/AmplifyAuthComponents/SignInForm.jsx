import React from "react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { Hub } from "@aws-amplify/core";
import "./AuthComponents.css";

export default function SignInForm({ onAuthEvent, setFormState }) {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const onChange = (e) => {
    setFormError("");
    const { id, value } = e.target;
    let obj = { ...formFields };
    obj[id] = value;
    setFormFields(obj);
  };

  const onSignIn = async (e) => {
    e.preventDefault();
    let formData = { ...formFields };
    try {
      let authenticatedUser = await Auth.signIn(formData);
      Hub.dispatch("UI Auth", {
        event: "AuthStateChange",
        data: authenticatedUser,
        message: "signedin",
      });
    } catch (err) {
      setFormError("Incorrect username or password");
    }
  };

  return (
    <div className="authentication-form-container">
      <form autoComplete="no" className="signup-form">
        <h3 style={{ margin: "2rem 0.5rem" }}>Sign in to your account </h3>

        <input
          autoComplete="off"
          className="auth-input"
          variant="outlined"
          placeholder="Username"
          id="username"
          onChange={(e) => {
            onChange(e);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSignIn();
            }
          }}
        />

        <input
          autoComplete="off"
          variant="outlined"
          className="auth-input"
          placeholder="Password"
          id="password"
          type="password"
          onChange={(e) => {
            onChange(e);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSignIn();
            }
          }}
        />
        <p
          className="forgot-psw-text"
          onClick={() => {
            setFormState("reset-password");
          }}
        >
          Forgot your password?
        </p>
        {formError && <div className="auth-error-text">{formError}</div>}

        <div className="submit-section">
          <span>
            Don't have an account?
            <span
              className="link-text"
              onClick={() => {
                setFormState("sign-up");
              }}
            >
              Sign up
            </span>
          </span>
          <button
            type="primary"
            className="button"
            onClick={(e) => onSignIn(e)}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
