import React, { useState, useEffect } from "react";
import "../Css/Homegreen.css";
import Product from "./Productgreen";
import ImageSliderGreen from "./Imageslidegreen";
import { Link } from "react-router-dom";

function Homegreen() {
  const [currentImpact, setCurrentImpact] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    co2: 0,
    users: 0,
    recyclable: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        co2: prev.co2 < 2500000 ? prev.co2 + 25000 : 2500000,
        users: prev.users < 50000 ? prev.users + 500 : 50000,
        recyclable: prev.recyclable < 95 ? prev.recyclable + 1 : 95
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const impactMessages = [
    "🌱 Together, we're planting the seeds of change",
    "♻️ Every purchase creates a ripple of sustainability",
    "🌍 Building a greener tomorrow, one product at a time",
    "🌿 Your choices shape our planet's future"
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentImpact(prev => (prev + 1) % impactMessages.length);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <>
    <div className="homeg">
      <div className="home__containerg">
        <ImageSliderGreen/>
        
        {/* Real-time Impact Banner */}
        <div className="impact__banner">
          <div className="impact__content">
            <div className="impact__message">
              {impactMessages[currentImpact]}
            </div>
            <div className="impact__live">
              <span className="live__indicator">🔴 LIVE</span>
              <span>Real-time environmental impact</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Sustainability Hero Section */}
        <div className="sustainability__hero">
          <div className="sustainability__content">
            <div className="sustainability__text">
              <h1>🌱 Shop Sustainably with Greenovation</h1>
              <p>Every purchase makes a difference. Join us in building a sustainable future with eco-friendly products that reduce your carbon footprint.</p>
              
              {/* Interactive Action Buttons */}
              <div className="hero__actions">
                <Link to="/sustainability" className="action__btn primary">
                  🌍 Explore Impact
                </Link>
                <Link to="/green-rewards" className="action__btn secondary">
                  🏆 Earn Green Points
                </Link>
              </div>
              
              <div className="sustainability__stats">
                <div className="stat__item">
                  <span className="stat__number">{(animatedStats.co2 / 1000000).toFixed(1)}M+</span>
                  <span className="stat__label">CO₂ Reduced (kg)</span>
                  <div className="stat__progress">
                    <div className="progress__bar" style={{width: `${(animatedStats.co2 / 2500000) * 100}%`}}></div>
                  </div>
                </div>
                <div className="stat__item">
                  <span className="stat__number">{(animatedStats.users / 1000).toFixed(0)}K+</span>
                  <span className="stat__label">Eco Warriors</span>
                  <div className="stat__progress">
                    <div className="progress__bar" style={{width: `${(animatedStats.users / 50000) * 100}%`}}></div>
                  </div>
                </div>
                <div className="stat__item">
                  <span className="stat__number">{animatedStats.recyclable}%</span>
                  <span className="stat__label">Recyclable Products</span>
                  <div className="stat__progress">
                    <div className="progress__bar" style={{width: `${animatedStats.recyclable}%`}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sustainability__visual">
              <div className="eco__circle">
                <span>🌍</span>
                <div className="pulse__ring"></div>
                <div className="pulse__ring pulse__ring--delayed"></div>
              </div>
              <div className="floating__elements">
                <span className="float__item">🌿</span>
                <span className="float__item">♻️</span>
                <span className="float__item">🌱</span>
                <span className="float__item">🍃</span>
                <span className="float__item">🌳</span>
                <span className="float__item">💚</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="home__rowg">
    <Product
      id="843800"
      title="Beco Bamboo Kitchen Towels, 20 sheets Reusable upto 2000 times, 100% Natural and Ecofriendly Alternative to Tissue Papers"
      price={6.35}
      carbon_red={65}
      rating={5}
      image="../images/tissue_eco.jpg"
      badge_id={5}
    />
    <Product
      id="875615"
      title="Jutify Eco-Friendly Printed Unisex Canvas Shopping Bag, Women's Tote Bag | Spacious, Stylish, Sturdy Handbag"
      price={15.35}
      carbon_red={60}
      rating={4}
      image="../images/bag_eco.jpg"
      badge_id={4}
    />
    {/* <Link to="/green"> Add a Link to "/green" here */}
      <Product
        id="875617"
        title="Qudrat Natural Straw | Coconut Leaf | Biodegradable, Eco-Friendly & Sustainable Drinking Straws (Pack of 100)"
        price={8.99}
        carbon_red={75}
        rating={4}
        image="../images/straw_eco.jpg"
        badge_id={5}
      />
    {/* </Link> */}
    <Product
      id="958745"
      title="Sow and Grow Plantable Pencils (Pack Of 10 Single Pencils) Made With 100% Recycled Paper|Eco Friendly|Return Gift|Corporate Gifting|Green"
      price={14.00}
      carbon_red={80}
      rating={4}
      image="../images/pencils_eco.jpg"
      badge_id={3}
      />
  </div>


    <div className="sustainability__banner">
      <div className="banner__content">
        <h2>🏆 Eco-Certified Products</h2>
        <p>Every product on this page is verified for sustainability and environmental impact</p>
        <div className="certification__badges">
          <div className="cert__badge">
            <span>🌿</span>
            <small>Organic</small>
          </div>
          <div className="cert__badge">
            <span>♻️</span>
            <small>Recyclable</small>
          </div>
          <div className="cert__badge">
            <span>🌱</span>
            <small>Biodegradable</small>
          </div>
          <div className="cert__badge">
            <span>🌍</span>
            <small>Carbon Neutral</small>
          </div>
        </div>
      </div>
    </div>

  <div className="home__rowg">
    <Product
      id="9513254"
      title="Wooden Eyewear Holder | Made With Sheesham Wood | Eyewear Showcase | 6-Inch Height | Decoration | Gift Material"
      price={37.99}
      carbon_red={50}
      rating={3}
      image="../images/sunglasses_eco.jpg"
      badge_id={2}

    />
    <Product
      id="1001002"
      title="Terracotta Clay Water Bottle | Capacity of 1 Litres | Purely Biodegradable | Plastic Alternative"
      price={25.78}
      carbon_red={65}
      rating={5}
      image="../images/bottle_eco.jpg"
      badge_id={4}
    />
    <Product
      id="1657495"
      title="Bamboo Hot Dish Mats / Table Coasters | 30cm x 30cm | Bamboo Product | Strong and Durable"
      price={21}
      carbon_red={70}
      rating={4}
      image="../images/mats_eco.jpg "
      badge_id={3}
    />
  </div>

  <div className="home__rowg">
    <Product
      id="1625854"
      title="Hand Made Jute Hanging Chair | Durable Jute Product | Stylish | Comfortable | Elegant Design"
      price={599.99}
      carbon_red={50}
      rating={4}
      image="../images/hangingchair_eco.png"
      badge_id={1}
    />
    <Product
      id="1625957"
      title="HomeStorie Eco-Friendly Foldable Bamboo Laundry Basket Hamper with Lid, Large - 57 Liter (Light Brown)"
      price={20.99}
      carbon_red={85}
      rating={4}
      image="../images/bamboolaundry.jpg"
      badge_id={5}
    />
    {/* <Product
      id="1625827"
      title="Earthism Eco-Friendly Bamboo Fibre Pasta | Salad | Fruit| Maggi Bowls 14 x 7 cm - Set of 4 (Life, Beige Grey)"
      price={12.99}
      carbon_red={65}
      rating={4}
      image="../images/bamboobowl.jpg"
      badge_id={3}
    /> */}
  </div>



</>
  );
}

export default Homegreen;