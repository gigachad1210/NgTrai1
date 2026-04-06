import React from 'react';

interface CharacterAvatarProps {
  id: string;
  className?: string;
}

export function CharacterAvatar({ id, className = "w-24 h-24" }: CharacterAvatarProps) {
  const renderCharacter = () => {
    switch (id) {
      case 'nho-sinh':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md transition-transform duration-500 group-hover:scale-110">
            {/* Body */}
            <path d="M35 50 L25 100 L45 100 L45 70 L55 70 L55 100 L75 100 L65 50 Z" fill="#5c4033" />
            {/* Head */}
            <rect x="35" y="20" width="30" height="25" rx="10" fill="#f5d0b5" />
            {/* Hat/Hair */}
            <rect x="30" y="15" width="40" height="10" rx="2" fill="#3e2723" />
            {/* Eyes */}
            <circle cx="42" cy="30" r="2" fill="#000" />
            <circle cx="58" cy="30" r="2" fill="#000" />
            {/* Mouth */}
            <path d="M45 40 Q50 42 55 40" stroke="#000" strokeWidth="1.5" fill="none" />
            {/* Book */}
            <rect x="20" y="60" width="15" height="20" rx="2" fill="#8b4513" />
            <line x1="23" y1="65" x2="32" y2="65" stroke="#d2b48c" strokeWidth="1" />
            <line x1="23" y1="70" x2="32" y2="70" stroke="#d2b48c" strokeWidth="1" />
            <line x1="23" y1="75" x2="32" y2="75" stroke="#d2b48c" strokeWidth="1" />
          </svg>
        );
      case 'thi-nhan':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md transition-transform duration-500 group-hover:scale-110">
            {/* Body */}
            <path d="M35 50 L25 100 L45 100 L45 70 L55 70 L55 100 L75 100 L65 50 Z" fill="#2f4f4f" />
            {/* Collar */}
            <path d="M40 50 L50 60 L60 50 Z" fill="#e0e0e0" />
            {/* Head */}
            <rect x="35" y="20" width="30" height="25" rx="10" fill="#f5d0b5" />
            {/* Hair */}
            <path d="M35 25 Q50 15 65 25 L65 20 Q50 10 35 20 Z" fill="#1a1a1a" />
            <circle cx="68" cy="25" r="6" fill="#1a1a1a" />
            {/* Eyes */}
            <circle cx="42" cy="30" r="2" fill="#000" />
            <circle cx="58" cy="30" r="2" fill="#000" />
            {/* Mouth */}
            <path d="M45 40 Q50 43 55 40" stroke="#000" strokeWidth="1.5" fill="none" />
            {/* Scroll */}
            <rect x="65" y="65" width="20" height="8" rx="1" fill="#f5f5dc" />
            <rect x="63" y="63" width="4" height="12" rx="1" fill="#d2b48c" />
            <rect x="83" y="63" width="4" height="12" rx="1" fill="#d2b48c" />
          </svg>
        );
      case 'hoc-gia':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md transition-transform duration-500 group-hover:scale-110">
            {/* Body */}
            <path d="M35 50 L25 100 L45 100 L45 70 L55 70 L55 100 L75 100 L65 50 Z" fill="#4a3b32" />
            {/* Head */}
            <rect x="35" y="20" width="30" height="25" rx="10" fill="#f5d0b5" />
            {/* Hair (Balding/Grey) */}
            <path d="M32 25 Q35 18 50 18 Q65 18 68 25 L68 20 Q50 12 32 20 Z" fill="#808080" />
            {/* Glasses */}
            <circle cx="42" cy="30" r="5" stroke="#333" strokeWidth="2" fill="none" />
            <circle cx="58" cy="30" r="5" stroke="#333" strokeWidth="2" fill="none" />
            <line x1="47" y1="30" x2="53" y2="30" stroke="#333" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="42" cy="30" r="1.5" fill="#000" />
            <circle cx="58" cy="30" r="1.5" fill="#000" />
            {/* Mustache */}
            <path d="M42 38 Q50 35 58 38 Q50 42 42 38 Z" fill="#808080" />
            {/* Mouth */}
            <line x1="47" y1="42" x2="53" y2="42" stroke="#000" strokeWidth="1.5" />
          </svg>
        );
      case 'hanh-dong':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md transition-transform duration-500 group-hover:scale-110">
            {/* Body */}
            <path d="M35 50 L25 100 L45 100 L45 70 L55 70 L55 100 L75 100 L65 50 Z" fill="#a52a2a" />
            {/* Belt */}
            <rect x="30" y="75" width="40" height="8" fill="#1a1a1a" />
            <rect x="45" y="73" width="10" height="12" fill="none" stroke="#ffd700" strokeWidth="2" />
            {/* Head */}
            <rect x="35" y="20" width="30" height="25" rx="10" fill="#f5d0b5" />
            {/* Hair */}
            <path d="M35 25 Q50 15 65 25 L65 20 Q50 10 35 20 Z" fill="#1a1a1a" />
            {/* Eyebrows (Serious) */}
            <line x1="38" y1="27" x2="46" y2="29" stroke="#1a1a1a" strokeWidth="2" />
            <line x1="62" y1="27" x2="54" y2="29" stroke="#1a1a1a" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="42" cy="32" r="2" fill="#000" />
            <circle cx="58" cy="32" r="2" fill="#000" />
            {/* Mouth (Straight) */}
            <line x1="45" y1="40" x2="55" y2="40" stroke="#000" strokeWidth="1.5" />
          </svg>
        );
      case 'cam-xuc':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md transition-transform duration-500 group-hover:scale-110">
            {/* Body */}
            <path d="M35 50 L25 100 L45 100 L45 70 L55 70 L55 100 L75 100 L65 50 Z" fill="#d2b48c" />
            {/* Head */}
            <rect x="35" y="20" width="30" height="25" rx="10" fill="#f5d0b5" />
            {/* Hair */}
            <path d="M35 25 Q50 15 65 25 L65 20 Q50 10 35 20 Z" fill="#1a1a1a" />
            <circle cx="65" cy="20" r="4" fill="#1a1a1a" />
            {/* Eyes */}
            <path d="M39 30 Q42 28 45 30" stroke="#000" strokeWidth="1.5" fill="none" />
            <path d="M55 30 Q58 28 61 30" stroke="#000" strokeWidth="1.5" fill="none" />
            {/* Mouth */}
            <path d="M45 38 Q50 42 55 38" stroke="#000" strokeWidth="1.5" fill="none" />
            {/* Brush */}
            <line x1="65" y1="60" x2="75" y2="80" stroke="#8b4513" strokeWidth="2" />
            <path d="M75 80 L73 85 L77 85 Z" fill="#333" />
          </svg>
        );
      case 'an-si':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md transition-transform duration-500 group-hover:scale-110">
            {/* Body */}
            <path d="M35 50 L25 100 L45 100 L45 70 L55 70 L55 100 L75 100 L65 50 Z" fill="#8b7355" />
            {/* Sash */}
            <path d="M45 50 L35 100 L40 100 L50 50 Z" fill="#556b2f" opacity="0.8" />
            {/* Head */}
            <rect x="35" y="20" width="30" height="25" rx="10" fill="#f5d0b5" />
            {/* Hair */}
            <path d="M35 25 Q50 15 65 25 L65 20 Q50 10 35 20 Z" fill="#1a1a1a" />
            {/* Eyes */}
            <circle cx="42" cy="30" r="2" fill="#000" />
            <circle cx="58" cy="30" r="2" fill="#000" />
            {/* Mouth */}
            <path d="M45 40 Q50 43 55 40" stroke="#000" strokeWidth="1.5" fill="none" />
            {/* Beard/Goatee (Optional, maybe just a calm smile) */}
            <path d="M48 45 L52 45 L50 50 Z" fill="#1a1a1a" opacity="0.7" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${className} relative group flex items-center justify-center`}>
      {/* Traditional Frame */}
      <div className="absolute -inset-1 border-2 border-gold rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Avatar Container */}
      <div className="w-full h-full relative z-10 bg-paper rounded-full p-1 overflow-hidden border border-ink/20 shadow-md">
        {renderCharacter()}
      </div>
    </div>
  );
}
