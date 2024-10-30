import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface SlideshowProps {
  topic: string;
  audience: string;
  duration: number;
}

export default function Slideshow({ topic, audience, duration }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculate number of slides based on duration (1-2 min per slide)
  const numberOfSlides = Math.max(4, Math.ceil(duration / 2));
  const timePerSlide = duration / numberOfSlides;

  const generateSlides = () => {
    const baseSlides = [
      {
        title: 'Overview',
        content: `A ${duration}-minute microlearning module on ${topic} for ${audience}.`,
        duration: timePerSlide,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
      },
      {
        title: 'Key Concepts',
        content: 'Understanding the fundamental concepts and their applications.',
        duration: timePerSlide,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
      }
    ];

    // Add additional content slides based on duration
    for (let i = 2; i < numberOfSlides - 1; i++) {
      baseSlides.push({
        title: `Module ${i}`,
        content: 'Detailed exploration of specific concepts and practical applications.',
        duration: timePerSlide,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978'
      });
    }

    // Always end with a summary
    baseSlides.push({
      title: 'Summary',
      content: 'Quick recap of the main learning points and key takeaways.',
      duration: timePerSlide,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
    });

    return baseSlides;
  };

  const slides = generateSlides();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="p-6">
      <div className="relative bg-white/50 rounded-xl overflow-hidden">
        <img
          src={`${slides[currentSlide].image}?w=1200&h=600&fit=crop`}
          alt={slides[currentSlide].title}
          className="w-full h-48 object-cover"
        />
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold">{slides[currentSlide].title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{slides[currentSlide].duration.toFixed(1)} minutes</span>
            </div>
          </div>
          <p className="text-lg mb-8">{slides[currentSlide].content}</p>
          
          <div className="flex justify-between items-center">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/50 hover:bg-white/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-black w-6' 
                      : 'bg-black/30 hover:bg-black/50'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/50 hover:bg-white/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}