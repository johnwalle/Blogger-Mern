import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostItems from '../components/PostItems';
import axios from 'axios';
import Loader from '../components/Loader/Loader'
import Footer from '../components/Footer';

const CategoryPosts = () => {
  const [categoryPosts, setCategoryPosts] = useState([]);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchByCategory = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/categories/${category}`);
        const postsByCategory = response.data;
        setCategoryPosts(postsByCategory);
      } catch (error) {
        console.error('Error fetching posts by category:', error);
      }
      setIsLoading(false);

    };

    fetchByCategory();
  }, [category]);


  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
        <section className="mt-24 mx-2 pb-44 sm:mx-2 md:mx-2 px-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-100">
        {categoryPosts.length > 0 ? (
          categoryPosts.map(({ _id, image, createdAt, updatedAt, category, description, creator, title }) => (
            <PostItems
              key={_id}
              postID={_id}
              image={image}
              category={category}
              description={description}
              creator={creator}
              createdAt={createdAt}
              updatedAt={updatedAt}
              title={title}
            />
          ))
        ) : (
          <h1 className="center text-3xl font-bold">No posts found.</h1>
        )}
      </section>
      <Footer />
    </>

  );
};

export default CategoryPosts;