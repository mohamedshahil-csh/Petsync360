import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion'; import logo from '../../assets/Images/petsync-logo.png';
import ButtonAnimation from '../../assets/Animation/button.json';
import Lottie from 'lottie-react';


const navItems = [
  { label: 'Home', to: '#home' },
  { label: 'About Us', to: '#about' },
  { label: 'Services', to: '#services' },
  { label: 'Shop', to: 'https://shop.petsync.in/', external: true },
  { label: 'Vendors', to: '/vendors' },
  { label: 'Resources', to: '/blog' },
  // { label: 'Contact', to: '#contact' },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Animation variants for mobile drawer
  const drawerVariants: Variants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.5
      }
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  // Animation variants for nav items
  const navItemVariants: Variants = {
    hidden: { y: -10, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 150, damping: 15 }
    }),
    hover: { scale: 1.1, color: '#ed2c59', transition: { type: 'spring', stiffness: 400 } }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('#')) {
      e.preventDefault();
      const section = document.querySelector(to);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      className="fixed top-0 left-0 z-50 w-full bg-white shadow-md"

    >
      {/* ─────────────────── TOP BAR ─────────────────── */}
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center select-none"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <motion.img
            src={logo}
            alt="PetSync logo"
            className="w-10 animate-float"
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          />
          <span
            className="ml-[-2px] text-3xl font-extrabold tracking-tight"
            style={{ color: '#ed2c59' }}
          >
            etSync<span className="text-xs align-super">360</span>
          </span>
        </a>

        {/* Desktop nav (lg+) */}
        <nav className="hidden lg:flex gap-6 font-semibold">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className="relative group"
            >
              {item.to.startsWith('#') ? (
                <a
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item.to)}
                  className="relative z-10 px-2 py-1"
                >
                  <span className="relative z-20 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-orange-400">
                    {item.label}
                  </span>
                  <span className="absolute inset-0 rounded-lg scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-in-out bg-pink-100 blur-sm z-0"></span>
                </a>
              ) : (
                <Link to={item.to} className="relative z-10 px-2 py-1">
                  <span className="relative z-20 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-orange-400">
                    {item.label}
                  </span>
                  <span className="absolute inset-0 rounded-lg scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-in-out bg-pink-100 blur-sm z-0"></span>
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="hidden lg:inline-block w-36 h-12"
        >
          <Lottie animationData={ButtonAnimation} loop={true} />
        </a>


        {/* Hamburger (sm / md) */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg className="h-6 w-6 stroke-gray-800" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* ───────────────── SIDE‑NAV DRAWER (sm / md) ───────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />


            {/* Drawer */}
            <motion.aside
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 z-[60] h-full w-72 bg-white !opacity-100 flex flex-col isolate will-change-transform"
              style={{ backgroundColor: '#ffffff', opacity: 1 }}
            >
              {/* Inner container with padding */}
              <div className="flex flex-col h-full bg-white !opacity-100 px-6 py-8" style={{ backgroundColor: '#ffffff', opacity: 1 }}>
                {/* Close button */}
                {/* Close button + logo in one row */}
                <div className="flex items-center justify-between mb-8">
                  {/* Logo + text */}
                  <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="flex items-center select-none"
                  >
                    <motion.img
                      src={logo}
                      alt="PetSync logo"
                      className="w-10 animate-float"
                      whileHover={{ rotate: 10, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    />
                    <span
                      className="ml-[-2px] text-2xl font-extrabold tracking-tight"
                      style={{ color: '#ed2c59' }}
                    >
                      etSync<span className="text-xs align-super">360</span>
                    </span>
                  </a>

                  {/* Close button */}
                  <motion.button
                    className="p-2 rounded-full bg-gray-100 hover:bg-pink-100 transition"
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="h-6 w-6 stroke-pink-600" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>


                {/* Nav items */}
                <div className="flex flex-col gap-6 bg-white !opacity-100 flex-grow" style={{ backgroundColor: '#ffffff', opacity: 1 }}>
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      {item.to.startsWith('#') ? (
                        <a
                          href={item.to}
                          onClick={(e) => handleNavClick(e, item.to)}
                          className="text-gray-800 text-xl font-semibold px-4 py-3 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={item.to}
                          onClick={() => setMobileOpen(false)}
                          className="text-gray-800 text-xl font-semibold px-4 py-3 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition"
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Lottie CTA at bottom */}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="mt-6 mb-2 w-full flex justify-center"
                >
                  <div className="w-34 h-10">
                    <Lottie animationData={ButtonAnimation} loop={true} />
                  </div>
                </a>
              </div>



              {/* CTA inside drawer */}

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;