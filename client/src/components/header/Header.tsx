import useUser from "../../util/useUser";
import Button from "../button/Button";
import style from "./header.module.scss";
function Header() {
  const { user, removeUser } = useUser();
  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <div>
            <h1>Shopi</h1>
          </div>
          <div>
            <div>
              <h3>
                <span>Contact Us:</span>
                <span> Support@Shopi.co</span>
              </h3>
            </div>
            {user.signedIn ? (
              <div className={style.user}>
                <label>
                  Welcome {user.first_name} {user.last_name}
                </label>
                <Button className={style.logOutBtn} onClick={removeUser}>
                  Log out
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
