import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';


export enum SortPropertyEnum{
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type Sort = {
 name: string, sortProperty: SortPropertyEnum; 
}

export interface FilterStateSlice{
    categoryId: number,
    sort: Sort,
    pageCount: number,
    searchValue: string,
    titleCategory?: string
}

const initialState:FilterStateSlice = {
    categoryId: 0,
    sort: { name: 'популярности', sortProperty: SortPropertyEnum.PRICE_DESC },
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
