const Post = require('../model/postmodel');
const User = require('../model/usermodel')


/// creating posts 
const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Check if the inputs are filled
    if (!title || !description || !category) {
      return res.status(400).json({ message: "Please fill all the fields." });
    }

    // Check if an image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    // Get the file path of the uploaded image
    const imagePath = req.file.filename;

    // Create a new post instance
    const newPost = await Post.create({
      title,
      description,
      category,
      image: imagePath,
      creator: req.user._id,
    });

    if (newPost) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: req.user._id },
          { $inc: { posts: 1 } },
          { new: true }
        );

        if (!updatedUser) {
          return res
            .status(400)
            .json({ message: "Failed to update user's post count." });
        }

        return res.status(200).json(newPost);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update user." });
      }
    }

    return res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating post." });
  }
};



const getAllPosts = async (req, res) => {

  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while getting posts." })
  }

}

/// access posts by category 

const categoryPosts = async (req, res) => {
  const { category } = req.params;
  try {
    const posts = await Post.find({ category }).sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(400).json({ message: "No posts found." });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while getting posts by category." });
  }
};


/// getting posts by auhtors
const authorPosts = async (req, res) => {
  const { author } = req.params;
  try {
    const posts = await Post.find({ creator: author }).sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(400).json({ message: "No posts found." });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while getting posts by authors." });
  }
};



// getting single posts

const singlePost = async (req, res) => {
  const { postID } = req.params

  try {
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(400).json({ message: "No post found." })
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while getting a post." })
  }
}


// deleting a post 

const deletePost = async (req, res) => {
  const { postID } = req.params;

  try {
    const post = await Post.findById(postID);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the authenticated user is the creator of the post
    if (post.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this post." });
    }

    const deletedPost = await Post.findByIdAndDelete(postID);

    if (deletedPost) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: req.user._id },
          { $inc: { posts: -1 } },
          { new: true }
        );

        if (!updatedUser) {
          return res
            .status(400)
            .json({ message: "Failed to update user's post count." });
        }

        return res.status(200).json({ message: "Post deleted successfully." });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update user." });
      }
    } else {
      return res.status(400).json({ message: "No post found." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while deleting the post." });
  }
};


//  edit a post

const editPost = async (req, res) => {
  const { postID } = req.params;
  const { title, description, category } = req.body;
  const imagePath = req.file.filename;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postID,
      { title, description, category, image: imagePath },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the authenticated user is the creator of the post
    if (updatedPost.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to edit this post." });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while editing the post." });
  }
};


module.exports = {
  createPost,
  getAllPosts,
  categoryPosts,
  singlePost,
  authorPosts,
  deletePost,
  editPost
}