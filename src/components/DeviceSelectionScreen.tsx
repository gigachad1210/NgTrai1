import { motion } from 'motion/react';
import { Monitor, Smartphone } from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  onSelect: (device: 'desktop' | 'mobile') => void;
}

export function DeviceSelectionScreen({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-old-map flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-paper p-8 md:p-12 rounded-sm shadow-2xl border-2 border-gold/30 max-w-3xl w-full text-center relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-display text-ink mb-6 tracking-tight">
          HÀNH TRÌNH ỨC TRAI
        </h1>
        <p className="text-ink-light mb-12 text-xl font-serif italic leading-relaxed">
          Để có trải nghiệm tốt nhất, vui lòng cho biết bạn đang sử dụng thiết bị nào?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playClick();
              onSelect('desktop');
            }}
            className="flex flex-col items-center justify-center gap-6 p-10 bg-paper-dark border border-ink/10 rounded-sm hover:border-gold/50 transition-all group shadow-md"
          >
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-all">
              <Monitor size={40} className="text-primary" />
            </div>
            <div>
              <span className="block text-xl font-bold text-ink mb-2 uppercase tracking-widest">Máy tính</span>
              <span className="text-sm text-ink-light font-serif italic">Giao diện ngang rộng rãi</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playClick();
              onSelect('mobile');
            }}
            className="flex flex-col items-center justify-center gap-6 p-10 bg-paper-dark border border-ink/10 rounded-sm hover:border-gold/50 transition-all group shadow-md"
          >
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-all">
              <Smartphone size={40} className="text-primary" />
            </div>
            <div>
              <span className="block text-xl font-bold text-ink mb-2 uppercase tracking-widest">Điện thoại</span>
              <span className="text-sm text-ink-light font-serif italic">Giao diện dọc vuốt lướt</span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
