import React from "react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import "./AuthComponents.css";

export default function ResetPasswordForm({ setFormState }) {
  const [formFields, setFormFields] = useState({
    username: "",
    verification_code: "",
    new_password: "",
  });
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  const onChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      requestVerificationCode();
    }
    setFormError("");
    const { id, value } = e.target;
    let obj = { ...formFields };
    obj[id] = value;
    setFormFields(obj);
  };

  const requestVerificationCode = async () => {
    let formData = { ...formFields };
    try {
      await Auth.forgotPassword(formData.username);
      setSuccess("A verification code is sent to your email");
      setVerificationCodeSent(true);
    } catch (err) {
      setVerificationCodeSent(false);
      console.log("Error while submitting username");
      setFormError(err.message);
    }
  };

  const onSubmit = async () => {
    let formData = { ...formFields };
    try {
      await Auth.forgotPasswordSubmit(
        formData.username,
        formData.verification_code,
        formData.new_password
      );
      setSuccess(
        "Password has been changed. You are being redirected to login page"
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
      {success && <div className="success-text">{success}</div>}
      {success[0] !== "P" && (
        <form autoComplete="no">
          {!verificationCodeSent && (
            <>
              <h3 style={{ margin: "1rem 0.5rem" }}>Reset your password </h3>
              <input
                className="auth-input"
                placeholder="Username"
                id="username"
                onKeyDown={(e) => {
                  onChange(e);
                }}
              />
            </>
          )}

          {verificationCodeSent && (
            <>
              <input
                className="auth-input"
                placeholder="Verification Code"
                id="verification_code"
                type="text"
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <input
                className="auth-input"
                placeholder="New Password"
                id="new_password"
                type="password"
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </>
          )}

          {formError && <div className="auth-error-text">{formError}</div>}

          <div className="submit-section">
            <div>
              <span
                className="link-text"
                onClick={() => {
                  setFormState("sign-in");
                }}
              >
                Back to Sign In
              </span>
            </div>
            {!verificationCodeSent && (
              <button className="button" onClick={requestVerificationCode}>
                Submit
              </button>
            )}
            {verificationCodeSent && (
              <button type="primary" size="large" onClick={onSubmit}>
                Reset Password
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
