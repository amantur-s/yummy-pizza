import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Sorting from "./components/Sorting";
import "./scss/app.scss";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    fetch(
      `https://639a109f16b0fdad77531c44.mockapi.io/api/pizzas?${
        categoryId ? `category=${categoryId}` : ""
      } `
    )
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
      })
      .catch((err) => {
        console.warn(err);
        alert("ошибка при получении данных");
      });
  }, [categoryId]);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories
                categoryId={categoryId}
                setCategoryId={setCategoryId}
              />
              <Sorting />
            </div>
            <h2 className="content__title"> Все пиццы </h2>
            <div className="content__items">
              {pizzas.map((obj) => (
                <Card key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
