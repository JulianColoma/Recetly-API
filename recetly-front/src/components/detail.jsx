import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GoArrowLeft } from "react-icons/go";
const Container = styled.main`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Detail = () => {
  const {user, setUser} = useAuth()
  const recipeData = useLocation()
  const recipe = recipeData.state
  if (!recipe) return <p>Cargando receta...</p>;
  if (!user) return <p>Page not found</p>
  return (
    <>
    <Link to="/"><GoArrowLeft/></Link>
    <Container>
    <article>
      <img src={recipe.photo} alt={recipe.title} />
      <section>
        <h2>{recipe.title}</h2>
        <p>
          Dificultad: {recipe.difficulty}
        </p>
        <p>⏱️ {recipe.elaboration_time} min</p>

        <h3>Ingredientes:</h3>
        <ul>
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>

        <h3>Pasos:</h3>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        {recipe.comments && <p>💬 {recipe.comments}</p>}
      </section>
    </article>
    </Container>
    </>
  );
};

