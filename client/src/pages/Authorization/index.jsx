import { LoginForm, RegisterForm } from '../../components';
import { useState } from 'react';

export const Authorization = () => {
    const [isNew, setIsNew] = useState(false);

    return (
        <main>
            <h1>Authorization Page</h1>
            {
                isNew ?
                    <RegisterForm setIsNew={setIsNew} /> :
                    <LoginForm setIsNew={setIsNew} />
            }
        </main>
    )
}