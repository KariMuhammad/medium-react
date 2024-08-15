import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapperProps = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.5 },
};

const AnimationWrapper = ({
  children,
  className,
  keyDiff,
  initial = AnimationWrapperProps.initial,
  animate = AnimationWrapperProps.animate,
  exit = AnimationWrapperProps.exit,
  transition = AnimationWrapperProps.transition,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyDiff}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
