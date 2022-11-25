import { useEffect, useRef } from "react";
import Loading from "../loading/Loading";
import style from "./button.module.scss";
export default function Button(
  params: React.DOMAttributes<HTMLButtonElement> & {
    className?: string | undefined;
    disabled?: boolean;
    loading?: boolean;
  }
) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const playDisabledAnimations = () => {
    btnRef.current?.classList.add(style.animateDisabled);
    setTimeout(() => {
      btnRef.current?.classList.remove(style.animateDisabled);
    }, 400);
  };
  useEffect(() => {
    if (params?.className) btnRef.current?.classList.add(params.className);
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
