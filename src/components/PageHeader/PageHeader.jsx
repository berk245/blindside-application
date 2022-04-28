import React from "react";
import "./PageHeader.css";
import logo from "../../static/logo.svg";

function PageHeader({ signedIn = true }) {
  return (
    <div className="page-header-container">
      <img src={logo} className="header-logo" alt="Blindside Logo" />
      {signedIn && (
        <button className="button">
          Sign Out
        </button>
      )}
    </div>
  );W
}

export default PageHeader;
