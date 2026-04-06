import React from 'react';

interface IllustrationProps {
  id: string;
  className?: string;
}

export function CharacterIllustration({ id, className = "w-full h-full" }: IllustrationProps) {
  const renderIllustration = () => {
    switch (id) {
      case 'nho-sinh': // Nữ sĩ trầm tính
        return (
          <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Face */}
            <path d="M30 45C30 35 40 25 50 25C60 25 70 35 70 45C70 60 60 75 50 75C40 75 30 60 30 45Z" stroke="currentColor" strokeWidth="1.5" />
            {/* Hair - Two sides */}
            <circle cx="25" cy="35" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <circle cx="75" cy="35" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <path d="M25 43V50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M75 43V50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {/* Features */}
            <path d="M42 48C42 48 43 47 45 47" stroke="currentColor" strokeWidth="1" />
            <path d="M55 48C55 48 56 47 58 47" stroke="currentColor" strokeWidth="1" />
            <path d="M48 65C50 66 52 66 54 65" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            {/* Collar */}
            <path d="M40 75L35 85H65L60 75" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'hoc-gia': // Học giả thông tuệ
        return (
          <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Face */}
            <path d="M32 45C32 35 40 28 50 28C60 28 68 35 68 45C68 60 60 72 50 72C40 72 32 60 32 45Z" stroke="currentColor" strokeWidth="1.5" />
            {/* Bun on top */}
            <circle cx="50" cy="22" r="7" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            {/* Glasses */}
            <circle cx="42" cy="48" r="5" stroke="currentColor" strokeWidth="1" />
            <circle cx="58" cy="48" r="5" stroke="currentColor" strokeWidth="1" />
            <path d="M47 48H53" stroke="currentColor" strokeWidth="1" />
            {/* Features */}
            <path d="M48 62C50 63 52 63 54 62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            {/* Beard/Chin */}
            <path d="M50 72V78" stroke="currentColor" strokeWidth="1" />
            {/* Collar */}
            <path d="M35 72L30 85H70L65 72" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'hanh-dong': // Người hành động
        return (
          <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Face */}
            <path d="M35 45C35 35 42 30 50 30C58 30 65 35 65 45C65 58 58 70 50 70C42 70 35 58 35 45Z" stroke="currentColor" strokeWidth="1.5" />
            {/* Long hair */}
            <path d="M35 35C30 40 25 55 25 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M65 35C70 40 75 55 75 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {/* Sporty Headband */}
            <path d="M34 38H66V44H34V38Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            {/* Features */}
            <path d="M43 50H47" stroke="currentColor" strokeWidth="1.5" />
            <path d="M53 50H57" stroke="currentColor" strokeWidth="1.5" />
            <path d="M47 62H53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {/* Collar */}
            <path d="M38 70L30 85H70L62 70" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'thi-nhan': // Thi nhân lãng mạn
        return (
          <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Face */}
            <path d="M35 45C35 35 42 30 50 30C58 30 65 35 65 45C65 58 58 70 50 70C42 70 35 58 35 45Z" stroke="currentColor" strokeWidth="1.5" />
            {/* Scholar Hat (Khăn xếp) */}
            <path d="M35 30C35 25 40 22 50 22C60 22 65 25 65 30" stroke="currentColor" strokeWidth="1.5" />
            <path d="M35 30H65" stroke="currentColor" strokeWidth="1" />
            {/* Features */}
            <path d="M43 48C43 48 44 47 46 47" stroke="currentColor" strokeWidth="1" />
            <path d="M54 48C54 48 55 47 57 47" stroke="currentColor" strokeWidth="1" />
            <path d="M46 62C48 64 52 64 54 62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            {/* Collar */}
            <path d="M38 70L32 85H68L62 70" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'cam-xuc': // Thiếu nữ đa cảm
        return (
          <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Face */}
            <path d="M32 45C32 35 40 28 50 28C60 28 68 35 68 45C68 60 60 72 50 72C40 72 32 60 32 45Z" stroke="currentColor" strokeWidth="1.5" />
            {/* Hair - Traditional flow */}
            <path d="M32 35C28 40 28 60 32 75" stroke="currentColor" strokeWidth="1" />
            <path d="M68 35C72 40 72 60 68 75" stroke="currentColor" strokeWidth="1" />
            <path d="M40 28C45 25 55 25 60 28" stroke="currentColor" strokeWidth="1" />
            {/* Features */}
            <path d="M42 48C42 48 43 47 45 47" stroke="currentColor" strokeWidth="1" />
            <path d="M55 48C55 48 56 47 58 47" stroke="currentColor" strokeWidth="1" />
            <path d="M47 64C49 65 51 65 53 64" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            {/* Collar */}
            <path d="M35 72L30 85H70L65 72" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'an-si': // Ẩn sĩ Côn Sơn
        return (
          <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Face */}
            <path d="M35 45C35 35 42 30 50 30C58 30 65 35 65 45C65 58 58 70 50 70C42 70 35 58 35 45Z" stroke="currentColor" strokeWidth="1.5" />
            {/* Beard */}
            <path d="M40 65C40 75 50 85 50 85C50 85 60 75 60 65" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
            {/* Features */}
            <path d="M43 48H47" stroke="currentColor" strokeWidth="1" />
            <path d="M53 48H57" stroke="currentColor" strokeWidth="1" />
            <path d="M48 60H52" stroke="currentColor" strokeWidth="1" />
            {/* Simple Hat */}
            <path d="M35 35L50 25L65 35" stroke="currentColor" strokeWidth="1.5" />
            {/* Collar */}
            <path d="M38 70L32 85H68L62 70" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
            <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="12">?</text>
          </svg>
        );
    }
  };

  return (
    <div className="text-ink flex items-center justify-center">
      {renderIllustration()}
    </div>
  );
}
