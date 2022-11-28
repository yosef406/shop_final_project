import { useEffect } from "react";
import useCart from "../../util/useCart";
import useFetch from "../../util/useFetch";
import useProduct from "../../util/useProduct";
import Button from "../button/Button";
import style from "./cartItem.module.scss";

export default function CartItem({
  val,
  disabled,
}: {
  val: { _id: string; num: number };
  disabled: boolean;
}) {
  const { addCart, cart } = useCart();
  const { products } = useProduct();
  const { data, loading, request } = useFetch();
  useEffect(() => {
    if (data && data.message === "product removed from cart") {
      addCart(data.cart);
    }
  }, [data]);
  return (
    <>
      <div className={style.row}>
        <h2>X{val.num}</h2>
        <h3>{products.filter((prod) => prod._id === val._id)[0].name}</h3>
        <h2>
          {products.filter((prod) => prod._id === val._id)[0].price * val.num} $
        </h2>
        <Button
          loading={loading}
          disabled={disabled}
          onClick={() =>
            request.post("/cart/remove-product/" + cart._id, {
              productId: val._id,
            })
          }
        >
          X
        </Button>
      </div>
    </>
  );
}
