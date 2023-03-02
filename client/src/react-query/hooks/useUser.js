import { API } from '../../utils/api';
import { clearStoredToken, clearStoredUser, getStoredUser, setStoredUser } from '../../utils/storage';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const getUser = async (userId) => {
    try {
        if (userId) {
            const { data } = await API.getUser(userId);
            return data;
        }
    } catch(err) {
        clearStoredToken();
        clearStoredUser();
        console.error(err);
    }
}

export const useUser = () => {
    const qc = useQueryClient();
    const navigate = useNavigate();

    const { data: user } = useQuery(
        'user',
        () => getUser(getStoredUser()?._id),
        {
            enabled: !!getStoredUser(),
            onSuccess: (response) => {
                if (!response) {
                    clearStoredUser();
                } else {
                    setStoredUser(response);
                }
            }
        }
    )

    const clearUser = () => {
        clearStoredUser();
        clearStoredToken();
        qc.removeQueries(['user']);
        navigate("/auth")
    }

    return { user, clearUser }
}