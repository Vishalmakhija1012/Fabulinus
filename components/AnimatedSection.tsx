import { motion } from 'framer-motion';

export default function AnimatedSection({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fade-in ${className}`}
    >
      {children}
    </motion.div>
  );
}
