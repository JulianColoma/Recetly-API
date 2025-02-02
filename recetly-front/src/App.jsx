import './App.css'
import { Login } from './components/login.jsx'
import { Home } from './components/home.jsx'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login type="Login"/>} />
    <Route path="/register" element={<Login type="Register" />} />
  </Routes>
  )
}

export default App
