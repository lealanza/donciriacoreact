import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems:[],
    totalAmount:0,
    totalQuantity:0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);
            const stock = newItem.stock;
            state.totalQuantity++;
            if (!existingItem) {
              state.cartItems.push({
                id: newItem.id,
                productName: newItem.productName,
                image: newItem.imgUrl,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price,
              });
              newItem.stock--;
            } else {
              if (existingItem.quantity < stock) {
                existingItem.quantity++;
                existingItem.totalPrice = Number(existingItem.totalPrice) * Number(existingItem.price);
                existingItem.stock--;
              } else {
                setTimeout(function() {
                  toast.error('No hay mas stock');
                }, 3000)
              }
            
            }
            state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            console.log(state.totalAmount);
            console.log(state.cartItems);
            
            
          }
          }
    
  });
        
export const cartActions = cartSlice.actions

export default cartSlice.reducer
