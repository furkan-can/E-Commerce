import { createSlice } from '@reduxjs/toolkit';

// İlk olarak, ürünlerinizi saklayacak başlangıç durumunu tanımlayın.
const initialState = {
  productsInCart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.productsInCart.find(item => item.id === productToAdd.id);

      if (existingProduct) {
        // Eğer ürün sepette zaten varsa, miktarını artır.
        existingProduct.quantity += 1;
      } else {
        // Eğer ürün sepette yoksa, yeni bir giriş oluştur.
        state.productsInCart.push({ ...productToAdd, quantity: 1 });
      }
    },
    removeProductFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.productsInCart = state.productsInCart.filter(item => item.id !== productIdToRemove);
    },
    decreaseProductQuantity: (state, action) => {
      const productIdToDecrease = action.payload;
      const existingProduct = state.productsInCart.find(item => item.id === productIdToDecrease);

      if (existingProduct && existingProduct.quantity > 1) {
        // Eğer ürün sepette var ve miktarı 1'den büyükse, miktarını azalt.
        existingProduct.quantity -= 1;
      } else {
        // Eğer ürün sepette var ve miktarı 1 ise, ürünü tamamen kaldır.
        state.productsInCart = state.productsInCart.filter(item => item.id !== productIdToDecrease);
      }
    },
  },
});

// Reducer'ları ve eylemleri dışa aktarın.
export const { addProductToCart, removeProductFromCart, decreaseProductQuantity } = cartSlice.actions;

// Reducer'ı dışa aktarın.
export default cartSlice.reducer;