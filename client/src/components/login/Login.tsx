import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.scss";
import Card from "../card/Card";
import Button from "../button/Button";
import useFetch from "../../util/useFetch";
import useUser from "../../util/useUser";
import useCart from "../../util/useCart";

function LogIn() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { data, loading, error, request } = useFetch();
  const { addUser, signedIn, user, removeUser } = useUser();
  const { cart, addCart } = useCart();
  const navigate = useNavigate();

  const logInBtn = () => {
    request.post("/user/login", {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });
  };

  const startShoppingBtn = () => {
    if (cart._id !== "" || user.role === "admin") {
      navigate("/");
    } else {
      request.post("/cart/new/" + user._id, {});
    }
  };

  useEffect(() => {
    if (data && data.message === "login success.") {
      addUser(data.user);
    }
    if (data && data.message === "cart created") {
      addCart(data.cart);
      navigate("/");
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
                  <Button onClick={startShoppingBtn}>Start Shopping 🛒</Button>
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
