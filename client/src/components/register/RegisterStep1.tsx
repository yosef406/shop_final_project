import Card from "../card/Card";
import Input from "../input/Input";
import style from "./registerStep.module.scss";
export default function RegisterStep1(params: any) {
  return (
    <>
      <Card>
        <div className={style.form}>
          <h3>step 1</h3>
          <Input
            disabled={params.disabled}
            label="ID"
            defaultValue={params.user.id}
            errorChecker={(e) => {
              if (e === "") return "required";
              return "";
            }}
            onChange={(e) => {
              params.setUser((val: any) => {
                return { ...val, id: e.target.value };
              });
            }}
          />
          <Input
            disabled={params.disabled}
            label="Email"
            type={"email"}
            defaultValue={params.user.email}
            errorChecker={(e) => {
              let regexp = new RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
              if (e === "") return "required";
              if (!regexp.test(e)) return "invalid";
              return "";
            }}
            onChange={(e) => {
              let regexp = new RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
              if (regexp.test(e.target.value)) {
                params.setUser((val: any) => {
                  return { ...val, email: e.target.value };
                });
              } else {
                params.setUser((val: any) => {
                  return { ...val, email: "" };
                });
              }
            }}
          />
          <Input
            disabled={params.disabled}
            label="password"
            type={"password"}
            defaultValue={params.user.password}
            errorChecker={(e) => {
              if (e === "") return "required";
              if (!/\d/.test(e)) return "must contain numbers";
              if (!/^(?=.*[!@#$%^&*])/.test(e))
                return "must contain special characters";
              if (e.length < 6 || e.length > 16)
                return "must be 6-16 letters long";
              return "";
            }}
            onChange={(e) => {
              let regexp = new RegExp(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
              );
              let val = regexp.test(e.target.value);
              if (val) {
                params.setUser((val: any) => {
                  return { ...val, password: e.target.value };
                });
              } else {
                params.setUser((val: any) => {
                  return { ...val, password: "" };
                });
              }
            }}
          />
          <Input
            disabled={params.disabled}
            label="Password Confirm"
            type={"password"}
            defaultValue={params.user.re_password}
            errorChecker={(e) => {
              if (e === "") return "required";
              if (e !== params.user.password) {
                return "passwords don't match";
              }
              return "";
            }}
            onChange={(e) => {
              if (e.target.value === params.user.password) {
                params.setUser((val: any) => {
                  return { ...val, re_password: e.target.value };
                });
              } else {
                params.setUser((val: any) => {
                  return { ...val, re_password: "" };
                });
              }
            }}
          />
          <label className={style.error}>{params.error}</label>
        </div>
      </Card>
    </>
  );
}
