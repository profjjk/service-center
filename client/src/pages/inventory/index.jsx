import { useUser } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Inventory = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/auth")
    }, [user]);

    return (
        <main>
            <h1>Inventory Page</h1>
        </main>
    )
}