import React from "react";
import "./Error.css";

const Error = ({ error }) => {
  return (
    <div className="errorContainer">
      <p className="errorText">{error}</p>
      <button className="errorButton" onClick={() => window.location.reload()}>Reload page.</button>
    </div>
  );
};

export { Error };
