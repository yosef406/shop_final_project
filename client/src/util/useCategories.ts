import { useDispatch, useSelector } from "react-redux";
import {
    addCategories as add, removeCategories as remove, getCategories
} from "../data/slices/categorySlice"

import categoryType from "../types/categoryType";

export default function useCategories() {
    const dispatch = useDispatch();
    const categories = useSelector(getCategories);

    const addCategories = (categories: categoryType[]) => dispatch(add(categories));
    const removeCategories = () => dispatch(remove());

    return { addCategories, removeCategories, categories };
}