import { useEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import style from "./login.module.scss";
import Card from "../card/Card";
import Button from "../button/Button";
import useFetch from "../../util/useFetch";
import useUser from "../../util/useUser";

function LogIn() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { data, loading, error, sendRequest } = useFetch();
  const { addUser, signedIn, user, removeUser } = useUser();
  const navigate = useNavigate();

  const logInBtn = () => {
    sendRequest("/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });
  };

  useEffect(() => {
    if (data) {
      addUser(data.user);
    }
  }, [data]);

  return (
    <>
      <Card>
        <div className={style.container}>
          <h2>Welcome</h2>
          {signedIn ? (
            <>
              <h1>name: {`${user.first_name} ${user.last_name}`}</h1>
              <h1>email: {`${user.email}`}</h1>
              <h1>address: {`${user.city} ${user.street}`}</h1>
              <div className={style.logOutDiv}>
                <div>
                  <Button onClick={() => navigate("/")}>
                    Start Shopping 🛒
                  </Button>
                </div>
                <div>
                  <Button className={style.logOutBtn} onClick={removeUser}>
                    Log Out
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>Registered?</h2>
              <div className={style.form}>
                <input ref={emailRef} type="email" placeholder="Email" />
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                />
                {error ? (
                  <label className={style.errorLabel}>{error}</label>
                ) : (
                  ""
                )}
                <div className={style.buttonDiv}>
                  <Button onClick={logInBtn} loading={loading} disabled={false}>
                    Log In
                  </Button>
                  <label>- or -</label>
                  <Link to="/register">register</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </>
  );
}

export default LogIn;
