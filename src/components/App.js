import { useReducer, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import Header from "./Header";
import Main from "./Main";
import Hello from "./Hello";
import Login from "./Login";
import Financial from "./Financial";
import CreateAccount from "./CreateAccount";
import Footer from "./Footer";
import Message from "./Message";

// * TO DO LIST
// ! to avoid usernames duplicates!!!
// ? option to fetch current crypto price
//

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

const initialState = {
  status: "init",
  isOpenCA: false,
  isOpenWC: true,
  isOpenFC: false,
  currentAccount: null,
  receiverAccount: null,
  message: "",
  accountsArray: [],
};

function reducer(state, action) {
  switch (action.type) {
    // * action.payload = accounts
    case "getAccountsFromLocalStorage":
      return { ...state, accountsArray: action.payload };

    case "openFormCreateAccount":
      // * save previous status when opening CAform
      const preStatus = action.payload;

      return {
        ...state,
        status: "formCAOpen",
        isOpenCA: true,
        // * save previous status when opening CAform
        previousStatus: preStatus,
        // currentAccount: null,
      };

    case "closeFormCreateAccount":
      return {
        ...state,
        // * return to previous status when closing form
        status: state.previousStatus,
        isOpenCA: false,

        // currentAccount: null,
      };

    case "accountOpenSuccess":
      // * action.payload = newAccountObject
      return {
        ...state,
        isOpenCA: false,
        message: "accOpenSuccess",
        isOpenFC: true,
        // !
        currentAccount: action.payload,
        // accountsArray: [...state.accountsArray, action.payload],
        // overallBalance: action.payload.transactions.reduce(
        //   (acm, curr) => (acm += curr)
        // ),
      };

    case "login":
      const { loginUsername, loginPassword } = action.payload;
      const loginAccount = state.accountsArray.find(
        (acc) => acc.username === loginUsername.trim()
      );

      if (!loginAccount || loginPassword !== loginAccount?.password)
        return { ...state, message: "loginFailed" };

      return {
        ...state,
        isOpenWC: false,
        isOpenFC: true,
        currentAccount: loginAccount,
        message: "loginSuccess",
      };

    case "logOut":
      // ! 'logic'
      const confirmLogout = window.confirm("Are you sure you want to log out?");

      if (!confirmLogout) return;

      return {
        ...state,
        isOpenFC: false,
        isOpenWC: true,
        status: "init",
        currentAccount: null,
      };

    case "successfulConditionsCrypto":
      return { ...state, message: "cryptoTradeSuccess" };
    case "failedConditionsCrypto":
      return { ...state, message: "cryptoTradeFail" };

    case "successfulConditionsTransfer":
      return { ...state, message: "transferSuccess" };
    case "failedConditionsTransfer":
      return { ...state, message: "transferFailed" };

    case "successfulConditionsLoan":
      return { ...state, message: "loanSuccess" };
    case "failedConditionsLoan":
      return { ...state, message: "loanFailed" };

    case "tradeCrypto":
      const { cryptoTradeValue, currencyToTrade, buyOrSell, quantityToTrade } =
        action.payload;

      return {
        ...state,

        currentAccount: {
          ...state.currentAccount,

          crypto: {
            ...state.currentAccount.crypto,
            [currencyToTrade]:
              buyOrSell === "sell"
                ? state.currentAccount.crypto[currencyToTrade] - quantityToTrade
                : state.currentAccount.crypto[currencyToTrade] +
                  quantityToTrade,
          },

          transactions: [
            buyOrSell === "sell" ? cryptoTradeValue : -cryptoTradeValue,
            ...state.currentAccount.transactions,
          ],

          transactionDates: [
            formatDateBasedOnCurrency(state.currentAccount, new Date()),
            ...state.currentAccount.transactionDates,
          ],

          overallBalance:
            buyOrSell === "sell"
              ? state.currentAccount.overallBalance + cryptoTradeValue
              : state.currentAccount.overallBalance - cryptoTradeValue,
        },
      };

    case "requestLoan":
      const loanAmount = action.payload;

      return {
        ...state,
        currentAccount: {
          ...state.currentAccount,

          transactions: [loanAmount, ...state.currentAccount.transactions],

          transactionDates: [
            formatDateBasedOnCurrency(state.currentAccount, new Date()),
            ...state.currentAccount.transactionDates,
          ],

          overallBalance: state.currentAccount.overallBalance - loanAmount,
        },
      };

    case "transferMoney":
      const { transferTo, transferAmount } = action.payload;

      const receiverAcc = state.accountsArray.find(
        (acc) => acc.username === transferTo
      );

      const updatedCurrentAccount = {
        ...state.currentAccount,

        transactions: [-transferAmount, ...state.currentAccount.transactions],

        transactionDates: [
          formatDateBasedOnCurrency(state.currentAccount, new Date()),
          ...state.currentAccount.transactionDates,
        ],

        overallBalance: state.currentAccount.overallBalance - transferAmount,
      };

      const updatedReceiverAccount = {
        ...receiverAcc,

        transactions: [transferAmount, ...receiverAcc.transactions],

        transactionDates: [
          formatDateBasedOnCurrency(receiverAcc, new Date()),
          ...receiverAcc.transactionDates,
        ],

        overallBalance: receiverAcc.overallBalance + transferAmount,
      };

      return {
        ...state,
        currentAccount: updatedCurrentAccount,
        receiverAccount: updatedReceiverAccount,
      };

    case "resetMessage":
      const previousMessage = action.payload;

      return {
        ...state,
        message: "",
        status:
          (previousMessage === "accOpenSuccess" && "loggedIn") ||
          (previousMessage === "loginFailed" && "init") ||
          (previousMessage === "loginSuccess" && "loggedIn") ||
          (previousMessage === "cryptoTradeSuccess" && "loggedIn") ||
          (previousMessage === "cryptoTradeFail" && "loggedIn") ||
          (previousMessage === "transferSuccess" && "loggedIn") ||
          (previousMessage === "transferFailed" && "loggedIn") ||
          (previousMessage === "loanFailed" && "loggedIn") ||
          (previousMessage === "loanSuccess" && "loggedIn") ||
          (!previousMessage && "loggedIn"),
      };

    default:
      throw new Error("action unknown");
  }
}

function syncWithLocalStorage(accountToSync, functionToRun) {
  if (!accountToSync) return;

  functionToRun((currAccounts) =>
    currAccounts.map((acc) =>
      acc.username === accountToSync.username ? { ...accountToSync } : acc
    )
  );
}

function App() {
  const [
    {
      status,
      isOpenCA,
      isOpenWC,
      isOpenFC,
      message,
      currentAccount,
      receiverAccount,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // ! because of using the useLocalStorage hook
  const [accounts, setAccounts] = useLocalStorage([], "accounts");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  // ? for initialization
  useEffect(() => {
    if (status === "init")
      dispatch({ type: "getAccountsFromLocalStorage", payload: accounts });
  }, [accounts, status]);

  // ? for syncing currentAccount with local storage (thru setAccounts)
  useEffect(() => {
    syncWithLocalStorage(currentAccount, setAccounts);
  }, [currentAccount, setAccounts]);

  // ? for syncing receiverAccount with local storage (thru setAccounts)
  useEffect(() => {
    syncWithLocalStorage(receiverAccount, setAccounts);
  }, [receiverAccount, setAccounts]);

  return (
    <>
      <Header
        dispatch={dispatch}
        isOpenFC={isOpenFC}
        status={status}
        customerName={currentAccount?.username}
        welcomeMessage={welcomeMessage}
      />
      <Main>
        {status === "init" && (
          <>
            <Hello
              welcomeMessage={welcomeMessage}
              setWelcomeMessage={setWelcomeMessage}
            />
            <Login dispatch={dispatch} isOpenWC={isOpenWC} status={status} />
            {message === "loginFailed" && (
              <Message
                message={message}
                dispatch={dispatch}
                actionSuccessful={false}
              >
                Account not found or password incorrect... Feel free to try
                again or open a new account
              </Message>
            )}
            {message === "loginSuccess" && (
              <Message
                message={message}
                dispatch={dispatch}
                actionSuccessful={true}
              >
                You will be logged in in a few seconds
              </Message>
            )}

            <Footer />
          </>
        )}
        {status === "formCAOpen" && (
          <>
            <CreateAccount
              isOpenCA={isOpenCA}
              dispatch={dispatch}
              setAccounts={setAccounts}
            />

            {message === "accOpenSuccess" && (
              <Message message={message} dispatch={dispatch}>
                Thank you! Your account was created! Your <em>username</em> is
                <u> your first name</u> (lowercase) and your <em>password</em>{" "}
                is
                <u> the last 4 digits of your SSN</u>
                <br />
                <p>Logging you in in XXX!</p>
              </Message>
            )}
          </>
        )}

        {status === "loggedIn" && (
          <Financial
            isOpenFC={isOpenFC}
            currentAccount={currentAccount}
            dispatch={dispatch}
            message={message}
          />
        )}
      </Main>
    </>
  );
}

export default App;
