import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Updated Testimonials Data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Pet Owner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "PetSync has transformed the way I care for my dog. The guides are clear, and the vet advice is invaluable!",
  },
  {
    name: "Michael Lee",
    role: "Dog Trainer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "I love how easy it is to access professional advice on nutrition and health. Highly recommended!",
  },
  {
    name: "Emma Wilson",
    role: "Veterinarian",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "A fantastic resource for pet owners and trainers alike. The first-aid guides are clear and practical.",
  },
  {
    name: "David Kim",
    role: "Pet Enthusiast",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "Beautifully designed and very intuitive. I trust PetSync for all my pet care needs.",
  },
  {
    name: "Rhea M.",
    role: "Pet Parent",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    quote: "PetSync made vet visits effortless. Everything’s just a click away!",
  },
  {
    name: "Prathiyuman",
    role: "Pet Parent",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    quote:
      "From digital records to teleconsults, I’ve stopped worrying about last-minute clinic visits. PetSync keeps me and my dog healthy, informed, and stress-free.",
  },
  {
    name: "Arjun S.",
    role: "Vendor Partner",
    image: "https://randomuser.me/api/portraits/men/57.jpg",
    quote: "Our sales doubled—with zero delivery hassles.",
  },
  {
    name: "Emma Watson",
    role: "Vendor Partner",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    quote:
      "Thanks to the seamless logistics and real-time stock updates, we expanded faster and reached more customers without lifting a finger.",
  },
  {
    name: "Dr. Leela S.",
    role: "Veterinarian",
    image: "https://randomuser.me/api/portraits/women/59.jpg",
    quote:
      "This isn’t just technology-it’s the future of pet care. Accessing patient history instantly, consulting remotely, and tracking treatment plans—all in one platform. It’s everything a modern vet needs.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-fit bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col items-center py-16 px-6 relative">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
        What Our Clients Say
      </h2>

      <div className="w-full max-w-3xl relative">
        <AnimatePresence mode="wait">
          {testimonials.map((testimonial, index) =>
            index === current ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-indigo-400 shadow-md">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-800 italic text-lg mb-4">"{testimonial.quote}"</p>
                <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${
                current === idx ? "bg-indigo-500" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
      </div>

      {/* Optional Floating Background Shapes */}
      <div className="absolute top-10 left-0 w-44 h-44 bg-purple-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
  );
};

export default Testimonials;
