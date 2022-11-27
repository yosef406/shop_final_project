import { createSlice } from '@reduxjs/toolkit'
import categoryType from '../../types/categoryType';

export const categorySlice = createSlice({

    name: 'category',
    initialState: {
        value: [{
            __v: 0,
            _id: "",
            name: "",
        }]
    },

    reducers: {
        addCategories: (state, action) => {
            state.value = [{ __v: 0, _id: "", name: "" }, ...action.payload];
        },

        removeCategories: (state) => {
            state.value = [{
                __v: 0,
                _id: "",
                name: "",
            }]
        }
    },
});

export const { addCategories, removeCategories } = categorySlice.actions;

export const getCategories = (state: { categories: { value: categoryType[] } }) => state.categories.value;


export default categorySlice.reducer;
