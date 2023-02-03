import axios from "axios"
import qs from "qs"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Card from "../components/Card/index"
import Skeleton from "../components/Card/Skeleton"
import Categories from "../components/Categories"
import Sorting, { sortList } from "../components/Sorting"
import "../scss/app.scss"
import { setCategory, setParams } from "../store/slices/filterSlice"
import { setItems } from "../store/slices/itemsSlice"

function Main() {
  const { categoryId, searchValue, sort } = useSelector((state) => state.filter)
  const items = useSelector((state) => state.items.data)
  const [isLoading, setIsLoading] = useState(true)
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
    if (!isSearch.current) {
      setIsLoading(true)
      const category = categoryId ? `category=${categoryId}` : ""
      const sortBy = sort.property.replace("-", "")
      const order = sort.property.includes("-") ? "asc" : "desc"

      axios
        .get(
          `https://639a109f16b0fdad77531c44.mockapi.io/api/items?${category}&sortBy=${sortBy}&order=${order}`
        )
        .then((res) => {
          dispatch(setItems(res.data))
          setIsLoading(false)
        })
        .catch((err) => {
          console.warn(err)
          alert("Ошибка при получении данных")
        })
    }
    isSearch.current = false
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
              .filter((obj) =>
                obj.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((obj) => <Card key={obj.id} {...obj} />)}
      </div>
    </>
  )
}

export default Main
