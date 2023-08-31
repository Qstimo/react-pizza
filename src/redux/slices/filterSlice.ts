import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

type Sort = {
 name: string, sortProperty: 'rating' | 'title' | 'price' |'-rating' | '-title' | '-price' 
}

interface FilterStateSlice{
    categoryId: number,
    sort: Sort,
    pageCount: number,
    searchValue: string,
    titleCategory: string
}

const initialState:FilterStateSlice = {
    categoryId: 0,
    sort: { name: 'популярности', sortProperty: 'rating' },
    pageCount: 1,
    searchValue: '',
    titleCategory: 'Все пиццы'
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action:PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setSort: (state, action:PayloadAction<Sort>) => {
            state.sort = action.payload;

        },
        setPageCount: (state, action:PayloadAction<number>) => {
            state.pageCount = action.payload;

        },
        setFilters(state, action:PayloadAction<FilterStateSlice>) {
            state.sort = action.payload.sort
            state.pageCount = Number(action.payload.pageCount);
            state.categoryId = Number(action.payload.categoryId)
        },
        setSearchValue(state, action:PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setTitleValue(state, action:PayloadAction<string>) {
            state.titleCategory = action.payload;
        },

    }
});
export const selectFilter = (state:RootState) => state.filter;
export const selectSort = (state:RootState) => state.filter.sort;
export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue, setTitleValue } = filterSlice.actions;

export default filterSlice.reducer;
