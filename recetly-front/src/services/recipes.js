export const loginUser = async (credentials) => {
    try {
      const response = await fetch('http://localhost:1234/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        //actualizar estado global
        return { success: true };
      } else {
        console.error(data.message);
        return { success: false };
      }
    } catch (error) {
      console.error('Error al intentar loguearse:', error);
      return { success: false };
    }
  };
  