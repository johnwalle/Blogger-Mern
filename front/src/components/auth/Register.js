import { useEffect, useRef, useState } from 'react'
import './auth.css'
import useRegister from "../../hooks/useRegister";
import { Link } from 'react-router-dom';




const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { register, error } = useRegister();

    const inputRef = useRef(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        // Handle sign up logic here
        await register(name, setName, email, setEmail, password, setPassword);
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);




    return (
        <div className='register-main-container'>
            <div class="container">
                <div class="heading">Register</div>
                {error && (
                    <div className="mb-4 border border-red-500 rounded px-3 py-2 text-red-500">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSignUp} class="form">
                    <input
                        type="text"
                        id="name"
                        className='input'
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        ref={inputRef}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        className='input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        className='input'
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span class="forgot-password"><Link to='/login' >Already have an account ?</Link></span>
                    <input className="login-button" type="submit" value="Sign Up" />

                </form>
            </div>
        </div>
    )
}

export default RegisterForm
