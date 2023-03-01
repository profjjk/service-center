import { useUser } from '../../react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Customers = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/auth")
    }, [user]);

    return (
        <main>
            <h1>Customers Page</h1>
        </main>
    )
}