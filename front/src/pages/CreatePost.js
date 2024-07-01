import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import Footer from "../components/Footer";

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("myImage", image);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        const createdPost = response.data;
        dispatch({ type: "CREATE_POST", payload: createdPost });
        console.log("Post created successfully:", createdPost);
        // Clear form inputs after successful submission
        navigate('/')
        setTitle("");
        setCategory("");
        setDescription("");
        setImage(null);
      }
    } catch (error) {
      console.log("Error creating post:", error);
      setError(
        error.response?.data?.message ||
        "Error creating post. Please try again."
      );
    }
    setIsLoading(false);
  };

  return (

    <>
      <div className="mb-52 mt-24 mx-auto p-4 flex justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Create Post</h1>
          {error && (
            <p className="w-full border text-white bg-red-400 text-center py-2 mb-4 rounded-md text-lg">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              >
                <option value="">Select a category</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Business">Business</option>
                <option value="Art">Art</option>
                <option value="Education">Education</option>
                <option value="Sport">Sport</option>
                <option value="Investment">Investment</option>
                <option value="Weather">Weather</option>
                <option value="Uncategorized">Uncategorized</option>
              </select>
            </div>
            <div className="mb-4">
              <ReactQuill
                value={description}
                onChange={setDescription}
                placeholder="Description"
                className="border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="border rounded"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isLoading ? "Creating" : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default CreatePost;
