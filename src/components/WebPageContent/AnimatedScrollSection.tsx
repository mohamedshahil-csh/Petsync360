// components/WebPageContent/AnimatedScrollInView.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type AnimationType = 'fade' | 'slide' | 'popup';

interface AnimatedScrollInViewProps {
  children: React.ReactNode;
  type?: AnimationType;
  yOffset?: number;
  scaleFrom?: number;
  threshold?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const AnimatedScrollInView: React.FC<AnimatedScrollInViewProps> = ({
  children,
  type = 'fade',
  yOffset = 50,
  scaleFrom = 0.8,
  threshold = 0.2,
  delay = 0,
  duration = 0.6,
  once = false,
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  });

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: yOffset },
      visible: { opacity: 1, y: 0 },
    },
    popup: {
      hidden: { opacity: 0, scale: scaleFrom },
      visible: { opacity: 1, scale: 1 },
    },
  };

  const current = variants[type];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={current}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedScrollInView;
