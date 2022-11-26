import { createSlice } from '@reduxjs/toolkit'
import cartType from '../../types/cartType';

export const cartSlice = createSlice({

    name: 'cart',
    initialState: {
        value: {
            _id: "",
            user_id: "",
            products: new Array<string>(),
            total_price: 0,
            open: false
        }
    },

    reducers: {
        addCart: (state, action) => {
            state.value = action.payload;
        },
        addProduct: (state, action) => {
            state.value.products.push(action.payload)
        },
        removeProduct: (state, action) => {
            let index = state.value.products.indexOf(action.payload);
            if (index !== -1) {
                state.value.products.splice(index, 1);
            }
        },
        removeCart: (state) => {
            state.value = {
                _id: "",
                user_id: "",
                products: [],
                total_price: 0,
                open: false
            }
        }
    },
});

export const { addCart, removeCart, addProduct, removeProduct } = cartSlice.actions;

export const getCart = (state: { cart: { value: cartType } }) => state.cart.value;


export default cartSlice.reducer;
