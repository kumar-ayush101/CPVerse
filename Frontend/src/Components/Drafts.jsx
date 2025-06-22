import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; 
import Navbar from "./Navbar.jsx";
import ParticlesBg from "./HomePage/ParticlesBg";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/drafts`, {
            withCredentials: true,  
       });
        
        setDrafts(response.data);
      } catch (err) {
        console.error("Failed to fetch drafts:", err);
      }
    };

    fetchDrafts();
  }, []);

  return (
    <div className="min-h-screen p-6  text-white">
      <Navbar/>
      <ParticlesBg />
      <h1 className="text-5xl font-bold text-blue-400 mb-12 mt-12 text-center">Saved Drafts</h1>

      <div className="max-w-4xl mx-auto grid gap-6">
        {drafts.length === 0 ? (
          <p className="text-center text-gray-400">No drafts available.</p>
        ) : (
          drafts.map((draft, index) => (
            <motion.div
              key={draft._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-black bg-opacity-60 backdrop-blur-lg p-5 rounded-xl border border-blue-500 shadow-lg"
            >
              <p className="text-lg text-gray-200">{draft.text}</p>
              {/* <p className="text-xs text-gray-500 mt-2 text-right">
                Draft ID: {draft._id}
              </p> */}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Drafts;
