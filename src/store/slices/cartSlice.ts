import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { RootState } from ".."

export type ItemCart = {
  title: string
  imageUrl: string
  price: number
  count: number
  sizes: number
  types: string
  id: string
}

interface CartSliceState {
  items: ItemCart[]
  totalPrice: number
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemCart>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
        toast.success("Продукт добавлен в корзину!")
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    decrease(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload) 
      if (findItem) {
        findItem.count--
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum
        }, 0)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
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

export const selectCart = (state: RootState) => state.cart
export const selectCartById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, removeAll, decrease } = cartSlice.actions
export default cartSlice.reducer
