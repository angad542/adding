import React, { useState, useEffect } from "react";
import { useStateValue } from '../StateProvider.js';

// Sustainability scoring system
const calculateSustainabilityScore = (product) => {
  let score = 0;
  let factors = [];
  
  // Base score for eco-friendly products
  if (product.badge_id > 0) {
    score += 30;
    factors.push("Eco-certified");
  }
  
  // Material-based scoring
  const materials = product.title.toLowerCase();
  if (materials.includes('bamboo')) {
    score += 25;
    factors.push("Bamboo material");
  }
  if (materials.includes('organic')) {
    score += 20;
    factors.push("Organic materials");
  }
  if (materials.includes('recycled')) {
    score += 22;
    factors.push("Recycled content");
  }
  if (materials.includes('biodegradable')) {
    score += 18;
    factors.push("Biodegradable");
  }
  if (materials.includes('glass')) {
    score += 15;
    factors.push("Glass construction");
  }
  if (materials.includes('steel') || materials.includes('metal')) {
    score += 12;
    factors.push("Durable metal");
  }
  if (materials.includes('cotton')) {
    score += 10;
    factors.push("Natural fiber");
  }
  
  // Category-based environmental impact
  const categoryScores = {
    'clothing': 5,
    'electronics': -5, // Generally higher impact
    'home': 10,
    'kitchen': 15,
    'accessories': 8,
    'personal_care': 12
  };
  
  if (product.category && categoryScores[product.category]) {
    score += categoryScores[product.category];
  }
  
  // Price factor (higher quality often means longer lasting)
  if (product.price > 50) {
    score += 8;
    factors.push("Premium quality");
  } else if (product.price > 25) {
    score += 5;
    factors.push("Good quality");
  }
  
  // Rating factor (better products last longer)
  if (product.rating >= 4) {
    score += 5;
    factors.push("Highly rated");
  }
  
  // Cap the score at 100
  score = Math.min(score, 100);
  
  return { score, factors };
};

// Carbon footprint estimation
const estimateCarbonFootprint = (product) => {
  const baseCO2 = {
    'clothing': 8.5,
    'electronics': 15.2,
    'home': 4.8,
    'kitchen': 3.2,
    'accessories': 2.1,
    'personal_care': 1.8
  };
  
  let co2 = baseCO2[product.category] || 5.0;
  
  // Reduce for eco-friendly materials
  const materials = product.title.toLowerCase();
  if (materials.includes('bamboo')) co2 *= 0.3;
  else if (materials.includes('organic')) co2 *= 0.4;
  else if (materials.includes('recycled')) co2 *= 0.5;
  else if (materials.includes('biodegradable')) co2 *= 0.6;
  
  // Adjust for eco-friendly badge
  if (product.badge_id > 0) {
    co2 *= 0.7;
  }
  
  return Math.round(co2 * 10) / 10; // Round to 1 decimal
};

// Sustainability score display component
const SustainabilityScore = ({ score, factors, carbonFootprint }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e'; // Green
    if (score >= 60) return '#84cc16'; // Light green
    if (score >= 40) return '#eab308'; // Yellow
    if (score >= 20) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };
  
  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Poor';
    return 'Very Poor';
  };
  
  return (
    <div className="sustainability-score">
      <div className="score-header">
        <div className="score-circle" style={{ borderColor: getScoreColor(score) }}>
          <span className="score-number" style={{ color: getScoreColor(score) }}>
            {score}
          </span>
        </div>
        <div className="score-info">
          <h4 className="score-label">{getScoreLabel(score)}</h4>
          <p className="carbon-footprint">
            🌍 {carbonFootprint} kg CO₂e
          </p>
        </div>
      </div>
      
      <div className="score-factors">
        <h5>Sustainability Factors:</h5>
        <ul>
          {factors.map((factor, index) => (
            <li key={index}>✓ {factor}</li>
          ))}
        </ul>
      </div>
      
      <div className="score-bar">
        <div 
          className="score-fill" 
          style={{ 
            width: `${score}%`, 
            backgroundColor: getScoreColor(score) 
          }}
        />
      </div>
    </div>
  );
};

function CheckoutProduct({ id, image, title, price, rating, badge_id, category }) {
  const [, dispatch] = useStateValue();
  const [sustainabilityData, setSustainabilityData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const product = { id, title, price, rating, badge_id, category };
  
  useEffect(() => {
    const sustainability = calculateSustainabilityScore(product);
    const carbonFootprint = estimateCarbonFootprint(product);
    
    setSustainabilityData({
      ...sustainability,
      carbonFootprint
    });
  }, [product]);

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  let eco_friendly = "";
  if (badge_id > 0) {
    eco_friendly = "Eco-Friendly";
  }

  return (
    <div className="checkoutProduct">
      <img src={image} alt="" className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <p className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <span key={index}>⭐</span>
            ))}
        </p>
        <p className="ecofriendly">{eco_friendly}</p>
        
        {/* Sustainability Score Section */}
        {sustainabilityData && (
          <div className="sustainability-section">
            <button 
              className="sustainability-toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              🌱 Sustainability Score: {sustainabilityData.score}/100
              <span className="toggle-icon">{showDetails ? '▲' : '▼'}</span>
            </button>
            
            {showDetails && (
              <SustainabilityScore 
                score={sustainabilityData.score}
                factors={sustainabilityData.factors}
                carbonFootprint={sustainabilityData.carbonFootprint}
              />
            )}
          </div>
        )}
        
        <button onClick={removeFromBasket}>Remove from basket</button>
      </div>
      
      <style jsx>{`
        .checkoutProduct {
          display: flex;
          padding: 20px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
        }
        
        .checkoutProduct__image {
          width: 150px;
          height: 150px;
          object-fit: cover;
          margin-right: 20px;
          border-radius: 4px;
        }
        
        .checkoutProduct__info {
          flex: 1;
        }
        
        .checkoutProduct__title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .checkoutProduct__price {
          font-size: 20px;
          margin-bottom: 8px;
        }
        
        .checkoutProduct__rating {
          margin-bottom: 8px;
        }
        
        .ecofriendly {
          color: #22c55e;
          font-weight: 500;
          margin-bottom: 12px;
        }
        
        .sustainability-section {
          margin: 15px 0;
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .sustainability-toggle {
          background: none;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #059669;
          border-radius: 6px;
          transition: all 0.2s;
          width: 100%;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .sustainability-toggle:hover {
          background: #ecfdf5;
        }
        
        .toggle-icon {
          font-size: 12px;
        }
        
        .sustainability-score {
          margin-top: 15px;
          padding: 15px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .score-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .score-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          background: white;
        }
        
        .score-number {
          font-size: 18px;
          font-weight: bold;
        }
        
        .score-info h4 {
          margin: 0 0 5px 0;
          font-size: 16px;
        }
        
        .carbon-footprint {
          margin: 0;
          font-size: 14px;
          color: #64748b;
        }
        
        .score-factors {
          margin-bottom: 15px;
        }
        
        .score-factors h5 {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #374151;
        }
        
        .score-factors ul {
          margin: 0;
          padding-left: 20px;
          list-style: none;
        }
        
        .score-factors li {
          font-size: 13px;
          color: #059669;
          margin-bottom: 4px;
        }
        
        .score-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        
        .score-fill {
          height: 100%;
          transition: width 0.3s ease;
          border-radius: 4px;
        }
        
        button {
          background: #dc2626;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          margin-top: 10px;
        }
        
        button:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}

export default CheckoutProduct;