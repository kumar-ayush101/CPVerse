import React from 'react';
import { motion } from 'framer-motion';

const WhatIsCP = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const boxMotion = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="min-h-screen px-6 py-20 text-white flex flex-col items-center justify-center">
      
      <motion.h2
        className="text-5xl font-extrabold mt-10 mb-16 text-center text-blue-400 animate-pulse drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
      >
         Competitive Programming?
      </motion.h2>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        
       
        <motion.div
          variants={boxMotion}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          className="border-l-8 border-blue-400 bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-4">A Mind Game with Code</h3>
          <p className="text-gray-300 leading-relaxed text-md">
            Imagine your brain in a gym, lifting weights made of logic. That’s what Competitive Programming is — a test of not just coding, but of thinking, pattern spotting, and speed.
            <br /><br />
            You're given a problem, a ticking clock, and a blank screen. The challenge? Convert logic into blazing-fast code. Every second counts, and every mistake teaches.
          </p>
        </motion.div>

        
        <motion.div
          variants={boxMotion}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className="border-l-8 border-blue-400 bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-4">The Thrill of the Clock</h3>
          <p className="text-gray-300 leading-relaxed text-md">
            CP isn't just about getting the right answer. It's about getting it fast, with elegance, under constraints. It’s a battle against time, bugs, and brain fog.
            <br /><br />
            When you solve a problem seconds before the timer ends — that adrenaline, that rush — it’s addictive. Every coder who’s felt it knows: CP is more than a skill, it’s a sport.
          </p>
        </motion.div>

        
        <motion.div
          variants={boxMotion}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          className="border-l-8 border-blue-400 bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-4">Your Secret Weapon</h3>
          <p className="text-gray-300 leading-relaxed text-md">
            Whether you're preparing for FAANG interviews or building raw problem-solving muscle, CP is your ultimate training ground.
            <br /><br />
            It hones your ability to think under pressure, handle edge cases, and write clean, optimized solutions — all while having fun. Think of it as brain yoga, but with curly braces.
          </p>
        </motion.div>

       
        <motion.div
          variants={boxMotion}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          className="border-l-8 border-blue-400 bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-4">A Global Playground</h3>
          <p className="text-gray-300 leading-relaxed text-md">
            Join thousands of coders across the world who compete, learn, and grow together. Codeforces, LeetCode, AtCoder — these aren’t just sites, they’re arenas.
            <br /><br />
            CP makes the world smaller — where a student from India can outcode a PhD from MIT. All that matters is how well you think.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsCP;
