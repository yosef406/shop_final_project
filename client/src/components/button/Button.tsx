import { useEffect, useRef } from "react";
import Loading from "../loading/Loading";
import style from "./button.module.scss";
export default function Button(params: any) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const playDisabledAnimations = () => {
    btnRef.current?.classList.add(style.animateDisabled);
    setTimeout(() => {
      btnRef.current?.classList.remove(style.animateDisabled);
    }, 400);
  };
  useEffect(() => {
    btnRef.current?.classList.add(params.className);
  });

  return (
    <>
      <button
        ref={btnRef}
        className={`
        ${
          params?.disabled
            ? style.disabled
            : params?.loading
            ? style.loading
            : style.active
        } ${style.row} ${style.button}
        `}
        onClick={params?.disabled ? playDisabledAnimations : params.onClick}
      >
        {
          <>
            {params?.loading && !params?.disabled ? (
              <span>
                <Loading size={1} />
              </span>
            ) : (
              ""
            )}
            {params.children}
          </>
        }
      </button>
    </>
  );
}
