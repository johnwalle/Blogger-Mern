import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useEditUserInfo from "../hooks/useEditUserInfo";
import ChangeAvatar from "./ChangeAvatar";
import Footer from "../components/Footer";

const UserProfile = () => {
  const { user } = useAuthContext();
  const { editUser, isLoading, error } = useEditUserInfo();

  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("I am clicked.");

    await editUser(
      name,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
      setCurrentPassword,
      setConfirmNewPassword,
      setNewPassword
    );
    // Handle success
  };

  return (
    <>
      <section className="mt-12 mb-52 py-8">
        <div className="mx-auto flex flex-col items-center">
          <Link
            to={`/myposts`}
            className="text-blue-500 hover:text-blue-600 mb-4 border border-blue-500 hover:border-blue-600 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md"
          >
            My Posts
          </Link>
          <div className="py-4">
            <ChangeAvatar />
          </div>
          {/* Form to update user info */}
          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto  bg-white p-8 rounded-lg shadow-lg"
          >
            {error && (
              <div className="mb-6 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}
            <div className="mb-6">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ringfocus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
            >
              {!isLoading ? "Update Details" : "Updating..."}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>

  );
};

export default UserProfile;
