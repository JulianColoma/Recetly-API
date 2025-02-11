import './App.css'
import { Login } from './components/login.jsx'
import { Home } from './components/home.jsx'
import { Routes, Route } from "react-router-dom";
import { Detail } from './components/detail.jsx';
import { Form } from './components/form';

function App() {
  const sampleRecipe = {
    title: "Pizza Casera",
    photo: "https://source.unsplash.com/400x300/?pizza",
    difficulty: 2,
    comments: "Esta receta es fácil y muy rica!",
    ingredients: ["500g de harina", "250ml de agua", "25g de levadura", "Sal", "Salsa de tomate", "Queso"],
    elaboration_time: 60,
    steps: ["Mezclar los ingredientes", "Dejar reposar la masa 1 hora", "Extender y agregar ingredientes", "Hornear a 220°C por 15 min"],
  };
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login type="Login"/>} />
    <Route path="/register" element={<Login type="Register" />} />
    <Route path="/recipeadd" element={<Form type="add" />} />
    <Route path="/recipeupdate" element={<Form type="update" />} />
    <Route path="/recipe" element={<Detail recipe={sampleRecipe}/>} />
  </Routes>
  )
}

export default App
