import React, { useEffect, useState } from "react";
import "../Css/Productgreen.css";
import { useStateValue } from "../StateProvider.js";

function Productgreen({ id, title, image, price, rating, carbon_red, badge_id }) {
  const [{ basket }, dispatch] = useStateValue();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showEcoDetails, setShowEcoDetails] = useState(false);
  const [carbonSaved, setCarbonSaved] = useState(0);

  useEffect(() => {
    // Animate carbon reduction counter
    const interval = setInterval(() => {
      setCarbonSaved(prev => prev < carbon_red ? prev + 1 : carbon_red);
    }, 50);
    return () => clearInterval(interval);
  }, [carbon_red]);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        carbon_red: carbon_red,
        badge_id: badge_id,
      },
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const getBadgeInfo = (badge_id) => {
    const badges = {
      1: { name: "Green Pioneer", color: "#2E7D32", description: "Leading sustainability innovation" },
      2: { name: "Eco Champion", color: "#388E3C", description: "Outstanding environmental impact" },
      3: { name: "Earth Friendly", color: "#4CAF50", description: "Certified eco-friendly product" },
      4: { name: "Sustainable Choice", color: "#66BB6A", description: "Responsibly sourced materials" },
      5: { name: "Carbon Neutral", color: "#81C784", description: "Net-zero carbon footprint" }
    };
    return badges[badge_id] || badges[3];
  };

  const badgeInfo = getBadgeInfo(badge_id);

  return (
    <div className="product">
      <div className="product__header">
        <div className="product__badge" style={{ backgroundColor: badgeInfo.color }}>
          {badgeInfo.name}
        </div>
        <button className="wishlist__btn" onClick={toggleWishlist}>
          {isWishlisted ? "💚" : "🤍"}
        </button>
      </div>
      
      <div className="product__image-container">
        <img src={image} alt={title} />
        <div className="product__hover-overlay">
          <button className="quick__view">👁️ Quick View</button>
        </div>
      </div>
      
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        </div>
      </div>

      <div className="eco__features">
        <div className="carbon__impact">
          <span className="carbon__icon">🌱</span>
          <div className="carbon__info">
            <span className="carbon__number">{carbonSaved}%</span>
            <span className="carbon__label">Carbon Reduced</span>
          </div>
        </div>
        
        <button 
          className="eco__details-btn"
          onClick={() => setShowEcoDetails(!showEcoDetails)}
        >
          {showEcoDetails ? "Hide" : "Show"} Eco Details
        </button>
      </div>

      {showEcoDetails && (
        <div className="eco__details-panel">
          <div className="detail__item">
            <span className="detail__icon">♻️</span>
            <span>100% Recyclable</span>
          </div>
          <div className="detail__item">
            <span className="detail__icon">🌿</span>
            <span>Organic Materials</span>
          </div>
          <div className="detail__item">
            <span className="detail__icon">📦</span>
            <span>Plastic-Free Packaging</span>
          </div>
        </div>
      )}

      <div className="product__actions">
        <button className="add__to__cart" onClick={addToBasket}>
          🛒 Add to Cart
        </button>
        <button className="buy__now">
          ⚡ Buy Now
        </button>
      </div>
    </div>
  );
}

export default Productgreen;


