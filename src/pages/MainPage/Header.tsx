import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/Images/petsync-logo.png';

const navItems = [
  { label: 'Home', to: '#home' },
  { label: 'About Us', to: '#about' },
  { label: 'Services', to: '#services' },
  { label: 'Shop', to: '/shop' }, // Keep as route if it's a separate page
  { label: 'Vendors', to: '/vendors' }, // Keep as route if it's a separate page
  { label: 'Resources', to: '/blog' }, // Keep as route if it's a separate page
  { label: 'Contact', to: '#contact' },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('#')) {
      e.preventDefault(); // Prevent default anchor behavior for in-page links
      const section = document.querySelector(to);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false); // Close mobile menu on click
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      className="fixed top-0 left-0 z-50 w-full backdrop-blur-lg bg-white/60 shadow-md"
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

        {/* Desktop CTA (lg+) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:inline-block rounded-full border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:text-white"
        >
          Contact
        </motion.button>

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
              className="fixed inset-0 z-40 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              className="fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-2xl flex flex-col gap-6 px-6 py-8"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            >
              {/* Close button */}
              <button
                className="self-end mb-4 p-2 rounded-md hover:bg-gray-100 transition"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="h-6 w-6 stroke-gray-800" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {navItems.map((item) => (
                item.to.startsWith('#') ? (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={(e) => handleNavClick(e, item.to)}
                    className="text-lg font-semibold text-gray-800 hover:text-pink-600 transition"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-semibold text-gray-800 hover:text-pink-600 transition"
                  >
                    {item.label}
                  </Link>
                )
              ))}

              {/* CTA inside drawer */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-auto inline-block rounded-full border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:text-white transition"
              >
                Contact
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;