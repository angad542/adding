import React, { useState, useEffect } from "react";
import "../Css/Home.css";
import Product from "./Product";
import ImageSlider from "./Imageslider";
import Productbutton from "./Productbutton";
import Productbutton1 from "./Productbutton1";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselImages = [
    {
      src: "../images/tablet.jpg",
      alt: "iPad Pro",
      discount: "Up to 30% off"
    },
    {
      src: "../images/mixer.jpg",
      alt: "Kitchen Mixer",
      discount: "Save $50"
    },
    {
      src: "../images/echo.jpg",
      alt: "Smart Speaker",
      discount: "50% off"
    },
    {
      src: "../images/monitor.jpg",
      alt: "Gaming Monitor",
      discount: "Limited time"
    },
    {
      src: "../images/leatherbag.jpg",
      alt: "Summer Bag",
      discount: "Flash sale"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="home">
      <div className="home__container">
        {/* Main Deals Grid */}
        <div className="home__deals-grid">
          {/* Left Column */}
          <div className="home__deal-card">
            <div className="home__deal-content">
              <h3>School supplies</h3>
              <p>up to 40% off</p>
              <div className="home__product-mini">
                <Productbutton
                  id="12321341"
                  title="Disposable Plastic Drinking Straws"
                  price={7.50}
                  rating={3}
                  image="../images/straw.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>

          {/* Center - Main Walmart Deals with Floating Carousel */}
          <div className="home__main-deal">
            <div className="home__main-deal-content">
              <h2>Walmart</h2>
              <h1>DEALS</h1>
              <p>JULY 8-15 ONLY!</p>
              <div className="home__sub-deal">
                <h4>Top 100 Deals</h4>
                <p>up to 20% off</p>
              </div>
            </div>
            
            {/* Floating Carousel */}
            <div className="home__floating-carousel">
              <div className="home__carousel-container">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`home__carousel-item ${
                      index === currentSlide ? 'active' : ''
                    } ${
                      index === (currentSlide + 1) % carouselImages.length ? 'next' : ''
                    } ${
                      index === (currentSlide - 1 + carouselImages.length) % carouselImages.length ? 'prev' : ''
                    }`}
                    style={{
                      transform: `translateX(${(index - currentSlide) * 120}px) scale(${
                        index === currentSlide ? 1 : 0.8
                      })`,
                      opacity: Math.abs(index - currentSlide) <= 1 ? 1 : 0,
                      zIndex: index === currentSlide ? 3 : 1
                    }}
                  >
                    <div className="home__carousel-image">
                      <img src={image.src} alt={image.alt} />
                      <div className="home__carousel-badge">
                        {image.discount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Floating Elements */}
              <div className="home__floating-elements">
                <div className="home__floating-element home__floating-element--1">
                  <span>🔥</span>
                </div>
                <div className="home__floating-element home__floating-element--2">
                  <span>💰</span>
                </div>
                <div className="home__floating-element home__floating-element--3">
                  <span>⚡</span>
                </div>
                <div className="home__floating-element home__floating-element--4">
                  <span>🎯</span>
                </div>
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div className="home__carousel-controls">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`home__carousel-dot ${
                    index === currentSlide ? 'active' : ''
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="home__deal-card">
            <div className="home__deal-content">
              <h3>Up to 22% off TVs</h3>
              <div className="home__product-mini">
                <Product
                  id="90829332"
                  title="Samsung Monitor"
                  price={1094.98}
                  rating={4}
                  image="../images/monitor.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>

          {/* Second Row Left */}
          <div className="home__deal-card">
            <div className="home__deal-content">
              <h3>Cooking & dining</h3>
              <p>up to 40% off</p>
              <div className="home__product-mini">
                <Product
                  id="49538094"
                  title="Stand Mixer"
                  price={239.0}
                  rating={4}
                  image="../images/mixer.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>

          {/* Second Row Center Left */}
          <div className="home__deal-card home__deal-card--small">
            <div className="home__deal-content">
              <h4>Up to 50% off their fave toys</h4>
              <div className="home__product-mini">
                <Product
                  id="3254354345"
                  title="iPad Pro"
                  price={598.99}
                  rating={4}
                  image="../images/tablet.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>

          {/* Flash Deals - Yellow */}
          <div className="home__deal-card home__deal-card--yellow">
            <div className="home__deal-content">
              <h3>Flash Deals</h3>
              <div className="home__product-mini">
                <Product
                  id="23445930"
                  title="Echo Speaker"
                  price={98.99}
                  rating={5}
                  image="../images/echo.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>

          {/* Second Row Right */}
          <div className="home__deal-card">
            <div className="home__deal-content">
              <h3>Smart savings on Apple</h3>
              <div className="home__product-mini">
                <Product
                  id="23445930"
                  title="Echo Speaker"
                  price={98.99}
                  rating={5}
                  image="../images/echo.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>

          {/* Third Row Left */}
          <div className="home__deal-card">
            <div className="home__deal-content">
              <h3>Up to 40% off outdoors</h3>
              <div className="home__product-mini">
                <Productbutton1
                  id="958462"
                  title="Woven Bag"
                  price={19.99}
                  rating={5}
                  image="../images/leatherbag.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>

          {/* Third Row Center */}
          <div className="home__deal-card home__deal-card--small">
            <div className="home__deal-content">
              <h4>Get 50% off annual Walmart+ membership</h4>
              <div className="home__product-mini">
                <Product
                  id="23445930"
                  title="Echo Speaker"
                  price={98.99}
                  rating={5}
                  image="../images/echo.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>

          {/* Price Highlight - Yellow */}
          <div className="home__deal-card home__deal-card--yellow home__deal-card--price">
            <div className="home__deal-content">
              <h1>$49</h1>
              <p>was $99</p>
              <div className="home__product-mini">
                <Product
                  id="23445930"
                  title="Echo Speaker"
                  price={98.99}
                  rating={5}
                  image="../images/echo.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>

          {/* Third Row Right */}
          <div className="home__deal-card">
            <div className="home__deal-content">
              <h3>Cleaner Floors.</h3>
              <p>Save Up to 55% off.</p>
              <div className="home__product-mini">
                <Product
                  id="23445930"
                  title="Echo Speaker"
                  price={98.99}
                  rating={5}
                  image="../images/echo.jpg"
                  badge_id={0}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shop Deals Section */}
        <div className="home__shop-deals">
          <h3>Shop deals</h3>
          <div className="home__products-row">
            <div className="home__product-card">
              <Productbutton
                id="12321341"
                title="Disposable Plastic Drinking Straws"
                price={7.50}
                rating={3}
                image="../images/straw.jpg"
                badge_id={0}
              />
            </div>
            <div className="home__product-card">
              <Product
                id="49538094"
                title="Kenwood kMix Stand Mixer"
                price={239.0}
                rating={4}
                image="../images/mixer.jpg"
                badge_id={0}
              />
            </div>
            <div className="home__product-card">
              <Product
                id="3254354345"
                title="New Apple iPad Pro"
                price={598.99}
                rating={4}
                image="../images/tablet.jpg"
                badge_id={0}
              />
            </div>
          </div>
        </div>

        {/* Back to School Banner */}
        <div className="home__banner">
          <div className="home__banner-content">
            <h2>Back to school-ready</h2>
            <p>Supplies, fashion & more</p>
            <button className="home__shop-button">Shop now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;