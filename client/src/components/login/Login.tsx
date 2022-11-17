import { useRef } from "react";
import { Link } from "react-router-dom";
import style from "./login.module.scss";
import Card from "../card/Card";

function LogIn() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const logInBtn = () => {};

  return (
    <>
      <Card>
        <div className={style.container}>
          <h2>Welcome</h2>
          <h2>Registered?</h2>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <div>
            <button onClick={logInBtn}>Log In</button>
            <Link to="/register">register</Link>
          </div>
        </div>
      </Card>
    </>
  );
}

export default LogIn;
