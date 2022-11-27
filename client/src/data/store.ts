import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import categorySlice from './slices/categorySlice';
import productsSlice from './slices/productsSlice';
export default configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        categories: categorySlice,
        products: productsSlice
    }
});