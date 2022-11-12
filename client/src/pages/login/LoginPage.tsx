import About from "../../components/about/About";
import Featured from "../../components/featured/Featured";
import LogIn from "../../components/login/Login";
import style from "../../styles/pages/loginPage.module.scss";

function LogInPage() {
  return (
    <>
      <div className={style.container}>
        <LogIn />
        <About />
        <Featured />
      </div>
    </>
  );
}

export default LogInPage;
