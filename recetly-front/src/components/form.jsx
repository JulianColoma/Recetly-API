import { Button, Input, Stack, Card } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import {FileUploadDropzone, FileUploadList, FileUploadRoot} from "@/components/ui/file-upload"
import {NumberInputField,NumberInputRoot,} from "@/components/ui/number-input"
import { Link } from "react-router-dom"
import {
    NativeSelectField,
    NativeSelectRoot,
  } from "@/components/ui/native-select"
import styled from "styled-components"
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
`
export function Form({type}){
    const units = ["g", "kg", "oz", "u"]
    return (
            <Container>
            <Card.Root minW={400} maxW="lg" maxH="80vh">
                <Card.Header>
                <Card.Title>Recipe Form</Card.Title>
                <Card.Description>
                Fill in the form below to {type='add'? 'add' : 'update'} a recipe
                </Card.Description>
                </Card.Header>
                <Card.Body>
                <Stack gap="4" w="full">
                    <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={1}>
                    <FileUploadDropzone
                        label="Drag and drop here to upload"
                        description=".png, .jpg up to 5MB"
                    />
                    <FileUploadList />
                    </FileUploadRoot>
                    <Field label="Title">
                    <Input  onChange={(e) => (e.target.value)} name="title"/>
                    </Field>
                    <Field label="Difficulty">
                    <NumberInputRoot width="200px" defaultValue="1" min={1} max={5}>
                        <NumberInputField />
                    </NumberInputRoot>
                    </Field>
                    <Field label="Comments">
                    <Input  onChange={(e) => (e.target.value)} name="title"/>
                    </Field>
                    <Field label="ingredients" >
                    <Field flexDirection="row">
                        <Input label="name"  onChange={(e) => (e.target.value)} name="ingredient"/>
                    <Input type="number" min={1} onChange={(e) => (e.target.value)} name="cant"/>
                    <NativeSelectRoot size="sm" width="240px">
                    <NativeSelectField placeholder="Select option">
                        {   units.map((unit) =>{
                            <option key={unit} value={unit}>{unit}</option>
                        })
                        }
                    </NativeSelectField>
                    </NativeSelectRoot>
                    </Field>
                    <Button>add</Button>
                    </Field>
                    <Field label="Steps">
                    <Input  onChange={(e) => (e.target.value)} name="title"/>
                    <Button>add</Button>
                    </Field>
                    <Field label="Elaboration time">
                    <Input type="number" min={1} onChange={(e) => (e.target.value)} name="title"/>
                    </Field>
                </Stack>
                </Card.Body>
                <Card.Footer justifyContent="flex-start">
                <Link to='/'><Button variant="outline">Cancel</Button></Link>
                <Button  variant="solid">Post</Button>
                </Card.Footer>
            </Card.Root>
            </Container>
    )
}