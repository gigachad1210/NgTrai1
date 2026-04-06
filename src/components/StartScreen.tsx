import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { avatars, Avatar } from '../data/gameData';
import { sound } from '../utils/audio';
import { CharacterAvatar } from './CharacterAvatar';
import { Play, User, ScrollText, ChevronLeft, ChevronRight } from 'lucide-react';

interface StartScreenProps {
  onStart: (name: string, avatar: Avatar) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [name, setName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedAvatar = avatars[currentIndex];

  const handleStart = () => {
    if (name.trim() && selectedAvatar) {
      sound.playClick();
      onStart(name.trim(), selectedAvatar);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playHover();
    setCurrentIndex((prev) => (prev + 1) % avatars.length);
  };

  const handlePrev = () => {
    sound.playHover();
    setCurrentIndex((prev) => (prev - 1 + avatars.length) % avatars.length);
  };

  return (
    <div className="min-h-screen bg-old-map flex flex-col items-center justify-start p-4 md:p-12 relative overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 md:p-16 rounded-sm max-w-5xl w-full z-10 relative overflow-hidden my-auto"
      >
        {/* Decorative corner */}
        <div className="absolute top-4 left-4 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-gold" />
        <div className="absolute top-4 right-4 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-gold" />
        <div className="absolute bottom-4 left-4 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-gold" />
        <div className="absolute bottom-4 right-4 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-gold" />

        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-8xl font-display text-ink mb-4 md:mb-6 tracking-tight">
            ỨC TRAI <span className="text-primary italic">DI SẢN</span>
          </h1>
          <p className="text-xl md:text-[32px] text-ink-light font-serif italic max-w-3xl mx-auto leading-relaxed md:leading-[48px]">
            Khám phá tư tưởng nhân nghĩa và tình yêu thiên nhiên của danh nhân Nguyễn Trãi qua hành trình tri thức.
          </p>
        </div>

        <div className="flex flex-col items-center gap-12 max-w-3xl mx-auto">
          {/* Section 1: Profile Setup */}
          <div className="w-full space-y-4 md:space-y-6">
            <label className="flex items-center justify-center gap-3 text-ink font-bold text-sm md:text-base uppercase tracking-[0.3em]">
              <User size={22} className="text-primary" />
              Danh xưng của bạn
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn..."
              className="w-full px-6 py-4 md:px-8 md:py-6 bg-paper-dark border-2 border-ink/10 rounded-sm focus:outline-none focus:border-primary text-ink font-bold text-xl md:text-2xl transition-all placeholder:text-ink/20 text-center"
              maxLength={20}
            />
          </div>

          {/* Section 2: Avatar Selection Carousel */}
          <div className="w-full">
            <label className="block text-ink font-bold mb-6 md:mb-10 text-sm md:text-base uppercase tracking-[0.3em] flex items-center justify-center gap-3">
              <ScrollText size={22} className="text-primary" />
              Chọn nhân vật đại diện
            </label>
            
            <div className="relative flex items-center justify-center">
              {/* Navigation Buttons */}
              <button 
                onClick={handlePrev}
                className="absolute left-0 md:-left-12 z-20 p-2 md:p-4 text-ink hover:text-primary transition-colors bg-paper/80 rounded-full shadow-md border border-ink/10"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Character Display */}
              <div className="w-full max-w-md overflow-hidden relative min-h-[300px] md:min-h-[400px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedAvatar.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-6 w-full px-12"
                  >
                    <div className="relative w-40 h-40 md:w-56 md:h-56">
                      <CharacterAvatar id={selectedAvatar.id} className="w-full h-full" />
                    </div>
                    <div className="text-center space-y-3">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                        {selectedAvatar.name}
                      </h3>
                      <p className="text-base md:text-xl text-ink-light italic leading-relaxed">
                        {selectedAvatar.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button 
                onClick={handleNext}
                className="absolute right-0 md:-right-12 z-20 p-2 md:p-4 text-ink hover:text-primary transition-colors bg-paper/80 rounded-full shadow-md border border-ink/10"
              >
                <ChevronRight size={32} />
              </button>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {avatars.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playHover();
                    setCurrentIndex(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-primary scale-125' : 'bg-ink/20 hover:bg-ink/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={!name.trim() || !selectedAvatar}
            className="btn-game bg-primary text-paper px-12 py-4 md:px-16 md:py-4 rounded-sm font-bold text-lg md:text-xl flex items-center gap-3 mx-auto disabled:opacity-50"
          >
            <Play fill="currentColor" size={20} />
            KHỞI HÀNH
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
