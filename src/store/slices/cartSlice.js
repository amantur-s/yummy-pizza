import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
      toast.success("Продукт добавлен в корзину!")
    },
    decrease(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count--
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum
        }, 0)
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
      toast.success("Продукт удален из корзины")
    },
    removeAll(state) {
      state.items = []
      state.totalPrice = 0
      toast.success("Корзинка очищена!")
    },
  },
})

export const { addItem, removeItem, removeAll, increase, decrease } =
  cartSlice.actions
export default cartSlice.reducer
