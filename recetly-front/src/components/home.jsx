import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card , Image } from "@chakra-ui/react"
import { useAuth } from "../../hooks/auth.jsx"
import { useEffect, useState } from "react"
import { Recipe } from "../../services/recipe.js"
const Container = styled.div`

    margin: 0;
    padding: 0;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    height: 100vh;
    

    header {
      background: #3498db;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .navbar{
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }

    main {
      flex: 1; /* Ocupa todo el espacio disponible */
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ecf0f1;
    }

    footer {
      background: #2c3e50;
      font-size: 13px;
      color: white;
      padding: 15px;
      text-align: center;
    }

`
const RecipeCard = (recipe) =>{
    const path = ''
    return(
        <Card.Root>
            <Card.Header>recipe.title</Card.Header>
            <Card.Body>
                <Image src={path + recipe.photo}/>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card.Root>
    )
}
export const Home = () =>{
    const {user, login, logout} = useAuth()
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()
    const hanldeClick = () =>{
        if(user){
            logout()
        }else{
            navigate('/login')
        }
    }
    useEffect(() =>{
        const fetchRecipes = async () => {
            if (user) {
                const response = await Recipe.getAll();
                setRecipes(response);
            }
        };
        fetchRecipes();
    }, [user]);
    return(
        <Container>
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <img src="" alt="" />
                        <h1>Recetly</h1>
                    </div>
                    <Button onClick={hanldeClick}>{user?'Logout':'Login'}</Button>
                </nav>
            </header>
            <main>
                {user && 
                    
                    <div>
                        <Button>Add recipe</Button>
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                }
            </main>
            <footer>
                <p>Desarrollado por Julián Valentín Coloma Visconti</p>
                <p><a href="mailto:julian.coloma@alu.frlp.utn.edu.ar">julian.coloma@alu.frlp.utn.edu.ar</a></p>
                <p><a href="https://github.com/JulianColoma" target="_blank">github.com/JulianColoma</a></p>
            </footer>
        </Container>
    )
}