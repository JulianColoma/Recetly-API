export class Recipe {
    static getAll = async () =>{
        return fetch('https://recetly.onrender.com/recipes')
        .then(res => res.json())
        
    }
    static getById = async (id) =>{
        return fetch(`https://recetly.onrender.com/recipes/${id}`)
        .then(res => res.json())
        
    }
    static delete = async (id) =>{
        return fetch(`https://recetly.onrender.com/recipes/${id}`,{
            method: 'DELETE',
        })
        .then(res => res.json())
        
    }
    static add = async (data) =>{
        return fetch(`https://recetly.onrender.com/recipes`,{
            method:'POST',
            body: data,
        })
        .then(res => res.json())
        
    }
    static update = async (data) =>{
        return fetch(`https://recetly.onrender.com/recipes`,{
            method:'PUT',
            body: data,
        })
        .then(res => res.json())
        
    }
}