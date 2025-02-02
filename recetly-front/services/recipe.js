export class Recipe {
    static getAll = async () =>{
        fetch('https://recetly.onrender.com/recipes')
        .then(res => res.json())
        
        return res
    }
    static getById = async (id) =>{
        fetch(`https://recetly.onrender.com/recipes/${id}`)
        .then(res => res.json())
        
        return res
    }
    static delete = async (id) =>{
        fetch(`https://recetly.onrender.com/recipes/${id}`,{
            method: 'DELETE',
        })
        .then(res => res.json())
        
        return res
    }
    static add = async (data) =>{
        fetch(`https://recetly.onrender.com/recipes`,{
            method:'POST',
            body: data,
        })
        .then(res => res.json())
        
        return res
    }
    static update = async (data) =>{
        fetch(`https://recetly.onrender.com/recipes`,{
            method:'PUT',
            body: data,
        })
        .then(res => res.json())
        
        return res
    }
}