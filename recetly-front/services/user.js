export class User {
    static create = async (user) =>{
        const { name, password } = user

        fetch('https://recetly.onrender.com/register', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, password})
        })
        .then(res => {return res.json})
        
}
    static login = async (user) =>{
            const { name, password } = user

            fetch('https://recetly.onrender.com/login', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, password})
            })
            .then(res => {return res.json})
            
    }
    static logout =  async () => {
        fetch('https://recetly.onrender.com/logout', {
            method: 'POST',
        })
        .then(res => {return res.json})
    }
    static delete =  async () => {
        fetch('https://recetly.onrender.com/delete', {
            method: 'DELETE',
        })
        .then(res => {return res.json})
        
    }
}