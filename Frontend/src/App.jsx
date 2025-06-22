import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import CreateContent from "./Components/CreateContent";
import Post from "./Components/Posts";
import Doubts from "./Components/Doubts";
import Drafts from "./Components/Drafts";
import TrackProgress from "./Components/TrackProgress";

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} /> 
        
        
        <Route path="/create-content" element={<ProtectedRoute element={<CreateContent />} />} />
        <Route path="/posts" element={<ProtectedRoute element={<Post />} />} />
        <Route path="/doubts" element={<ProtectedRoute element={<Doubts />} />} />
        <Route path="/drafts" element={<ProtectedRoute element={<Drafts />} />} />
        <Route path="/trackProgress" element={<ProtectedRoute element={<TrackProgress />} />} />

      </Routes>
    </Router>
  );
}

export default App;
