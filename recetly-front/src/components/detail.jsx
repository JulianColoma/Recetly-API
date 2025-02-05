import React from "react";
import styled from "styled-components";
const Container = styled.main`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Detail = ({ recipe }) => {
  if (!recipe) return <p>Cargando receta...</p>;

  return (
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
  );
};

