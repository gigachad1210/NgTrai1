import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const POETRY_LINES = [
  "仁義之舉，在乎安民", // Việc nhân nghĩa cốt ở yên dân
  "弔伐之師，莫先去暴", // Quân điếu phạt trước lo trừ bạo
  "山水有清音", // Sơn thủy hữu thanh âm
  "風月無邊", // Phong nguyệt vô biên
  "臣心如水", // Thần tâm như thủy
  "平吳大誥", // Bình Ngô đại cáo
  "國讐未報頭先白", // Quốc thù vị báo đầu tiên bạch
  "幾度龍泉帶月磨", // Kỷ độ long tuyền đới nguyệt ma
];

interface FloatingLine {
  id: number;
  text: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export function FloatingPoetry() {
  const [lines, setLines] = useState<FloatingLine[]>([]);

  useEffect(() => {
    // Generate fewer lines (e.g. 4) so they don't clutter the screen
    const newLines = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      text: POETRY_LINES[Math.floor(Math.random() * POETRY_LINES.length)],
      x: Math.random() * 50 + 15, // 15% to 65% width
      y: Math.random() * 30 + 35, // 35% to 65% height (middle of screen)
      delay: Math.random() * 12, // 0 to 12s delay to stagger them
      duration: Math.random() * 10 + 15, // 15 to 25s duration
      size: Math.random() * 0.5 + 1.5, // 1.5rem to 2rem (slightly larger for calligraphy)
    }));
    setLines(newLines);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute text-ink opacity-0 whitespace-nowrap"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            fontSize: `${line.size}rem`,
            fontFamily: 'var(--font-calligraphy)', // Use the new calligraphy font
            textShadow: '0px 0px 8px rgba(255,255,255,0.8)', // Add glow for better visibility
          }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            clipPath: [
              "inset(0 100% 0 0)", // Start fully clipped (hidden)
              "inset(0 0% 0 0)",   // Reveal left to right
              "inset(0 0% 0 0)",   // Stay revealed
              "inset(0 0% 0 0)"    // Stay revealed until opacity fades
            ],
            x: [0, 40], // Drift horizontally slightly
            y: [0, -20], // Drift upwards slightly
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.8, 1] // Reveal over first 30%, stay until 80%, fade out
          }}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  );
}
