import { useState, useEffect } from "react";

function Message({ message, dispatch, actionSuccessful = true, children }) {
  const [showMessageText, setShowMessageText] = useState(false);
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [messageActive, setMessageActive] = useState(message);

  useEffect(() => {
    function messageDisplaying() {
      setSpinnerActive(true);
      setTimeout(() => {
        setShowMessageText(true);
        setSpinnerActive(false);
        setTimeout(() => {
          setMessageActive(false);
          dispatch({ type: "resetMessage", payload: message });
        }, 1000);
      }, 1000);
    }
    messageDisplaying();
  }, [dispatch, message]);

  return (
    <div
      className={`message info_message create_acc_message ${
        messageActive ? "dominate" : "hidden"
      }`}
    >
      <div className="icon_status_div">
        <svg
          className="icon icon_piggy"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path d="M192,116a12,12,0,1,1-12-12A12,12,0,0,1,192,116ZM152,64H112a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm96,48v32a24,24,0,0,1-24,24h-2.36l-16.21,45.38A16,16,0,0,1,190.36,224H177.64a16,16,0,0,1-15.07-10.62L160.65,208h-57.3l-1.92,5.38A16,16,0,0,1,86.36,224H73.64a16,16,0,0,1-15.07-10.62L46,178.22a87.69,87.69,0,0,1-21.44-48.38A16,16,0,0,0,16,144a8,8,0,0,1-16,0,32,32,0,0,1,24.28-31A88.12,88.12,0,0,1,112,32H216a8,8,0,0,1,0,16H194.61a87.93,87.93,0,0,1,30.17,37c.43,1,.85,2,1.25,3A24,24,0,0,1,248,112Zm-16,0a8,8,0,0,0-8-8h-3.66a8,8,0,0,1-7.64-5.6A71.9,71.9,0,0,0,144,48H112A72,72,0,0,0,58.91,168.64a8,8,0,0,1,1.64,2.71L73.64,208H86.36l3.82-10.69A8,8,0,0,1,97.71,192h68.58a8,8,0,0,1,7.53,5.31L177.64,208h12.72l18.11-50.69A8,8,0,0,1,216,152h8a8,8,0,0,0,8-8Z"></path>
        </svg>

        <span className={`message_status ${showMessageText ? "" : "hidden"}`}>
          {actionSuccessful && "- Success! ✔️"}
          {!actionSuccessful && "- Oh, snap ❌"}
        </span>
      </div>
      <div className={`spinner ${spinnerActive ? "" : "hidden"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
        </svg>
      </div>
      <span className={`message_text ${showMessageText ? "" : "hidden"}`}>
        {children}
      </span>
    </div>
  );
}

export default Message;
