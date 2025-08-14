import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaDownload, FaUserTie, FaUserMd, FaHeadset } from 'react-icons/fa';
import { IoMdContact } from 'react-icons/io';

const Footer: React.FC = () => {
  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.08, type: 'spring', stiffness: 150, damping: 12 },
    }),
    hover: { scale: 1.1, color: '#ed2c59', transition: { type: 'spring', stiffness: 500, damping: 10 } },
  };

  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className="bg-black text-gray-200 py-4 px-3"
    >
      <div className="container mx-auto flex flex-col gap-4">
        
        {/* Contact Us Heading */}
        <motion.h3
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 140, damping: 12 }}
          className="text-sm font-semibold text-gray-100 text-center flex items-center justify-center gap-2 font-cinzel"
        >
          <IoMdContact className="text-lg" />
          CONTACT US
        </motion.h3>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 140, damping: 12 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {/* Email */}
          <motion.div variants={itemVariants} custom={0} initial="hidden" animate="visible" whileHover="hover" className="flex items-center gap-2">
            <FaEnvelope className="text-pink-500" />
            <span className="text-gray-400 text-[0.95rem] font-jost">support@petsync360.com</span>
          </motion.div>

          {/* Location */}
          <motion.div variants={itemVariants} custom={1} initial="hidden" animate="visible" whileHover="hover" className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-400" />
            <span className="text-gray-400 text-[0.95rem] font-jost">Available in India, UAE, and USA</span>
          </motion.div>

          {/* Links */}
          {[
            { label: 'Download App', to: '/download', icon: <FaDownload className="text-blue-400" /> },
            { label: 'Become a Vendor', to: '/vendor', icon: <FaUserTie className="text-yellow-400" /> },
            { label: 'Join as Vet', to: '/vet', icon: <FaUserMd className="text-purple-400" /> },
            { label: 'Customer Support', to: '/support', icon: <FaHeadset className="text-red-400" /> },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              custom={index + 2}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="flex items-center gap-2"
            >
              {item.icon}
              <Link to={item.to} className="text-gray-400 text-[0.95rem] hover:text-pink-600 transition font-jost">
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }} className="mt-4 pt-3 border-t border-gradient-to-r from-pink-500 to-orange-400 text-center">
          <p className="text-gray-400 text-[0.65rem] font-roboto">
            Copyright © 2025 PetSync360. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
