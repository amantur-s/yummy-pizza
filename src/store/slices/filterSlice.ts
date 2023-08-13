import { createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."

type Sort = {
  name: string
  property: "rating" | "title" | "price" | "-rating" | "-title" | "-price"
}

interface FilterSliceState {
  categoryId: number
  searchValue: string
  sort: Sort
}

const initialState: FilterSliceState = {
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

export const selectFilter = (state: RootState) => state.filter

export const { setCategory, setSorting, setSearch, setParams } =
  filterSlice.actions

export default filterSlice.reducer
