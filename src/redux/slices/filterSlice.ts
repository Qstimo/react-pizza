import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState = {
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
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;

        },
        setPageCount: (state, action) => {
            state.pageCount = action.payload;

        },
        setFilters(state, action) {
            state.sort = action.payload.sort
            state.pageCount = Number(action.payload.pageCount);
            state.categoryId = Number(action.payload.categoryId)
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setTitleValue(state, action) {
            state.titleCategory = action.payload;
        },

    }
});
export const selectFilter = (state:RootState) => state.filter;
export const selectSort = (state:RootState) => state.filter.sort;
export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue, setTitleValue } = filterSlice.actions;

export default filterSlice.reducer;
