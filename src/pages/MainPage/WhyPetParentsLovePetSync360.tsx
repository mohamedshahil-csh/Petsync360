import React from "react";
import {
  FaUserMd, FaClipboardList, FaPaw, FaBell, FaStore, FaHome, FaSearch, FaHeart,
  FaFileInvoiceDollar, FaThLarge, FaBookOpen, FaClock, FaCalendarCheck
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { colors } from "../../constants/Colors";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const features = [
  { title: "Instant Access to Vets", description: "Book teleconsultations, home visits, or in-clinic appointments — anytime, anywhere.", icon: <FaUserMd /> },
  { title: "Complete Digital Health Records", description: "Secure, centralized medical history, prescriptions, and treatment plans.", icon: <FaClipboardList /> },
  { title: "All Essential Pet Services", description: "Grooming, walking, sitting, training — all in one app.", icon: <FaPaw /> },
  { title: "Real-Time Wellness Alerts", description: "Stay updated on vaccines, deworming, and medication schedules.", icon: <FaBell /> },
  { title: "Curated Pet E-commerce", description: "Vet-approved food, toys, medicines, and more.", icon: <FaStore /> },
  { title: "Doorstep Pet Services", description: "Grooming, walking, training, boarding — at your home.", icon: <FaHome /> },
  { title: "Smart Breed Selection", description: "Match pets to your lifestyle and needs.", icon: <FaSearch /> },
  { title: "End-to-End Lifecycle Support", description: "From adoption to geriatric care — we’re with you.", icon: <FaHeart /> },
  { title: "Hassle-Free Insurance", description: "Fast, paperless claims tailored to your pet.", icon: <FaFileInvoiceDollar /> },
  { title: "Unified Pet Dashboard", description: "Manage pets, records, services, and orders.", icon: <FaThLarge /> },
  { title: "Educational Hub & Tips", description: "Articles, videos, and breed-specific insights.", icon: <FaBookOpen /> },
  { title: "24/7 Support", description: "Tele-triage, symptom checks, and emergency help.", icon: <FaClock /> },
  { title: "Easy Appointment Booking", description: "Skip the wait. Book with trusted vets.", icon: <FaCalendarCheck /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: [1, 1.05, 1],
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8,
      duration: 0.5,
      scale: { duration: 0.3, times: [0, 0.5, 1] },
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 12,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 12,
      duration: 0.5,
      ease: "easeOut" as const,
      delay: 0.2,
    },
  },
};

const WhyPetParentsLovePetSync360: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Extra effect styles */}
      <style>
        {`
          .swiper-wrapper {
            overflow: visible !important;
            padding: 20px 0;
          }

          /* Custom navigation arrows */
          .swiper-button-next,
          .swiper-button-prev {
            color: #2563eb; /* blue-600 */
            background: white;
            border-radius: 9999px;
            width: 40px;
            height: 40px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 18px;
            font-weight: bold;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: #2563eb;
            color: white;
          }

          @media (max-width: 640px) {
            .swiper-button-next,
            .swiper-button-prev {
              width: 28px;
              height: 28px;
            }
            .swiper-button-next::after,
            .swiper-button-prev::after {
              font-size: 12px;
            }
            .swiper-button-next { right: 4px; }
            .swiper-button-prev { left: 4px; }
          }

          .swiper-slide-active .feature-card {
            transform: scale(1.05) rotate(1deg);
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            border-radius: 18px;
            margin: 0 auto;
            max-width: 90%;
            border: 1px solid rgba(0, 0, 0, 0.06);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08),
                        0 4px 8px rgba(0, 0, 0, 0.04);
            animation: floatCard 3s ease-in-out infinite;
          }
          .swiper-slide-active .feature-card:hover {
            transform: scale(1.18);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1),
                        0 6px 12px rgba(0, 0, 0, 0.06);
          }
          .swiper-slide:not(.swiper-slide-active) .feature-card {
            transform: scale(0.92);
            opacity: 0.75;
          }
          .swiper-slide {
            width: 85% !important;
          }

          @keyframes floatCard {
            0% { transform: scale(1.15) translateY(0); }
            50% { transform: scale(1.15) translateY(-6px); }
            100% { transform: scale(1.15) translateY(0); }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="text-4xl md:text-5xl sm:text-5xl font-extrabold text-center text-gray-900 mb-6 "
        >
          <span className="block sm:inline">Why Pet Parents</span>{" "}
          <span
            className="block sm:inline  bg-clip-text text-transparent animate-gradient"
            style={{
              backgroundImage: `linear-gradient(90deg, ${colors.petsyncGradient2[0]}, ${colors.petsyncGradient2[1]}`,
              backgroundSize: "200% 100%",
            }}
          >
            Love PetSync360
          </span>

          <style>
            {`
              @keyframes gradientAnimation {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .animate-gradient {
                animation: gradientAnimation 5s ease-in-out infinite;
              }
            `}
          </style>
        </motion.h2>

        <motion.p
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-14 font-subTitleFont"
        >
          Everything you need to care for your furry friends in one easy, friendly, and secure platform.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="w-full"
        >
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            coverflowEffect={{
              rotate: 45,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            navigation
            modules={[EffectCoverflow, Navigation]}
            className="w-full overflow-x-hidden"
          >
            {features.map((feature, index) => (
              <SwiperSlide
                key={index}
                className="w-[80%] sm:w-[70%] md:max-w-sm flex justify-center"
              >
                <motion.div
                  variants={cardVariants}
                  className="feature-card bg-white rounded-2xl shadow-lg 
               p-5 sm:p-6 md:p-8 flex flex-col items-center 
               text-center transition-all duration-300 max-w-xs sm:max-w-sm"
                >
                  <div
                    className="flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full text-white text-xl sm:text-2xl md:text-3xl shadow-md mb-4"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${colors.petsyncGradient1[0]}, ${colors.petsyncGradient1[1]})`,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 font-contetTitleFont">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed font-contentFont">
                    {feature.description}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPetParentsLovePetSync360;
