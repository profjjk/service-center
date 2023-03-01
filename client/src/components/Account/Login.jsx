import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const LoginForm = ({ setIsNew }) => {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const notFound = document.querySelector("#invalid");

        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData);

        // if (isAuth) {
        //     navigate("/dashboard");
        // } else {
        //     notFound.classList.add('error')
        // }

        navigate("/dashboard");
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
                        Username
                        <input
                            type={"text"}
                            name={"username"}
                            defaultValue={"Demo"}
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

                <div className={"card-footer"}>
                    <p>
                        Forgot your password?
                    </p>
                </div>
            </div>
    )
}