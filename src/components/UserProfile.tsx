import React from 'react';

interface UserProfileProps {
  name: string;
  image: string;
}

export default function UserProfile({ name, image }: UserProfileProps) {
  return (
    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
      <img 
        src={image}
        alt={name}
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className="text-white font-medium">{name}</span>
    </div>
  );
}