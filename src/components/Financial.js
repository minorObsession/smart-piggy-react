import { useState } from "react";
import Transactions from "./Transactions";
import Crypto from "./Crypto";
import Services from "./Services";
import OverallBalance from "./OverallBalance";
import { useKeyPress } from "./useKeyPress";
function Financial({ isOpenFC, currentAccount, message, dispatch }) {
  const [activeTab, setActiveTab] = useState("banking");

  useKeyPress("Escape", function () {
    dispatch({ type: "logOut" });
  });

  return (
    <div
      className={`container_financial container ${
        isOpenFC ? "visible" : "hidden"
      }`}
    >
      <div className="tabs">
        <button
          className={`btn_banking btn tab_btn ${
            activeTab === "banking" ? "active" : "hidden_tab"
          }`}
          onClick={() => setActiveTab("banking")}
        >
          Banking
        </button>
        <button
          className={`crypto btn tab_btn ${
            activeTab === "crypto" ? "active" : "hidden_tab"
          }`}
          onClick={() => setActiveTab("crypto")}
        >
          Crypto
        </button>
      </div>

      <div className="financial_div">
        <div
          className={`transactions_div ${
            activeTab === "banking" ? "" : "hidden"
          } `}
        >
          <Transactions currentAccount={currentAccount} />
        </div>
        <Crypto
          activeTab={activeTab}
          currentAccount={currentAccount}
          dispatch={dispatch}
          message={message}
        />
      </div>

      <Services
        dispatch={dispatch}
        message={message}
        currentAccount={currentAccount}
      />
      <OverallBalance currentAccount={currentAccount} />
    </div>
  );
}

export default Financial;
