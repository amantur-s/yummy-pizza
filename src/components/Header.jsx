import React from "react";
import pizzalogo from "../components/assets/img/pizzaLogo.svg";
import Cart from "./Cart";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img width="38" src={pizzalogo} alt="" />
          <div>
            <h1>Yummy Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
        <Cart />
      </div>
    </div>
  );
}

export default Header;
