import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import RegisterStep1 from "../../components/register/RegisterStep1";
import RegisterStep2 from "../../components/register/RegisterStep2";
import useFetch from "../../util/useFetch";
import style from "./registerPage.module.scss";
function RegisterPage() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
    city: "",
    street: "",
  });
  const [step, setStep] = useState(1);
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    if (!loading && data != null && step === 1) {
      if (data.success) setStep(2);
    }
    if (!loading && data != null && step === 2) {
      if (data.success) navigate("/login");
    }
  }, [loading, data]);

  return (
    <>
      <div>
        {step === 1 ? (
          <RegisterStep1
            error={error}
            disabled={loading}
            setUser={setNewUser}
            user={newUser}
          />
        ) : (
          <RegisterStep2
            error={error}
            disabled={loading}
            setUser={setNewUser}
            user={newUser}
          />
        )}
        <div className={style.buttonsDiv}>
          {step === 2 ? (
            <Button onClick={() => setStep(1)} disabled={loading}>
              Back
            </Button>
          ) : (
            <Button
              disabled={loading}
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </Button>
          )}
          {step === 1 ? (
            <Button
              onClick={() => {
                request.post("/user/check-register", {
                  id: newUser.id,
                  email: newUser.email,
                  password: newUser.password,
                  re_password: newUser.re_password,
                });
              }}
              disabled={
                newUser.id === "" ||
                newUser.email === "" ||
                newUser.password === "" ||
                newUser.re_password === ""
              }
              loading={loading}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => {
                request.post("/user/register", newUser);
              }}
              loading={loading}
              disabled={
                newUser.city === "" ||
                newUser.street === "" ||
                newUser.first_name === "" ||
                newUser.last_name === ""
              }
            >
              Register
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
