import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Card from "../components/Card/index"
import Skeleton from "../components/Card/Skeleton"
import Categories from "../components/Categories"
import Sorting from "../components/Sorting"
import "../scss/app.scss"
import { setCategory } from "../store/slices/filterSlice"
import { setItems } from "../store/slices/itemsSlice"

function Main() {
  const { categoryId, searchValue, sort } = useSelector(state => state.filter)
  const items = useSelector(state => state.items.data)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const categoryHandler = id => {
    dispatch(setCategory(id))
  }

  useEffect(() => {
    setIsLoading(true)
    const category = categoryId ? `category=${categoryId}` : ""
    const sortBy = sort.property.replace("+", "")
    const order = sort.property.includes("+") ? "asc" : "desc"

    axios
      .get(
        `https://639a109f16b0fdad77531c44.mockapi.io/api/items?${category}&sortBy=${sortBy}&order=${order}`
      )
      .then(res => {
        dispatch(setItems(res.data))
        setIsLoading(false)
      })
      .catch(err => {
        console.warn(err)
        alert("Ошибка при получении данных")
      })
  }, [categoryId, sort, dispatch])

  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={categoryHandler} />
        <Sorting />
      </div>
      <h2 className="content__title"> Все пиццы </h2>
      <div className="content__items">
        {isLoading
          ? skeleton
          : items
              .filter(obj =>
                obj.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map(obj => <Card key={obj.id} {...obj} />)}
      </div>
    </>
  )
}

export default Main
