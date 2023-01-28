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
  },
})

export const { setCategory, setSorting, setSearch } = filterSlice.actions

export default filterSlice.reducer
