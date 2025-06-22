import React from "react";
import { motion } from "framer-motion";

const WhyDiscuss = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const boxes = [
    {
      title: "Need for Discussion",
      content:
        "Competitive Programming isn't just about solving problems — it's about learning strategies, patterns, and experiences from peers. A dedicated space to share that is essential.",
      delay: 0.2,
    },
    {
      title: "Journey & Growth",
      content:
        "Everyone starts somewhere. This space is for you to talk about your struggles, milestones, and the journey that makes you unique as a coder.",
      delay: 0.4,
    },
    {
      title: "The Vision",
      content:
        "To become a go-to community for CP enthusiasts where posts, doubts, tips, and even memes are shared — all revolving around the spirit of coding.",
      delay: 0.6,
    },
    {
      title: "Breaking Isolation",
      content:
        "Many coders silently struggle with concepts. A discussion forum helps them realize they’re not alone — someone else has likely faced the same doubt before.",
      delay: 0.8,
    },
    {
      title: "Encouraging Collaboration",
      content:
        "When coders collaborate to solve problems or share alternative solutions, everyone benefits. This builds a culture of mutual improvement.",
      delay: 1.0,
    },
    {
      title: "Beyond Just Problems",
      content:
        "Platforms often focus only on problems. But what about debugging nightmares, funny edge cases, or success stories? This is a space for those too.",
      delay: 1.2,
    },
  ];

  return (
    <section className="min-h-screen px-6 py-20 text-white">
      <div className="max-w-6xl mx-auto text-center mb-20">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-blue-400 drop-shadow-lg animate-pulse"
        >
          Why CPVerse?
        </motion.h2>
        <p className="text-gray-300 mt-4 text-lg">
          A space where passionate coders grow <em>together</em>.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {boxes.map((box, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: box.delay, duration: 0.6 }}
            className="bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-blue-500 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">{box.title}</h3>
            <p className="text-gray-200 text-base leading-relaxed">{box.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyDiscuss;