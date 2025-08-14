import React from 'react';
import Header from './Header';
import Home from './Home';
import Petsync from './Pestync';
import About from './About';
import Services from './Service';
import WhatIsPetSync, { HeroParallaxDemo } from './WhatIsPetsync';
import WhyPetSync from './WhypetSync';
import Banner from './Banner';
import ShopSection from './Shop';
import { AnimatedTestimonials } from '../../components/WebPageContent/UI/animated-testimonials';
import { CardHoverEffectDemo } from './Features';
import PetSyncBooking from './Booking';

import WhyPetParentsLovePetSync360 from './WhyPetParentsLovePetSync360';
import Vendor from './Vendor';
import Footer from './Footer';
import ResourcesSupport from './ResourcesSupport';
import { Timeline } from '../../components/WebPageContent/UI/timeline';
import TimelineDemo from './Masters';
import VeterinariansSection from './VeterinariansSection';
import { AnimatedTestimonialsDemo } from './AnimatedTestimonialsDemoserive';
import RotatingCube from './Cube';
import ManualRotatingCubes from './Cube';
import GalaxyScene from './Cube';
import GalaxyFlyThrough from './GalaxyFlyThrough';

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
        <div id="" className="bg-black min-h-screen">
          <CardHoverEffectDemo />
        </div>
         <div id="VeterinariansSection" className="bg-black min-h-screen">
          <VeterinariansSection />
        </div>
         <div id="vendor" className="min-h-screen">
          <Vendor />
        </div>
        {/* <div id="RotatingCube" className="min-h-screen">
          <GalaxyFlyThrough />
        </div> */}

        <div id="services" className="bg-black min-h-screen">
          <AnimatedTestimonialsDemo />
        </div>
        

        <div id="TimelineDemo" className="bg-black min-h-screen">
          <TimelineDemo />
        </div>

        <div id="ResourcesSupport" className="bg-black min-h-screen">
          <ResourcesSupport />
        </div>
          <div id="Footer" className="bg-black">
  <Footer />
</div>
      </div>
    </>
  );
};

export default Parent;