import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import NoAvatar from "../assets/no-profile-picture-15257.png";

const PostAuthor = ({ creator, postID, createdAt, updatedAt }) => {
  const [authorName, setAuthorName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/${creator}`
        );
        const data = await response.json();
        const { name, avatar: authorAvatar } = data;

        setAuthorName(name);
        setAvatar(authorAvatar);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAuthor();
  }, [creator]);

  let formattedTime = "Invalid Time";

  if (updatedAt) {
    formattedTime = formatDistanceToNow(new Date(updatedAt), {
      addSuffix: true,
    });
  }

  return (
    <Link to={`/posts/user/${creator}`} className="flex items-center">
      <div className="mr-3">
        <img
          src={avatar ? `http://localhost:8000/avatars/${avatar}` : NoAvatar}
          alt="Post Thumbnail"
          className="rounded-full border border-white w-12 h-12"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold">By {authorName}</h3>
        <small className="text-gray-500">{formattedTime}</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
