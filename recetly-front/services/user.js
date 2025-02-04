export class User {
    static create = async (user) =>{
        
        return fetch('https://recetly.onrender.com/register', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })        
}
    static login = async (user) =>{
            const { name, password } = user

            return fetch('https://recetly.onrender.com/login', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, password})
            })
            
    }
    static logout =  async () => {
        return fetch('https://recetly.onrender.com/logout', {
            method: 'POST',
        })
        .then(res => res.json)
    }
    static delete =  async () => {
        return fetch('https://recetly.onrender.com/delete', {
            method: 'DELETE',
        })
        
    }
}