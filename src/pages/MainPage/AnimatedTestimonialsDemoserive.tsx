import React from 'react';
import { motion, Variants } from 'framer-motion';
import ABout from '../../assets/Images/WeOffer.png';
import Service from '../../assets/Images/PetService.jpg';
import ECommerce from '../../assets/Images/Ecommerce.png';
import MobileShoping from '../../assets/Images/PetHealth.png';
import Booking from '../../assets/Images/BookAppoinment.png';

import { AnimatedTestimonials } from '../../components/WebPageContent/UI/animated-testimonials';
import { colors } from '../../constants/Colors';

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote: 'Medical Support, Anytime, Anywhere, Instant teleconsultations & triage Home visit bookings',
      name: 'What We Offer',
      designation: 'Digital prescriptions & emergency help',
      src: ABout,
    },
    {
      quote: 'Grooming, training, boarding, sitting Behavioural support & breeding aid.',
      name: '360° Pet Services',
      designation: 'Your Pet is Our Priority',
      src: Service,
    },
    {
      quote: 'Vet-reviewed pet essentials Filters for breed, age and allergies among others Order tracking & secure payments.',
      name: 'Personalized E-commerce',
      designation: 'For Your Pet Get More Protein',
      src: ECommerce,
    },
    {
      quote: 'Real-time vitals (IoT ready) Vaccine & medication reminders Growth & wellness milestone tracking.',
      name: 'Smart Health Monitoring',
      designation: 'Engineering Lead at DataPro',
      src: MobileShoping,
    },
    {
      quote: 'Real-time vitals (IoT ready) Vaccine & medication reminders Growth & wellness milestone tracking.',
      name: 'Book An Appointment',
      designation: 'Seamless claims through the app',
      src: Booking,
    },
  ];

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Apply font styles + theme-friendly colors for light background
  const styledTestimonials = testimonials.map(t => ({
    ...t,
    nameStyle: { fontFamily: "'Cinzel', serif", color: '#3B82F6' }, // dark blue for headings
    quoteStyle: { fontFamily: "'Playfair', serif", color: '#374151' }, // gray-700 for readability
    designationStyle: { fontFamily: "'Playfair', serif", color: '#6b7280' }, // gray-500 for secondary text
  }));

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <motion.div className="text-center mb-16">
        {/* Gradient Heading */}
        <motion.h2
          className="text-4xl md:text-5xl sm:text-5xl font-extrabold inline-block"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.petsyncGradient1.join(', ')})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Our Services
        </motion.h2>

        {/* Gradient Divider */}
        <div
          className="w-32 h-1 mx-auto rounded-full shadow-sm mt-4"
          style={{
            background: `linear-gradient(to right, ${colors.petsyncGradient1[0]}, ${colors.petsyncGradient1[1]})`,
          }}
        />
      </motion.div>



      <AnimatedTestimonials testimonials={styledTestimonials} />
    </div>
  );
}
