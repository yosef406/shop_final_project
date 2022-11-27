import { createSlice } from '@reduxjs/toolkit'
import productType from '../../types/productType';

export const productsSlice = createSlice({

    name: 'products',
    initialState: {
        value: [{
            _id: "",
            name: "",
            image: "",
            price: "",
            category: "",
            __v: 0
        }]
    },

    reducers: {
        insertProduct: (state, action) => {
            state.value = [...state.value, action.payload];
        },
        addProducts: (state, action) => {
            state.value = action.payload;
        },

        removeProducts: (state) => {
            state.value = [{
                _id: "",
                name: "",
                image: "",
                price: "",
                category: "",
                __v: 0
            }]
        }
    },
});

export const { addProducts, removeProducts, insertProduct } = productsSlice.actions;

export const getProducts = (state: { products: { value: productType[] } }) => state.products.value;


export default productsSlice.reducer;
