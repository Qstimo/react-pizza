import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';


type CartItem = {
    id:string, 
    title:string,
    price:number,
    count:number,
    imageUrl:string, 
    type:string,
    size:number,
}

interface CartSliceState{
    totalPrice: number,
    items: CartItem[],
}

const initialState:CartSliceState = {
    items: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id);
            if (findItem) { findItem.count++; } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.price * item.count) + sum;
            }, 0);

        },
        minusItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
        },

        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    }
});

export const selectCart = (state:RootState) => state.cart;
export const slectCartItemById = (id:string) => (state:RootState) => state.cart.items.find((item) => item.id === id);
export const { addItem, clearItems, minusItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
