import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import DOMPurify from "dompurify";

const PostItems = ({
  postID,
  title,
  description,
  creator,
  category,
  image,
  createdAt,
  updatedAt,
}) => {
  const categoryStyling = {
    Agriculture:
      " text-white mx-2 my-1 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full",
    Business:
      " text-white mx-2 my-1 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full",
    Art: "text-white mx-2 my-1 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full",
    Education:
      " text-white mx-2 my-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full",
    Sport:
      " text-white mx-2 my-1 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full",
    Investment:
      " text-white mx-2 my-1 bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full",
    Uncategorized:
      " text-white mx-2 my-1 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full",
    Weather:
      "text-white mx-2 my-1 bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-full",
    Entertainment:
      "text-black mx-2 border border-blue-500  my-1 bg-white hover:bg-gray-200 px-4 py-2 rounded-full",
    Technology:
      "text-white mx-2 border border-cyan-200  my-1 bg-cyan-400 hover:bg-cyan-600 px-4 py-2 rounded-full",
  };

  const getCategoryStyle = (category) => {
    return categoryStyling[category] || "bg-gray-500 hover:bg-gray-600";
  };

  // const extractedDescription = document.createElement("div");
  // extractedDescription.innerHTML = description;
  // const descriptionText =
  //   extractedDescription.textContent || extractedDescription.innerText;

  return (

    <article className="flex px-7 flex-col shadow-lg bg-white rounded-lg border-gray-300 mb-5 ">
      <div className="rounded-lg w-full h-48 md:h-32 mb-4">
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${image}`}
          alt="Post Thumbnail"
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <Link to={`/post/${postID}`}>
            <h3 className="pl-3 text-xl md:text-2xl font-bold mb-2 md:mb-4 truncate">
              {title}
            </h3>
          </Link>
          <div className="max-w-full pb-5 overflow-hidden">
            <div
              className="text-overflow-ellipsis pl-2 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  description.length > 250
                    ? `${description.slice(0, 250)}...`
                    : description
                ),
              }}
            />
          </div>
        </div>
        <div className="flex py-6 justify-between items-end">
          <div className="">
            <PostAuthor creator={creator} createdAt={createdAt} updatedAt={updatedAt} />
          </div>
          <div>
            <Link
              to={`/posts/categories/${category}`}
              className={`${getCategoryStyle(category)}`}
            >
              {category}
            </Link>
          </div>
        </div>
      </div>
    </article>


  );
};

export default PostItems;
