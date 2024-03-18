export default class UserModel {
    static async  register(username, password) {
        console.log('Register method:', username, password);
        try {
          // Verificar si el usuario ya está registrado
         
          
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
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    }
  
    static getToken() {
      return localStorage.getItem('token');
    }
  }