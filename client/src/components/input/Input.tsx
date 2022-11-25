import { useState } from "react";
import style from "./input.module.scss";
export default function Input(
  params: React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string | undefined;
    error?: string | undefined;
    className?: string | undefined;
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

  return (
    <>
      <div className={`${style.main}`}>
        {params.label ? <label>{params.label}</label> : ""}
        <div className={`${style.inputDiv}`}>
          <input
            disabled={params.disabled}
            defaultValue={params.defaultValue}
            className={`${style.input} ${params.className ?? ""}
            ${errorLabel && errorLabel !== "" ? style.errorIn : ""}`}
            ref={params.ref}
            type={params.type ?? "text"}
            onChange={onChange}
          />
          <label>{errorLabel}</label>
        </div>
      </div>
    </>
  );
}
