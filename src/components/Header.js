import { useState } from "react";
import logo from "./logo.png";

function Header({ dispatch, isOpenFC, status, customerName, welcomeMessage }) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  function capitalizeString(string) {
    return string
      .split("")
      .map((l, i) => {
        if (i === 0) {
          const firstL = l.toUpperCase();
          return firstL;
        }
        return l;
      })
      .join("");
  }

  return (
    <header className="nav_container nav">
      <div className="nav nav_1">
        <img className=" img_logo" src={logo} alt="logo of smart piggy" />
        <h2 className="slogan">
          <em>
            <strong>Smart Piggy</strong> - banking and investing
          </em>
        </h2>
      </div>

      <div className="nav nav_2">
        <h2
          className="slogan"
          onMouseEnter={() => setOverlayOpen(true)}
          onMouseLeave={() => setOverlayOpen(false)}
        >
          {isOpenFC && status === "loggedIn"
            ? `${welcomeMessage}, ${capitalizeString(customerName)}`
            : "what we offer"}
        </h2>

        <div
          className={`services_overlay ${
            overlayOpen && !isOpenFC ? "visible" : "hidden"
          }`}
        >
          <p className="overlay_text">
            Did you ever wonder - what if I could do <br />
            every-day banking AND investing <br />
            all in the same app?
            <br />
            You can now, with
            <span> Smart Piggy!</span>
          </p>
        </div>
        {(isOpenFC && status === "loggedIn") || (
          <button
            className="btn btn_open_acc"
            onClick={() =>
              dispatch({ type: "openFormCreateAccount", payload: status })
            }
          >
            JOIN US
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
