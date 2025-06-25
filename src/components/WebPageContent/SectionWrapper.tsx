/* SectionWrapper.tsx */
import React, { useRef } from 'react';
import { motion, Variants, useInView } from 'framer-motion';

const sectionVariants: Variants = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.8, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -50,  transition: { duration: 0.5, ease: 'easeIn' } },
};

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<Props> = ({ id, children, className = '' }) => {
  const ref        = useRef(null);
  const inView     = useInView(ref, { once: false, margin: '-40% 0px -40% 0px' });
  const animation  = inView ? 'visible' : 'exit';      // animate both in AND out

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`min-h-screen ${className}`}
      variants={sectionVariants}
      initial="hidden"
      animate={animation}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
