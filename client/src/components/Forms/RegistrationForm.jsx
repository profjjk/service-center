import './style.scss';
import { useEffect, useState } from 'react';

export const RegistrationForm = ({ setIsNew }) => {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const elements = document.querySelectorAll("#password, #validation, #invalid");

        if (isError) {
            elements.forEach((element) => {
                element.classList.add('error')
            })
        } else {
            elements.forEach((element) => {
                element.classList.remove('error')
            })
        }
    }, [isError]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData);
    }

    const validatePassword = (e) => {
        const password = document.querySelector("#password").value;
        const validation = e.target.value;

        if (password.length <= validation.length && password !== validation) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }

    return (
        <div className={"card-auth"}>
            <div className={"card-header"}>
                <h2>Register</h2>
                <p>
                    Already have an account?
                    <span onClick={() => setIsNew(false)}> Login Now</span>
                </p>
            </div>

            <form className={"card-form"} onSubmit={submitHandler}>
                <label>
                    Company Name
                    <input
                        type={"text"}
                        name={"companyName"}
                        required
                    />
                </label>

                <label>
                    Username
                    <input
                        type={"text"}
                        name={"username"}
                        required
                    />
                </label>

                <label>
                    Email
                    <input
                        type={"email"}
                        name={"email"}
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        id={"password"}
                        type={"password"}
                        name={"password"}
                        required
                    />
                </label>

                <label>
                    Confirm Password
                    <input
                        id={"validation"}
                        type={"password"}
                        name={"validation"}
                        required
                        onChange={(e) => validatePassword(e)}
                    />
                </label>

                <p id={"invalid"}>
                    Password does not match.
                </p>

                <button
                    className={"btn-login"}
                    type={"submit"}
                >
                    REGISTER
                </button>
            </form>
        </div>
    )
}