import React from 'react';

interface MessageProps {
  text: string;
  isAi: boolean;
  userImage: string;
}

export default function Message({ text, isAi, userImage }: MessageProps) {
  return (
    <div className={`flex items-start gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
        isAi ? 'bg-white/10' : 'bg-white/20'
      }`}>
        {isAi ? (
          <img 
            src="https://foundever.com/wp-content/uploads/2023/12/generative-ai-agent-2.jpg"
            alt="AI Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={userImage}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isAi 
          ? 'bg-white/10 text-white' 
          : 'bg-white/20 text-white ml-auto'
      }`}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}