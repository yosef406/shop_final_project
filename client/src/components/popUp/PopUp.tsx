import { useEffect, useRef } from "react";
import Card from "../card/Card";
import style from "./popUp.module.scss";

/**
 *  currently this is a removable pop up
 *  a better way is to check if it is removable
 *  it can be removed by using a function from parent
 */
export default function PopUp(params: any) {
  const popUpRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      popUpRef.current != null &&
      (params.display != null || params.display !== undefined) &&
      (params.setDisplay != null || params.setDisplay !== undefined)
    ) {
      popUpRef.current.style.display =
        params.display === true ? "flex" : "none";
    } else {
      console.error(`'display' and 'setDisplay' must be provided,
      \ncurrent 'display' =${params.display},\n
      current 'setDisplay' = ${params.setDisplay}`);
    }
  });

  const hide = () => {
    params.setDisplay(false);
  };

  return (
    <>
      <div ref={popUpRef} className={style.popUp}>
        <div className={`${style.side} ${style.top}`} onClick={hide}></div>
        <div className={style.popUpRow}>
          <div className={style.side} onClick={hide}></div>
          <div className={style.main}>
            <Card>{params.children}</Card>
          </div>
          <div className={style.side} onClick={hide}></div>
        </div>
        <div className={`${style.side} ${style.top}`} onClick={hide}></div>
      </div>
    </>
  );
}
