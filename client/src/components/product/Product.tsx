import { useEffect } from "react";
import productType from "../../types/productType";
import useCart from "../../util/useCart";
import useCategories from "../../util/useCategories";
import useFetch from "../../util/useFetch";
import useUser from "../../util/useUser";
import Button from "../button/Button";
import Card from "../card/Card";
import style from "./product.module.scss";

export default function Product(params: { value?: productType | undefined }) {
  const product = params.value ?? null;
  const { getCategoryName } = useCategories();
  const { addCart, cart } = useCart();
  const { data, loading, request } = useFetch();
  const { role } = useUser();

  useEffect(() => {
    if (data && data.message === "product added to cart") {
      addCart(data.cart);
    }
  }, [data]);
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
              {role !== "admin" ? (
                <div className={style.productButton}>
                  <Button
                    loading={loading}
                    onClick={() => {
                      if (params.value?._id) {
                        request.post("/cart/add-product/" + cart._id, {
                          productId: params.value?._id,
                        });
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              ) : (
                ""
              )}
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
