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
      postData.set("avatar", avatar);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/avatar`,
        postData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const data = response.data;
      // Save the user in local storage
      localStorage.setItem("user", JSON.stringify(data));
      // Dispatch the login with the updated user data

      dispatch({ type: "LOGIN", payload: data });
      setAvatar(null);
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        return { error: error.response.data.message };
      } else {
        // setError("An error occurred while changing the avatar.");
        return { error: "An error occurred while changing the avatar." };
      }
    }
  };

  return { error, changeAvatar, isLoading };
};

export default useChangeAvatar;