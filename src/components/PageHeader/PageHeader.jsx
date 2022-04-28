import React from "react";
import logo from "../../static/logo.svg";
import "./PageHeader.css";
function PageHeader({ signedIn = true }) {
  const signOut = () => {
    try {
      localStorage.clear();
    } catch {
      console.log("Error signing out");
    } finally {
      window.location.reload();
    }
  };
  return (
    <div className="page-header-container">
      <img src={logo} className="header-logo" alt="Blindside Logo" />
      {signedIn && (
        <button className="button" onClick={signOut}>
          Sign Out
        </button>
      )}
    </div>
  );
}

export default PageHeader;
