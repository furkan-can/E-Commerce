import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import brandsReducer from './slices/brandSlice';
import modelsReducer from './slices/modelSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  brands: brandsReducer,
  models: modelsReducer,
});

export default rootReducer;