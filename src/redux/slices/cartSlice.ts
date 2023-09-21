import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';


export type CartItem = {
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
const cartData = getCartFromLS();
const initialState:CartSliceState = {
    items: cartData.items,
    totalPrice: cartData.totalPrice,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem(state, action:PayloadAction<CartItem>) {
            const findItem = state.items.find(item => item.id === action.payload.id);
            if (findItem) { findItem.count++; } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = calcTotalPrice(state.items);

        },
        minusItem(state, action:PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },

        removeItem(state, action:PayloadAction<string>) {
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
