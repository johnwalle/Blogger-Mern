import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NoAvatar from "../assets/no-profile-picture-15257.png";
import axios from "axios";
import Footer from "../components/Footer";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
        const authorsData = response.data;
        setAuthors(authorsData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <>
      <section className="mx-auto mb-52 mt-24 px-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : authors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {authors.map(({ _id, avatar, name, posts }) => (
              <Link key={_id} to={`/posts/user/${_id}`}>
                <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
                  <img
                    src={avatar ? `${avatar}` : NoAvatar}
                    alt={name}
                    className="object-cover w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full mb-2 sm:mb-4"
                  />
                  <p className="text-lg font-semibold text-center">{name}</p>
                  <p className="text-gray-500 text-center">{posts} posts</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h1 className="flex items-center justify-center text-3xl mt-52 font-bold">
            No authors found.
          </h1>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Authors;