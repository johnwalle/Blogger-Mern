import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import NoAvatar from "../assets/no-profile-picture-15257.png";
import useChangeAvatar from "../hooks/useChangeAvatar";

const ChangeAvatar = () => {
  const { user } = useAuthContext();
  const [avatar, setAvatar] = useState(null);
  const { changeAvatar, isLoading, error } = useChangeAvatar();


  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    try {
      await changeAvatar(avatar);
    } catch (err) {
      // Handle error tesfaye 
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <form onSubmit={handleAvatarUpload} encType="multipart/form-data">
        <div className="mb-4">
          <div className="mb-4 flex justify-center items-center">
            <img
              src={user.avatar ? user.avatar : NoAvatar}
              alt="Post Thumbnail"
              className="rounded-full border border-white w-24 h-24"
            />
          </div>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleAvatarChange}
            className="border rounded w-40 py-1 px-2 text-sm"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Uploading" : "Upload Avatar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeAvatar;