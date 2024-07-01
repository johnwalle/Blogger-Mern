import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';


const useLogin = () => {

    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext();

    const login = async (email, setEmail, password, setPassword) => {

        console.log("email:", email , 'password:', password)


        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                email,
                password
            })

            const data = response.data
            console.log('data:', data);

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
        }

    }

    return { error, login}


}




export default useLogin 