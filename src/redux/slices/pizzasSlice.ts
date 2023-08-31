import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';


type FetchPizzasArgs = Record<string,string>;

type Pizza = {
    id:string, 
    title:string,
    price:number,
    count:number,
    imageUrl:string, 
    type:string,
    size:number,
}
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params:FetchPizzasArgs) => {
        const { 
            order,
            sortBy,
            category,
            search,
            pageCount 
        } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://64cb8751700d50e3c7060db8.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `,
        );

        return data 
    }
)

export enum Status{
    LOADING='loading',
    SUCCESS='success',
    ERROR='error',
}

interface PizzasSliceState{
    items:Pizza[],
    status:Status
}

const initialState:PizzasSliceState = {
    items: [],
    status: Status.LOADING

}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action:PayloadAction<Pizza[]>) {
            state.items = action.payload;
            state.items = [];
        },
    },
extraReducers:(builder)=>{
    builder.addCase(fetchPizzas.pending, (state, action)=>{
        state.status = Status.LOADING;
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action)=>{
        state.items = action.payload;
                state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state, action)=>{
        state.status =Status.ERROR;
           state.items = [];
    })
}

    // extraReducers: {
    //     [fetchPizzas.pending]: (state:) => {
    //         state.status = 'loading';
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.items = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         state.status = 'error';
    //         state.items = [];
    //     }
    // }
});

export const selectPizzaData = (state:RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
