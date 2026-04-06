import { motion } from 'motion/react';
import { generalKnowledge } from '../data/gameData';
import { X } from 'lucide-react';

interface GeneralKnowledgeProps {
  onClose: () => void;
}

export function GeneralKnowledge({ onClose }: GeneralKnowledgeProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-paper w-full max-w-2xl rounded-sm shadow-2xl border-2 border-gold/30 overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="bg-paper-dark p-4 border-b-2 border-gold/20 flex justify-between items-center">
          <h2 className="font-display font-bold text-xl text-ink uppercase tracking-widest">{generalKnowledge.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-ink/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-ink-light" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto flex-1 text-ink font-serif italic text-lg leading-relaxed">
          {generalKnowledge.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6">{paragraph.trim()}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
