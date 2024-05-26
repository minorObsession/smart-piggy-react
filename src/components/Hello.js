import { useEffect } from "react";

function Hello({ setWelcomeMessage, welcomeMessage }) {
  useEffect(
    function displayWelcomeMessage() {
      const currentHour = new Date().getHours();
      let timeOfDay;
      if (currentHour >= 6 && currentHour <= 12) timeOfDay = "morning";
      if (currentHour >= 12 && currentHour <= 18) timeOfDay = "afternoon";
      if (currentHour >= 18 && currentHour <= 24) timeOfDay = "evening";
      if (currentHour >= 0 && currentHour <= 6) timeOfDay = "night";

      setWelcomeMessage(`Good ${timeOfDay}`);
    },
    [setWelcomeMessage]
  );

  return <h1 className="welcome_message">{welcomeMessage}</h1>;
}

export default Hello;
