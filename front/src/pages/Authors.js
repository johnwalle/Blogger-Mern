import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NoAvatar from "../assets/no-profile-picture-15257.png";
import axios from "axios";

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users`);
        const authorsData = response.data;
        console.log("authors", authorsData);
        setAuthors(authorsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <section className="container mx-auto mb-52 mt-24 px-4">
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.map(({ _id, avatar, name, posts }) => (
            <Link key={_id} to={`/posts/user/${_id}`}>
              <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
                <img
                  src={
                    avatar ? `http://localhost:8000/avatars/${avatar}` : NoAvatar
                  }
                  alt={name}
                  className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full mb-2 sm:mb-4"
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
  );
};

export default Authors;
