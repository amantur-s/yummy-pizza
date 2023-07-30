import { Route, Routes } from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import Cart from "./pages/Cart"
import FullPizza from "./pages/FullPizza"
import Main from "./pages/Main"
import NotFound from "./pages/NotFound"
import React from "react"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
