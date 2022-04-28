import React from "react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import "./AuthComponents.css";

export default function ConfirmSignUp({ user, setFormState }) {
  const [formFields, setFormFields] = useState({
    username: user.username,
    confirmation_code: "",
  });
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e) => {
    setFormError("");
    const { id, value } = e.target;
    let obj = { ...formFields };
    obj[id] = value;
    setFormFields(obj);
  };

  const onSignIn = async () => {
    let formData = { ...formFields };
    try {
      let confirmedUser = await Auth.confirmSignUp(
        formData.username,
        formData.confirmation_code
      );
      console.log(confirmedUser, "Succesfully confirmed");

      setSuccess(
        "Confirmation succesful. You are being redirected to login page."
      );

      setTimeout(() => {
        setFormState("sign-in");
      }, 2000);
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="authentication-form-container">
      {success && <div className="success-message">{success}</div>}
      {!success && (
        <form autoComplete="no" className="signup-form">
          <h3 style={{ margin: "1rem 0.5rem" }}>Confirm Sign-up </h3>

          <p style={{ margin: "1rem 0.5rem", lineHeight: "1.2rem" }}>
            Please type in the verification code you have received in your mail.{" "}
          </p>

          <input
            className="auth-input"
            label="Username"
            id="username"
            value={user.username}
            onChange={(e) => {
              onChange(e);
            }}
          />

          <input
            className="auth-input"
            variant="outlined"
            label="Verification Code"
            id="confirmation_code"
            type="text"
            onChange={(e) => {
              onChange(e);
            }}
          />
          {formError && <div className="error-message">{formError}</div>}

          <div className="submit-section">
            <div style={{ padding: "0.5rem", marginBottom: "1rem" }}>
              Not {user.username}?
              <p
                className="link-text"
                style={{ padding: "0rem" }}
                onClick={() => {
                  setFormState("sign-in");
                }}
              >
                Go back to home page
              </p>
            </div>
            <button className="button" onClick={onSignIn}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
