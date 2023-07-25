import qs from "qs"
import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Skeleton from "../components/Card/Skeleton"
import Card from "../components/Card/index"
import Categories from "../components/Categories"
import Sorting, { sortList } from "../components/Sorting"
import "../scss/app.scss"
import { setCategory, setParams } from "../store/slices/filterSlice"
import { fetchItems } from "../store/slices/itemsSlice.js"

function Main() {
  const { categoryId, searchValue, sort } = useSelector((state) => state.filter)
  const { data, status } = useSelector((state) => state.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const categoryHandler = (id) => {
    dispatch(setCategory(id))
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sortby = sortList.find((obj) => obj.property === params.property)
      dispatch(
        setParams({
          ...params,
          sortby,
        })
      )
      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    const pizzas = async () => {
      if (!isSearch.current) {
        const category = categoryId ? `category=${categoryId}` : ""
        const sortBy = sort.property.replace("-", "")
        const order = sort.property.includes("-") ? "asc" : "desc"

        dispatch(
          fetchItems({
            category,
            sortBy,
            order,
          })
        )
      }
      isSearch.current = false
    }
    pizzas()
  }, [categoryId, sort, dispatch])

  useEffect(() => {
    if (isMounted.current) {
      const queryParams = qs.stringify({
        categoryId,
        property: sort.property,
      })
      navigate(`?${queryParams}`)
    }
    isMounted.current = true
  }, [categoryId, sort, dispatch, navigate])

  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />)
  const pizzas = data
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((obj) => <Card key={obj.id} {...obj} />)

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={categoryHandler} />
        <Sorting />
      </div>
      <h2 className="content__title"> Все пиццы </h2>
      <div className="content__items">
        {status === "error" ? (
          alert("Ошибка при получении данных!")
        ) : (
          <> {status === "loading" ? skeleton : pizzas} </>
        )}
      </div>
    </>
  )
}

export default Main
