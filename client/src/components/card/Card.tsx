import styling from "./card.module.scss";
function Card(params: any) {
  let { style, children } = params;
  return (
    <>
      <div className={styling.card} style={style}>
        {children}
      </div>
    </>
  );
}

export default Card;
