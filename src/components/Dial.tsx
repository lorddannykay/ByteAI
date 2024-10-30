import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface DialProps {
  value: number;
  onChange: (value: number) => void;
  onConfirm: () => void;
}

export default function Dial({ value, onChange, onConfirm }: DialProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !dialRef.current) return;
    
    const dial = dialRef.current.getBoundingClientRect();
    const center = {
      x: dial.left + dial.width / 2,
      y: dial.top + dial.height / 2
    };
    
    const angle = Math.atan2(e.clientY - center.y, e.clientX - center.x);
    const degrees = angle * (180 / Math.PI) + 90;
    const normalizedDegrees = degrees < 0 ? degrees + 360 : degrees;
    
    const newValue = Math.round((normalizedDegrees / 360) * 9) + 1;
    onChange(Math.min(Math.max(newValue, 1), 9));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
    };
  }, [isDragging]);

  const rotation = ((value - 1) / 8) * 360;

  return (
    <div className="flex flex-col items-center gap-6">
      <div 
        ref={dialRef}
        className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-md relative cursor-pointer"
        onMouseDown={() => setIsDragging(true)}
      >
        <div 
          className="absolute inset-2 rounded-full bg-white/20 backdrop-blur-md"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="absolute top-4 left-1/2 w-1 h-4 bg-white transform -translate-x-1/2 rounded-full" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">{value}</span>
        </div>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-white/50"
            style={{
              left: '50%',
              top: '10%',
              transform: `rotate(${i * 45}deg) translateX(-50%)`,
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>
      <button
        onClick={onConfirm}
        className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white flex items-center gap-2"
      >
        <Check className="w-4 h-4" />
        Confirm Duration
      </button>
    </div>
  );
}