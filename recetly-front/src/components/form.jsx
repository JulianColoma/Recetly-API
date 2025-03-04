import { Button, Input, Image, Stack, Card , IconButton, List} from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "@/components/ui/file-upload"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select"
import styled from "styled-components"
import { GoTrash } from "react-icons/go"
import { Recipe } from "../../services/recipe"
import { useAuth } from "../../hooks/auth.jsx"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const Form = ({ type }) => {
  const prevRecipe = useLocation()
  const {user, setUser} = useAuth()
  const [recipe, setRecipe] = useState({ title: '', ingredients: [], steps: [], time: '', comments: '', difficulty: 1, photo:""});
  const [ingredient, setIngredient] = useState({ name: '', cant: '', unit: '' });
  const [step, setStep] = useState('');
  const units = ["g", "kg", "oz", "u", "ml", "l", "cup"];

  useEffect(() => {
    if (prevRecipe.state && type != "add") {
      setRecipe(prevRecipe.state);
    }
  }, [prevRecipe]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (e) =>{
    const { name, value } = e.target;
    const newvalue = recipe[name]
    newvalue.splice(value, 1)
    setRecipe(prev => ({ ...prev, [name]: newvalue }));
  }
  const handleFileChange = (e) => {
    if (e.files.length > 0) {
      setRecipe((prev) => ({ ...prev, photo: e.files[0] }));
    }
  };
  
  const handleAddIngredient = () => {
    let ing = ingredient.name + ' ' + ingredient.cant + ingredient.unit
    setRecipe(prev => ({ ...prev, ingredients: [...prev.ingredients, ing] }));
    setIngredient({ name: '', cant: '', unit: '' });
  };

  const handleAddStep = () => {
    setRecipe(prev => ({ ...prev, steps: [...prev.steps, step] }));
    setStep('');
  };
  const postRecipe = async () => {
    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("steps", JSON.stringify(recipe.steps));
    formData.append("time", recipe.time);
    formData.append("comments", recipe.comments);
    formData.append("difficulty", recipe.difficulty);
    const image = new FormData();
    image.append("file", recipe.photo);
    
    try {
      let res
      if(type == "add"){
        res = await Recipe.add(formData, image)
      }else{
        res = await Recipe.update(formData, image)
      }
     const response = await res.json()
     console.log(response) 
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) return <p>Page not found</p>

    return (
      <Container>
        <Card.Root minW="80vw" margin={10}>
          <Card.Header>
            <Card.Title>Recipe Form</Card.Title>
            <Card.Description>
              Fill in the form below to {type === 'add' ? 'add' : 'update'} a recipe
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Stack spacing={4}>
              <Field label="Title"><Input name="title" value={recipe.title} onChange={handleChange} /></Field>
              <Field label="Difficulty">
                <NumberInputRoot min={1} max={5} defaultValue={recipe.difficulty ? recipe.difficulty : 1} onChange={(e) => setRecipe(prev => ({ ...prev, difficulty: e.target.value }))}>
                  <NumberInputField />
                </NumberInputRoot>
              </Field>
              <Field label="Image Upload">
  
                <FileUploadRoot maxW={recipe.photo? "xl" : "l"} accept="image/png, image/jpeg" alignItems="stretch" maxFileSize={5*(2**20)} onFileAccept={handleFileChange}>
                  <FileUploadDropzone label="Drag and drop here to upload" type="file" description=".png, .jpg up to 5MB" 
                  />
                  {type != "add" && recipe.photo && <Image src={recipe.photo}></Image>}
                  <FileUploadList />
                </FileUploadRoot>
                
              </Field>
              <Field label="Ingredients">
                <Stack direction="row">
                  <Input placeholder="Name" value={ingredient.name} onChange={e => setIngredient({ ...ingredient, name: e.target.value })} />
                  <Input type="number" placeholder="Quantity" value={ingredient.cant} onChange={e => setIngredient({ ...ingredient, cant: e.target.value })} />
                  <NativeSelectRoot value={ingredient.unit} onChange={e => setIngredient({ ...ingredient, unit: e.target.value })}>
                    <NativeSelectField placeholder="Unit">
                      {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                    </NativeSelectField>
                  </NativeSelectRoot>
                  <Button onClick={handleAddIngredient}>Add</Button>
                </Stack>
                {recipe.ingredients && <List.Root>{recipe.ingredients.map((ing, index) => (<List.Item key={index} >{`${ing}`}<IconButton aria-label="delete" size="xs" name="ingredients" value={index} onClick={handleDelete}>
                  <GoTrash/>
                  </IconButton></List.Item>))}</List.Root>}
              </Field>
              <Field label="Steps">
                <Stack direction="row">
                  <Input placeholder="Step description" value={step} onChange={e => setStep(e.target.value)} />
                  <Button onClick={handleAddStep}>Add</Button>
                </Stack>
                {recipe.steps && <List.Root>{recipe.steps.map((stp, index) => (<List.Item key={index}>{`${index +1}. ${stp}`} <IconButton aria-label="delete" size="xs" name="steps" value={index} onClick={handleDelete}>
                  <GoTrash/>
                  </IconButton></List.Item> ))}</List.Root>}
              </Field>
              <Field label="Elaboration time"><Input type="number" name="time" value={recipe.time} onChange={handleChange} /></Field>
              <Field label="Comments"><Input name="comments" value={recipe.comments} onChange={handleChange} /></Field>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="flex-start">
            <Link to='/'><Button variant="outline">Cancel</Button></Link>
            <Button variant="solid" onClick={postRecipe}>Post</Button>
          </Card.Footer>
        </Card.Root>
      </Container>
    );
  }

