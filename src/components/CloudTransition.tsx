import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';
import { useEffect } from 'react';

interface CloudTransitionProps {
  isActive: boolean;
  onTransitionComplete?: () => void;
}

export function CloudTransition({ isActive, onTransitionComplete }: CloudTransitionProps) {
  useEffect(() => {
    if (isActive) {
      sound.playCloudSwoosh();
      // Trigger callback when clouds fully cover the screen
      const timer = setTimeout(() => {
        if (onTransitionComplete) onTransitionComplete();
      }, 800); // Match this with the animation duration
      return () => clearTimeout(timer);
    }
  }, [isActive, onTransitionComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex">
          {/* Left Cloud */}
          <motion.div
            initial={{ x: '-150%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-150%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-1/2 h-full bg-paper-dark"
          >
            {/* Cloud bumps */}
            <div className="absolute top-0 -right-[15vh] w-[30vh] h-[40vh] bg-paper-dark" style={{ borderRadius: '50%' }}></div>
            <div className="absolute top-[30vh] -right-[20vh] w-[40vh] h-[50vh] bg-paper-dark" style={{ borderRadius: '50%' }}></div>
            <div className="absolute bottom-0 -right-[15vh] w-[30vh] h-[40vh] bg-paper-dark" style={{ borderRadius: '50%' }}></div>
          </motion.div>
          
          {/* Right Cloud */}
          <motion.div
            initial={{ x: '150%' }}
            animate={{ x: '0%' }}
            exit={{ x: '150%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-1/2 h-full bg-paper-dark"
          >
            {/* Cloud bumps */}
            <div className="absolute top-0 -left-[15vh] w-[30vh] h-[40vh] bg-paper-dark" style={{ borderRadius: '50%' }}></div>
            <div className="absolute top-[25vh] -left-[20vh] w-[40vh] h-[50vh] bg-paper-dark" style={{ borderRadius: '50%' }}></div>
            <div className="absolute bottom-0 -left-[15vh] w-[30vh] h-[40vh] bg-paper-dark" style={{ borderRadius: '50%' }}></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
