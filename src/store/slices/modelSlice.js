import { createSlice } from '@reduxjs/toolkit';

const modelSlice = createSlice({
  name: 'models',
  initialState: {
    allmodels: [],
  },
  reducers: {
    setAllmodels: (state, action) => {
      state.allmodels = action.payload;
    },
    setFilteredmodels: (state, action) => {
      state.filteredmodels = action.payload;
      state.isFilterActive = true; // Filtre etkinleştirildi
    },
    clearFilterModel: (state) => {
      state.filteredmodels = [];
      state.isFilterActive = false; // Filtre devre dışı bırakıldı
    },
  },
});

export const { setAllmodels, setFilteredmodels, clearFilterModel } = modelSlice.actions;
export default modelSlice.reducer;