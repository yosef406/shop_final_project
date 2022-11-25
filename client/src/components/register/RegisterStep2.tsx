import userEvent from "@testing-library/user-event";
import Card from "../card/Card";
import Input from "../input/Input";
import style from "./registerStep.module.scss";

export default function RegisterStep2(params: any) {
  const errorCheck = (e: string) => {
    if (e === "") return "required";
    return "";
  };
  return (
    <>
      <Card>
        <div className={style.form}>
          <h3>step 2</h3>
          <Input
            disabled={params.disabled}
            label="City"
            errorChecker={errorCheck}
            defaultValue={params.user.city}
            onChange={(e) => {
              params.setUser((val: any) => {
                return { ...val, city: e.target.value };
              });
            }}
          />
          <Input
            disabled={params.disabled}
            label="Street"
            errorChecker={errorCheck}
            defaultValue={params.user.street}
            onChange={(e) => {
              params.setUser((val: any) => {
                return { ...val, street: e.target.value };
              });
            }}
          />
          <Input
            disabled={params.disabled}
            label="First Name"
            errorChecker={errorCheck}
            defaultValue={params.user.first_name}
            onChange={(e) => {
              params.setUser((val: any) => {
                return { ...val, first_name: e.target.value };
              });
            }}
          />
          <Input
            disabled={params.disabled}
            label="Last Name"
            errorChecker={errorCheck}
            defaultValue={params.user.last_name}
            onChange={(e) => {
              params.setUser((val: any) => {
                return { ...val, last_name: e.target.value };
              });
            }}
          />
        </div>
      </Card>
    </>
  );
}
