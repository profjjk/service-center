import { RegistrationForm } from '../../components';
import { Login } from '../../components';
import { useState } from 'react';
import { useUser } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './style.scss';

export const Authorization = () => {
    const [isNew, setIsNew] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard")
    }, [user]);

    return (
        <main id={"auth-page"}>
            {isNew ? (
                <RegistrationForm setIsNew={setIsNew} />
                ) : (
                <Login setIsNew={setIsNew} />
            )}
        </main>
    )
}