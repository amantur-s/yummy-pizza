import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.data = action.payload
    },
  },
})

export const { setItems } = itemsSlice.actions
export default itemsSlice.reducer