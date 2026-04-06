import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';

interface VerticalProgressProps {
  progress: number; // 0 to 1
  score: number;
}

export function VerticalProgress({ progress, score }: VerticalProgressProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-40">
      <div className="relative">
        <Trophy className="w-8 h-8 text-gold" />
      </div>
      
      <div className="w-3 h-64 bg-paper-dark rounded-sm border border-gold/30 overflow-hidden relative shadow-inner">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gold"
          initial={{ height: 0 }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Decorative notches */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-ink/10" style={{ bottom: `${(i + 1) * (100/7)}%` }} />
        ))}
      </div>
      
      <div className="bg-paper text-primary px-4 py-2 rounded-sm font-bold text-lg shadow-md border border-gold/30 min-w-[80px] text-center">
        {score}
      </div>
    </div>
  );
}
