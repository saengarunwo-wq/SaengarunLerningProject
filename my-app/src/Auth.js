import { useState } from "react";
import Axios from "axios";

function Auth({ onLogin }) {

    const [isRegister, setIsRegister] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        try {

            if (isRegister) {

                const response = await Axios.post(
                    "http://localhost:3001/api/auth/register",
                    {
                        username,
                        email,
                        password
                    }
                );

                setMessage(response.data.message);

                // กลับไป Login
                setIsRegister(false);

                setUsername("");
                setEmail("");
                setPassword("");

            } else {

                const response = await Axios.post(
                    "http://localhost:3001/api/auth/login",
                    {
                        email,
                        password
                    }
                );

                // เก็บ JWT
                localStorage.setItem(
                    "token",
                    response.data.token
                );

                // บอก App ว่า Login สำเร็จ
                onLogin();

            }

        } catch (error) {

            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Server error");
            }
        }
    };


    return (
        <div>

            <h1>
                {isRegister ? "Register" : "Login"}
            </h1>

            <form onSubmit={handleSubmit}>

                {isRegister && (
                    <div>
                        <label>Username</label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />
                    </div>
                )}


                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>


                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>


                <button type="submit">
                    {isRegister ? "Register" : "Login"}
                </button>

            </form>


            {message && (
                <p>{message}</p>
            )}


            <button
                onClick={() => {
                    setIsRegister(!isRegister);
                    setMessage("");
                }}
            >
                {isRegister
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"
                }
            </button>

        </div>
    );
}

export default Auth;