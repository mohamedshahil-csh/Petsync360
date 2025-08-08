import React from 'react';
import Header from './Header';
import Home from './Home';
import Petsync from './Pestync';
import About from './About';
import Services from './Service';
import WhatIsPetSync, { HeroParallaxDemo } from './WhatIsPetsync';
import WhyPetSync from './WhypetSync';
import Banner from './Banner';
import ShopSection, { AnimatedTestimonialsDemo } from './Shop';
import { AnimatedTestimonials } from '../../components/WebPageContent/UI/animated-testimonials';
import { CardHoverEffectDemo } from './Features';
import PetSyncBooking from './Booking';
import { TimelineDemo } from './Masters';
import WhyPetParentsLovePetSync360 from './WhyPetParentsLovePetSync360';
import Vendor from './Vendor';

const Parent: React.FC = () => {
  return (
    <>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
      <div className="p-0 paw-cursor">
        <Header />
        <div id="home" className="min-h-screen">
          <Home />
        </div>
        {/* <div id="home" className="min-h-screen">
          <Banner />
        </div> */}
        <div id="about" className="min-h-screen">
          <About />
        </div>
        {/* <div id="what-is-petsync" className="min-h-screen">
          <HeroParallaxDemo />
        </div> */}
        {/* <div id="petsync" className="min-h-screen">
          <Petsync />
        </div> */}
        {/* <div id="services" className="min-h-screen">
          <Services />
        </div> */}
        {/* <div id="why-petsync" className="min-h-screen">
          <WhyPetSync />
        </div> */}
          <div id="why-petsync" className="min-h-screen">
          <WhyPetParentsLovePetSync360 />
        </div>
         <div id="vendor" className="min-h-screen">
          <Vendor />
        </div>

        <div id="services" className="bg-black min-h-screen">
          <AnimatedTestimonialsDemo />
        </div>
        <div id="" className="bg-black min-h-screen">
          <CardHoverEffectDemo />
        </div>

        <div id="" className="bg-black min-h-screen">
          <TimelineDemo />
        </div>
      </div>
    </>
  );
};

export default Parent;