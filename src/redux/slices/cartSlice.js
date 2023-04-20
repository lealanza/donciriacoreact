import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import data from '../../data/data'; // Importa el archivo data.js

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);
    
      // Verificar si hay suficiente stock
      const productInData = data.find(item => item.id === newItem.id);
      if (!productInData || productInData.stock < 1) {
        toast.error('No hay suficiente stock disponible');
        return;
      }
    
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) * Number(existingItem.price);
      }
    
      // Actualizar el stock del producto en data.js
      productInData.stock--;
    
      state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;

        // Actualizar el stock del producto en data.js
        const productInData = data.find(item => item.id === id);
        if (productInData) {
          productInData.stock += existingItem.quantity;
        }
      }

      state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },

});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
