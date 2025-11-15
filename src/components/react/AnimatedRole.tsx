import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["Full-Stack Developer", "Problem Solver", "Student"];

export function AnimatedRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-block h-[1.2em] relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute left-0 top-0 whitespace-nowrap text-black dark:text-white"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
