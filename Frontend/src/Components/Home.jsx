import React from "react";
import Contact from './HomePage/Contact.jsx';
import Founder from './HomePage/Founder.jsx';
import Platforms from './HomePage/Platforms.jsx';
import WhatIsCP from './HomePage/WhatIsCp.jsx';
import WhyDiscuss from './HomePage/WhyDiscuss.jsx';
import ParticlesBg from './HomePage/ParticlesBg.jsx';
import Navbar from './Navbar.jsx'

const Home = () => {
  return (
    <div className="relative min-h-screen  text-white scroll-smooth">
      <ParticlesBg />
      <Navbar/>
      <WhatIsCP />
      <WhyDiscuss />
      <Founder />
      <Platforms />
      <Contact />
    </div>
  );
};

export default Home;