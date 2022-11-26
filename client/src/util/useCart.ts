import { useDispatch, useSelector } from "react-redux";
import {
    getCart,
    addCart as addCartAction,
    addProduct as addProductAction,
    removeProduct as removeProductAction,
    removeCart as removeCartAction
} from "../data/slices/cartSlice"

import cartType from "../types/cartType";

export default function useCart() {
    const dispatch = useDispatch();
    const cart = useSelector(getCart);

    const addCart = (cart: cartType) => dispatch(addCartAction(cart));
    const removeCart = () => dispatch(removeCartAction());
    const addProduct = (product: string) => dispatch(addProductAction(product))
    const removeProduct = (product: string) => dispatch(removeProductAction(product))

    return { cart, addCart, removeCart, addProduct, removeProduct };
}