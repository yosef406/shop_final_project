import { useState } from "react";
import useUser from "../../util/useUser";
import Button from "../button/Button";
import Card from "../card/Card";
import NewProduct from "../newProduc/NewProduct";
import PopUp from "../popUp/PopUp";
import style from "./cart.module.scss";

export default function Cart() {
  const { role } = useUser();
  const [popUp, setPopUp] = useState(false);

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
              <h1>admin</h1>
            </Card>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
