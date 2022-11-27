import { useEffect, useState } from "react";
import useCategories from "../../util/useCategories";
import useFetch from "../../util/useFetch";
import useUser from "../../util/useUser";
import Button from "../button/Button";
import Input from "../input/Input";
import PopUp from "../popUp/PopUp";
import style from "./filterBar.module.scss";
export default function FilterBar(params: {
  setSearch: Function;
  setCategory: Function;
}) {
  const { categories, addCategories } = useCategories();
  const { data, error, loading, request } = useFetch("/category");
  const { role } = useUser();
  const [popUp, setPopUp] = useState(false);
  const [newCat, setNewCat] = useState("");
  useEffect(() => {
    if (data && data.message === "categories found") {
      addCategories(data.result);
    } else if (data && data.message === "category created") {
      request.get("/category");
      setNewCat("");
      setPopUp(false);
    }
  }, [data]);

  return (
    <>
      {role === "admin" ? (
        <PopUp setDisplay={setPopUp} display={popUp}>
          <div className={style.newCategory}>
            <Input
              value={newCat}
              label="new Category name"
              errorChecker={(e) => {
                setNewCat(e);
                if (e === "") return "required";
                return "";
              }}
            />
            <div>
              <label className={style.errorLabel}>{error}</label>
              <Button
                loading={loading}
                onClick={() => {
                  if (newCat !== "") {
                    request.post("/category", { name: newCat });
                  }
                }}
              >
                save
              </Button>
            </div>
          </div>
        </PopUp>
      ) : (
        ""
      )}
      <div className={style.container}>
        <div>
          <Input
            label="search"
            onChange={(e) => params.setSearch(e.target.value)}
          />
        </div>
        <div className={style.categoryDiv}>
          <Input
            label="category"
            type="dropDown"
            dropDown={categories}
            onChange={(e) => params.setCategory(e.target.value)}
          />
          {role === "admin" ? (
            <>
              <Button onClick={() => setPopUp(true)}>add Category</Button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
