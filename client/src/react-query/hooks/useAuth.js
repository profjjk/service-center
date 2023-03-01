import { API } from '../../utils/api';
import { useUser } from './useUser';
import { clearStoredToken, clearStoredUser, setStoredToken, setStoredUser } from '../../utils/storage';

export const useAuth = () => {
    const { clearUser } = useUser();

    const login = async (credentials) => {
        try {
            const { data } = await API.login(credentials);
            if (data) {
                setStoredToken(data.token)
                setStoredUser(data.user)
            }
            return data;
        } catch(err) { console.error(err.message) }
    }

    const register = async (newUser) => {
        try {
            const { data } = await API.register(newUser);
            if (data) {
                setStoredToken(data.token)
                setStoredUser(data.user)
            }
        } catch(err) { console.error(err.message) }
    }

    const logout = () => clearUser();

    return { login, register, logout }
}