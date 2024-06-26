const svgIconsCrypto = {
  btc: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        fillRule="evenodd"
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
      ></path>
    </svg>
  ),
  eth: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <g fillRule="evenodd">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z"></path>
        <g fillRule="nonzero">
          <path
            fillOpacity=".298"
            d="M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z"
          ></path>
          <path
            fillOpacity=".801"
            d="M16.498 20.573l7.497-4.353-7.497-3.348z"
          ></path>
          <path fillOpacity=".298" d="M9 16.22l7.498 4.353v-7.701z"></path>
        </g>
      </g>
    </svg>
  ),
  usdc: (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm3.352 5.56c-.244-.12-.488 0-.548.243-.061.061-.061.122-.061.243v.85l.01.104a.86.86 0 00.355.503c4.754 1.7 7.192 6.98 5.424 11.653-.914 2.55-2.925 4.491-5.424 5.402-.244.121-.365.303-.365.607v.85l.005.088a.45.45 0 00.36.397c.061 0 .183 0 .244-.06a10.895 10.895 0 007.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162zm-6.46-.06c-.061 0-.183 0-.244.06a10.895 10.895 0 00-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102.244.121.488 0 .548-.243.061-.06.061-.122.061-.243v-.85l-.01-.08c-.042-.169-.199-.362-.355-.466-4.754-1.7-7.192-6.98-5.424-11.653.914-2.55 2.925-4.491 5.424-5.402.244-.121.365-.303.365-.607v-.85l-.005-.088a.45.45 0 00-.36-.397zm3.535 3.156h-.915l-.088.008c-.2.04-.346.212-.4.478v1.396l-.207.032c-1.708.304-2.778 1.483-2.778 2.942 0 2.002 1.218 2.791 3.778 3.095 1.707.303 2.255.668 2.255 1.639 0 .97-.853 1.638-2.011 1.638-1.585 0-2.133-.667-2.316-1.578-.06-.242-.244-.364-.427-.364h-1.036l-.079.007a.413.413 0 00-.347.418v.06l.033.18c.29 1.424 1.266 2.443 3.197 2.734v1.457l.008.088c.04.198.213.344.48.397h.914l.088-.008c.2-.04.346-.212.4-.477V21.34l.207-.04c1.713-.362 2.84-1.601 2.84-3.177 0-2.124-1.28-2.852-3.84-3.156-1.829-.243-2.194-.728-2.194-1.578 0-.85.61-1.396 1.828-1.396 1.097 0 1.707.364 2.011 1.275a.458.458 0 00.427.303h.975l.079-.006a.413.413 0 00.348-.419v-.06l-.037-.173a3.04 3.04 0 00-2.706-2.316V9.142l-.008-.088c-.04-.199-.213-.345-.48-.398z"></path>
    </svg>
  ),
};

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

function CryptoLogoDiv({
  cryptoName,
  cryptoNameShort,
  cryptoArray,
  currency,
  cryptoPrices,
  totalCryptoAccValue,
}) {
  const cryptoQt = cryptoArray[cryptoNameShort];
  const cryptoValue = cryptoQt * cryptoPrices[cryptoNameShort];
  const cryptoPoP = Math.round((cryptoValue / totalCryptoAccValue) * 100);

  return (
    <div className="crypto_and_logo_div">
      {svgIconsCrypto[cryptoNameShort]}
      <p>
        {cryptoName} owned:{" "}
        <span className={`${cryptoNameShort}_qt`}>{cryptoQt}</span>
      </p>
      <p>
        {cryptoName} value:{" "}
        <span className={`${cryptoNameShort}_value`}>
          {numberFormatBasedOnCurrency(cryptoValue, currency)}
        </span>
      </p>
      <p>
        Percentage of portfolio:{" "}
        <span className={`${cryptoNameShort}_perc`}>{cryptoPoP}%</span>
      </p>
    </div>
  );
}

export default CryptoLogoDiv;
