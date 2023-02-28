import './style.scss';

export const LoginForm = ({ setIsNew }) => {
    const submitHandler = async (e) => {
        console.log(e.target)
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

                    <button
                        className={"btn-login"}
                        type={"submit"}
                    >
                        LOGIN
                    </button>
                </form>

                <div className={"card-footer"}>
                    <p>Forgot your password?</p>
                </div>
            </div>
    )
}