import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from "react-router-dom"
import Add from "./components/pages/Add/Add"
import List from "./components/pages/List/List"
import Orders from "./components/pages/Orders/Orders"
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const url = "http://localhost:4000"

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element = {<Add url = {url} />} ></Route>
          <Route path='/list' element = {<List url = {url} />} ></Route>
          <Route path='/orders' element = {<Orders url = {url} />} ></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App