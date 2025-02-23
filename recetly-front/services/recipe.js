export class Recipe {
    static getAll = async () =>{
        return fetch('https://recetly.onrender.com/recipes',
            {
                method: "GET",
                credentials: "include", 
              }
        )
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
    static add = async (data, img) =>{
        return fetch(`https://recetly.onrender.com/recipes`,{
            method:'POST',
            body: data,
            file: img,
        })
        .then(res => res.json())
        
    }
    static update = async (data, img) =>{
        return fetch(`https://recetly.onrender.com/recipes`,{
            method:'PUT',
            body: data,
            file: img,
        })
        .then(res => res.json())
        
    }
}