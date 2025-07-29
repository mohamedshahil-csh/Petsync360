import React from 'react';
import { motion } from 'framer-motion';

const PetSyncBooking: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const featureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight">
            🐾 PetSync 360
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-4">
            Book Pet Care with Ease
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Seamlessly schedule vet appointments, whether in-clinic, virtual, or at home. 
            PetSync 360 puts your pet’s care at your fingertips.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="mb-12"
          variants={itemVariants}
        >
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Happy pet with owner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white text-lg md:text-xl font-semibold">
              Trusted care for your furry friends
            </p>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Why Choose PetSync 360?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📅",
                title: "One-Tap Booking",
                desc: "Choose your vet, time, and consultation mode with a single tap."
              },
              {
                icon: "🏥",
                title: "Flexible Options",
                desc: "Teleconsult, in-clinic, or home visits—care that fits your schedule."
              },
              {
                icon: "🔔",
                title: "Smart Reminders",
                desc: "Never miss a vaccine, checkup, or follow-up with automated alerts."
              },
              {
                icon: "⏰",
                title: "Real-Time Availability",
                desc: "View vet schedules and book instantly with transparent slots."
              },
              {
                icon: "🚨",
                title: "Emergency Booking",
                desc: "Priority scheduling for urgent care when your pet needs it most."
              },
              {
                icon: "📱",
                title: "App Integration",
                desc: "Manage bookings, track history, and reschedule directly in the app."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100"
                variants={featureVariants}
                whileHover="hover"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to give your pet the care they deserve? Download PetSync 360 and start booking today!
          </p>
          <motion.a
            href="#download"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Now
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PetSyncBooking;