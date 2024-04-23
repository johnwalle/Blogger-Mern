import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItems from "../components/PostItems";
import axios from "axios";
import Loader from "../components/Loader";

const AuthorPosts = () => {
  const [loading, setLoading] = useState(false);
  const [authorPosts, setAuthorPosts] = useState([]);

  // Retrieve the creator value from the URL parameters
  const { creator } = useParams();

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      console.log("CEATOR ID", creator);
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/posts/user/${creator}`
        );

        setAuthorPosts(response.data);
        console.log("author posts", response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
      setLoading(false);
    };

    fetchAuthorPosts();
  }, [creator]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="px-4 mt-24 mb-52 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-100">
      {authorPosts.length > 0 ? (
        authorPosts.map(
          ({ _id, image, category, description, creator, title , createdAt, updatedAt }) => (
            <PostItems
              key={_id}
              postID={_id}
              image={image}
              category={category}
              description={description}
              creator={creator}
              title={title}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
          )
        )
      ) : (
        <h1 className="center text-3xl font-bold">No posts found.</h1>
      )}
    </section>
  );
};

export default AuthorPosts;
