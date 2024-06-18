import { useEffect, useRef, useState } from 'react'
import './auth.css'
import useLogin from "../../hooks/useLogin";
import { Link } from 'react-router-dom';




const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useLogin();

    const inputRef = useRef(null);

    useEffect(() => {

        inputRef.current.focus();

    }, [])


    const handleLogin = async (e) => {
        e.preventDefault();
        // Handle login logic here

        await login(email, setEmail, password, setPassword);

    };




    return (
        <div className='register-main-container'>
            <div class="container">
                <div class="heading">Login</div>
                {error && (
                    <div className="mx-4 border border-red-500 rounded px-3 py-2 text-red-500">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} class="form">
                    <input
                        type="email"
                        id="email"
                        ref={inputRef}
                        placeholder="E-mail"
                        className='input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        className='input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span class="forgot-password"><Link to='/signup' >Not have an account ?</Link></span>
                    <input class="login-button" type="submit" value="Login" />

                </form>
            </div>
        </div>
    )
}

export default LoginForm
