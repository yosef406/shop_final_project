import { useState } from "react";
import categoryType from "../../types/categoryType";
import style from "./input.module.scss";
export default function Input(
  params: React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string | undefined;
    error?: string | undefined;
    className?: string | undefined;
    dropDown?: [categoryType] | undefined;
    errorChecker?: (e: string, value?: string) => string;
    ref?: React.LegacyRef<HTMLInputElement>;
  }
) {
  const [errorLabel, setError] = useState(params.error);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(params.error);
    if (params.onChange) params.onChange(e);
    if (params.errorChecker)
      setError(params.errorChecker(e.target.value, errorLabel));
  };
  if (params.type && params.type === "dropDown" && !params.dropDown) {
    console.error("dropDown is required");
  }
  return (
    <>
      <div className={`${style.main}`}>
        {params.label ? <label>{params.label}</label> : ""}
        <div className={`${style.inputDiv}`}>
          {params.type && params.type === "dropDown" ? (
            <select
              name={params.label}
              className={`${style.input} ${params.className ?? ""}
            ${errorLabel && errorLabel !== "" ? style.errorIn : ""}`}
            >
              {params.dropDown
                ? params.dropDown.map((val) => (
                    <option value={val._id}>{val.name}</option>
                  ))
                : ""}
            </select>
          ) : (
            <input
              disabled={params.disabled}
              defaultValue={params.defaultValue}
              className={`${style.input} ${params.className ?? ""}
          ${errorLabel && errorLabel !== "" ? style.errorIn : ""}`}
              ref={params.ref}
              type={params.type ?? "text"}
              onChange={onChange}
            />
          )}
          <label>{errorLabel}</label>
        </div>
      </div>
    </>
  );
}
