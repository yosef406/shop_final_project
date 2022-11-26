import styling from "./card.module.scss";
function Card(params: any) {
  let { className, children } = params;

  return (
    <>
      <div className={`${styling.card} ${className ?? ""}`}>{children}</div>
    </>
  );
}

export default Card;
