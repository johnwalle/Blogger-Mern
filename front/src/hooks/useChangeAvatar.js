import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const useChangeAvatar = () => {
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const changeAvatar = async (avatar, setAvatar) => {
    setIsLoading(true);
    try {
      const postData = new FormData();
      postData.set("myAvatar", avatar);
      const response = await axios.put(
        `http://localhost:8000/api/users/change-avatar`,
        postData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setAvatar(response?.data.avatar);

      const data = response.data;
      console.log(data);

      if (response.status === 200) {
        // save the user in local storage
        localStorage.setItem("user", JSON.stringify(data));
        setAvatar(null); // Set avatar state to null
        // dispatch the login
        dispatch({ type: "LOGIN", payload: data });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        console.log(error);
      }
    }
    setIsLoading(false);
  };

  return { error, changeAvatar, isLoading };
};

export default useChangeAvatar;
