import style from "./input.module.scss";
export default function Input(
  params: React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string | undefined;
    error?: string | undefined;
    className?: string | undefined;
    ref?: React.LegacyRef<HTMLInputElement>;
  }
) {
  return (
    <>
      <div className={`${style.main}`}>
        {params.label ? <label>{params.label}</label> : ""}
        <div className={`${style.inputDiv}`}>
          <input
            className={`${style.input} ${params.className ?? ""}
            ${params.error && params.error !== "" ? style.errorIn : ""}`}
            ref={params.ref}
            type={params.type ?? "text"}
            onChange={params.onChange}
          />
          <label>{params.error}</label>
        </div>
      </div>
    </>
  );
}
