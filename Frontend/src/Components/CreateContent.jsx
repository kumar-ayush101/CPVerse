import React, { useState } from "react";
import axios from "axios";
import ParticlesBg from "./HomePage/ParticlesBg";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";



const CreateContent = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (type) => {
    if (!content.trim()) {
      alert("Content cannot be empty.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/${type}`, { text: content },
      { withCredentials: true }
    );

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} submitted successfully`);
      setContent("");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16  text-white">
      
      <ParticlesBg />
      <Navbar />
      
      <div className="relative z-20 max-w-4xl w-full h-[600px] p-6 bg-black bg-opacity-50 backdrop-blur-md rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400 animate-pulse">
          Create New Content
        </h2>
        <textarea
          className="w-full h-100 p-4 text-white bg-gray-900 border border-blue-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your post, doubt, or fact here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-between mt-6 gap-4">
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            onClick={() => handleSubmit("posts")}
          >
            Add as Post
          </button>
          <button
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
            onClick={() => handleSubmit("doubts")}
          >
            Add as Doubt
          </button>
          <button
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            onClick={() => handleSubmit("drafts")}
          >
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;
