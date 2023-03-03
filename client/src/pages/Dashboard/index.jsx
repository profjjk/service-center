import { useUser } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Dashboard = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    if (!user) navigate('/auth');

    return (
        <main>
            <h1>Dashboard Page</h1>
        </main>
    )
}