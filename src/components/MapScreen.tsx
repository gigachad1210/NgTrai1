import { motion } from 'motion/react';
import { useLayoutEffect, useRef } from 'react';
import { mapZones, Zone } from '../data/gameData';
import { sound } from '../utils/audio';
import { BookOpen, MapPin, Trophy, Lock } from 'lucide-react';

interface MapScreenProps {
  completedZones: string[];
  onSelectZone: (zone: Zone) => void;
  onOpenKnowledge: () => void;
  deviceType: 'desktop' | 'mobile';
}

export function MapScreen({ completedZones, onSelectZone, onOpenKnowledge, deviceType }: MapScreenProps) {
  const isDesktop = deviceType === 'desktop';
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const resetScroll = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    };
    
    resetScroll();
    // Small delay to ensure it happens after browser scroll restoration
    const timer = setTimeout(resetScroll, 10);
    return () => clearTimeout(timer);
  }, []);

  const renderMapNode = (zone: Zone, index: number, isVertical: boolean = false, isGrid: boolean = false) => {
    const isCompleted = completedZones.includes(zone.id);
    const isLocked = index > completedZones.length;
    const isCurrent = index === completedZones.length;

    return (
      <motion.div
        key={zone.id}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        style={isGrid ? {} : (!isVertical ? { 
          left: `${zone.x}%`, 
          top: `${zone.y - 5}%`, // Shifted up by 5%
          ...zone.customStyle
        } : zone.mobileCustomStyle)}
        className={isGrid ? "relative flex flex-col items-center" : (!isVertical ? "absolute -translate-x-1/2 -translate-y-1/2" : "relative mb-32 last:mb-0 flex flex-col items-center")}
      >
        {isVertical && index < mapZones.length - 1 && (
          <div className="absolute top-full h-32 w-0 border-l-2 border-dashed border-ink/20 left-1/2 -translate-x-1/2 -z-10" />
        )}

        <div className="relative group">
          {isCurrent && (
            <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping scale-125" />
          )}

            <motion.button
            whileHover={!isLocked ? { scale: 1.15 } : {}}
            whileTap={!isLocked ? { scale: 0.9 } : {}}
            onClick={() => {
              if (!isLocked) {
                sound.playClick();
                onSelectZone(zone);
              } else {
                sound.playWrong();
              }
            }}
            className={`relative w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border-4 transition-all ${
              isCompleted 
                ? 'bg-secondary border-paper text-paper shadow-secondary/30' 
                : isLocked 
                ? 'bg-paper-dark border-ink/10 text-ink/20 grayscale cursor-not-allowed' 
                : 'bg-primary border-paper text-paper ring-8 ring-primary/10 shadow-primary/40'
            }`}
          >
            <div className="drop-shadow-md">
              {isCompleted ? <Trophy size={40} /> : isLocked ? <Lock size={40} /> : <MapPin size={40} />}
            </div>
            
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
              <div className={`px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-[0.2em] shadow-xl border-2 transition-all ${
                isLocked 
                  ? 'bg-paper-dark border-ink/10 text-ink/30' 
                  : isCompleted
                  ? 'bg-secondary text-paper border-paper/50'
                  : 'bg-paper text-ink border-primary/40'
              }`}>
                {zone.title}
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-old-map flex flex-col items-center overflow-hidden">
      {isDesktop ? (
        /* Desktop Map View */
        <div className="flex-1 w-full flex items-center justify-center p-8">
          <div 
            className="relative rounded-sm border-2 border-gold/30 overflow-hidden shadow-2xl flex items-center justify-center bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/17e3c2da-64ec-46f2-b861-649a583eb267.png')",
              width: '1181px',
              height: '713px'
            }}
          >
            <div className="relative z-10 flex flex-col items-center gap-32">
              {/* Top Row: Màn 1 & 2 */}
              <div className="flex items-center gap-48 md:gap-64">
                {mapZones.slice(0, 2).map((zone, index) => renderMapNode(zone, index, false, true))}
              </div>
              {/* Bottom Row: Màn 3 & 4 - Wider gap for staggered effect */}
              <div className="flex items-center gap-64 md:gap-96">
                {mapZones.slice(2, 4).map((zone, index) => renderMapNode(zone, index + 2, false, true))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile Vertical Map View */
        <div 
          ref={scrollContainerRef}
          className="w-full h-screen overflow-y-auto pt-32 pb-40 px-6 flex flex-col items-center bg-cover bg-center bg-fixed scroll-smooth"
          style={{ backgroundImage: "url('/261b63b7-09f9-4347-bd82-c431bf3ff690.png')", scrollBehavior: 'auto' }}
        >
          <div className="w-full max-w-md flex flex-col items-center">
            {mapZones.map((zone, index) => renderMapNode(zone, index, true))}
          </div>
        </div>
      )}

      {/* Floating UI Elements */}
      <div className="fixed bottom-8 left-8 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            sound.playClick();
            onOpenKnowledge();
          }}
          className="glass-panel px-6 py-3 rounded-sm flex items-center gap-3 text-ink font-bold shadow-lg border-l-4 border-l-primary"
        >
          <BookOpen size={20} className="text-primary" />
          <span className="text-sm uppercase tracking-widest">THƯ CÁC</span>
        </motion.button>
      </div>

    </div>
  );
}
