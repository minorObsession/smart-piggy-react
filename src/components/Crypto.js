import { useEffect, useState } from "react";
import CryptoLogoDiv from "./CryptoLogoDiv";
import Message from "./Message";

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

async function getCryptoPrices() {
  try {
    const btcRes = await fetch(
      "https://api.coinpaprika.com/v1/tickers/btc-bitcoin"
    );
    const btcData = await btcRes.json();
    const btcPrice = btcData.quotes.USD.price;
    const ethRes = await fetch(
      "https://api.coinpaprika.com/v1/tickers/eth-ethereum"
    );
    const ethData = await ethRes.json();
    const ethPrice = ethData.quotes.USD.price;
    const usdcPrice = 1;

    return {
      btc: btcPrice,
      eth: ethPrice,
      usdc: usdcPrice,
    };
  } catch (err) {
    console.error(err);
  }
}

function Crypto({ activeTab, currentAccount, dispatch, message }) {
  const [buyOrSell, setBuyOrSell] = useState("buy");
  const [currencyToTrade, setCurrencyToTrade] = useState("btc");
  const [quantityToTrade, setQuantityToTrade] = useState(0);
  const [cryptoPrices, setCryptoPrices] = useState(null);

  useEffect(() => {
    async function retrieveCryptoPrices() {
      const prices = await getCryptoPrices();
      setCryptoPrices(prices);
    }
    retrieveCryptoPrices();
  }, []);

  if (!cryptoPrices)
    return (
      <Message message={message} dispatch={dispatch}>
        Loading crypto prices...
      </Message>
    );

  const cryptoTradeValue = cryptoPrices[currencyToTrade] * quantityToTrade;
  const { btc: priceBTC, eth: priceETH, usdc: priceUSDC } = cryptoPrices;
  const { btc: qtBTC, eth: qtETH, usdc: qtUSDC } = currentAccount.crypto;

  const totalCryptoAccValue =
    qtBTC * priceBTC + qtETH * priceETH + qtUSDC * priceUSDC;

  function handleTradeCrypto(e) {
    e.preventDefault();

    function resetInputFields() {
      setBuyOrSell("buy");
      setCurrencyToTrade("btc");
      setQuantityToTrade(0);
    }

    resetInputFields();

    // * buying
    if (buyOrSell === "buy") {
      // conditions
      if (
        cryptoTradeValue > currentAccount.overallBalance ||
        quantityToTrade <= 0 ||
        isNaN(cryptoTradeValue)
      )
        return dispatch({ type: "failedConditionsCrypto" });
    }

    // * selling
    if (buyOrSell === "sell") {
      if (
        currentAccount.crypto[currencyToTrade] < quantityToTrade ||
        quantityToTrade <= 0 ||
        isNaN(cryptoTradeValue)
      )
        return () => dispatch({ type: "failedConditionsCrypto" });
    }

    dispatch({ type: "successfulConditionsCrypto" });

    setTimeout(() => {
      dispatch({
        type: "tradeCrypto",
        payload: {
          cryptoTradeValue,
          currencyToTrade,
          quantityToTrade,
          buyOrSell,
        },
      });
    }, 2000);
  }

  return (
    <div className={`crypto_div ${activeTab === "crypto" ? "" : "hidden"}`}>
      <div className="crypto_assets">
        <CryptoLogoDiv
          cryptoName="Bitcoin"
          cryptoNameShort="btc"
          cryptoArray={currentAccount.crypto}
          cryptoPrices={cryptoPrices}
          currency={currentAccount.currency}
          totalCryptoAccValue={totalCryptoAccValue}
        />
        <CryptoLogoDiv
          cryptoName="Ethereum"
          cryptoNameShort="eth"
          cryptoArray={currentAccount.crypto}
          cryptoPrices={cryptoPrices}
          currency={currentAccount.currency}
          totalCryptoAccValue={totalCryptoAccValue}
        />
        <CryptoLogoDiv
          cryptoName="USDC"
          cryptoNameShort="usdc"
          cryptoArray={currentAccount.crypto}
          cryptoPrices={cryptoPrices}
          currency={currentAccount.currency}
          totalCryptoAccValue={totalCryptoAccValue}
        />
      </div>

      <div className="balance_and_trade_divs">
        <div className="crypto_balance_div">
          <p className="crypto_acc_balance_text">
            <em>crypto account value</em>
          </p>
          <span className="crypto_acc_balance">
            {numberFormatBasedOnCurrency(
              totalCryptoAccValue,
              currentAccount.currency
            )}
          </span>
          <p className="crypto_acc_balance_descr">
            <em className="current_date_time_crypto">
              {"  on "}
              {formatDateBasedOnCurrency(currentAccount, new Date())}
            </em>
          </p>
        </div>

        <div className="trade_crypto">
          <h3 className="heading_trade_crypto">Trade Crypto</h3>
          <form className="buy_sell_div" onSubmit={(e) => handleTradeCrypto(e)}>
            <select
              className="buy_sell form_input_field"
              value={buyOrSell}
              onChange={(e) => setBuyOrSell(e.target.value)}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
            <select
              className="select_crypto form_input_field"
              value={currencyToTrade}
              onChange={(e) => setCurrencyToTrade(e.target.value)}
            >
              <option value="btc">btc</option>
              <option value="eth">eth</option>
              <option value="usdc">usdc</option>
            </select>
            <input
              className="buy_sell_qt form_input_field"
              placeholder="quantity"
              value={quantityToTrade}
              onChange={(e) => setQuantityToTrade(+e.target.value)}
            />
            <button className="trade_crypto_btn btn form_input_field">
              GO
            </button>
          </form>
        </div>
      </div>

      {message === "cryptoTradeSuccess" && (
        <Message message={message} dispatch={dispatch}>
          Woohooo! Thank you for trading (:
        </Message>
      )}
      {message === "cryptoTradeFail" && (
        <Message message={message} dispatch={dispatch} actionSuccessful={false}>
          Something went wrong ): Your transaction couldn't be completed
        </Message>
      )}
    </div>
  );
}

export default Crypto;
