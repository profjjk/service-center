import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../react-query';

export const LoginForm = ({ setIsNew }) => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const notFound = document.querySelector("#invalid");
        const formData = Object.fromEntries(new FormData(e.target));

        try {
            const auth = await login(formData);
            if (!!auth) {
                navigate("/dashboard")
            } else {
                notFound.classList.add('error')
            }
        } catch(err) { console.error(err) }
    }

    return (
            <div className={"card-auth"}>
                <div className={"card-header"}>
                    <h2>Login</h2>
                    <p>
                        Don't have an account?
                        <span onClick={() => setIsNew(true)}> Register Now</span>
                    </p>
                </div>

                <form className={"card-form"} onSubmit={submitHandler}>
                    <label>
                        Email
                        <input
                            type={"email"}
                            name={"email"}
                            defaultValue={"demo@demo.com"}
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type={"password"}
                            name={"password"}
                            defaultValue={"password"}
                            required
                        />
                    </label>

                    <p id={"invalid"}>
                        Username or password incorrect.
                    </p>

                    <button
                        className={"btn-login"}
                        type={"submit"}
                    >
                        LOGIN
                    </button>
                </form>

                {/*<div className={"card-footer"}>*/}
                {/*    <p>*/}
                {/*        Forgot your password?*/}
                {/*    </p>*/}
                {/*</div>*/}
            </div>
    )
}