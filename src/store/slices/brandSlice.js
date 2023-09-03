import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    allbrands: [],
  },
  reducers: {
    setAllbrands: (state, action) => {
      state.allbrands = action.payload;
    },
    setFilteredbrands: (state, action) => {
      state.filteredbrands = action.payload;
      state.isFilterActive = true; // Filtre etkinleştirildi
    },
    clearFilterBrand: (state) => {
      state.filteredbrands = [];
      state.isFilterActive = false; // Filtre devre dışı bırakıldı
    },
  },
});

export const { setAllbrands, setFilteredbrands, clearFilterBrand } = brandSlice.actions;
export default brandSlice.reducer;