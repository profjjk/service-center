import { useUser } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Services = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    if (!user) navigate("/auth");

    return (
        <main>
            <h1>Services Page</h1>
        </main>
    )
}