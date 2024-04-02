import jwt, {jwtDecode} from 'jwt-decode';

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};