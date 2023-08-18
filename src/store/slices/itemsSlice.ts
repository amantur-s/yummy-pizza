import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."

export const fetchItems = createAsyncThunk<PizzaItem[], Record<string, string>>(
  "items/fetchAllItems",
  async (params) => {
    const { category, sortBy, order } = params
    const { data } = await axios.get<PizzaItem[]>(
      `https://639a109f16b0fdad77531c44.mockapi.io/api/items?${category}&sortBy=${sortBy}&order=${order}`
    )
    return data
  }
)

type PizzaItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

interface ItemSliceState {
  data: PizzaItem[]
  status: "loading" | "success" | "error"
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
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = "loading"
      state.data = []
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = "success"
    })
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = "error"
      state.data = []
    })
  },
  // [fetchItems.pending]: (state) => {
  //   state.status = "loading"
  //   state.data = []
  // },
  // [fetchItems.fulfilled]: (state, action) => {
  //
  // },
  // [fetchItems.rejected]: (state) => {
  //   state.status = "error"
  //   state.data = []
  // },
})

export const selectItems = (state: RootState) => state.items

export const { setItems } = itemsSlice.actions
export default itemsSlice.reducer
