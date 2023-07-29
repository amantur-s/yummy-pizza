import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function FullPizza() {
  const { id } = useParams()
  const [pizza, setPizza] = useState()

  useEffect(() => {
    async function fetchPizzaById() {
      try {
        const { data } = await axios.get(
          "https://639a109f16b0fdad77531c44.mockapi.io/api/items/" + id
        )
        setPizza(data)
      } catch (error) {
        alert("Упс, пицца не найдена =(")
      }
    }
    fetchPizzaById()
  }, [id])

  if (!pizza) {
    return "Loading . . ."
  }

  return (
    <div className="full-pizza">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h1> {pizza.title} </h1>
      <h2> {pizza.price} сом </h2>
    </div>
  )
}

export default FullPizza
