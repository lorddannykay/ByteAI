import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PreviousContent {
  id: string;
  topic: string;
  audience: string;
  duration: number;
  timestamp: string;
}

interface PreviousListProps {
  contents: PreviousContent[];
  onSelect: (content: PreviousContent) => void;
}

export default function PreviousList({ contents, onSelect }: PreviousListProps) {
  return (
    <div className="absolute left-0 top-0 h-full group">
      <div className="absolute left-0 top-0 h-full w-2 bg-white/10 group-hover:w-80 transition-all duration-300 overflow-hidden">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 w-80 h-full bg-white/10 backdrop-blur-md p-4">
          <h3 className="text-white font-semibold mb-4">Previous Content</h3>
          <div className="space-y-2">
            {contents.map((content) => (
              <button
                key={content.id}
                onClick={() => onSelect(content)}
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-left group/item"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{content.topic}</h4>
                    <p className="text-white/70 text-sm">{content.audience}</p>
                    <p className="text-white/50 text-xs">{content.timestamp}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/50 group-hover/item:text-white/80" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}