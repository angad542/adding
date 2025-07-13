
import React from 'react';
import '../Css/GreenBadge.css';

const GreenBadge = ({ badgeId, carbonReduction, onClick }) => {
  const getBadgeInfo = (id) => {
    switch(id) {
      case 1:
        return {
          image: "../images/badge1.png",
          popover: "../images/badge1_popover.png",
          title: "Eco Certified",
          description: "Made from sustainable materials"
        };
      case 2:
        return {
          image: "../images/badge2.png",
          popover: "../images/badge2_popover.png",
          title: "Carbon Neutral",
          description: "Zero carbon footprint production"
        };
      case 3:
        return {
          image: "../images/badge3.png",
          popover: "../images/badge3_popover.png",
          title: "Recyclable",
          description: "100% recyclable packaging"
        };
      case 4:
        return {
          image: "../images/badge4.png",
          popover: "../images/badge4_popover.png",
          title: "Renewable Energy",
          description: "Powered by clean energy"
        };
      case 5:
        return {
          image: "../images/badge5.png",
          popover: "../images/badge5_popover.png",
          title: "Zero Waste",
          description: "Waste-free manufacturing"
        };
      default:
        return null;
    }
  };

  const badgeInfo = getBadgeInfo(badgeId);
  
  if (!badgeInfo) return null;

  return (
    <div className="green-badge-container">
      <div className="carbon-impact">
        <div className="carbon-badge">
          <img src="../images/co2badge.png" alt="CO2 Reduction" />
          <span>{carbonReduction}% Less CO₂</span>
        </div>
      </div>
      
      <div className="eco-badge" onClick={onClick}>
        <img 
          src={badgeInfo.image} 
          alt={badgeInfo.title}
          className="badge-icon"
        />
        <div className="badge-info">
          <h4>{badgeInfo.title}</h4>
          <p>{badgeInfo.description}</p>
        </div>
        <div className="badge-glow"></div>
      </div>
    </div>
  );
};

export default GreenBadge;
