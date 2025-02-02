import { Button, Input, Stack, Card } from "@chakra-ui/react"
import {Link} from 'react-router-dom'
import { Field } from "@/components/ui/field"
import styled from "styled-components"
import {loginUser} from '../services/recipes.js'
import { useState } from "react"
import { FaHandHolding } from "react-icons/fa"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    height: 100vh;
    background-color: #242424;

`


export const Login = ({type}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    
    const credentials = { name, password};
    console.log(credentials)
    /*const response = await loginUser(credentials);
  
    if (response.success) {
      // Redirigir a la página principal o a la página deseada
      console.log("Login exitoso!");
    } else {
      console.log("Error en el login");
    }*/
  }
  
  return (
    <Container>
    <Card.Root maxW="sm">
    <Card.Header>
      <Card.Title>{type == 'Login'? "Sing in" : "Sing up"}</Card.Title>
      <Card.Description>
      Fill in the form below to 
      {type == 'Login'? " login" : " create an account"}
        
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full">
        <Field label="Username">
          <Input  onChange={(e) => setName(e.target.value)} name="name"/>
        </Field>
        <Field label="Password">
          <Input onChange={(e) => setPassword(e.target.value)} name="password" type="password"/>
        </Field>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <Link to='/'><Button variant="outline">Cancel</Button></Link>
      <Button onClick={handleLogin} variant="solid">{type == 'Login'? "Sing in" : "Sing up"}</Button>
    </Card.Footer>
  </Card.Root>
    </Container>  
  )
}
