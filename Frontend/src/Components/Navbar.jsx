import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, {
        withCredentials: true, 
      });
      alert("Logged out");
      navigate("/home"); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">
          <Link to="/">CPVerse</Link>
        </h1>

        <ul className="flex space-x-6 text-sm md:text-base font-medium">
          <li><Link to="/home" className="hover:text-blue-300 text-blue-500 transition">Home</Link></li>
          <li><Link to="/create-content" className="hover:text-blue-300 text-blue-500 transition">Create Content</Link></li>
          <li><Link to="/posts" className="hover:text-blue-300 text-blue-500 transition">Posts</Link></li>
          <li><Link to="/doubts" className="hover:text-blue-300 text-blue-500 transition">Doubts</Link></li>
          <li><Link to="/drafts" className="hover:text-blue-300 text-blue-500 transition">Drafts</Link></li>
          <li><Link to="/trackProgress" className="hover:text-blue-300 text-blue-500 transition">Track Progress</Link></li>
          <li>
           <button
          onClick={handleLogout}
         className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition font-semibold"
            >
         Logout
         </button>

          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
