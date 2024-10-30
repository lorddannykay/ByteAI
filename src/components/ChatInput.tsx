import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

export default function ChatInput({ onSubmit }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-white/20 p-4">
      <div className="flex items-center gap-2 bg-white/10 rounded-xl p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/50"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
}