import './App.css'
import { Login } from './components/login.jsx'
import { Home } from './components/home.jsx'
import { Routes, Route } from "react-router-dom";
import { Detail } from './components/detail.jsx';
import { Form } from './components/form.jsx';

function App() {
  
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login type="Login"/>} />
    <Route path="/register" element={<Login type="Register" />} />
    <Route path="/recipeadd" element={<Form type="add" />} />
    <Route path="/recipeupdate" element={<Form type="update" />} />
    <Route path="/recipe" element={<Detail/>} />
  </Routes>
  )
}

export default App
