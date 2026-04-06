import { motion } from 'motion/react';
import { Avatar, mapZones } from '../data/gameData';
import { sound } from '../utils/audio';
import { RotateCcw, Star, Trophy, Share2, ScrollText } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';

interface SummaryScreenProps {
  playerName: string;
  avatar: Avatar;
  score: number;
  onRestart: () => void;
}

export function SummaryScreen({ playerName, avatar, score, onRestart }: SummaryScreenProps) {
  const maxScore = mapZones.length * 100;
  const percentage = Math.round((score / maxScore) * 100);
  
  let title = "HỌC GIẢ UYÊN BÁC";
  let message = "Bạn đã thấu hiểu sâu sắc tư tưởng nhân nghĩa và tình yêu trong thơ Nguyễn Trãi, xứng danh kẻ sĩ tri âm.";
  
  if (percentage < 50) {
    title = "NGƯỜI LỮ HÀNH";
    message = "Hành trình khám phá còn dài, hãy tiếp tục trau dồi kiến thức để thấu hiểu đạo lý nhé.";
  } else if (percentage < 80) {
    title = "KẺ SĨ TRI ÂM";
    message = "Bạn đã nắm được những nét chính trong tâm hồn và tư tưởng của Ức Trai tiên sinh.";
  }

  return (
    <div className="min-h-screen bg-old-map flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 md:p-16 rounded-sm max-w-4xl w-full z-10 text-center relative overflow-hidden border-2 border-gold/30 shadow-2xl"
      >
        {/* Decorative corner */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold" />

        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-gold" />
          </div>
          <h2 className="text-primary font-header font-bold text-sm uppercase tracking-[0.3em] mb-2">HÀNH TRÌNH HOÀN TẤT</h2>
          <h1 className="text-5xl md:text-7xl font-display text-ink mb-4 tracking-tight">
            {title}
          </h1>
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill={i < Math.ceil(percentage/20) ? "currentColor" : "none"} className={i < Math.ceil(percentage/20) ? "text-gold" : "text-ink/10"} size={20} />
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-paper-dark p-6 rounded-sm border border-ink/5 flex items-center gap-6">
            <CharacterAvatar id={avatar.id} className="w-16 h-16" />
            <div className="text-left">
              <p className="text-[10px] font-header uppercase tracking-widest opacity-50 font-bold">Người chơi</p>
              <p className="text-xl font-header font-bold text-ink">{playerName}</p>
            </div>
          </div>
          
          <div className="bg-paper-dark p-6 rounded-sm border border-ink/5 grid grid-cols-2 gap-4">
            <div className="text-left">
              <p className="text-[10px] font-header uppercase tracking-widest opacity-50 font-bold">Điểm số</p>
              <p className="text-2xl font-header font-bold text-primary whitespace-nowrap">{score} / {maxScore}</p>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-header uppercase tracking-widest opacity-50 font-bold">Hoàn thành</p>
              <p className="text-2xl font-header font-bold text-secondary">{mapZones.length}</p>
            </div>
          </div>
        </div>

        <p className="text-2xl md:text-3xl text-ink-light font-serif italic mb-12 max-w-2xl mx-auto leading-relaxed">
          "{message}"
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="btn-game bg-primary text-paper px-12 py-4 rounded-sm font-bold text-lg flex items-center gap-3 shadow-md"
          >
            <RotateCcw size={20} /> CHƠI LẠI
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-game bg-paper text-ink px-12 py-4 rounded-sm font-bold text-lg flex items-center gap-3 shadow-md border border-ink/10"
          >
            <Share2 size={20} /> CHIA SẺ
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
