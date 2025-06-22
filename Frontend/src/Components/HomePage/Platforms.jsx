import React from "react";
import leetcodeLogo from "../../assets/leetcode.png";
import codeforcesLogo from "../../assets/codeforces.jpg";
import codechefLogo from "../../assets/codechefLogo.png";
import gfgLogo from "../../assets/gfg.png";
import hackerRankLogo from "../../assets/hackerrankimage.jpeg";
import atCoderLogo from "../../assets/atCoderImage.png";

const profiles = [
  
  {
    name: "Codeforces",
    url: "https://codeforces.com/",
    logo: codeforcesLogo,
    description: "A competitive programming site known for regular contests and a vibrant community.",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/",
    logo: leetcodeLogo,
    description: "A popular platform for coding interview preparation with a vast set of problems and contests.",
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/",
    logo: codechefLogo,
    description: "A competitive programming platform offering monthly challenges and college contests.",
  },
  {
    name: "Atcoder",
    url: "https://atcoder.jp/",
    logo: atCoderLogo,
    description: "A new-age coding platform to practice, compete, and connect with programmers worldwide.",
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/",
    logo: gfgLogo,
    description: "A vast resource of tutorials, coding questions, and job interview preparation content.",
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/",
    logo: hackerRankLogo,
    description: "You can level up your coding skills with real-world challenges and job-ready certifications.",
  },
];

const Platforms = () => {
  return (
    <section id="codingprofiles" className="relative p-8 mt-7 mb-7">
      <h2 className="text-5xl font-extrabold text-center mb-14 text-blue-400 drop-shadow-glow animate-pulse">
        Coding Platforms 💻
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {profiles.map((profile, index) => (
          <a
            key={index}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 h-62 bg-gray-800 border-2 border-blue-400 rounded-xl shadow-md transform transition duration-500 hover:scale-105 hover:shadow-blue-400 focus:shadow-blue-400 group"
          >
            <img
              src={profile.logo}
              alt={`${profile.name} logo`}
              className="w-24 h-24 object-contain mb-3"
            />
            <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
              {profile.name}
            </span>
            <p className="text-sm text-gray-600 text-center px-2">
              {profile.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Platforms;
