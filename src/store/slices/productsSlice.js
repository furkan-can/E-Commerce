import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
      state.isFilterActive = true; 
    },
    clearFilterProduct: (state) => {
      state.filteredProducts = [];
      state.isFilterActive = false; 
    },
  },
});

export const { setAllProducts, setFilteredProducts, clearFilterProduct } = productSlice.actions;
export default productSlice.reducer;