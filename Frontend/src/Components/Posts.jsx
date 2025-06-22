import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import ParticlesBg from "./HomePage/ParticlesBg";


const Post = () => {
  const [posts, setPosts] = useState([]);
  const [votedPosts, setVotedPosts] = useState({}); 

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts",{withCredentials: true});
      const sortedPosts = res.data.sort((a, b) => b.likes - a.likes);
      setPosts(sortedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleVote = async (postId, type) => {
    if (votedPosts[postId]) return alert("You have already voted on this post!");

    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/${type}`,{},{ withCredentials: true });
      setVotedPosts({ ...votedPosts, [postId]: type });
      fetchPosts();
    } catch (err) {
      console.error("Voting error:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <ParticlesBg />
      <Navbar/>
      
      <h1 className="text-5xl font-bold text-blue-400 mb-15 mt-15 text-center">Top Posts</h1>

      <div className="max-w-5xl mx-auto grid gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-black bg-opacity-60 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-blue-500"
          >
            <p className="text-lg mb-4 text-gray-200">{post.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={() => handleVote(post._id, "like")}
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  👍 {post.likes}
                </button>
                <button
                  onClick={() => handleVote(post._id, "dislike")}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  👎 {post.dislikes}
                </button>
              </div>
              <span className="text-sm text-gray-400">
          Posted by: {post.user?.name || "Anonymous"}
         </span>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
