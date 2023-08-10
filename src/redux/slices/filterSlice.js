import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sort: { name: 'популярности', sortProperty: 'rating' },
    pageCount: 1,
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

        }
    }
});
export const { setCategoryId, setSort, setPageCount } = filterSlice.actions;

export default filterSlice.reducer;
