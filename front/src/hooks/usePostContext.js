import { PostContext } from '../contexts/PostContext';
import { useContext } from 'react'

export const usePostContext = () => {
    const context = useContext(PostContext);

    if (!context) {
        throw Error("Usepostcontext must be used inside an PostContextProvider!")
    }

    return context
}