import { useState } from "react";
import Message from "./Message";

function Services({ dispatch, message, currentAccount }) {
  const [isTransferInfoOpen, setIsTransferInfoOpen] = useState(false);
  const [isLoanInfoOpen, setIsLoanInfoOpen] = useState(false);

  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const [loanAmount, setLoanAmount] = useState("");

  function resetInputFields() {
    setIsTransferInfoOpen(false);
    setIsLoanInfoOpen(false);
    setTransferTo("");
    setTransferAmount("");
    setLoanAmount("");
  }

  function handleTransfer(e) {
    e.preventDefault();
    resetInputFields();

    const conditionsSuccessful =
      transferTo &&
      transferAmount <= currentAccount.overallBalance &&
      transferAmount > 0 &&
      transferTo !== currentAccount.username;

    if (!conditionsSuccessful)
      return dispatch({
        type: "failedConditionsTransfer",
      });

    dispatch({
      type: "successfulConditionsTransfer",
    });

    setTimeout(() => {
      dispatch({
        type: "transferMoney",
        payload: { transferTo, transferAmount },
      });
    }, 3000);
  }

  function handleLoan(e) {
    e.preventDefault();
    resetInputFields();

    const conditionsSuccessful =
      loanAmount <= 0.5 * currentAccount.overallBalance && loanAmount > 0;

    if (!conditionsSuccessful)
      return dispatch({
        type: "failedConditionsLoan",
      });

    dispatch({
      type: "successfulConditionsLoan",
    });

    setTimeout(() => {
      dispatch({
        type: "requestLoan",
        payload: loanAmount,
      });
    }, 3000);

    // dispatch({ type: "successfulConditionsLoan" });

    // setTimeout(() => {
    //   dispatch({
    //     type: "requestLoan",
    //     payload: loanAmount,
    //   });
    // }, 3000);
  }

  return (
    <div className="services_div">
      <form className="transfer_form" onSubmit={handleTransfer}>
        <span>
          TRANSFER
          <i
            className="fa-info info_transfer"
            onMouseEnter={() => setIsTransferInfoOpen(true)}
            onMouseLeave={() => setIsTransferInfoOpen(false)}
          >
            i
          </i>
        </span>
        <div className="transfer_inputs">
          <input
            className="transfer_to form_input_field"
            placeholder="username (receiver)"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
          />
          <input
            className="transfer_amount form_input_field"
            placeholder="amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(+e.target.value)}
          />
        </div>
        <p className={` info_message ${isTransferInfoOpen ? "" : "hidden"}`}>
          Enter <u>username of the receiver</u> and the
          <u> transfer amount</u>, then hit <em>Enter</em>
        </p>
        <button className="btn btn_login"></button>
      </form>
      <form className="loan_form" onSubmit={handleLoan}>
        <span>
          LOAN
          <i
            className="fa-info info_loan"
            onMouseEnter={() => setIsLoanInfoOpen(true)}
            onMouseLeave={() => setIsLoanInfoOpen(false)}
          >
            i{" "}
          </i>
        </span>
        <div className="loan_inputs">
          <input
            className="loan_amount form_input_field"
            placeholder="amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
          />
        </div>
        <p className={` info_message ${isLoanInfoOpen ? "" : "hidden"}`}>
          Get approved for a loan up to
          <u> 50% of your current account balance</u>!
        </p>
        <button className="btn btn_login"></button>
      </form>
      {message === "transferFailed" && (
        <Message message={message} dispatch={dispatch} actionSuccessful={false}>
          Something went wrong, please try again. Hint: receiver must be a Smart
          Piggy member, and you must have sufficient funds to transfer. Also,
          you cannot transfer funds to yourself.
        </Message>
      )}
      {message === "transferSuccess" && (
        <Message message={message} dispatch={dispatch}>
          Yeeeey! Your transfer went through (:
        </Message>
      )}
      {message === "loanFailed" && (
        <Message message={message} dispatch={dispatch} actionSuccessful={false}>
          Unfortunately, the loan was rejected :( Please double-check the
          conditions and try again
        </Message>
      )}
      {message === "loanSuccess" && (
        <Message message={message} dispatch={dispatch}>
          Horaaay! Your loan was approved (:
        </Message>
      )}
    </div>
  );
}

export default Services;
