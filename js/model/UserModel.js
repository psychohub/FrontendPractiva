export default class UserModel {
    static async  register(username, password) {
        console.log('Register method:', username, password);
        try {
          
          const response = await fetch('http://127.0.0.1:8000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error al registrar usuario:', error);
          throw error;
        }
      }
    
      static async getUserByUsername(username) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/users?username=${username}`);
          const data = await response.json();
          return data.length > 0 ? data[0] : null;
        } catch (error) {
          console.error('Error al obtener usuario por nombre de usuario:', error);
          throw error;
        }
      }
  
      static async login(username, password) {

        const url = 'http://127.0.0.1:8000/auth/login';
        const body = {
          username: username,
          password: password,
        };


        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  'Content-type': 'application/json'
                }
              });

              const data = await response.json();
        
            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || 'Error desconocido durante el inicio de sesión'); 
            }

            return data.accessToken;
        } catch (error) {
          if (error.message) {
            throw error.message;
          } else {
            throw error;
          }
        }
  }
}