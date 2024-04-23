import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import Loader from "../components/Loader";
import axios from "axios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthContext();
  // const { dispatch } = usePostContext();
  const [myPosts, setMyPosts] = useState([]);

  const fetchMyPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts/user/${user.id}`
      );
      setMyPosts(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const deleteHandler = async (postId) => {
    console.log("Post id ", postId);
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/posts/delete-post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        // dispatch({ type: "DELETE_POST" });
        setMyPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
    setIsDeleting(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="container mt-24 mb-52 mx-auto flex flex-col items-center">
      {myPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myPosts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={`http://localhost:8000/uploads/${post.image}`}
                  alt={post.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
                  <Link
                    to={`/post/${post._id}`}
                    className="text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    View
                  </Link>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                </div>
                <div className="flex justify-end items-center space-x-4 mt-4">
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="border-blue-500 bg-blue-300 hover:bg-blue-500 hover:text-white rounded-lg py-2 px-4 transition-colors duration-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(post._id)}
                    className="border-red-500 bg-red-500 hover:bg-red-200 hover:text-white rounded-lg py-2 px-4 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-2xl">No posts yet.</h1>
      )}
    </section>
  );
};

export default Dashboard;
