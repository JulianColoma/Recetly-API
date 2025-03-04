export class Recipe {
    static getAll = async () =>{
        return fetch('https://recetly.onrender.com/recipes',
            {
                method: "GET",
                credentials: "include", 
              }
        )
        
    }
    static getById = async (id) =>{
        return fetch(`https://recetly.onrender.com/recipes/${id}`)
        
    }
    static delete = async (id) =>{
        return fetch(`https://recetly.onrender.com/recipes/${id}`,{
            method: 'DELETE',
            credentials: "include", 
        })
        
    }
    static add = async (data, img) =>{
        return fetch(`https://recetly.onrender.com/recipes`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json', 
              },
            credentials: "include", 
            body: JSON.stringify(data),
            file: img,
        })
        
    }
    static update = async (data, img) =>{
        return fetch(`https://recetly.onrender.com/recipes`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json', 
              },
            credentials: "include", 
            body: JSON.stringify(data),
            file: img,
        })
        
    }
}