import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white w-1/3 mb-12 rounded shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && (
                    <div className="mb-4 border border-red-500 rounded px-3 py-2 text-red-500">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={inputRef}
                            placeholder="Enter email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                        Login
                    </button>
                    <span className="text-gray-600 mt-2 block">
                        Don't have an account?
                        <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-medium ml-1">
                            Sign up
                        </Link>
                    </span>                </form>
            </div>
        </div>
    );
};


export default LoginForm;