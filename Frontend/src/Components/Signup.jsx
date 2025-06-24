import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; 
import ParticlesBg from "./HomePage/ParticlesBg";

const Signup = ({ toggleForm }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    if (form.password !== form.confirm) return alert("❌ Passwords do not match");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, form);
      alert(res.data.message); 
      if (res.data.message.includes("OTP")) setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || " Signup Failed ❌ Please provide valid email for OTP verification");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`, {
        email: form.email,
        otp: form.otp
      }, {
  withCredentials: true 
});

      alert("✅ " + res.data.message); 
      toggleForm();
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed ❌");
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
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input className="input" placeholder="Name" name="name" onChange={handleChange} />
      <input className="input" placeholder="Email" name="email" onChange={handleChange} />
      <input className="input" placeholder="Password" name="password" type="password" onChange={handleChange} />
      <input className="input" placeholder="Confirm Password" name="confirm" type="password" onChange={handleChange} />

      {otpSent && (
        <input className="input" placeholder="Enter OTP" name="otp" onChange={handleChange} />
      )}

      {!otpSent ? (
        <button className="btn" onClick={handleSignup}>Signup</button>
      ) : (
        <button className="btn" onClick={handleVerify}>Verify OTP</button>
      )}

      <p className="text-sm mt-2">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={toggleForm}>Login</span></p>
      <div className="mt-4 flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("❌ Google Login Failed")}
        />
      </div>
    </div>
  );
};

export default Signup;
