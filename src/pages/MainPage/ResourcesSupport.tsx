import React from "react";
import { motion, Variants, Easing } from "framer-motion";

const easeInOut: Easing = [0.42, 0, 0.58, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeInOut },
  },
};

const fadeInUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeInOut },
  },
};

const ResourcesSupport: React.FC = () => {
  const testimonials = [
    { quote: "PetSync made vet visits effortless. Everything’s just a click away!", author: "Rhea M., Pet Parent" },
    {
      quote:
        "From digital records to teleconsults, I’ve stopped worrying about last-minute clinic visits. PetSync keeps me and my dog healthy, informed, and stress-free.",
      author: null,
    },
    { quote: "Our sales doubled—with zero delivery hassles.", author: "Arjun S., Vendor Partner" },
    {
      quote:
        "Thanks to the seamless logistics and real-time stock updates, we expanded faster and reached more customers without lifting a finger.",
      author: null,
    },
    { quote: "This isn’t just technology—it’s the future of pet care.", author: "Dr. Leela S., Veterinarian" },
    {
      quote:
        "Accessing patient history instantly, consulting remotely, and tracking treatment plans—all in one platform. It’s everything a modern vet needs.",
      author: null,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-gray-100">
      <motion.h2
        className="text-4xl font-extrabold mb-16 text-cyan-400 text-center drop-shadow-lg select-none font-playfair"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        RESOURCES AND SUPPORT
      </motion.h2>

      {/* PetSync Learn */}
      <motion.div
        className="mb-20 max-w-4xl mx-auto bg-gray-900 rounded-2xl p-10 shadow-lg border border-cyan-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h3 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-cyan-300 select-none">
          <motion.span
            role="img"
            aria-label="books"
            className="text-5xl font-playfair"
            animate={{
              y: [0, -8, 0],
              transition: {
                repeat: Infinity,
                duration: 3,
                ease: easeInOut,
              },
            }}
          >
            📚
          </motion.span>
          PetSync Learn <span className="italic text-sm text-gray-400 font-playfair">(Coming Soon)</span>
        </h3>
        <p className="mb-8 text-lg text-gray-300 font-cinzel">
          An upcoming educational resource center within the app and website that will feature:
        </p>

        <ul className="list-disc list-inside space-y-6 text-gray-300 text-base leading-relaxed">
          <li>
            <strong className="text-cyan-400 font-jost">Breed-Specific Guides</strong>: <span className="font-lora"> Practical
            information tailored to different dog/cat breeds (and possibly avian/exotic in future).
            Covers traits, needs, grooming, exercise, lifespan, and health risks.</span>
          </li>
          <li>
            <strong className="text-cyan-400 font-jost">Diet And Care Advice</strong>:<span className="font-lora"> General and medical
            dietary recommendations (e.g., low-allergen foods, weight management), grooming,
            hygiene, and daily care routines.</span>
          </li>
          <li>
            <strong className="text-cyan-400 font-jost">First-Aid And Vet Q&amp;A</strong>:
            <ul className="list-disc list-inside ml-6 mt-3 text-gray-400 space-y-3">
              <li>
                <strong className="font-lora">First-Aid Tips</strong>: <span className="font-lora"> How to manage minor injuries, emergencies (e.g.,
                heat stroke, choking, cuts) before reaching a vet.</span>
              </li>
              <li>
                <strong className="font-lora">Vet Q&amp;A</strong>:<span className="font-lora"> Curated responses from certified vets to common queries
                like deworming frequency, vaccination schedules, behavioral issues, etc.</span>
              </li>
            </ul>
          </li>
        </ul>
      </motion.div>

      {/* User Testimonials */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl font-semibold mb-10 flex items-center gap-3 text-cyan-300 select-none font-playfair">
          <motion.span
            role="img"
            aria-label="chat"
            className="text-4xl "
            animate={{
              y: [0, -8, 0],
              transition: {
                repeat: Infinity,
                duration: 3,
                ease: easeInOut,
              },
            }}
          >
            💬
          </motion.span>
          What Our Users Say
        </h3>

        <div className="space-y-8 text-gray-300 text-lg leading-relaxed max-w-prose mx-auto font-cinzel">
          {testimonials.map(({ quote, author }, i) => (
            <motion.blockquote
              key={i}
              className="italic border-l-4 border-cyan-400 pl-6 text-gray-300 drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              whileHover={{ scale: 1.03 }}
            >
              “{quote}” {author && <span className="font-semibold">— {author}</span>}
            </motion.blockquote>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ResourcesSupport;
