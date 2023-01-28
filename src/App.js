import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Cart from "./pages/Cart"
import EmptyCart from "./pages/EmptyCart"
import Main from "./pages/Main"
import "./scss/app.scss"

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<EmptyCart />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
