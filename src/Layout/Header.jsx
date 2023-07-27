import React from "react"
import { NavLink, useLocation } from "react-router-dom"   //react-hooks/rules-of-hooks
import pizzalogo from "../assets/img/pizzaLogo.svg"
import CartButton from "../components/CartButton"
import Search from "../components/Search/Search"

const location = useLocation()

function Header() {
  return (
    <div className="header">
      <div className="container">
        <NavLink to="/">
          <div className="header__logo">
            <img width="38" src={pizzalogo} alt="" />
            <div>
              <h1>Yummy Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </NavLink>
        <Search />
        {location.pathname === "/cart" && <CartButton />}
      </div>
    </div>
  )
}

export default Header
