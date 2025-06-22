import React from "react";
import ayushImg from "../../assets/AyushICPCghibli.png";
import '../../App.css'
import { motion } from "framer-motion";

const Founder = () => {
  return (
    <>
      <h2 className="text-5xl font-extrabold text-center mb-14 text-blue-400 drop-shadow-glow animate-pulse">
        About Me
      </h2>

      <section
        id="home"
        className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 py-16"
      >
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="z-10 text-center md:text-left max-w-xl p-8 rounded-xl shadow-2xl mx-auto md:mx-0 relative border-4 border-blue-400 bg-black bg-opacity-50 backdrop-blur-md animate-border-glow"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-400 mb-6 tracking-wide">
            Hi 👋, I'm Ayush Kumar
          </h1>
          <p className="text-lg md:text-2xl text-white font-medium leading-relaxed">
            ⚡B.Tech CSE student at <span className="text-blue-300">IIIT Kota</span>, <br />
            ⚡passionate <span className="text-blue-300">Full-Stack Developer</span> & <br />
            <span className="text-blue-300">⚡ Competitive Programmer</span>.
          </p>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10 mb-10 md:mb-0 md:ml-20"
        >
          <img
            src={ayushImg}
            alt="Ayush Kumar"
            className="w-[320px] h-[480px] object-cover rounded-xl shadow-xl border-2 border-blue-300"
          />
        </motion.div>
      </section>
    </>
  );
};

export default Founder;
