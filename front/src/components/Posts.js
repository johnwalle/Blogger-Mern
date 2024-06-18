import React, { useEffect, useState } from 'react';
import PostItems from './PostItems';
import Loader from './Loader';
import axios from 'axios';
import { usePostContext } from '../hooks/usePostContext';

const Posts = () => {
    // const { posts, dispatch } = usePostContext();
    const [isLoading, setIsLoading] = useState(false);
    const [posts , setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/posts`);
                const postData = response.data;

                setPosts(postData)
                
            } catch (error) {
                console.log(error.response.data.message);
            }
            setIsLoading(false);
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className="px-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-100">
            {posts.length > 0 ? (
                posts.map(({ _id, image, category, description, creator, title , createdAt, updatedAt}) => (
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
                ))
            ) : (
                <h1 className="center text-3xl font-bold">No posts found.</h1>
            )}

        </section>
    );
};

export default Posts;