import React from "react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { Hub } from "@aws-amplify/core";
import "./AuthComponents.css";

export default function SignUpForm({ setFormState }) {
  const [formFields, setFormFields] = useState({
    username: null,
    password: null,
    attributes: {
      given_name: null,
      family_name: null,
      address: null,
      email: null,
    },
  });
  const [countryCode, setCountryCode] = useState(49);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [formError, setFormError] = useState("");

  const onChange = (e) => {
    setFormError("");
    const { id, value } = e.target;
    let obj = { ...formFields };
    if (["username", "password"].includes(id)) obj[id] = value;
    else if (id === "country_code") {
      setCountryCode(value);
    } else if (id === "phone_number") {
      setPhoneNumber(value);
    } else {
      obj.attributes[id] = value;
    }
    setFormFields(obj);
  };

  const checkForEmptyFields = () => {
    for (let [key, value] of Object.entries(formFields)) {
      if (key === "attributes") {
        for (let [k, val] of Object.entries(formFields.attributes)) {
          if (!val) {
            setFormError(`Please fill in all the fields`);
            return false;
          }
        }
      } else {
        if (value === null) {
          setFormError(`Please fill in all the fields`);
          return false;
        }
      }
    }
    return true;
  };

  const validateEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check = re.test(String(formFields.attributes.email).toLowerCase());
    if (!check) {
      setFormError("Please enter a valid email address");
      return false;
    }
    return true;
  };
  const validateBeforeSubmit = () => {
    setFormError("");
    let validEmail = validateEmail();
    let noEmptyFields = checkForEmptyFields();
    return noEmptyFields && validEmail;
  };

  const onSignup = async (e) => {
    e.preventDefault();
    let validated = validateBeforeSubmit();
    if (!validated) return false;

    let formData = { ...formFields };
    formData.attributes.phone_number = "+" + countryCode + phoneNumber;
    try {
      let user = await Auth.signUp(formData);
      Hub.dispatch("UI Auth", {
        event: "AuthStateChange",
        message: "confirmSignup",
        data: user,
      });
    } catch (err) {
      alert(err.message);
      setFormError(err.message);
      return;
    }
  };

  return (
    <div className="signup-main-container">
      <form autoComplete="no">
        <h3 style={{ margin: "2rem 0.5rem" }}>Create a New Account </h3>
        <input
          autoComplete="off"
          className="auth-input"
          variant="outlined"
          placeholder="Username"
          id="username"
          onChange={(e) => {
            onChange(e);
          }}
        />
        <input
          autoComplete="off"
          className="auth-input"
          placeholder="First Name"
          id="given_name"
          onChange={(e) => {
            onChange(e);
          }}
        />
        <input
          autoComplete="off"
          className="auth-input"
          placeholder="Last Name"
          id="family_name"
          onChange={(e) => {
            onChange(e);
          }}
        />
        <input
          autoComplete="off"
          className="auth-input"
          variant="outlined"
          placeholder="Email"
          id="email"
          onChange={(e) => {
            onChange(e);
          }}
        />

        <input
          autoComplete="off"
          className="auth-input"
          variant="outlined"
          placeholder="Phone number"
          id="phone_number"
          onChange={(e) => {
            onChange(e);
          }}
        />
        <input
          autoComplete="off"
          className="auth-input"
          variant="outlined"
          placeholder="Address"
          id="address"
          onChange={(e) => {
            onChange(e);
          }}
        />
        <input
          autoComplete="off"
          className="auth-input"
          variant="outlined"
          placeholder="Min 8 Characters. Must include a number, a special character, an uppercase and a lowercase letter."
          id="password"
          type="password"
          onChange={(e) => {
            onChange(e);
          }}
        />
        {formError && <div className="auth-error-text">{formError}</div>}

        <div className="submit-section">
          <div>
            Already have an account?
            <span
              className="link-text"
              onClick={() => {
                setFormState("sign-in");
              }}
            >
              Sign in
            </span>
          </div>
          <button
            className="button"
            type="primary"
            size="large"
            onClick={(e) => onSignup(e)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
