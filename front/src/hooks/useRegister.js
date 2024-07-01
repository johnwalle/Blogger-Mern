import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

const useRegister = () => {
  const [error, setError] = useState('');
  const { dispatch } = useAuthContext();

  const register = async (name, setName, email, setEmail, password, setPassword) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('apiUrl:', apiUrl);
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, {
        name,
        email,
        password,
      });

      const data = response.data;


      if (response.status === 200) {
        // set the fields empty
        setName('');
        setEmail('');
        setPassword('');
        setError(null);

        console.log('name:', name);

        // save the user to the local storage
        localStorage.setItem('user', JSON.stringify(data));

        // dispatch the login
        dispatch({ type: 'LOGIN', payload: data });
      }
    } catch (error) {
      setError('User already registered.');
    }
  };

  return { register, error };
};

export default useRegister;