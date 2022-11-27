import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import categoryReducer from './slices/categorySlice';
export default configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        categories: categoryReducer
    }
});