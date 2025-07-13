import React, { useState, useEffect } from "react";
import "../Css/Imageslidegreen.css";

function ImageSliderGreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      type: "image",
      src: "../images/greenWalmart.png",
      title: "Walmart's Sustainable Future",
      subtitle: "Leading the way in eco-friendly retail solutions across America",
      cta: "Shop Green Now"
    },
    {
      type: "image", 
      src: "../images/seller_banner.jpg",
      title: "Zero Waste Initiative",
      subtitle: "Walmart's commitment to sustainable packaging and carbon neutrality by 2040",
      cta: "Learn More"
    },
    {
      type: "image",
      src: "../images/SusImage.png", 
      title: "Renewable Energy",
      subtitle: "Powering 100% of operations with renewable energy sources",
      cta: "Browse Collection"
    },
    {
      type: "video",
      src: "../images/foldbox.mp4",
      title: "Walmart Greenovation Zone",
      subtitle: "Smart packaging solutions for a sustainable tomorrow",
      cta: "Get Started"
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="image__slider">
      <div className="slide__container">
        <div className="slide__content">
          {currentSlide.type === "image" ? (
            <img 
              src={currentSlide.src} 
              alt={currentSlide.title}
              className="slide__media"
            />
          ) : (
            <video 
              src={currentSlide.src}
              autoPlay
              muted
              loop
              className="slide__media"
            />
          )}

          <div className="slide__overlay">
            <div className="slide__text">
              <h2 className="slide__title">{currentSlide.title}</h2>
              <p className="slide__subtitle">{currentSlide.subtitle}</p>
              <button className="slide__cta">{currentSlide.cta}</button>
            </div>
          </div>
        </div>

        <button className="nav__btn prev__btn" onClick={prevSlide}>
          <img src="../images/prev.png" alt="Previous" className="nav__arrow" />
        </button>

        <button className="nav__btn next__btn" onClick={nextSlide}>
          <img src="../images/next.png" alt="Next" className="nav__arrow" />
        </button>

        <div className="slide__indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <div className="slide__controls">
          <button 
            className="autoplay__btn"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? "⏸️" : "▶️"}
          </button>
          <span className="slide__counter">
            {currentIndex + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageSliderGreen;