import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryId: 0,
  searchValue: "",
  sort: {
    name: "популярности",
    property: "rating",
  },
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categoryId = action.payload
    },
    setSorting(state, action) {
      state.sort = action.payload
    },
    setSearch(state, action) {
      state.searchValue = action.payload
    },
    setParams(state, action) {
      state.sort = action.payload.sortby
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})

export const selectFilter = (state) => state.filter

export const { setCategory, setSorting, setSearch, setParams } =
  filterSlice.actions

export default filterSlice.reducer
