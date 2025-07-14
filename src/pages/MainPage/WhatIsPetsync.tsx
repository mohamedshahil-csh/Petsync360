import React from 'react';
import { motion } from 'framer-motion';
import PetBanner from '../../assets/Images/PetBanner1.png';

const cardItems = [
  { id: 1, label: 'Teleconsult', delay: 0.15 },
  { id: 2, label: 'Pet Product', delay: 0.25 },
  { id: 3, label: 'Pet Service', delay: 0.35 },
];

const WhatIsPetSync = () => (
  <section
    className="relative overflow-hidden bg-cover bg-center"
    style={{ backgroundImage: `url(${PetBanner})`, width: '100%', height: '600px' }}
  >
    <div className="absolute inset-0 pointer-events-none" />

    {/* Wrapper: headline + row of cards */}
    <div className="relative z-10 mt-10 ml-8 flex flex-col gap-8">
      {/* Headline */}
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-2xl md:text-2xl font-extrabold text-black drop-shadow-lg"
      >
        Personalized shopping comes together on a single smart platform.
Whether you’re raising a puppy, nurturing a kitten, caring for a senior pet, or managing exotic animals, PetSync 360 is your trusted partner for proactive, personalized, and lifelong pet care.

      </motion.h2>

    </div>
  </section>
);

export default WhatIsPetSync;
