import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';


const useEditUserInfo = () => {

    const { user } = useAuthContext();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext();

    const editUser = async (name, email, currentPassword, newPassword, confirmNewPassword, setConfirmNewPassword, setNewPassword, setCurrentPassword) => {
        
        setIsLoading(true)
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/edit-user`, {
                name,
                email,
                currentPassword,
                newPassword,
                confirmNewPassword
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            console.log("user info", name, email, currentPassword, newPassword, confirmNewPassword);
            
            const data = response.data
            console.log(data);

            if (response.status === 200) {

                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword("");
                setError(null);
                // save the user in local storage

                localStorage.setItem("user", JSON.stringify(data));

                // dispatch the login

                dispatch({ type: "LOGIN", payload: data });
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                console.log("error", error.response.data.message)

            }
        }
        setIsLoading(false)

    }

    return { error, editUser ,isLoading }


}




export default useEditUserInfo 