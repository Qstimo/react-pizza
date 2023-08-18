import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addItem(state, action) {
        //     state.items.push(action.payload);
        //     state.totalPrice = state.items.reduce((sum, item) => {
        //         return item.price + sum;
        //     }, 0);
        // },
        addItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id);
            if (findItem) { findItem.count++; } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.price * item.count) + sum;
            }, 0);

        },
        removeItem(state, action) {
            state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state, action) {
            state.items = []
        },
    }
});
export const { addItem, clearItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;