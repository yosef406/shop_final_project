import { useDispatch, useSelector } from "react-redux";
import {
    addProducts as add, removeProducts as remove, insertProduct as insert, getProducts
} from "../data/slices/productsSlice"

import productType from "../types/productType";

export default function useProduct() {
    const dispatch = useDispatch();
    const products = useSelector(getProducts);

    const addProducts = (products: productType[]) => dispatch(add(products));
    const insertProduct = (product: productType) => dispatch(insert(product));
    const removeProducts = () => dispatch(remove());

    return { addProducts, removeProducts, products, insertProduct };
}