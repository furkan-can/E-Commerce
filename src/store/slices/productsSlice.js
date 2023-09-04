import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    filteredProducts: [],
    filterByBrands: [],
    filterByModels: [],
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.filterByModels = [];
      state.filterByBrands = [];
      state.allProducts = action.payload;
    },
    addFilteredProductsByBrands: (state, action) => {
      state.filterByBrands = [ ...action.payload];
      state.filteredProducts = [...action.payload];
    },
    addFilteredProductsByModels: (state, action) => {
      state.filterByModels = [ ...action.payload];
      state.filteredProducts = [ ...action.payload];
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
      state.isFilterActive = true;
    },
    clearFilterProduct: (state) => {
      state.filteredProducts = [];
      state.isFilterActive = false;
    },
    clearFilterProductByBrands: (state) => {
      state.filteredProducts = state.filteredProducts.filter((product) => {
        return !state.filterByBrands.some((brand) => {
          return brand.id === product.id;
        });
      });

      state.isFilterActive = false;
    },
    clearFilterProductByModels: (state) => {
      state.filteredProducts = state.filteredProducts.filter((product) => {
        return !state.filterByModels.some((model) => {
          return model.id === product.id;
        });
      });
      state.isFilterActive = false;
    },

  },
});

export const { setAllProducts, addFilteredProductsByBrands, addFilteredProductsByModels, setFilteredProducts, clearFilterProduct, clearFilterProductByBrands, clearFilterProductByModels } = productSlice.actions;
export default productSlice.reducer;