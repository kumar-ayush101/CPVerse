import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[400px] bg-gray-800 p-8 shadow-xl rounded-lg text-white">
        {isLogin ? (
          <Login toggleForm={() => setIsLogin(false)} />
        ) : (
          <Signup toggleForm={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
