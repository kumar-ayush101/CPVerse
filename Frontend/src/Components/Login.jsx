import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; 
import ParticlesBg from "./HomePage/ParticlesBg";

const Login = ({ toggleForm }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      form,
      { withCredentials: true } 
    );
      alert("✅ Login successful");
      
      navigate("/home"); 
    } catch (err) {
      alert(err.response?.data?.message || "❌ Login failed");
    }
  };

 const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/google-login`, {
      email: decoded.email,
      name: decoded.name,
      googleId: decoded.sub,
    }, { withCredentials: true }); 

    alert("Google Login successful");
    navigate("/home"); 
  } catch (err) {
    console.error("Google login failed", err);
    alert(err.response?.data?.message || "Google Login failed");
  }
};



  return (
    <div>
      <ParticlesBg />
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="input" placeholder="Email" name="email" onChange={handleChange} />
      <input className="input" placeholder="Password" name="password" type="password" onChange={handleChange} />
      <button className="btn" onClick={handleLogin}>Login</button>

      <div className="mt-4 flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("❌ Google Login Failed")}
        />
      </div>

      <p className="text-sm mt-2">
        Don't have an account?{" "}
        <span className="text-blue-600 cursor-pointer" onClick={toggleForm}>
          Signup
        </span>
      </p>
    </div>
  );
};

export default Login;
