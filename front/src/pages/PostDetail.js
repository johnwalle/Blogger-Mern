import React, { useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import DOMPurify from "dompurify";


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
          `${process.env.REACT_APP_API_URL}/api/posts/${postID}`
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



  return (
    <section className="mt-24 mb-52  mx-auto rounded-lg p-8">
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
            <div className="flex justify-center items-center mb-4">
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${singlePost.image}`}
                alt="Thumbnail"
                className="w-full max-h-[450px]"
              />
            </div>
            <div className="max-w-full pb-5 overflow-hidden">
              <div
                className="text-overflow-ellipsis pl-2"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(singlePost?.description) }}
              />
            </div>
          </>
        ) : (
          <p>No post found.</p>
        )}
      </div>
    </section>
  );
};

export default PostDetail;
