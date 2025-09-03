import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { colors } from '../../constants/Colors';

const vendorBenefitsPetsync = [
  {
    number: '01',
    title: 'Vendor Dashboard',
    content: [
      'Custom dashboard for price, stock & orders',
      'SLA timers, order alerts, performance metrics',
      'Reassignment & real-time updates',
      'Transparent payouts to bank',
    ],
  },
  {
    number: '02',
    title: 'Returns & Vault',
    content: [
      'Full refund before dispatch',
      'Post-dispatch: only delivery charge deducted',
      'Damaged? Upload video for fast resolution',
      'Vault credits for quick refund reuse',
    ],
  },
  {
    number: '03',
    title: 'PetSync Vault',
    content: [
      'Auto-applied credits',
      'Live refund tracking',
      'Wallet integration for future use',
    ],
  },
  {
    number: '04',
    title: 'Transparent Notifications',
    content: [
      'Order confirmations',
      'Dispatch alerts',
      'Delay notices and Refund updates',
    ],
  },
  {
    number: '05',
    title: 'Vendor Accountability',
    content: [
      'SLA & QA monitored',
      'Auto-penalty enforcement',
      'Dashboard tracking for all actions',
    ],
  },
  {
    title: 'Ready to Partner with PetSync 360?',
    content: [
      'Join a growing network of pet product sellers and expand your reach across India and beyond. Whether you’re a manufacturer, distributor, or store owner-we make e-commerce easy, smart, and profitable.',
    ],
  },
];

// Animation variants
const cardVariants = {
  left: { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.1 } } },
  right: { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.1 } } },
  bottom: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function VendorBenefitsPetsync() {
  return (
    <section className="relative bg-gradient-to-b from-sky-50 via-white to-blue-50 px-6 md:px-16 py-20 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-10 right-10 w-60 h-60 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-300" />

      {/* Heading */}
      {/* Heading with Gradient Divider */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl sm:text-5xl font-extrabold inline-block">
          <span className="text-gray-900">For Our </span>
          <span
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.petsyncGradient1.join(', ')})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Vendors
          </span>
        </h2>

        {/* Gradient Divider directly below the heading */}
        <div
          className="w-32 h-1 mx-auto rounded-full shadow-sm mt-4"
          style={{
            background: `linear-gradient(to right, ${colors.petsyncGradient1[0]}, ${colors.petsyncGradient1[1]})`,
          }}
        />
      </div>


      {/* Cards */}
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vendorBenefitsPetsync.slice(0, 2).map((benefit, idx) => (
            <AnimatedCard key={idx} benefit={benefit} direction="left" />
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vendorBenefitsPetsync.slice(2, 5).map((benefit, idx) => (
            <AnimatedCard key={idx + 2} benefit={benefit} direction="right" />
          ))}
        </div>

        {/* Row 3 */}
        <AnimatedCard benefit={vendorBenefitsPetsync[5]} direction="bottom" isHighlight />
      </div>



    </section>
  );
}

interface AnimatedCardProps {
  benefit: any;
  direction: 'left' | 'right' | 'bottom';
  isHighlight?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ benefit, direction, isHighlight = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-150px 0px -150px 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
    else controls.start('hidden');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants[direction]}
      className={`relative ${isHighlight ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white p-10' : 'bg-white p-8'} rounded-3xl shadow-xl flex flex-col items-start md:items-start text-left hover:scale-105 transition-transform`}
    >
      {benefit.number && (
        <div
          className={`
      absolute
      -top-6 left-1/2 -translate-x-1/2
      md:-top-6 md:-left-6 md:translate-x-0
      w-12 h-12
      mb-4
      rounded-full flex items-center justify-center
      text-white text-lg md:text-2xl font-bold shadow-lg
    `}
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.petsyncGradient1[0]}, ${colors.petsyncGradient1[1]})`,
          }}
        >
          {benefit.number}
        </div>
      )}

      {/* Title */}
      <h3
        className={`text-2xl font-bold mb-4 font-contetTitleFont ${isHighlight ? 'text-white text-center w-full' : ''}`}
        style={!isHighlight ? { color: colors.petsync } : {}}
      >
        {benefit.title}
      </h3>

      {/* Content */}
      {!isHighlight && (
        <motion.ul className="flex flex-col gap-3 text-gray-700 font-jost">
          {benefit.content.map((point: string, i: number) => (
            <motion.li key={i} variants={listItemVariants} className="flex items-start gap-3">
              <span className="text-blue-500 text-xl font-bold mt-1">✔</span>
              <span>{point}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {isHighlight && (
        <p className="text-lg md:text-xl w-full text-center font-contentFont mt-2">
          {benefit.content[0]}
        </p>
      )}
    </motion.div>
  );
};
