import { useState, useEffect } from "react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Hub } from "aws-amplify";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import ConfirmSignUp from "./ConfirmSignUp";
import ResetPasswordForm from "./ResetPasswordForm";

function Authenticator() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [err, setErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formState, setFormState] = useState("sign-in");
  const [userToBeConfirmed, setUserToBeConfirmed] = useState({});

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  });

  useEffect(() => {
    Hub.listen("UI Auth", (data) => {
      const { payload } = data;
      onAuthEvent(payload);
    });
  });

  const onAuthEvent = (payload) => {
    if (payload.event === "ToastAuthError" && payload.message) {
      setErr(true);
      setErrorMsg(payload.message?.trim());
    } else if (payload.message === "signedin") {
      localStorage.setItem("current_user", payload.data.username);
      window.location.href = "/";
    } else if (payload.message === "signedout") {
      localStorage.removeItem("current_user");
      window.location.href = "/";
    } else if (payload.message === "confirmSignup") {
      setUserToBeConfirmed(payload.data.user);
      setFormState("confirm-sign-up");
    }
  };

  return (
    <div
      className="auth-forms-section"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="forms-box">
        {formState === "sign-in" && (
          <SignInForm setFormState={setFormState} onAuthEvent={onAuthEvent} />
        )}
        {formState === "sign-up" && (
          <SignUpForm setFormState={setFormState}></SignUpForm>
        )}
        {formState === "confirm-sign-up" && (
          <ConfirmSignUp user={userToBeConfirmed} setFormState={setFormState} />
        )}
        {formState === "reset-password" && (
          <ResetPasswordForm setFormState={setFormState} />
        )}
      </div>
    </div>
  );
}

export default Authenticator;
