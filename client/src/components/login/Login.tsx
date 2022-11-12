import { Link } from "react-router-dom";
import style from "../../styles/components/login.module.scss";

function LogIn() {
  return (
    <>
      <div className={style.container}>
        <h2>Welcome</h2>
        <h2>Registered?</h2>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <div>
          <button>Log In</button>
          <Link to="/register">register</Link>
        </div>
      </div>
    </>
  );
}

export default LogIn;
