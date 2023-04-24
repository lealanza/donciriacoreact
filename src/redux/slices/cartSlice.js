import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems:[],
    totalAmount:0,
    totalQuantity:0,
    stock:0,
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
              imgUrl: newItem.imgUrl,
              price: newItem.price,
              quantity: newItem.quantity, // cambiar a la cantidad del nuevo producto
              totalPrice: newItem.price * newItem.quantity,
            });
            newItem.stock--;
          } else {
            if (existingItem.quantity < stock) {
              existingItem.quantity++;
              existingItem.totalPrice += existingItem.price;
              existingItem.stock--;
            } else {
              setTimeout(function() {
                toast.error('No hay mas stock');
              }, 3000)
            }
          }
        
          state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        },
          deleteItem:(state, action) => {
            const id =action.payload
            const existingItem= state.cartItems.find(item=>item.id===id)
            if(existingItem){
              state.cartItems= state.cartItems.filter(item=>item.id!==id)
              state.totalQuantity = state.totalQuantity-existingItem.quantity
            }
            state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
          }},
  });
export const cartActions = cartSlice.actions
export default cartSlice.reducer
