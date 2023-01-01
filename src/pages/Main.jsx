import { useEffect, useState } from "react";
import Card from "../components/Card";
import Skeleton from "../components/Card/Skeleton";
import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import "../scss/app.scss";

function Main() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortingBy, setSortingBy] = useState({
    name: "популярности",
    property: "rating",
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";
    const sortBy = sortingBy.property.replace("+", "");
    const order = sortingBy.property.includes("+") ? "asc" : "desc";

    fetch(
      `https://639a109f16b0fdad77531c44.mockapi.io/api/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("ошибка при получении данных");
      });
  }, [categoryId, sortingBy]);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
        <Sorting sortingBy={sortingBy} setSortingBy={setSortingBy} />
      </div>
      <h2 className="content__title"> Все пиццы </h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <Card key={obj.id} {...obj} />)}
      </div>
    </>
  );
}

export default Main;
