import React, { useEffect, useRef } from 'react';
import AnimatedScrollSection from '../../components/WebPageContent/AnimatedScrollSection';
import Flexible_Consult from '../../assets/Images/bone.png';
import { motion, AnimatePresence, Variants } from 'framer-motion';


const Features: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.custom-cursor') as HTMLElement;
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      document.body.appendChild(trail);
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      setTimeout(() => trail.remove(), 500);

      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tiltX = -(y / rect.height) * 20;
        const tiltY = (x / rect.width) * 20;
        (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
      });
    };

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
      const handleMouseEnter = () => {
        const letters = textRef.current?.querySelectorAll('.letter');
        letters?.forEach((letter, index) => {
          (letter as HTMLElement).style.animation = `letterFade 0.3s ease forwards ${index * 0.05}s`;
        });
      };

      const handleMouseLeave = () => {
        const letters = textRef.current?.querySelectorAll('.letter');
        letters?.forEach((letter) => {
          (letter as HTMLElement).style.animation = 'none';
          (letter as HTMLElement).style.opacity = '1';
        });
      };

      const card = textRef.current?.closest('.feature-card');
      card?.addEventListener('mouseenter', handleMouseEnter);
      card?.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card?.removeEventListener('mouseenter', handleMouseEnter);
        card?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    return (
      <h3 ref={textRef} className="text-2xl font-bold text-white mt-4 text-left">
        {text.split('').map((char, index) => (
          <span key={index} className="letter" style={{ display: 'inline-block' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h3>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-16 tracking-tight animate-glow-text">
          PetSync 360 Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              text: 'Instant Access to Vets',
              desc: 'Book teleconsultations, home visits, or in-clinic appointments at your convenience anytime, anywhere.',
              shape: 'shape1',
            },
            {
              text: 'Real-time Pet Tracking',
              desc: 'Stay updated with your pet’s health and activities in real time.',
              shape: 'shape2',
            },
            {
              text: 'Smart Health Records',
              desc: 'Easily access and manage all your pet’s health data in one place.',
              shape: 'shape3',
            },
            {
              text: '24/7 Emergency Help',
              desc: 'Get immediate help from professionals any time of the day.',
              shape: 'shape4',
            },
            {
              text: 'Customized Diet Plans',
              desc: 'Receive diet suggestions based on your pet’s health and breed.',
              shape: 'shape5',
            },
            {
              text: 'Friendly Community',
              desc: 'Connect with other pet parents and share stories.',
              shape: 'shape6',
            },
          ].map((card, index) => (
            <AnimatedScrollSection key={index} type="slide" delay={0.02 * index}>
              <div className={`feature-card ${card.shape} p-6 flex items-center justify-between animate-slide-in-up`}>
                <div>
                  <AnimatedText text={card.text} />
                  <p className="text-orange-400 text-sm mt-2">{card.desc}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="contact-us-bone"
                >
                  <span className="text-white text-xs font-semibold">Contact Us</span>
                </motion.div>

              </div>
            </AnimatedScrollSection>
          ))}
        </div>

      </div>
      <style>{`

     
.contact-us-bone span {
  font-size: 10px; /* Smaller font size */
}

        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(59,130,246,0.7) 0%, rgba(59,130,246,0) 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease;
        }
        .cursor-trail {
          position: fixed;
          width: 8px;
          height: 8px;
          background: rgba(255, 0, 64, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 999;
          animation: sparkle 0.5s ease-out forwards;
        }
        .feature-card {
          color: white;
          min-height: 150px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-radius: 50px 0 50px 0; 
          background: #1E3A8A;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
      .contact-us-bone {
  background-image: url(${Flexible_Consult});
  background-size: cover;
  background-position: center;
  padding: 10px 20px;
  border-radius: 15px;
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  min-height: 50px;
  transition: transform 0.4s ease, filter 0.4s ease;
}

/* Hover animation for bone image */
.contact-us-bone:hover {
  transform: scale(1.1) rotate(3deg);
  filter: brightness(1.1) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  animation: bounceBone 0.6s ease-in-out;
}

@keyframes bounceBone {
  0% { transform: scale(1) rotate(0deg); }
  30% { transform: scale(1.15) rotate(-3deg); }
  60% { transform: scale(1.05) rotate(2deg); }
  100% { transform: scale(1.1) rotate(3deg); }
}

       .contact-us-bone:hover {
  animation: pulseBone 1s ease-in-out infinite;
  filter: brightness(1.1);
}

@keyframes pulseBone {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

        @keyframes sparkle {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        body { cursor: none; }
      `}</style>
    </div>
  );
};

export default Features;