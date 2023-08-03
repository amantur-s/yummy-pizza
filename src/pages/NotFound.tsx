import React from "react"

function EmptyCart() {
  return (
    <div className="notfound">
      <h2> Ничего не найдено 😕</h2>
      <p>
        Вероятней всего, такой страницы не существует.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <div>
        <a href="/" className="button button--black">
          Вернуться назад
        </a>
      </div>
    </div>
  )
}

export default EmptyCart
