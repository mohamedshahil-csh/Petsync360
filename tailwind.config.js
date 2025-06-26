/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pop: {
          '0%,100%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(1.1)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseRing: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 10px 20px rgba(0,0,0,0.15)' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' },
        },
        pulseReflection: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        pulseText: {
          '0%, 100%': { textShadow: '0 0 5px rgba(0,0,0,0.1)' },
          '50%': { textShadow: '0 0 15px rgba(0,0,0,0.3)' },
        },
        bgShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        bgShiftSlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        wave: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.4em)' },
        },
        waveOnce: {
          '0%,20%,100%': { transform: 'translateY(0)' },
          '10%': { transform: 'translateY(-0.4em)' },
        },
        popper: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.8' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        bubble: {
          '0%': { transform: 'translateY(0)', opacity: '0.7' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        screens: {
          '4k': '2560px',
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        bgSlide: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        drift: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        jump: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        rotateMove: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fingerWave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        hang: {
          "0%, 100%": { transform: "rotate(4deg)" },
          "50%": { transform: "rotate(-4deg)" },
        },
        blurFlow: {
          '0%': { filter: 'blur(4px)', opacity: 0.6 },
          '50%': { filter: 'blur(0)', opacity: 1 },
          '100%': { filter: 'blur(4px)', opacity: 0.6 },
        },
      },


      animation: {
        pop: 'pop 4s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        fadeIn: 'fadeIn 1s ease-out forwards',
        slideIn: 'slideIn 0.8s ease-out forwards',
        slideInDelay: 'slideIn 0.8s ease-out 0.2s forwards',
        spinSlow: 'spin 6s linear infinite',
        pulseRing: 'pulseRing 2s ease-in-out infinite',
        pulseReflection: 'pulseReflection 2s ease-in-out infinite',
        pulseText: 'pulseText 3s ease-in-out infinite',
        bgShift: 'bgShift 15s ease-in-out infinite',
        bgShiftSlow: 'bgShiftSlow 20s ease-in-out infinite',
        wave: 'wave 0.6s ease-in-out 2',
        'spin-slower': 'spin 15s linear infinite',
        popper: 'popper 3s ease-in-out infinite',
        bubble: 'bubble linear infinite',
        float: 'float 6s ease-in-out infinite',
        bgSlide: 'bgSlide 12s ease infinite',
        drift: 'drift 6s ease-in-out infinite',
        zoomIn: 'zoomIn 0.6s ease-out forwards infinite',
        rotateMove: 'rotateMove 6s linear infinite',
        float: 'float 5s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease-out forwards ',
        fingerWave: 'fingerWave 1.4s ease-in-out infinite',
        hang: "hang 3.5s ease-in-out infinite",
        blurFlow: 'blurFlow 6s ease-in-out infinite',

      },
      transformStyle: {
        '3d': 'preserve-3d',
      },

    },
  },
  plugins: [],
  darkMode: 'class',
};
