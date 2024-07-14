import React, { useState, useEffect } from 'react';
import slide1 from '../assets/slide 1.jpg';
import slide2 from '../assets/slide 2.jpg';
import slide3 from '../assets/slide 3.jpg';
import slide4 from '../assets/slide 4.jpg';

const Slider = () => {
    const sliderImages = [slide1, slide2, slide3, slide4]; // Use imported images
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex) => (currentIndex + 1) % sliderImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider-container w-full h-90 flex justify-center items-center overflow-hidden">
            <img src={sliderImages[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="max-w-full max-h-full object-cover" />
        </div>
    );
};

export default Slider;