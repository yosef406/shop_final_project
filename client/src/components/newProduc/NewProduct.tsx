import { useEffect, useState } from "react";
import productType from "../../types/productType";
import useCategories from "../../util/useCategories";
import useFetch from "../../util/useFetch";
import Button from "../button/Button";
import Input from "../input/Input";
import style from "./newProduct.module.scss";

export default function NewProduct(params: { exit: any }) {
  const { data, error, loading, request } = useFetch();
  const { categories } = useCategories();
  const [inErr, setInErr] = useState("");
  const [product, setProduct] = useState<productType>({
    _id: "",
    name: "",
    image: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (data?.success) {
      params.exit();
    }
    if (error !== "") {
      setInErr(error);
    }
  }, [data, error]);
  return (
    <>
      <div>
        <h2>Add new Product</h2>
        <Input
          label="name"
          errorChecker={(e) => {
            setInErr("");
            setProduct((val) => {
              return { ...val, name: e };
            });
            if (e === "") return "required";
            return "";
          }}
        />
        <Input
          label="image"
          errorChecker={(e) => {
            setInErr("");
            setProduct((val) => {
              return { ...val, image: e };
            });
            if (e === "") return "required";

            return "";
          }}
        />
        <Input
          label="price"
          errorChecker={(e) => {
            setInErr("");
            setProduct((val) => {
              return { ...val, price: +e };
            });
            if (e === "") return "required";
            if (isNaN(+e)) {
              setProduct((val) => {
                return { ...val, price: -1 };
              });
              return "value must be a number";
            }
            return "";
          }}
        />
        <Input
          type="dropDown"
          error="required"
          errorChecker={(e) => {
            setInErr("");
            setProduct((val) => {
              return { ...val, category: e };
            });
            if (e === "") return "required";

            return "";
          }}
          dropDown={categories}
          label="category"
        />
        <div className={style.buttonDiv}>
          <Button
            loading={loading}
            onClick={() => {
              if (
                product.name === "" ||
                product.image === "" ||
                product.price < 1 ||
                product.category === ""
              ) {
                setInErr("missing parameters");
              } else {
                request.post("/product/new", product);
              }
            }}
          >
            Save
          </Button>
          <div>
            <label className={style.errorLabel}>{inErr}</label>
          </div>
        </div>
      </div>
    </>
  );
}
