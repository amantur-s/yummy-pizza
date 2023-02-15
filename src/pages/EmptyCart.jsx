import React from "react"
import emptylogo from "../assets/img/empty-cart.png"

function EmptyCart() {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={emptylogo} alt="Empty cart" />
      <a href="/" className="button button--black">
        <span> Вернуться назад </span>
      </a>
    </div>
  )
}

export default EmptyCart
