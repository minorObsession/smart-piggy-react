function Transaction({ mov, currentAccount, formattedDate }) {
  const type = mov > 0 ? "deposit" : "withdrawal";

  const formattingOptions = {
    style: "currency",
    currency: currentAccount.currency,
  };
  const formattedMov =
    currentAccount.currency === "USD"
      ? `${new Intl.NumberFormat("en-US", formattingOptions).format(mov)}`
      : `${new Intl.NumberFormat("de-DE", formattingOptions).format(mov)}`;

  return (
    <li>
      <div className={`transaction ${type}`}>
        <div className="transaction_type">
          {type === "deposit" ? (
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-101.66a8,8,0,0,1-11.32,11.32L136,107.31V168a8,8,0,0,1-16,0V107.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0Z"></path>
            </svg>
          ) : (
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-85.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L120,148.69V88a8,8,0,0,1,16,0v60.69l18.34-18.35A8,8,0,0,1,165.66,130.34Z"></path>
            </svg>
          )}
        </div>
        <div className="transaction_date">{formattedDate}</div>
        <div className="transaction_amount">{formattedMov}</div>
      </div>
    </li>
  );
}

export default Transaction;
