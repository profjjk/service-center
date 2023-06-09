import { useAuth } from '../../components';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export const Home = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const loginDemo = async (e) => {
        e.preventDefault();
        const demoCreds = {
            email: 'demo@demo.com',
            password: 'password'
        };
        try {
            const authorization = await login(demoCreds);
            if (authorization) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <main id={'landing-page'}>
            <h1>A simple and easy solution <br/> to help manage your daily business.</h1>

            <div>
                <p id={'description'}>
                    Boost efficiency and simplify operations with a comprehensive web application. Manage customers,
                    track service jobs, and lookup invoices.
                </p>
                <p id={'demo-login'} onClick={loginDemo}>Try out the demo &rarr;</p>
            </div>
        </main>
    );
};