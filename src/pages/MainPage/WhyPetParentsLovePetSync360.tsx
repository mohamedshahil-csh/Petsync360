import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  emoji: string;
}

const WhyPetParentsLovePetSync360: React.FC = () => {
  const features: Feature[] = [
    { title: 'Instant Access to Vets', description: 'Book teleconsultations, home visits, or in-clinic appointments with ease.', emoji: '🏥' },
    { title: 'Digital Health Records', description: 'Securely store and access your pet’s medical history and records.', emoji: '📋' },
    { title: 'All Pet Services', description: 'Grooming, walking, boarding, and more—all in one app.', emoji: '🧰' },
    { title: 'Real-Time Health Alerts', description: 'Stay updated on vaccines, deworming, and medication schedules.', emoji: '📲' },
    { title: 'Curated Pet E-commerce', description: 'Shop vet-approved food, toys, and accessories in one place.', emoji: '🛎️' },
    { title: 'Doorstep Pet Services', description: 'Grooming, walking, and emergency care delivered to your home.', emoji: '🏡' },
    { title: 'Smart Breed Selection', description: 'Choose the perfect pet based on your lifestyle and needs.', emoji: '🧠' },
    { title: 'Lifecycle Support', description: 'Support for your pet’s journey from adoption to geriatric care.', emoji: '🔄' },
    { title: 'Hassle-Free Insurance', description: 'Fast, paperless claims tailored to your pet’s needs.', emoji: '🛡️' },
    { title: 'Unified Dashboard', description: 'Manage multiple pets and services in one intuitive interface.', emoji: '🌐' },
    { title: 'Educational Hub', description: 'Access expert-backed articles, videos, and care guides.', emoji: '🎓' },
    { title: '24/7 Support', description: 'Get emergency guidance and support anytime.', emoji: '📞' },
    { title: 'Book Appointments', description: 'Effortlessly schedule vet visits and services.', emoji: '📅' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const card = carouselRef.current.children[index] as HTMLElement;
      const offsetLeft = card.offsetLeft;
      const containerWidth = carouselRef.current.offsetWidth;
      const cardWidth = card.offsetWidth;
      carouselRef.current.scrollTo({
        left: offsetLeft - containerWidth / 2 + cardWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => scrollToIndex((currentIndex - 1 + features.length) % features.length);
  const handleNext = () => scrollToIndex((currentIndex + 1) % features.length);

  useEffect(() => {
    scrollToIndex(0);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-b from-pink-100 via-orange-100 to-yellow-50 relative font-poppins px-4 py-10 sm:px-10 overflow-hidden"
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-pink-600 mb-12 z-10 relative"
      >
        🐶 Why Pet Parents Love <span className="text-orange-500">PetSync 360</span>
      </motion.h2>

      {/* Carousel */}
      <div className="relative flex justify-center items-center z-10">
        <button
          onClick={handlePrev}
          className="absolute left-0 sm:left-2 md:left-4 z-20 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform border border-pink-300"
        >
          <ChevronLeft className="text-pink-500" />
        </button>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 hide-scrollbar w-full max-w-5xl"
        >
          {features.map((item, index) => {
            const isSelected = index === currentIndex;
            return (
              <motion.div
                key={item.title}
                onClick={() => scrollToIndex(index)}
                whileHover={{ scale: 1.1 }}
                className={`snap-center rounded-2xl min-w-[160px] sm:min-w-[200px] md:min-w-[240px] px-4 py-6 text-center cursor-pointer border transition-all duration-300 shadow-md text-sm md:text-base font-semibold leading-tight backdrop-blur-sm ${
                  isSelected
                    ? 'bg-pink-200 border-pink-500 text-pink-900 scale-105'
                    : 'bg-white/70 border-gray-200 text-gray-800'
                }`}
              >
                <div className="text-3xl md:text-4xl mb-3 animate-pulse">{item.emoji}</div>
                <div>{item.title}</div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 sm:right-2 md:right-4 z-20 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform border border-pink-300"
        >
          <ChevronRight className="text-pink-500" />
        </button>
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={features[currentIndex].title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-white border border-pink-200 max-w-xl mx-auto px-8 py-8 rounded-2xl shadow-2xl text-center z-10 relative"
        >
          <div className="text-5xl mb-4 animate-bounce-slow">{features[currentIndex].emoji}</div>
          <h3 className="text-2xl font-bold text-pink-600 mb-2">{features[currentIndex].title}</h3>
          <p className="text-gray-700 text-md md:text-lg leading-relaxed">
            {features[currentIndex].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-3 z-10 relative">
        {features.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToIndex(index)}
            whileHover={{ scale: 1.2 }}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-pink-500 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .animate-bounce-slow { animation: bounce 2.5s infinite; }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}
      </style>
    </motion.section>
  );
};

export default WhyPetParentsLovePetSync360;