import React, { useState } from 'react';
import { X } from 'lucide-react';
import ChatInput from './components/ChatInput';
import Message from './components/Message';
import Slideshow from './components/Slideshow';
import Dial from './components/Dial';
import PreviousList from './components/PreviousList';
import UserProfile from './components/UserProfile';

export default function App() {
  const [messages, setMessages] = useState<Array<{ text: string; isAi: boolean }>>([
    { text: "Hi! I'm ByteAI. Let's create a microlearning module. What topic would you like to cover today?", isAi: true }
  ]);
  const [step, setStep] = useState(1);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [learningData, setLearningData] = useState({
    topic: '',
    audience: '',
    duration: 5
  });

  const previousContents = [
    {
      id: '1',
      topic: 'Customer Service Basics',
      audience: 'Frontline Agents',
      duration: 5,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      topic: 'Sales Techniques',
      audience: 'Sales Agents',
      duration: 7,
      timestamp: '1 day ago'
    }
  ];

  const handleUserInput = (input: string) => {
    setMessages(prev => [...prev, { text: input, isAi: false }]);

    switch (step) {
      case 1:
        setLearningData(prev => ({ ...prev, topic: input }));
        setMessages(prev => [...prev, { 
          text: "Great topic! Who is this content for? (e.g., frontline agents, sales agents, coaches)", 
          isAi: true 
        }]);
        setStep(2);
        break;
      case 2:
        setLearningData(prev => ({ ...prev, audience: input }));
        setMessages(prev => [...prev, { 
          text: "Perfect! Now, use the dial below to set the duration (1-9 minutes).", 
          isAi: true 
        }]);
        setStep(3);
        break;
    }
  };

  const handleDurationConfirm = () => {
    setMessages(prev => [...prev, { 
      text: `Great! I'll create a ${learningData.duration}-minute microlearning module for you.`, 
      isAi: true 
    }]);
    setShowSlideshow(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <img 
        src="https://ucarecdn.com/2e5533a3-1d37-4db3-89f3-2c4980f22415/-/format/auto/"
        className="absolute inset-0 w-full h-full object-cover"
        alt="background"
      />
      
      <PreviousList 
        contents={previousContents}
        onSelect={(content) => {
          setLearningData(content);
          setShowSlideshow(true);
        }}
      />
      
      <div className="relative min-h-screen flex flex-col bg-white/10 backdrop-blur-md">
        <header className="p-6 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
            <img 
              src="https://ucarecdn.com/b2570471-846a-4b84-ac11-12d8ea41d791/-/format/auto/"
              className="w-8 h-8 object-contain"
              alt="ByteAI Logo"
            />
            <h1 className="text-2xl font-semibold text-white">ByteAI</h1>
          </div>
          <UserProfile 
            name="Dhanikesh Karunanithi"
            image="https://media.licdn.com/dms/image/v2/D4D03AQFX7XIc3wJvUg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692045498611?e=2147483647&v=beta&t=w1Qjemea3azSk6-2aLXDlQxDf7vTDmCh4AM2kzkLSC0"
          />
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <Message 
              key={index} 
              text={message.text} 
              isAi={message.isAi}
              userImage="https://media.licdn.com/dms/image/v2/D4D03AQFX7XIc3wJvUg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692045498611?e=2147483647&v=beta&t=w1Qjemea3azSk6-2aLXDlQxDf7vTDmCh4AM2kzkLSC0"
            />
          ))}
        </div>

        {step === 3 && !showSlideshow && (
          <div className="flex justify-center p-6 border-t border-white/20">
            <Dial
              value={learningData.duration}
              onChange={(value) => setLearningData(prev => ({ ...prev, duration: value }))}
              onConfirm={handleDurationConfirm}
            />
          </div>
        )}

        {!showSlideshow && <ChatInput onSubmit={handleUserInput} />}

        {showSlideshow && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl w-full max-w-3xl shadow-2xl">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Microlearning Content</h2>
                <button 
                  onClick={() => setShowSlideshow(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Slideshow 
                topic={learningData.topic}
                audience={learningData.audience}
                duration={learningData.duration}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}