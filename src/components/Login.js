import { useState } from "react";

function Login({ dispatch, isOpenWC, status }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    dispatch({ type: "login", payload: { loginUsername, loginPassword } });
  }
  console.log(isOpenWC);
  return (
    <div className={`container welcome_container ${isOpenWC ? "" : "hidden"}`}>
      <h1>
        <em>Already with us?</em>
        <br /> <strong>Hop back in, silly!</strong>
      </h1>
      <form className="form_login" onSubmit={handleLogin}>
        <input
          className="input input_login"
          placeholder="username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          className="input input_password"
          placeholder="password "
          value={loginPassword}
          onChange={(e) => setLoginPassword(+e.target.value)}
        />
        <button className="btn btn_login"></button>
      </form>
      <h1 className="signup_box">
        <em>Not yet a member?</em>
        <br />
        <strong>Open an account &rarr;</strong>
      </h1>
      <button
        className="btn btn_signup"
        onClick={() =>
          dispatch({ type: "openFormCreateAccount", payload: status })
        }
      >
        SIGN UP
      </button>
    </div>
  );
}

export default Login;
