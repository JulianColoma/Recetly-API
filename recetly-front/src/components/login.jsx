import { Button, Input, Stack, Card } from "@chakra-ui/react"
import {Link} from 'react-router-dom'
import { Field } from "@/components/ui/field"
import styled from "styled-components"
import { useState, useEffect } from "react"
import { User } from "../../services/user.js"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/auth.jsx"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    height: 100vh;
    background-color: #242424;
`
const Here = styled.div`
    color: #007bff;
      text-decoration: underline;
      font-weight: bold;
`

export const Login = ({type}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const {user, login, logout} = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    
    const credentials = { name, password };
    const res = await User.login(credentials);
    const response = await res.json()
    console.log(response)
    if (response.user) {
      login(response.user)
      navigate('/')
      console.log("Login successful!", user);
    } else {
      console.log("Login error");
    }
  }

  const handleRegister = async () => {
    
    const credentials = { name, password};
    const res = await User.create(credentials);
    const response = await res.json()
    if (response.ok) {
      await handleLogin(credentials)
    } else {
      console.log("Register error");
    }
  }
  
  return (
    <Container>
    <Card.Root minW={400} maxW="lg">
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
    <Card.Footer justifyContent="flex-start">
      <Link to='/'><Button variant="outline">Cancel</Button></Link>
      <Button onClick={type == 'Login'? handleLogin : handleRegister} variant="solid">{type == 'Login'? "Sing in" : "Sing up"}</Button>
    </Card.Footer>
      {type == 'Login' && <Card.Footer>
      <Card.Description className="singup">Doesnt have an account? </Card.Description> <Link to='/register'><Here>Sing up</Here></Link>
      </Card.Footer>}
  </Card.Root>
    </Container>  
  )
}
