import { useDispatch, useSelector } from "react-redux";
import {
    addCategories as add, removeCategories as remove, getCategories
} from "../data/slices/categorySlice"

import categoryType from "../types/categoryType";

export default function useCategories() {
    const dispatch = useDispatch();
    const categories = useSelector(getCategories);

    const getCategoryName = (_id: string) => {
        return categories.filter((val) => val._id === _id)[0].name;
    }
    const addCategories = (categories: categoryType[]) => dispatch(add(categories));
    const removeCategories = () => dispatch(remove());

    return { addCategories, removeCategories, categories, getCategoryName };
}