import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screens/home/home";
import Admin from "./screens/admin/admin"

function App() {
  
  return (
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
