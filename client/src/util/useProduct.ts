import { useDispatch, useSelector } from "react-redux";
import {
    addProducts as add, removeProducts as remove, getProducts
} from "../data/slices/productsSlice"

import productType from "../types/productType";

export default function useCategories() {
    const dispatch = useDispatch();
    const products = useSelector(getProducts);

    const addProducts = (categories: productType[]) => dispatch(add(categories));
    const removeProducts = () => dispatch(remove());

    return { addProducts, removeProducts, products };
}