import productType from "../../types/productType";
import useCategories from "../../util/useCategories";
import Button from "../button/Button";
import Card from "../card/Card";
import style from "./product.module.scss";

export default function Product(params: { value?: productType | undefined }) {
  const product = params.value ?? null;
  const { getCategoryName } = useCategories();
  return (
    <>
      {product != null ? (
        <>
          <Card className={style.cardStyle}>
            <div className={style.container}>
              <img
                src={product?.image}
                alt="product"
                className={style.productImage}
              />
              <h3>{product?.name}</h3>
              <label>{getCategoryName(product?.category)}</label>
              <h3>{product?.price} $</h3>
              <div className={style.productButton}>
                <Button onClick={() => {}}>Add</Button>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <>
          <Card className={style.cardStyle}>
            <div className={style.container}>
              <div className={style.skeletonImage}></div>
              <div className={style.skeletonTextL}></div>
              <div className={style.skeletonTextS}></div>
              <div className={style.skeletonTextL}></div>
              <div className={style.productButton}>
                <Button loading={true}>Add</Button>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
