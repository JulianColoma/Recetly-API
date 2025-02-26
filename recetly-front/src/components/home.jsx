import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card , Image, IconButton } from "@chakra-ui/react"
import { useAuth } from "../../hooks/auth.jsx"
import { useEffect, useState } from "react"
import { Recipe } from "../../services/recipe.js"
import { GoTrash, GoEye, GoPencil } from "react-icons/go"
import { User } from "../../services/user.js"
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
    const navigate = useNavigate()
    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esto?");
        const { id } = e.target.value;
        if(confirmDelete){
            try{
                const res = await Recipe.delete(id);
                const response = await res.json();
                console.log("Receta eliminada: ",response);
            }catch(e){
                console.log(e);
            }
        }
    }
    return(
        <Card.Root>
            <Card.Header>recipe.title</Card.Header>
            <Card.Body>
                <Image src={recipe.photo}/>
            </Card.Body>
            <Card.Footer>
            <IconButton aria-label="view" size="xs" value={recipe} onClick={(e)=>{navigate('/recipe', {state: e.target.value})}}>
                <GoEye/>
            </IconButton>
            <IconButton aria-label="edit" size="xs" value={recipe}  onClick={(e)=>{navigate('/recipeupdate', {state: e.target.value})}}>
                <GoPencil/>
            </IconButton>
            <IconButton aria-label="delete" size="xs" value={recipe} onClick={(e)=>handleDelete}>
                <GoTrash/>
            </IconButton>
            </Card.Footer>
        </Card.Root>
    )
}
export const Home = () =>{
    const navigate = useNavigate()
    const {user, setUser} = useAuth()
    const [recipes, setRecipes] = useState([])
    
    const hanldeClick = async () =>{
        if(user){
            try{
            await User.logout()
            setUser(null);
            console.log("log out successful")
            }catch(e){
                console.log(e)
            }
        }else{
            navigate('/login')
        }
    }
    useEffect(() =>{
        if (user) {
            const fetchRecipes = async () => {
                    const response = await Recipe.getAll();
                    setRecipes(response);
            };
            fetchRecipes();
        }
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
            {user && (
                <div>
                    <Link to="/recipeadd"><Button>Add recipe</Button></Link>
                    {recipes?.length > 0 ? (
                        recipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    ) : (
                        <p>No recipes available.</p>
                    )}
                </div>
            )}
            </main>

            <footer>
                <p>Desarrollado por Julián Valentín Coloma Visconti</p>
                <p><a href="mailto:julian.coloma@alu.frlp.utn.edu.ar">julian.coloma@alu.frlp.utn.edu.ar</a></p>
                <p><a href="https://github.com/JulianColoma" target="_blank">github.com/JulianColoma</a></p>
            </footer>
        </Container>
    )
}