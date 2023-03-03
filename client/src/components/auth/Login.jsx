import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useUser } from '../user';
import './style.scss';

export const Login = ({ setIsNew }) => {
    const { login } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();

    if (user) navigate(-1);

    const submitHandler = async (e) => {
        e.preventDefault();
        const notFound = document.querySelector('#invalid');
        const formData = Object.fromEntries(new FormData(e.target));

        try {
            const authorization = await login(formData);
            if (!authorization) {
                notFound.classList.add('error');
            } else {
                navigate('/dashboard')
            }
        } catch(err) { console.error(err) }
    }

    return (
            <div className={'card-auth'}>
                <div className={'card-header'}>
                    <h2>Login</h2>
                    <p>
                        Don't have an account?
                        <span onClick={() => setIsNew(true)}> Register Now</span>
                    </p>
                </div>

                <form className={'card-form'} onSubmit={submitHandler}>
                    <label>
                        Email
                        <input
                            type={'email'}
                            name={'email'}
                            defaultValue={'demo@demo.com'}
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type={'password'}
                            name={'password'}
                            defaultValue={'password'}
                            required
                        />
                    </label>

                    <p id={'invalid'}>
                        Username or password incorrect.
                    </p>

                    <button
                        className={'btn-login'}
                        type={'submit'}
                    >
                        LOGIN
                    </button>
                </form>

                {/*<div className={'card-footer'}>*/}
                {/*    <p>*/}
                {/*        Forgot your password?*/}
                {/*    </p>*/}
                {/*</div>*/}
            </div>
    )
}