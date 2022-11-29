import { useEffect, useState } from "react";
import useCart from "../../util/useCart";
import useFetch from "../../util/useFetch";
import useProduct from "../../util/useProduct";
import useUser from "../../util/useUser";
import Button from "../button/Button";
import Card from "../card/Card";
import CartItem from "../cartItem/CartItem";
import CheckOut from "../checkOut/CheckOut";
import NewProduct from "../newProduc/NewProduct";
import PopUp from "../popUp/PopUp";
import style from "./cart.module.scss";

export default function Cart() {
  const { role, user } = useUser();
  const { productCount, addCart, cart } = useCart();
  const [popUp, setPopUp] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const { data, loading, request } = useFetch();

  useEffect(() => {
    if (cart._id === "" && role !== "admin") {
      request.get("/cart/open/" + user._id);
    }
  });

  useEffect(() => {
    if (data && data.message === "found open cart") {
      addCart(data.cart);
    }
  }, [data]);

  return (
    <>
      {role === "admin" ? (
        <>
          <PopUp setDisplay={setPopUp} display={popUp}>
            <NewProduct exit={() => setPopUp(false)} />
          </PopUp>
          <div className={style.container}>
            <Card className={style.cart}>
              <div className={style.addButtonDiv}>
                <Button
                  onClick={() => {
                    setPopUp(true);
                  }}
                >
                  Add Product
                </Button>
              </div>
              <h1>admin panel</h1>
            </Card>
          </div>
        </>
      ) : (
        <>
          <CheckOut setDisplay={setCheckOut} display={checkOut} />

          <div className={style.container}>
            <Card className={style.cart}>
              <h1>Cart</h1>
              {productCount.map((val) => (
                <CartItem
                  key={val._id}
                  disabled={loading}
                  val={val}
                  deletable={true}
                />
              ))}
              <div>
                <h2>total price: {cart.total_price} $</h2>
                <Button
                  onClick={() => {
                    setCheckOut(true);
                  }}
                  loading={loading}
                >
                  Check Out
                </Button>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
