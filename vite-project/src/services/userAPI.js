const API_URL = 'http://192.168.18.32:3000/users';

//Finish OK
//http://192.168.18.32:3000/api

export const loginUser = async ({email, password}) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Error al iniciar sesión.');
        }
        
        window.location.href="/Account"
        return data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST', credentials: 'include'
        });
        
        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Error al cerrar sesión.');
        }
        window.location.href="/"
        return data;
    } catch (error) {
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await fetch(`${API_URL}/profile`,{  credentials: 'include'});
        
        if (response.status === 401) {
            alert('Sesión expirada o no autenticada. Por favor, inicia sesión de nuevo.');
            return null; 
        }

        if (!response.ok) {
            throw new Error('No se pudo obtener el perfil del usuario.');
        }
        
        const data = await response.json();
        return data; 
    } catch (error) {
        throw error;
    }
};