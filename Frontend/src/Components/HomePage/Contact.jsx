import React from "react";
import linkedin from "../../assets/linkeindImage.jpeg";
import twitter from "../../assets/twitterImage.jpeg";
import discord from "../../assets/discordImage.jpeg";
import email from "../../assets/emailImage.png"


const contactMethods = [
  {
    name: "Email",
    detail: "jmdayushkumar@gmail.com",
    image: email, 
    link: "mailto:jmdayushkumar@gmail.com",
  },
  {
    name: "LinkedIn",
    detail: "View Profile",
    image: linkedin,
    link: "https://www.linkedin.com/in/ayush-kumar-511396288/",
  },
  {
    name: "Twitter",
    detail: "View Profile",
    image: twitter, 
    link: "https://x.com/AyushKumar77551",
  },
  {
    name: "Discord",
    detail: "View Profile",
    image: discord, 
    link: "https://discord.com/users/ayush_kumar101",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="relative p-8 max-w-6xl mx-auto mt-10">
      
      <h2 className="text-5xl font-extrabold text-center mb-16 text-blue-400 drop-shadow-glow animate-pulse">
        Contact Me 🤝
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {contactMethods.map((contact, idx) => (
          <a
            key={idx}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gray-800 border-2 border-blue-400 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-500 hover:rotate-3 hover:scale-105"
          >
            <img
              src={contact.image}
              alt={`${contact.name} logo`}
              className="w-20 h-20 mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
            <p className="text-sm text-gray-500 mt-2">{contact.detail}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;