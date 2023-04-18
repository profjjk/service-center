import { Login, RegistrationForm, useUser } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export const Authorization = () => {
    const [ isNew, setIsNew ] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [ user ]);

    return (
        <main id={'auth-page'}>
            {isNew ? (
                <RegistrationForm setIsNew={setIsNew}/>
            ) : (
                <Login setIsNew={setIsNew}/>
            )}
        </main>
    );
};