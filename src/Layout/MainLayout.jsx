import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import "../scss/app.scss"

function MainLayout() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
