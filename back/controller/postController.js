const Post = require('../model/postmodel');
const User = require('../model/usermodel')
const cloudinary = require('../config/cloudinary.config');

/// creating posts 
const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Check if the required inputs are filled
    if (!title || !description || !category) {
      return res.status(400).json({ message: "Please fill all the required fields." });
    }

    const imageFile = req.file?.buffer;

    // If no image is provided, return an error
    if (!imageFile) {
      return res.status(400).json({ message: "Please provide an image." });
    }

    // Upload the image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(imageFile);

    // Create a new post instance
    const newPost = await Post.create({
      title,
      description,
      category,
      image: imageUrl,
      creator: req.user._id,
    });

    // Update the user's post count
    await updateUserPostCount(req.user._id);

    return res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating post." });
  }
};

// Helper function to upload the image to Cloudinary
const uploadImageToCloudinary = (imageFile) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'Blogger',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error(error);
            reject("Failed to upload image to Cloudinary");
          } else {
            console.log("Image uploaded successfully!");
            resolve(result.secure_url);
          }
        }
      )
      .end(imageFile);
  });
};

// Helper function to update the user's post count
const updateUserPostCount = async (userId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $inc: { posts: 1 } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update user's post count.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user.");
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

  const imageFile = req.file?.buffer;

  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'Blogger',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) {
              console.error(error);
              reject("Failed to upload image to Cloudinary");
            } else {
              console.log("Image uploaded successfully!");
              resolve(result.secure_url);
            }
          }
        )
        .end(imageFile);
    });
  };

  const imageUrl = await uploadImage();



  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postID,
      { title, description, category, image: imageUrl },
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