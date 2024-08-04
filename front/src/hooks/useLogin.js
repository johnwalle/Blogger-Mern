import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';


const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, setEmail, password, setPassword) => {
        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                email,
                password,
            });

            const data = response.data;

            if (response.status === 200) {
                setEmail('');
                setPassword('');

                // save the user in local storage
                localStorage.setItem("user", JSON.stringify(data));

                // dispatch the login
                dispatch({ type: "LOGIN", payload: data });
            }
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { error, isLoading, login };
};

export default useLogin;