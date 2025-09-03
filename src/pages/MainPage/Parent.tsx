import React, { useEffect } from 'react';
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
import Testimonials from './Testimonials';
import TerminalContactForm from './TerminalContactForm';
import VendorBenefitsPetsync from './vendorBenefitsPetsync';

const Parent: React.FC = () => {
  useEffect(() => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
}, []);

  return (
    <>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
      <div className="p-0 paw-cursor  ">
        <Header />
        <div id="home" className="min-h-fit">
          <Home />
        </div>
        <div id="about" className="min-h-fit">
          <About />
        </div>
        <div id="why-petsync" className="min-h-fit">
          <WhyPetParentsLovePetSync360 />
        </div>
        
        <div id="" className="bg-black min-h-fit">
          <CardHoverEffectDemo />
        </div>
        <div id="VeterinariansSection" className="bg-black min-h-fit">
          <VeterinariansSection />
        </div>
        <div id="VendorBenefitsPetsync" className="min-h-fit">
          <VendorBenefitsPetsync />
        </div>
        <div id="services" className="bg-black min-h-fit">
          <AnimatedTestimonialsDemo />
        </div>
        <div id="TimelineDemo" className="bg-black min-h-fit">
          <TimelineDemo />
        </div>

        <div id="ResourcesSupport" className="bg-black min-h-fit">
          <ResourcesSupport />
        </div>
       
           <div id="Testimonials" className="bg-black min-h-fit">
          <Testimonials />
        </div>
         <div id="TerminalContactForm" className="bg-black min-h-fit">
          <TerminalContactForm />
        </div>
        <div id="Footer" className="bg-black min-h-fit">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Parent;