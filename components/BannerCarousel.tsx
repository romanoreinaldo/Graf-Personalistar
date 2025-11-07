
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { BannerSlide } from '../types';

interface BannerCarouselProps {
  slides: BannerSlide[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="h-[60vh] w-full m-auto relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      >
        <div className="w-full h-full flex flex-col justify-center items-start bg-black/40 text-white p-8 md:p-24">
            <h1 
                className="text-5xl md:text-8xl font-bold uppercase"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}
            >
                {slides[currentIndex].title.split(' ')[0]}
            </h1>
            <h2 
                className="text-5xl md:text-8xl font-light italic text-lime-300"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}
            >
                {slides[currentIndex].title.split(' ').slice(1).join(' ')}
            </h2>

            <p className="mt-4 text-xl md:text-2xl bg-lime-500 text-gray-900 font-bold p-3 rounded-md shadow-lg">
                {slides[currentIndex].subtitle}
            </p>

            <Link 
                to={slides[currentIndex].buttonLink}
                className="mt-8 px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-lg text-lg flex items-center"
            >
                <span className="mr-2 text-2xl animate-pulse">👇</span>
                {slides[currentIndex].buttonText}
            </Link>
        </div>
      </div>
      
      <div className="absolute bottom-5 right-0 left-0 flex justify-center space-x-2">
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
