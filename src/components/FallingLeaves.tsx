import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FallingLeaves() {
  const [leaves, setLeaves] = useState<any[]>([]);
  
  useEffect(() => {
    const newLeaves = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
      size: Math.random() * 1 + 0.5,
      rotation: Math.random() * 360,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map(leaf => (
        <motion.div
          key={leaf.id}
          className="absolute text-amber-700/40"
          style={{ left: `${leaf.x}%`, fontSize: `${leaf.size}rem` }}
          initial={{ y: -50, rotate: leaf.rotation, opacity: 0 }}
          animate={{
            y: ['-10%', '110%'],
            rotate: [leaf.rotation, leaf.rotation + 200],
            opacity: [0, 0.8, 0.8, 0],
            x: `calc(${leaf.x}% + ${Math.sin(leaf.id) * 100}px)`
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🍂
        </motion.div>
      ))}
    </div>
  );
}
