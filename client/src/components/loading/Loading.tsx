import style from "./loading.module.scss";
export default function Loading(params: { size: number }) {
  let sizeClass = style.load_1;
  if (params.size === 5) sizeClass = style.load_5;
  if (params.size === 10) sizeClass = style.load_10;
  return (
    <>
      <div className={`${style.load} ${sizeClass}`}></div>
    </>
  );
}
