import { useState } from "react";
import categoryType from "../../types/categoryType";
import style from "./input.module.scss";
export default function Input(
  params: React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> & {
    label?: string | undefined;
    error?: string | undefined;
    className?: string | undefined;
    dropDown?: categoryType[] | undefined;
    errorChecker?: (e: string, value?: string) => string;
  }
) {
  const [errorLabel, setError] = useState(params.error);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
              onChange={onChange}
              name={params.label}
              className={`${style.input} ${params.className ?? ""}
            ${errorLabel && errorLabel !== "" ? style.errorIn : ""}`}
            >
              {params.dropDown
                ? params.dropDown.map((val) => (
                    <option key={val._id} value={val._id}>
                      {val.name}
                    </option>
                  ))
                : ""}
            </select>
          ) : (
            <input
              disabled={params.disabled}
              defaultValue={params.defaultValue}
              className={`${style.input} ${params.className ?? ""}
          ${errorLabel && errorLabel !== "" ? style.errorIn : ""}`}
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
