import React, { useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const PostDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { postID } = useParams();
  const [singlePost, setSinglePost] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSinglePost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/posts/${postID}`
        );
        setSinglePost(response.data);
        console.log("The post", response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
      setIsLoading(false);
    };

    fetchSinglePost();
  }, [postID]);

  if (isLoading) {
    return <Loader />;
  }

  const extractedDescription = document.createElement("div");
  extractedDescription.innerHTML = singlePost?.description;
  const descriptionText =
    extractedDescription.textContent || extractedDescription.innerText;

  return (
    <section className="mt-24 mb-52 bg-gray-100 mx-auto shadow-lg rounded-lg p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <PostAuthor
            creator={singlePost?.creator}
            updatedAt={singlePost?.updatedAt}
          />
          {user && user.id === singlePost?.creator && (
            <div className="space-x-2">
              <Link
                to={`/posts/${postID}/edit`}
                className="text-blue-500 hover:text-blue-700 border border-blue-500 hover:border-blue-700 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md"
              >
                Edit
              </Link>
            </div>
          )}
        </div>
        {singlePost ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{singlePost.title}</h1>
            <div className="mb-4">
              <img
                src={`http://localhost:8000/uploads/${singlePost.image}`}
                alt="Thumbnail"
                className="w-full"
              />
            </div>
            <p className="mb-4">{descriptionText}</p>
          </>
        ) : (
          <p>No post found.</p>
        )}
      </div>
    </section>
  );
};

export default PostDetail;
