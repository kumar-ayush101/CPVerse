import React, { useState } from "react";
import axios from "axios";
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
      alert(err.response?.data?.message || " Please provide valid email for OTP verification");
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
    </div>
  );
};

export default Signup;
