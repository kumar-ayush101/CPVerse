import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import ParticlesBg from "./HomePage/ParticlesBg";

const Doubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/doubts`, {
          withCredentials: true
        });
        setDoubts(response.data);
      } catch (error) {
        console.error("Failed to fetch doubts:", error);
      }
    };

    fetchDoubts();
  }, []);

  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleReplySubmit = async (id) => {
    const replyText = replyInputs[id];
    if (!replyText) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/doubts/${id}/reply`,
        { text: replyText },
        { withCredentials: true }
      );

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/doubts`, {
        withCredentials: true
      });
      setDoubts(res.data);
      setReplyInputs((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  const toggleReply = (id, idx) => {
    const key = `${id}_${idx}`;
    setExpandedReplies((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen text-white p-6">
      <ParticlesBg />
      <Navbar />
      <h2 className="text-5xl font-bold text-blue-400 mt-15 mb-15 ml-150">All Doubts</h2>
      <div className="flex justify-center">
        <ul className="space-y-6 max-w-4xl w-full">
          {doubts.map((doubt) => (
            <li key={doubt._id} className="bg-black border border-blue-500 rounded-xl p-5 shadow-lg">
              <p className="text-white text-lg mb-4">{doubt.text}</p>

              {doubt.replies?.length > 0 && (
                <div className="space-y-2 mb-3">
                  {doubt.replies.map((reply, idx) => {
                    const key = `${doubt._id}_${idx}`;
                    const isExpanded = expandedReplies[key];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleReply(doubt._id, idx)}
                        className="cursor-pointer text-sm bg-blue-800 bg-opacity-30 border border-blue-400 p-2 rounded hover:bg-opacity-50 transition duration-200"
                      >
                        {isExpanded ? reply : `${reply.slice(0, 30)}...`}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-4">
                <textarea
                  className="w-full p-2 rounded bg-gray-800 text-white border border-blue-500 mb-2"
                  rows="2"
                  placeholder="Write your reply..."
                  value={replyInputs[doubt._id] || ""}
                  onChange={(e) => handleReplyChange(doubt._id, e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
                  onClick={() => handleReplySubmit(doubt._id)}
                >
                  Submit Reply
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Doubts;
