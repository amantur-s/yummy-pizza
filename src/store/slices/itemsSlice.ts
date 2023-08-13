import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."

export const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async (params) => {
    const { category, sortBy, order } = params
    const { data } = await axios.get(
      `https://639a109f16b0fdad77531c44.mockapi.io/api/items?${category}&sortBy=${sortBy}&order=${order}`
    )
    return data
  }
)

type PizzaItem = {
  title: string
  imageUrl: string
  price: number
  count: number
  sizes: number
  types: string
  id: string
}

interface ItemSliceState {
  data: PizzaItem[]
  status: "loading" | "succes" | "error"
}

const initialState: ItemSliceState = {
  data: [],
  status: "loading",
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.data = action.payload
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.status = "loading"
      state.data = []
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = "success"
    },
    [fetchItems.rejected]: (state) => {
      state.status = "error"
      state.data = []
    },
  },
})

export const selectItems = (state: RootState) => state.items

export const { setItems } = itemsSlice.actions
export default itemsSlice.reducer
