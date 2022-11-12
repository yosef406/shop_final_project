import style from "../../styles/components/header.module.scss";
function Header() {
  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <div>
            <h1>Shopi</h1>
          </div>
          <div>
            <div>
              <h3>Contact Us: Support@Shopi.co</h3>
            </div>
            {/* <div className={style.user}>
              <label>Welcome user</label>
              <button>Log Out</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
