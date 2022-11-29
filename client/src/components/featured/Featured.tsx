import style from "./featured.module.scss";
import Card from "../card/Card";
import useFetch from "../../util/useFetch";
import Loading from "../loading/Loading";
import { useEffect, useState } from "react";
import useUser from "../../util/useUser";
import useCart from "../../util/useCart";
function Featured() {
  const { data, loading, error, request } = useFetch("/product/featured");
  const { addCart } = useCart();
  const { signedIn, user, role } = useUser();
  const [featImg, setFeatImg] = useState("");
  const [productCnt, setProductCnt] = useState(0);
  const [orderCnt, setOrderCnt] = useState(0);
  const [notification, setNotification] = useState("");
  useEffect(() => {
    if (data) {
      switch (data.message) {
        case "found open cart":
          setNotification("You have an open Cart.");
          addCart(data.cart);
          break;
        case "found last order":
          setNotification("You have no open Carts.");
          break;
        case "no open carts or orders":
          role === "admin"
            ? setNotification("Welcome admin.")
            : setNotification("Welcome new user.");
          break;
        case "found featured":
          setFeatImg(data.result.imageData);
          setOrderCnt(data.result.orderCount);
          setProductCnt(data?.result.orderCount);
          break;

        default:
          break;
      }
    }
  }, [data]);

  useEffect(() => {
    if (signedIn) {
      request.get("/cart/open/" + user._id);
    } else setNotification("");
  }, [signedIn, user]);
  return (
    <>
      <Card>
        <div className={style.container}>
          <img src={featImg} className={style.image} alt="product" />
          {loading ? (
            <Loading size={5} />
          ) : (
            <>
              {error === "" ? (
                <>
                  <div>
                    <h2>Number of Products: {productCnt}</h2>
                    <h2>Number of Orders: {orderCnt}</h2>
                  </div>
                  {notification !== "" ? (
                    <div className={style.notification}>
                      <h2>Notifications: </h2>
                      <h2>{notification}</h2>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <h2 className={style.error}>{error}</h2>
              )}
            </>
          )}
        </div>
      </Card>
    </>
  );
}

export default Featured;
