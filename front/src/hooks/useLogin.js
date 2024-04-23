import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';


const useLogin = () => {

    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext();

    const login = async (email, setEmail, password, setPassword) => {

        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email,
                password
            })

            const data = response.data

            if (response.status === 200) {

                setEmail('');
                setPassword('');

                // save the user in local storage

                localStorage.setItem("user", JSON.stringify(data));

                // dispatch the login

                dispatch({ type: "LOGIN", payload: data });
            }

        } catch (error) {
            setError('Invalid email or password.')
        }

    }

    return { error, login}


}




export default useLogin 