import React from 'react';
import { motion, Variants } from 'framer-motion';
import ABout from '../../assets/Images/WeOffer.png';
import Service from '../../assets/Images/PetService.jpg';
import ECommerce from '../../assets/Images/Ecommerce.png';
import MobileShoping from '../../assets/Images/PetHealth.png';
import Booking from '../../assets/Images/BookAppoinment.png';

import { AnimatedTestimonials } from '../../components/WebPageContent/UI/animated-testimonials';

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

  // Instead of classes, attach inline styles for fonts
  const styledTestimonials = testimonials.map(t => ({
    ...t,
    nameStyle: { fontFamily: "'Cinzel', serif" },
    quoteStyle: { fontFamily: "'Playfair', serif" },
    designationStyle: { fontFamily: "'Playfair', serif" },
  }));

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl sm:text-4xl mt-10 font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600"
        style={{ fontFamily: "'Playfair Display', serif" }}
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        Our Services
      </motion.h2>

      <AnimatedTestimonials testimonials={styledTestimonials} />
    </div>
  );
}
