import { useState } from "react";
import { useKeyPress } from "./useKeyPress";

function randomRoundNumber(min, max) {
  const num = Math.round(Math.random() * (max - min) + min);
  const leftover = num % 50;
  // ! avoid zeros - run function again!
  if (num === 0 && leftover === 0) return randomRoundNumber(-5000, 5000);
  return leftover !== 0 ? num - leftover : num;
}

function generateTransactionsArray() {
  // between 5 and 12 transactions
  const arrLength = Math.random() * 12 + 5;
  return Array.from({ length: arrLength }, () =>
    randomRoundNumber(-5000, 5000)
  ).reverse();
}

function createTransactionDatesArray(
  account,
  options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  currency = account.currency
) {
  const dates = account.transactions.map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index - 1);
    const formattedDate =
      currency === "USD"
        ? `${new Intl.DateTimeFormat("en-US", options).format(date)}`
        : `${new Intl.DateTimeFormat("de-DE", options).format(date)}`;

    return formattedDate.replaceAll(".", "/");
  });

  const finalArray = dates.reverse();
  return finalArray;
}

function CreateAccount({ isOpenCA, dispatch, setAccounts }) {
  const [cryptoCheckboxChecked, setCryptoCheckboxChecked] = useState(false);
  const [name, setName] = useState("");
  const [SSN, setSSN] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [crypto, setCrypto] = useState({ btc: 0, eth: 0, usdc: 0 });

  // useEffect(() => {
  //   useKeyPress("esc");
  // }, []);

  useKeyPress("Escape", function () {
    dispatch({ type: "closeFormCreateAccount" });
  });

  function handleCreateNewAccount(e) {
    e.preventDefault();

    if (name.split(" ").length < 2 || String(SSN).length < 5)
      return alert(
        "Something went wrong ): Name must contain 2 words and SSN must have at least 5 digits"
      );

    const newAccountObject = {
      name: name,
      currency: currency,
      username: name.split(" ")[0].toLowerCase(),
      password: +String(SSN).slice(-4),
      crypto: crypto,
      transactions: generateTransactionsArray().reverse(),
    };

    newAccountObject.transactionDates =
      createTransactionDatesArray(newAccountObject).reverse();

    newAccountObject.overallBalance = newAccountObject.transactions.reduce(
      (acm, curr) => (acm += curr)
    );
    console.log(newAccountObject);
    setAccounts((currAccounts) => [...currAccounts, newAccountObject]);

    // ! 1: display message
    dispatch({ type: "accountOpenSuccess", payload: newAccountObject });

    // dispatch({
    //   type: "setNewAccountToLocalStorage",
    //   payload: newAccountObject,
    // });

    // ! 2: close form
    // ! 3: open financial
  }

  return (
    <div
      className={`create_acc_overlay container ${
        isOpenCA ? "visible" : "hidden"
      }`}
    >
      <button
        className="x_close_overlay"
        onClick={() => dispatch({ type: "closeFormCreateAccount" })}
      >
        ×
      </button>
      <h2 className="form_heading">Customer Application Form</h2>
      <form
        className={`form_create_acc ${isOpenCA ? "visible" : "hidden"}`}
        onSubmit={(e) => handleCreateNewAccount(e)}
      >
        <div className="form_column_1 form_column">
          <div className="form_div">
            <label>Name</label>
            <input
              className="form_input_field input_name"
              placeholder="e.g. John Smith"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form_div">
            <label>Date of Birth</label>
            <input
              className="form_input_field input_DOB"
              placeholder="mm/dd/yyyy"
              type="date"
              max="<?php echo date('Y-m-d', strtotime('-15 years')); ?>"
            />
          </div>
          <div className="form_div">
            <label>Location</label>
            <input
              className="form_input_field input_location"
              placeholder="eg. Houston, USA"
              type="text"
            />
          </div>
        </div>
        <div className="form_column_2 form_column">
          <div className="form_div">
            <label>SSN</label>
            <input
              className="form_input_field input_ssn"
              placeholder="eg. 000-00-0000"
              type="text"
              onChange={(e) => setSSN(+e.target.value)}
            />
          </div>
          <div className="form_div">
            <label>Income</label>
            <input
              className="form_input_field input_income"
              placeholder="annual"
              type="text"
            />
            <select
              className="select_currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="EUR">€</option>
              <option value="USD">$</option>
            </select>
          </div>
          <div className="form_div form_div_crypto_checkbox">
            <label>Do you own crypto?</label>
            <input
              className="form_input_field input_crypto_checkbox"
              checked={cryptoCheckboxChecked}
              type="checkbox"
              onChange={() => setCryptoCheckboxChecked((s) => !s)}
            />
          </div>
        </div>
        {cryptoCheckboxChecked && (
          <>
            <div className={`form_column_3 form_column `}>
              <div className="form_div">
                <label>Bitcoin</label>
                <input
                  className="form_input_field btc_new_acc"
                  placeholder="quantity"
                  type="text"
                  onChange={(e) =>
                    setCrypto((s) => ({
                      ...s,
                      btc: +e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form_div">
                <label>Ethereum</label>
                <input
                  className="form_input_field eth_new_acc"
                  placeholder="quantity"
                  type="text"
                  onChange={(e) =>
                    setCrypto((s) => ({
                      ...s,
                      eth: +e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form_div">
                <label>USDC</label>
                <input
                  className="form_input_field usdc_new_acc"
                  placeholder="quantity"
                  type="text"
                  onChange={(e) =>
                    setCrypto((s) => ({
                      ...s,
                      usdc: +e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </>
        )}
        <button className="btn btn_submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default CreateAccount;
