import { useAuthContext } from "./useAuthContext";


export const useLogout = () => {

    const { dispatch } = useAuthContext()


    function logout() {

        // remove from the localstorage
        localStorage.removeItem("user");

        // dispatch the logout action
        dispatch({ type: "LOGOUT" });


    }

    return { logout }
}

