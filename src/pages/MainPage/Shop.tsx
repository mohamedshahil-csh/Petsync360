import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedTestimonials } from '../../components/WebPageContent/UI/animated-testimonials';
import Service from '../../assets/Images/PetService.jpg';
import MobileShoping from '../../assets/Images/PetHealth.png';
import Booking from '../../assets/Images/BookAppoinment.png';
import ECommerce from '../../assets/Images/Ecommerce.png';
import Petcare from '../../assets/Images/4.jpg';
import ABout from '../../assets/Images/WeOffer.png';


// Updated pet-themed icons with modern SVGs or better placeholders
const petIcons = [
  { src: 'https://via.placeholder.com/50?text=🛒', pos: 'top-[5%] left-[8%]', animation: 'float' },
  { src: 'https://via.placeholder.com/50?text=🐶', pos: 'top-[15%] right-[8%]', animation: 'pulse' },
  { src: 'https://via.placeholder.com/50?text=🎾', pos: 'bottom-[10%] left-[12%]', animation: 'bounce' },
  { src: 'https://via.placeholder.com/50?text=🍖', pos: 'bottom-[5%] right-[10%]', animation: 'float' },
];


export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote: "Medical Support, Anytime, Anywhere, Instant teleconsultations & triage Home visit bookings",
      name: "What We Offer",
      designation: "Digital prescriptions & emergency help",
      src:ABout,
    },
    {
      quote:
        "Grooming, training, boarding, sitting Behavioural support & breeding aid.",
      name: "360° Pet Services",
      designation: "Your Pet is Our Priority",
      src:Service,
    },
    {
      quote:
        " Vet-reviewed pet essentials Filters for breed, age and allergies among othes Order tracking & secure payments.",
      name: "Personalized E-commerce",
      designation: "For Your Pet Get More Protien",
      src:ECommerce,
    },
    {
      quote:
        " Real-time vitals (IoT ready) Vaccine & medication reminders Growth & wellness milestone tracking.",
      name: "Smart Health Monitoring",
      designation: "Engineering Lead at DataPro",
      src: MobileShoping,
    },
    {
      quote:
        " Real-time vitals (IoT ready) Vaccine & medication reminders Growth & wellness milestone tracking.",
      name: "Book An Appoinment",
      designation: "Seamless claims through the app",
      src: Booking,
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}

const ShopSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const cardHoverVariants: Variants = {
    hover: {
      scale: 1.1,
      boxShadow: '0 10px 30px rgba(255, 105, 180, 0.4)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
      {/* Floating pet-themed icons */}
      <div className="absolute inset-0 pointer-events-none">
        {petIcons.map(({ src, pos, animation }, i) => (
          <motion.img
            key={i}
            src={src}
            alt="Pet Icon"
            className={`absolute ${pos} w-14 sm:w-16 rounded-full object-cover shadow-lg bg-white/20 p-1`}
            animate={
              animation === 'float'
                ? { y: [0, -20, 0], rotate: [0, 5, -5, 0] }
                : animation === 'pulse'
                  ? { scale: [1, 1.2, 1] }
                  : { y: [0, -25, 0] }
            }
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: 'loop' as const,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Shop Header */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-500 mb-8"
          variants={itemVariants}
        >
          🛒 PetSync360 Shop
          <motion.span
            className="block w-32 h-1 bg-gradient-to-r from-pink-400 to-indigo-500 mx-auto mt-3 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mb-14"
          variants={itemVariants}
        >
          Discover a curated collection of premium pet products with a modern twist—tailored just for your furry friends!
        </motion.p>

        {/* Features Section */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" variants={itemVariants}>
          {[
            { title: '🧠 Personalized Picks', desc: 'AI-driven recommendations based on breed, age, and preferences.' },
            { title: '🚚 Fast Delivery', desc: 'Track your order live with secure, speedy shipping options.' },
            { title: '🤝 Trusted Brands', desc: 'Verified vendors with top-notch quality and support.' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl hover:bg-white/20 transition-all duration-300"
              variants={cardHoverVariants}
              whileHover="hover"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-pink-300 mb-3">{feature.title}</h3>
              <p className="text-gray-100 text-sm sm:text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-500 mb-8">
            🛍️ Explore Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Nutrition', items: 'Dry, wet, organic diets' },
              { name: 'Grooming', items: 'Shampoos, brushes, care kits' },
              { name: 'Wellness', items: 'Vitamins, preventives' },
              { name: 'Lifestyle', items: 'Beds, collars, outfits' },
              { name: 'Toys', items: 'Interactive, durable toys' },
            ].map((category, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:bg-white/15 transition-colors duration-300"
                variants={cardHoverVariants}
                whileHover="hover"
              >
                <h3 className="text-lg font-semibold text-pink-200">{category.name}</h3>
                <p className="text-sm text-gray-300">{category.items}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <Link
            to="/shop"
            className="inline-block bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <motion.span
              className="relative z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              👉 Shop Now
            </motion.span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300"></span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShopSection;