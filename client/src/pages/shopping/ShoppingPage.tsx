import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Cart from "../../components/cart/Cart";
import FilterBar from "../../components/filterBar/FilterBar";
import Product from "../../components/product/Product";
import productType from "../../types/productType";
import useFetch from "../../util/useFetch";
import useProduct from "../../util/useProduct";
import useUser from "../../util/useUser";
import style from "./shoppingPage.module.scss";
function ShoppingPage() {
  const { signedIn } = useUser();
  const { products, addProducts } = useProduct();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { data, error, loading } = useFetch("/product/all");
  useEffect(() => {
    if (data && data.message === "found products") {
      addProducts(data.products);
    }
  }, [data]);

  if (!signedIn) return <Navigate to="/login" />;
  return (
    <>
      <div>
        <FilterBar setSearch={setSearch} setCategory={setCategory} />
        <div className={style.body}>
          <Cart />
          <div className={style.productsList}>
            {loading ? (
              <>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
              </>
            ) : (
              products
                .filter((val) => {
                  if (category !== "") {
                    if (val.category === category) return true;
                    else return false;
                  }
                  return true;
                })
                .filter((val) => {
                  if (search !== "") {
                    return val.name.includes(search);
                  }
                  return true;
                })
                .map((val: productType) => (
                  <Product key={val._id} value={val} />
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingPage;
