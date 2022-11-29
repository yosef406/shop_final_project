import { useEffect, useState } from "react";
import useCart from "../../util/useCart";
import useFetch from "../../util/useFetch";
import useUser from "../../util/useUser";
import Button from "../button/Button";
import CartItem from "../cartItem/CartItem";
import Input from "../input/Input";
import PopUp from "../popUp/PopUp";
import style from "./checkOut.module.scss";

export default function CheckOut(params: {
  setDisplay: Function;
  display: boolean;
}) {
  const { addCart, productCount, cart } = useCart();
  const { user } = useUser();
  const { data, loading, request } = useFetch();
  const [done, setDone] = useState(false);
  const [orderData, setOrderData] = useState({
    delivery_city: "",
    delivery_street: "",
    delivery_date: "",
    credit_card: "",
  });

  useEffect(() => {
    if (data) {
      if (data.message === "cart closed") {
        request.post("/cart/new/" + cart.user_id, {});
      }
      if (data.message === "cart created") {
        addCart(data.cart);
        setOrderData({
          delivery_city: "",
          delivery_street: "",
          delivery_date: "",
          credit_card: "",
        });
        setDone(true);
      }
    }
  }, [data]);
  const onDoubleClick = () => {
    let date = new Date();

    setOrderData({
      ...orderData,
      delivery_city: user.city,
      delivery_street: user.street,
      delivery_date:
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        (date.getDate() + 1),
    });
  };
  return (
    <>
      <PopUp setDisplay={params.setDisplay} display={params.display}>
        {done ? (
          <div>
            <h1>Your order has been sent 😊</h1>
            <div>
              <Button
                onClick={() => {
                  params.setDisplay(false);
                  setDone(false);
                }}
              >
                Exit
              </Button>
            </div>
          </div>
        ) : (
          <div className={style.container}>
            <div className={style.cart}>
              <h2>Cart</h2>
              {productCount.map((val) => (
                <CartItem
                  key={val._id}
                  disabled={loading}
                  val={val}
                  deletable={false}
                />
              ))}
              <div className={style.spacer}></div>
              <h2>total price: {cart.total_price} $</h2>
            </div>
            <hr />
            <div className={style.order}>
              <h2>Order</h2>
              <h3>Shipping details: </h3>
              <hr />
              <Input
                label="City"
                value={orderData.delivery_city}
                onDoubleClick={onDoubleClick}
                errorChecker={(e) => {
                  setOrderData({ ...orderData, delivery_city: e });
                  if (e === "") return "required";
                  return "";
                }}
              />
              <Input
                label="Street"
                value={orderData.delivery_street}
                onDoubleClick={onDoubleClick}
                errorChecker={(e) => {
                  setOrderData({ ...orderData, delivery_street: e });
                  if (e === "") return "required";
                  return "";
                }}
              />
              <Input
                label="ShippingDate"
                type={"date"}
                value={orderData.delivery_date}
                errorChecker={(e) => {
                  setOrderData({ ...orderData, delivery_date: e });
                  if (e === "") return "required";
                  return "";
                }}
              />
              <h3>Payment: </h3>
              <hr />
              <Input
                type={"number"}
                label="Credit Card: "
                value={orderData.credit_card}
                errorChecker={(e) => {
                  setOrderData({
                    ...orderData,
                    credit_card: e.substring(0, 4),
                  });
                  if (e.length !== 4) return "must be 4 numbers max";
                  if (e === "") return "required";
                  return "";
                }}
              />

              <div className={style.btnDiv}>
                <Button
                  loading={loading}
                  disabled={
                    (orderData.credit_card.length !== 4 &&
                      orderData.delivery_city === "" &&
                      orderData.delivery_date === "" &&
                      orderData.delivery_street === "") ||
                    productCount.length < 1
                  }
                  onClick={() => {
                    request.post("/cart/order/" + cart._id, orderData);
                  }}
                >
                  Order
                </Button>
              </div>
            </div>
          </div>
        )}
      </PopUp>
    </>
  );
}
