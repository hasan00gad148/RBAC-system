import React from "react" 
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./pages/Layout"
function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route index  path="" Component={Layout} >

            </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
