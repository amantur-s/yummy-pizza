import { Route, Routes } from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import Cart from "./pages/Cart"
import EmptyCart from "./pages/EmptyCart"
import Main from "./pages/Main"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<EmptyCart />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
