import { Route, Routes } from "react-router-dom";
import style from "./App.module.scss";
import Header from "./components/header/Header";
import ErrorPage from "./pages/error/ErrorPage";
import LogInPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ShoppingPage from "./pages/shopping/ShoppingPage";

function App() {
  return (
    <>
      <div className={style.background}>
        <Header />
        <div className={style.centerContainer}>
          <div className={style.container}>
            <Routes>
              <Route path="/" element={<ShoppingPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* <Route path="/rerender/:path" element={<></>} /> */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
