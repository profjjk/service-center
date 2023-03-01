import { useEffect } from 'react';
import { useUser } from '../../react-query';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/auth")
    }, [user]);

    return (
        <main>
            <h1>Dashboard Page</h1>
        </main>
    )
}