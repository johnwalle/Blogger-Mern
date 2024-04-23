import { createContext, useReducer, useEffect } from "react";

export const PostContext = createContext();

const PostReducer = (state, action) => {
    switch (action.type) {
        case "SET_POSTS":
            return {
                posts: action.payload,
            };
        case "CREATE_POST":
            return {
                posts: [action.payload, ...state.posts],
            };
        case "DELETE_POST":
            return {
                posts: state.posts.filter((p) => p._id !== action.payload._id),
            };
        default:
            return state;
    }
};

export const PostContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PostReducer, {
        posts: [], // Set initial state to an empty array
    });

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts"));
        if (storedPosts) {
            dispatch({ type: "SET_POSTS", payload: storedPosts });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(state.posts));
    }, [state.posts]);

    console.log("PostContexts: ", state);

    return (
        <PostContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
};