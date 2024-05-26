import Transaction from "./Transaction";

function daysPassed(date2, date1, currency = "USD") {
  // console.log(date1);
  let dateFixed;
  // console.log(currency);
  // reverse dates to correctly calculate daysPassed
  if (currency === "EUR") {
    // console.log(date1);
    const [day, month, year] = String(date1).split("/");

    // console.log(day, month, year);
    const dateFix = `${month}/${day}/${year}`;
    // console.log(dateFix);
    dateFixed = new Date(dateFix);
  }
  const diffMs = currency === "USD" ? date2 - date1 : date2 - dateFixed;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.abs(diffDays);
}

function formatDatesArrayToDisplay(datesArray, currency) {
  const toDisplay = datesArray.map((date) => {
    const daysSince =
      currency === "USD"
        ? Math.floor(daysPassed(new Date(), new Date(date)))
        : Math.floor(daysPassed(new Date(), date, "EUR"));
    // console.log(daysSince);
    if (daysSince === 0) return "Today";
    if (daysSince === 1) return "Yesterday";
    if (daysSince > 1 && daysSince <= 7) return `${daysSince} days ago`;

    // ? maybe this is the problem?
    if (daysSince > 7 && currency !== "USD") {
      const [month, day, year] = date.split("/");
      return `${day}/${month}/${year}`;
    }
    return date;
  });
  return toDisplay;
}

function Transactions({ currentAccount, activeTab }) {
  if (!currentAccount) return;
  const datesToDisplay = formatDatesArrayToDisplay(
    currentAccount.transactionDates,
    currentAccount.currency
  );

  return (
    <div
      className={`transactions_div ${activeTab === "banking" ? "" : "hidden"} `}
    >
      <ul>
        {currentAccount.transactions.map((mov, i) => {
          const formattedDate = datesToDisplay[i];

          return (
            <Transaction
              currentAccount={currentAccount}
              mov={mov}
              formattedDate={formattedDate}
              key={mov + i + Math.random()}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Transactions;
