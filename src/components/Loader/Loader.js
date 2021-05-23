import React from "react";
import "./loader.css";

export default function Loader() {
  return (
    <div className="loader-main">
      <div className="loader">
        <div className="logo-loader">
          <div className="circle-loader">
            <div className="square1-loader"></div>
            <div className="square2-loader"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
