import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zone, Avatar } from '../data/gameData';
import { sound } from '../utils/audio';
import { CharacterAvatar } from './CharacterAvatar';
import { X, CheckCircle2, XCircle, ArrowRight, BookOpen, ScrollText } from 'lucide-react';

interface ZoneScreenProps {
  zone: Zone;
  onClose: () => void;
  onComplete: (scoreEarned: number) => void;
  userAvatar?: Avatar | null;
}

export function ZoneScreen({ zone, onClose, onComplete, userAvatar }: ZoneScreenProps) {
  const [step, setStep] = useState<'lesson' | 'quiz' | 'summary'>('lesson');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuiz = zone.quizzes[currentQuizIndex];

  const handleStartQuiz = () => {
    sound.playClick();
    setStep('quiz');
  };

  const checkAnswer = (answer: any) => {
    if (isAnswered) return;

    let correct = false;
    const q = currentQuiz;

    if (q.type === 'mcq' || q.type === 'short_answer' || q.type === 'fill_blank') {
      if (typeof answer === 'string' && typeof q.correctAnswer === 'string') {
        correct = answer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      }
    } else if (q.type === 'multiple_select') {
      const ansArr = answer as string[];
      const corrArr = q.correctAnswer as string[];
      correct = ansArr.length === corrArr.length && ansArr.every(a => corrArr.includes(a));
    } else if (q.type === 'matching') {
      const ansArr = answer as { left: string; right: string }[];
      const corrArr = q.correctAnswer as { left: string; right: string }[];
      correct = ansArr.length === corrArr.length && ansArr.every(a => 
        corrArr.some(c => c.left === a.left && c.right === a.right)
      );
    }

    setIsCorrect(correct);
    setIsAnswered(true);
    setUserAnswer(answer);

    if (correct) {
      sound.playCorrect();
      setScore(prev => prev + 50);
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuiz = () => {
    sound.playClick();
    if (currentQuizIndex < zone.quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setIsAnswered(false);
      setUserAnswer(null);
    } else {
      setStep('summary');
    }
  };

  const renderQuiz = () => {
    const q = currentQuiz;
    
    switch (q.type) {
      case 'mcq':
        return (
          <div className="grid grid-cols-1 gap-3">
            {q.options?.map((opt, i) => {
              const isSelected = userAnswer === opt;
              const isCorrectOpt = opt === q.correctAnswer;
              let btnClass = "bg-paper-dark border-ink/10 hover:border-secondary/50 text-ink";
              
              if (isAnswered) {
                if (isCorrectOpt) btnClass = "bg-secondary/10 border-secondary text-secondary";
                else if (isSelected && !isCorrectOpt) btnClass = "bg-primary/10 border-primary text-primary";
                else btnClass = "bg-paper-dark border-ink/5 opacity-50";
              }

              return (
                <button
                  key={i}
                  onClick={() => checkAnswer(opt)}
                  disabled={isAnswered}
                  className={`w-full text-left p-5 rounded-sm border-2 transition-all font-normal text-[20px] flex justify-between items-center ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrectOpt && <CheckCircle2 className="w-6 h-6 text-secondary" />}
                  {isAnswered && isSelected && !isCorrectOpt && <XCircle className="w-6 h-6 text-primary" />}
                </button>
              );
            })}
          </div>
        );
      
      case 'multiple_select':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {q.options?.map((opt, i) => {
                const isSelected = (userAnswer as string[] || []).includes(opt);
                const isCorrectOpt = (q.correctAnswer as string[]).includes(opt);
                let btnClass = isSelected 
                  ? "bg-secondary/10 border-secondary text-secondary" 
                  : "bg-paper-dark border-ink/10 hover:border-secondary/50 text-ink";
                
                if (isAnswered) {
                  if (isCorrectOpt) btnClass = "bg-secondary/10 border-secondary text-secondary";
                  else if (isSelected && !isCorrectOpt) btnClass = "bg-primary/10 border-primary text-primary";
                  else btnClass = "bg-paper-dark border-ink/5 opacity-50";
                }

                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (isAnswered) return;
                      const current = userAnswer as string[] || [];
                      if (current.includes(opt)) {
                        setUserAnswer(current.filter(a => a !== opt));
                      } else {
                        setUserAnswer([...current, opt]);
                      }
                    }}
                    disabled={isAnswered}
                    className={`w-full text-left p-5 rounded-sm border-2 transition-all font-normal text-[20px] flex justify-between items-center ${btnClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrectOpt && <CheckCircle2 className="w-6 h-6 text-secondary" />}
                    {isAnswered && isSelected && !isCorrectOpt && <XCircle className="w-6 h-6 text-primary" />}
                    {!isAnswered && isSelected && <CheckCircle2 className="w-6 h-6 text-secondary" />}
                  </button>
                );
              })}
            </div>
            {!isAnswered && (
              <button
                onClick={() => checkAnswer(userAnswer || [])}
                disabled={!userAnswer || (userAnswer as string[]).length === 0}
                className="btn-game w-full bg-primary text-paper py-5 rounded-sm font-bold text-[20px] disabled:opacity-50"
              >
                XÁC NHẬN
              </button>
            )}
          </div>
        );
      
      case 'matching':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {q.leftItems?.map((left, i) => {
                const currentMatch = (userAnswer as { left: string; right: string }[] || []).find(m => m.left === left);
                return (
                  <div key={i} className="flex flex-col gap-2 p-4 border-2 border-ink/5 bg-paper-dark/30 rounded-sm">
                    <p className="font-bold text-ink text-lg">{left}</p>
                    <select
                      value={currentMatch?.right || ''}
                      onChange={(e) => {
                        if (isAnswered) return;
                        const right = e.target.value;
                        const current = userAnswer as { left: string; right: string }[] || [];
                        const filtered = current.filter(m => m.left !== left);
                        if (right) {
                          setUserAnswer([...filtered, { left, right }]);
                        } else {
                          setUserAnswer(filtered);
                        }
                      }}
                      disabled={isAnswered}
                      className={`w-full p-3 rounded-sm border-2 outline-none font-normal text-[18px] transition-all ${
                        isAnswered 
                          ? (q.correctAnswer as { left: string; right: string }[]).some(c => c.left === left && c.right === currentMatch?.right)
                            ? 'border-secondary bg-secondary/10 text-secondary'
                            : 'border-primary bg-primary/10 text-primary'
                          : 'border-ink/10 bg-paper focus:border-secondary'
                      }`}
                    >
                      <option value="">Chọn đáp án tương ứng...</option>
                      {q.rightItems?.map((right, j) => (
                        <option key={j} value={right}>{right}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
            {!isAnswered && (
              <button
                onClick={() => checkAnswer(userAnswer || [])}
                disabled={!userAnswer || (userAnswer as { left: string; right: string }[]).length !== q.leftItems?.length}
                className="btn-game w-full bg-primary text-paper py-5 rounded-sm font-bold text-[20px] disabled:opacity-50"
              >
                XÁC NHẬN
              </button>
            )}
          </div>
        );
      
      case 'fill_blank':
      case 'short_answer':
        return (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={userAnswer || ''}
                onChange={(e) => !isAnswered && setUserAnswer(e.target.value)}
                disabled={isAnswered}
                placeholder="Nhập câu trả lời..."
                className={`w-full p-5 rounded-sm border-2 outline-none font-normal text-[20px] transition-all ${
                  isAnswered 
                    ? (isCorrect ? 'border-secondary bg-secondary/10 text-secondary' : 'border-primary bg-primary/10 text-primary') 
                    : 'border-ink/10 bg-paper-dark focus:border-primary'
                }`}
              />
            </div>
            {!isAnswered && (
              <button
                onClick={() => checkAnswer(userAnswer)}
                disabled={!userAnswer}
                className="btn-game w-full bg-primary text-paper py-5 rounded-sm font-bold text-[20px] disabled:opacity-50"
              >
                XÁC NHẬN
              </button>
            )}
          </div>
        );

      default:
        return <div className="text-center p-8 glass-panel rounded-sm italic opacity-50">Thử thách này đang được cập nhật...</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-ink/40 backdrop-blur-sm">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 bg-paper hover:bg-paper-dark rounded-full text-ink transition-all z-[60] border border-ink/10 shadow-md"
      >
        <X size={20} />
      </button>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl z-[55] relative"
      >
        <div className="glass-panel p-6 md:p-10 rounded-sm shadow-2xl border-2 border-gold/30 flex flex-col md:flex-row gap-8">
          {/* Character Column */}
          <div className="flex flex-col items-center gap-4 md:w-1/3 relative">
            {/* Decorative Scroll Background for Avatar */}
            <div className="absolute inset-0 bg-ink/5 rounded-sm -m-4 pointer-events-none border border-gold/10" />
            
            <CharacterAvatar 
              id={userAvatar?.id || 'nu-si'} 
              className="w-32 h-32 md:w-48 md:h-48 z-10" 
            />
          </div>

          {/* Content Column */}
          <div className="flex-1 min-h-[300px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 'lesson' && (
                <motion.div 
                  key="lesson"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-1 flex flex-col"
                >
                  <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                    <BookOpen size={18} />
                    Điểm tin tri thức
                  </div>
                  <div className="flex-1">
                    <p className="text-xl md:text-2xl text-ink font-serif leading-relaxed italic">
                      {zone.lessonText[0]}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartQuiz}
                      className="btn-game bg-primary text-paper px-10 py-4 rounded-sm font-bold text-xl flex items-center gap-2 shadow-md"
                    >
                      TIẾP TỤC <ArrowRight size={24} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'quiz' && (
                <motion.div 
                  key={`quiz-${currentQuizIndex}`}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-1 flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                      <ScrollText size={18} />
                      Thử thách trí tuệ
                    </div>
                    <span className="text-xs font-bold text-ink/40 uppercase">CÂU {currentQuizIndex + 1} / {zone.quizzes.length}</span>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 max-h-[450px] custom-scrollbar">
                    <p className="text-[27px] text-ink font-bold tracking-tight mb-8 leading-tight max-w-[510px]">
                      {currentQuiz.question}
                    </p>
                    {renderQuiz()}
                  </div>

                  {/* Feedback Overlay */}
                  <AnimatePresence>
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 bg-paper/95 p-8 flex flex-col items-center justify-center text-center z-20 border-2 border-gold/20"
                      >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isCorrect ? 'bg-secondary text-paper' : 'bg-primary text-paper'}`}>
                          {isCorrect ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                        </div>
                        <h3 className={`text-3xl font-bold mb-3 ${isCorrect ? 'text-secondary' : 'text-primary'}`}>
                          {isCorrect ? 'CHÍNH XÁC!' : 'CHƯA ĐÚNG RỒI...'}
                        </h3>
                        <p className="text-[20px] text-ink-light max-w-md mb-8 font-serif italic">
                          {isCorrect ? currentQuiz.explanation : (currentQuiz.wrongExplanation || currentQuiz.explanation)}
                        </p>
                        <button 
                          onClick={handleNextQuiz}
                          className="btn-game bg-ink text-paper px-12 py-4 rounded-sm font-bold text-xl flex items-center gap-2 shadow-md"
                        >
                          {currentQuizIndex < zone.quizzes.length - 1 ? 'CÂU TIẾP THEO' : 'XEM KẾT QUẢ'} <ArrowRight size={24} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {step === 'summary' && (
                <motion.div 
                  key="summary"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center flex-1 flex flex-col justify-center"
                >
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ScrollText className="text-gold" size={40} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-ink mb-2">HOÀN THÀNH!</h3>
                    <p className="text-lg text-ink-light font-serif italic">Bạn đã vượt qua các thử thách tại {zone.title}</p>
                  </div>
                  
                  <div className="bg-paper-dark p-6 rounded-sm border border-ink/5 italic text-ink-light text-[20px]">
                    <p>"{zone.quizzes[zone.quizzes.length - 1].conclusion}"</p>
                  </div>

                  <button 
                    onClick={() => onComplete(score)}
                    className="btn-game bg-primary text-paper px-12 py-4 rounded-sm font-bold text-xl flex items-center gap-3 mx-auto shadow-lg"
                  >
                    TIẾP TỤC HÀNH TRÌNH <ArrowRight size={24} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
