import React from "react";
const category = [
  { name: "Все" },
  { name: "Мясные" },
  { name: "Вегетарианская" },
  { name: "Гриль" },
  { name: "Острые" },
];

function Categories({ categoryId, setCategoryId }) {
  return (
    <div className="categories">
      <ul>
        {category.map((el, index) => (
          <li
            onClick={() => setCategoryId(index)}
            className={categoryId === index ? "active" : ""}
            key={index}
          >
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
