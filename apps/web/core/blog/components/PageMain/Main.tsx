import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export const Main: FC<Props> = ({ children }) => (
  <motion.main
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    transition={{ type: 'linear' }}
    className="container min-h-screen px-4 py-6 mx-auto"
  >
    {children}
  </motion.main>
);

export default Main;
