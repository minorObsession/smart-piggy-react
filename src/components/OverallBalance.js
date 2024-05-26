function formatDateBasedOnCurrency(
  account,
  toFormat,
  options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }
) {
  const formattedDate =
    account.currency === "USD"
      ? `${new Intl.DateTimeFormat("en-US", options).format(toFormat)}`
      : `${new Intl.DateTimeFormat("en-UK", options).format(toFormat)}`;

  return formattedDate.replaceAll(".", "/");
}

function numberFormatBasedOnCurrency(
  valueToFormat,
  currency,
  options = {
    style: "currency",
    currency: currency,
  }
) {
  const formatted =
    currency === "USD"
      ? `${new Intl.NumberFormat("en-US", options).format(valueToFormat)}`
      : `${new Intl.NumberFormat("de-DE", options).format(valueToFormat)}`;

  return formatted;
}

function OverallBalance({ currentAccount }) {
  if (!currentAccount) return;

  const formattedOverallBalance = numberFormatBasedOnCurrency(
    currentAccount?.overallBalance,
    currentAccount?.currency
  );

  const formattedDate = formatDateBasedOnCurrency(currentAccount, new Date(), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="overall_balance_div">
      <p className="overall_balance_text">
        <em>account balance</em>
      </p>
      <span className="overall_balance">{formattedOverallBalance}</span>
      <p className="overall_acc_balance_descr">
        <em className="current_date_time_overall">
          {"on "}
          {formattedDate}
        </em>
      </p>
    </div>
  );
}

export default OverallBalance;
