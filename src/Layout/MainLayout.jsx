import React from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../scss/app.scss"
import Header from "./Header"

function MainLayout() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={1500} />
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
