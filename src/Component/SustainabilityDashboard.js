
import React, { useMemo, useState } from 'react';
import { useStateValue } from '../StateProvider.js';

// Enhanced sustainability calculation functions
const calculateSustainabilityScore = (product) => {
  let score = 0;
  let factors = [];
  
  // Eco-certification bonus
  if (product.badge_id > 0) {
    score += 35;
    factors.push("Eco-certified");
  }
  
  // Material analysis
  const materials = product.title.toLowerCase();
  const materialChecks = [
    { keyword: 'bamboo', score: 25, factor: "Sustainable bamboo" },
    { keyword: 'organic', score: 22, factor: "Organic materials" },
    { keyword: 'recycled', score: 24, factor: "Recycled content" },
    { keyword: 'biodegradable', score: 20, factor: "Biodegradable" },
    { keyword: 'compostable', score: 18, factor: "Compostable" },
    { keyword: 'glass', score: 16, factor: "Recyclable glass" },
    { keyword: 'steel', score: 14, factor: "Durable steel" },
    { keyword: 'metal', score: 12, factor: "Recyclable metal" },
    { keyword: 'cotton', score: 10, factor: "Natural cotton" },
    { keyword: 'hemp', score: 15, factor: "Sustainable hemp" },
    { keyword: 'cork', score: 17, factor: "Renewable cork" },
    { keyword: 'linen', score: 12, factor: "Natural linen" }
  ];
  
  materialChecks.forEach(({ keyword, score: matScore, factor }) => {
    if (materials.includes(keyword)) {
      score += matScore;
      factors.push(factor);
    }
  });
  
  // Category-based scoring
  const categoryScores = {
    'clothing': 8,
    'electronics': -3,
    'home': 12,
    'kitchen': 18,
    'accessories': 10,
    'personal_care': 15
  };
  
  if (product.category && categoryScores[product.category]) {
    score += categoryScores[product.category];
    if (categoryScores[product.category] > 0) {
      factors.push(`Eco-friendly ${product.category}`);
    }
  }
  
  // Quality indicators
  if (product.price > 50) {
    score += 10;
    factors.push("Premium durability");
  } else if (product.price > 25) {
    score += 6;
    factors.push("Quality construction");
  }
  
  if (product.rating >= 4) {
    score += 6;
    factors.push("Highly rated");
  }
  
  // Reusability bonus
  if (materials.includes('reusable') || materials.includes('refillable')) {
    score += 15;
    factors.push("Reusable design");
  }
  
  return { score: Math.min(score, 100), factors };
};

const estimateCarbonFootprint = (product) => {
  const baseCO2 = {
    'clothing': 9.2,
    'electronics': 18.5,
    'home': 5.8,
    'kitchen': 4.1,
    'accessories': 3.2,
    'personal_care': 2.6
  };
  
  let co2 = baseCO2[product.category] || 6.0;
  
  const materials = product.title.toLowerCase();
  const reductionFactors = [
    { keyword: 'bamboo', reduction: 0.25 },
    { keyword: 'organic', reduction: 0.35 },
    { keyword: 'recycled', reduction: 0.45 },
    { keyword: 'biodegradable', reduction: 0.55 },
    { keyword: 'glass', reduction: 0.75 },
    { keyword: 'steel', reduction: 0.8 },
    { keyword: 'metal', reduction: 0.85 }
  ];
  
  reductionFactors.forEach(({ keyword, reduction }) => {
    if (materials.includes(keyword)) {
      co2 *= reduction;
    }
  });
  
  if (product.badge_id > 0) {
    co2 *= 0.6;
  }
  
  if (product.badge_id > 0) {
    co2 *= 0.9;
  }
  
  return Math.round(co2 * 10) / 10;
};

const calculateWaterUsage = (product) => {
  const baseWater = {
    'clothing': 120,
    'electronics': 45,
    'home': 25,
    'kitchen': 15,
    'accessories': 30,
    'personal_care': 80
  };
  
  let water = baseWater[product.category] || 35;
  
  const materials = product.title.toLowerCase();
  if (materials.includes('organic')) water *= 0.7;
  if (materials.includes('recycled')) water *= 0.5;
  if (materials.includes('bamboo')) water *= 0.3;
  
  return Math.round(water);
};

// Helper functions
const getSustainabilityGrade = (score) => {
  if (score >= 85) return 'A+';
  if (score >= 75) return 'A';
  if (score >= 65) return 'B+';
  if (score >= 55) return 'B';
  if (score >= 45) return 'C+';
  if (score >= 35) return 'C';
  if (score >= 25) return 'D';
  return 'F';
};

const generateRecommendations = (score, basket, ecoCount) => {
  const recommendations = [];
  
  if (score < 40) {
    recommendations.push("🌱 Consider switching to more eco-friendly alternatives");
  }
  
  if (score >= 40 && score < 60) {
    recommendations.push("♻️ You're on the right track! Try adding more sustainable items");
  }
  
  if (score >= 60 && score < 80) {
    recommendations.push("🌟 Great sustainability choices! Consider carbon offsetting");
  }
  
  if (score >= 80) {
    recommendations.push("🏆 Excellent eco-friendly cart! You're making a real difference");
  }
  
  const ecoPercentage = (ecoCount / basket.length) * 100;
  if (ecoPercentage < 30) {
    recommendations.push("🎯 Aim for at least 30% eco-certified products");
  }
  
  if (basket.some(item => item.category === 'electronics' && item.badge_id === 0)) {
    recommendations.push("⚡ Look for energy-efficient electronic alternatives");
  }
  
  return recommendations;
};

const calculateMonthlyImpact = (carbon, water) => {
  const monthlyMultiplier = 2.5;
  return {
    carbon: Math.round(carbon * monthlyMultiplier * 10) / 10,
    water: Math.round(water * monthlyMultiplier)
  };
};

const getScoreColor = (score) => {
  if (score >= 80) return '#059669';
  if (score >= 65) return '#16a34a';
  if (score >= 50) return '#65a30d';
  if (score >= 35) return '#ca8a04';
  if (score >= 20) return '#ea580c';
  return '#dc2626';
};

const getGradeEmoji = (grade) => {
  const gradeEmojis = {
    'A+': '🏆',
    'A': '🌟',
    'B+': '⭐',
    'B': '👍',
    'C+': '📈',
    'C': '⚠️',
    'D': '⚠️',
    'F': '❌'
  };
  return gradeEmojis[grade] || '📊';
};

const SustainabilityDashboard = () => {
  const [{ basket }] = useStateValue();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCarbonOffset, setShowCarbonOffset] = useState(false);
  
  const sustainabilityMetrics = useMemo(() => {
    if (basket.length === 0) {
      return {
        averageScore: 0,
        totalCarbon: 0,
        totalWater: 0,
        ecoFriendlyCount: 0,
        sustainabilityGrade: 'N/A',
        recommendations: [],
        uniqueFactors: [],
        monthlyImpact: 0
      };
    }
    
    let totalScore = 0;
    let totalCarbon = 0;
    let totalWater = 0;
    let ecoFriendlyCount = 0;
    let allFactors = [];
    
    basket.forEach(product => {
      const sustainability = calculateSustainabilityScore(product);
      const carbon = estimateCarbonFootprint(product);
      const water = calculateWaterUsage(product);
      
      totalScore += sustainability.score;
      totalCarbon += carbon;
      totalWater += water;
      allFactors.push(...sustainability.factors);
      
      if (product.badge_id > 0) {
        ecoFriendlyCount++;
      }
    });
    
    const averageScore = Math.round(totalScore / basket.length);
    const sustainabilityGrade = getSustainabilityGrade(averageScore);
    const recommendations = generateRecommendations(averageScore, basket, ecoFriendlyCount);
    const monthlyImpact = calculateMonthlyImpact(totalCarbon, totalWater);
    
    return {
      averageScore,
      totalCarbon: Math.round(totalCarbon * 10) / 10,
      totalWater: Math.round(totalWater),
      ecoFriendlyCount,
      sustainabilityGrade,
      recommendations,
      uniqueFactors: [...new Set(allFactors)],
      monthlyImpact
    };
  }, [basket]);
  
  if (basket.length === 0) {
    return (
      <div className="sustainability-dashboard empty">
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-icon">🌱</div>
            <h3>Sustainability Dashboard</h3>
            <p>Your environmental impact tracker</p>
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-animation">
            <div className="tree-icon">🌳</div>
            <div className="pulse-ring"></div>
          </div>
          <h4>Start Your Eco Journey</h4>
          <p>Add sustainable products to see your positive environmental impact</p>
          <div className="eco-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🌍</span>
              <span>Reduce Carbon Footprint</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💧</span>
              <span>Save Water</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">♻️</span>
              <span>Support Recycling</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="sustainability-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-icon animate-pulse">🌱</div>
          <h3>Sustainability Dashboard</h3>
          <p>Track your environmental impact and make a difference</p>
        </div>
        
        <div className="dashboard-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'impact' ? 'active' : ''}`}
            onClick={() => setActiveTab('impact')}
          >
            🌍 Impact
          </button>
          <button 
            className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            💡 Insights
          </button>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <div className="dashboard-content">
          <div className="hero-metric">
            <div className="score-visualization">
              <div className="circular-progress">
                <svg className="progress-ring" width="200" height="200">
                  <circle
                    className="progress-ring-circle-bg"
                    cx="100"
                    cy="100"
                    r="80"
                  />
                  <circle
                    className="progress-ring-circle"
                    cx="100"
                    cy="100"
                    r="80"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 80}`,
                      strokeDashoffset: `${2 * Math.PI * 80 * (1 - sustainabilityMetrics.averageScore / 100)}`,
                      stroke: getScoreColor(sustainabilityMetrics.averageScore)
                    }}
                  />
                </svg>
                <div className="score-center">
                  <span className="score-number">{sustainabilityMetrics.averageScore}</span>
                  <span className="score-grade">{sustainabilityMetrics.sustainabilityGrade}</span>
                  <span className="score-label">Eco Score</span>
                </div>
              </div>
            </div>
            
            <div className="score-description">
              <h4>
                {sustainabilityMetrics.averageScore >= 80 ? "🏆 Outstanding Impact!" :
                 sustainabilityMetrics.averageScore >= 65 ? "🌟 Great Choices!" :
                 sustainabilityMetrics.averageScore >= 50 ? "📈 Good Progress!" :
                 sustainabilityMetrics.averageScore >= 35 ? "⚡ Room for Growth" :
                 "🌱 Start Your Journey"}
              </h4>
              <p>
                {sustainabilityMetrics.averageScore >= 80 ? "You're making an exceptional environmental impact with your choices!" :
                 sustainabilityMetrics.averageScore >= 65 ? "Your sustainable choices are making a real difference!" :
                 sustainabilityMetrics.averageScore >= 50 ? "You're on the right path to sustainability!" :
                 sustainabilityMetrics.averageScore >= 35 ? "Consider more eco-friendly alternatives to boost your impact" :
                 "Every sustainable choice counts - start making a difference today!"}
              </p>
            </div>
          </div>
          
          <div className="metrics-grid">
            <div className="metric-card carbon-card">
              <div className="card-header">
                <div className="metric-icon">🌍</div>
                <div className="metric-info">
                  <h4>Carbon Footprint</h4>
                  <div className="metric-value">
                    <span className="value-number">{sustainabilityMetrics.totalCarbon}</span>
                    <span className="value-unit">kg CO₂e</span>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="progress-bar">
                  <div 
                    className="progress-fill carbon-progress" 
                    style={{ width: `${Math.min((40 - sustainabilityMetrics.totalCarbon) / 40 * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="metric-insight">
                  Monthly impact: ~{sustainabilityMetrics.monthlyImpact.carbon} kg CO₂e
                </p>
                {sustainabilityMetrics.totalCarbon > 20 && (
                  <button 
                    className="offset-button"
                    onClick={() => setShowCarbonOffset(true)}
                  >
                    🌳 Offset Carbon Emissions
                  </button>
                )}
              </div>
            </div>
            
            <div className="metric-card water-card">
              <div className="card-header">
                <div className="metric-icon">💧</div>
                <div className="metric-info">
                  <h4>Water Conservation</h4>
                  <div className="metric-value">
                    <span className="value-number">{sustainabilityMetrics.totalWater}</span>
                    <span className="value-unit">liters saved</span>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="progress-bar">
                  <div 
                    className="progress-fill water-progress" 
                    style={{ width: `${Math.min((200 - sustainabilityMetrics.totalWater) / 200 * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="metric-insight">
                  That's enough for {Math.round(sustainabilityMetrics.totalWater / 8)} days of drinking water!
                </p>
              </div>
            </div>
            
            <div className="metric-card eco-card">
              <div className="card-header">
                <div className="metric-icon">♻️</div>
                <div className="metric-info">
                  <h4>Eco Products</h4>
                  <div className="metric-value">
                    <span className="value-number">{sustainabilityMetrics.ecoFriendlyCount}</span>
                    <span className="value-unit">/ {basket.length}</span>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="eco-percentage">
                  {Math.round((sustainabilityMetrics.ecoFriendlyCount / basket.length) * 100)}% of your cart
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill eco-progress" 
                    style={{ width: `${(sustainabilityMetrics.ecoFriendlyCount / basket.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'impact' && (
        <div className="dashboard-content">
          <div className="impact-visualization">
            <h4>🌍 Your Environmental Impact</h4>
            <div className="impact-grid">
              <div className="impact-item">
                <div className="impact-icon">🌳</div>
                <div className="impact-content">
                  <span className="impact-value">
                    {Math.max(1, Math.round(sustainabilityMetrics.totalCarbon * 0.037))}
                  </span>
                  <span className="impact-label">Trees needed to offset your carbon</span>
                </div>
              </div>
              
              <div className="impact-item">
                <div className="impact-icon">🚗</div>
                <div className="impact-content">
                  <span className="impact-value">
                    {Math.round(sustainabilityMetrics.totalCarbon * 2.4)}
                  </span>
                  <span className="impact-label">Miles of driving equivalent</span>
                </div>
              </div>
              
              <div className="impact-item">
                <div className="impact-icon">🏠</div>
                <div className="impact-content">
                  <span className="impact-value">
                    {Math.round(sustainabilityMetrics.totalCarbon * 0.12)}
                  </span>
                  <span className="impact-label">kWh of home energy saved</span>
                </div>
              </div>
              
              <div className="impact-item">
                <div className="impact-icon">🚰</div>
                <div className="impact-content">
                  <span className="impact-value">
                    {Math.round(sustainabilityMetrics.totalWater / 340)}
                  </span>
                  <span className="impact-label">Bathtubs of water conserved</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sustainability-trends">
            <h4>📈 Sustainability Trends</h4>
            <div className="trend-cards">
              <div className="trend-card positive">
                <span className="trend-icon">📈</span>
                <span className="trend-text">25% increase in eco-friendly purchases this month</span>
              </div>
              <div className="trend-card positive">
                <span className="trend-icon">🎯</span>
                <span className="trend-text">On track to save 150kg CO₂ this year</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'insights' && (
        <div className="dashboard-content">
          <div className="insights-grid">
            <div className="insight-section">
              <h4>🔍 Sustainability Highlights</h4>
              <div className="factors-grid">
                {sustainabilityMetrics.uniqueFactors.length > 0 ? (
                  sustainabilityMetrics.uniqueFactors.map((factor, index) => (
                    <div key={index} className="factor-badge">
                      <span className="badge-icon">✓</span>
                      <span className="badge-text">{factor}</span>
                    </div>
                  ))
                ) : (
                  <div className="factor-badge empty">
                    <span className="badge-icon">📋</span>
                    <span className="badge-text">No eco-features detected</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="insight-section">
              <h4>💡 Smart Recommendations</h4>
              <div className="recommendations-list">
                {sustainabilityMetrics.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="rec-content">
                      <span className="rec-text">{rec}</span>
                    </div>
                  </div>
                ))}
                <div className="recommendation-card action">
                  <div className="rec-content">
                    <span className="rec-text">🎁 Earn Green Points: Complete eco-challenges for rewards!</span>
                    <button className="action-button">View Challenges</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showCarbonOffset && (
        <div className="modal-overlay" onClick={() => setShowCarbonOffset(false)}>
          <div className="carbon-offset-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🌳 Carbon Offset Program</h3>
              <button className="close-button" onClick={() => setShowCarbonOffset(false)}>×</button>
            </div>
            <div className="modal-content">
              <p>Offset your {sustainabilityMetrics.totalCarbon} kg CO₂e emissions by planting {Math.max(1, Math.round(sustainabilityMetrics.totalCarbon * 0.037))} trees.</p>
              <div className="offset-options">
                <div className="offset-option">
                  <h4>Tree Planting</h4>
                  <p>${Math.round(sustainabilityMetrics.totalCarbon * 0.5)}</p>
                  <button className="offset-btn">Plant Trees</button>
                </div>
                <div className="offset-option">
                  <h4>Renewable Energy</h4>
                  <p>${Math.round(sustainabilityMetrics.totalCarbon * 0.3)}</p>
                  <button className="offset-btn">Support Clean Energy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .sustainability-dashboard {
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfccb 50%, #f0f9ff 100%);
          border-radius: 24px;
          padding: 32px;
          margin: 24px 0;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
        }
        
        .sustainability-dashboard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #059669, #16a34a, #65a30d);
        }
        
        .sustainability-dashboard.empty {
          text-align: center;
          padding: 60px 32px;
        }
        
        .dashboard-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .header-content {
          margin-bottom: 24px;
        }
        
        .header-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: inline-block;
        }
        
        .header-icon.animate-pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .dashboard-header h3 {
          margin: 0 0 8px 0;
          color: #065f46;
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #059669, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .dashboard-header p {
          margin: 0;
          color: #6b7280;
          font-size: 16px;
          font-weight: 500;
        }
        
        .dashboard-tabs {
          display: flex;
          gap: 4px;
          background: rgba(255, 255, 255, 0.7);
          padding: 6px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          justify-content: center;
        }
        
        .tab-button {
          background: none;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .tab-button.active {
          background: linear-gradient(135deg, #059669, #16a34a);
          color: white;
          box-shadow: 0 8px 16px rgba(5, 150, 105, 0.3);
        }
        
        .tab-button:hover:not(.active) {
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
        }
        
        .empty-state {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 60px 40px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .empty-animation {
          position: relative;
          margin-bottom: 32px;
          display: inline-block;
        }
        
        .tree-icon {
          font-size: 80px;
          position: relative;
          z-index: 2;
        }
        
        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border: 3px solid #059669;
          border-radius: 50%;
          animation: pulse-ring 2s infinite;
          opacity: 0.6;
        }
        
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
        }
        
        .empty-state h4 {
          margin: 0 0 16px 0;
          color: #065f46;
          font-size: 24px;
          font-weight: 700;
        }
        
        .empty-state p {
          margin: 0 0 32px 0;
          color: #6b7280;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .eco-benefits {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .benefit-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #059669;
          font-weight: 600;
          font-size: 14px;
        }
        
        .benefit-icon {
          font-size: 20px;
        }
        
        .dashboard-content {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-metric {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 40px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        .score-visualization {
          flex-shrink: 0;
        }
        
        .circular-progress {
          position: relative;
          width: 200px;
          height: 200px;
        }
        
        .progress-ring {
          transform: rotate(-90deg);
        }
        
        .progress-ring-circle-bg {
          fill: none;
          stroke: #e5e7eb;
          stroke-width: 12;
        }
        
        .progress-ring-circle {
          fill: none;
          stroke-width: 12;
          stroke-linecap: round;
          transition: all 1.5s ease-in-out;
        }
        
        .score-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        
        .score-number {
          display: block;
          font-size: 36px;
          font-weight: 800;
          color: #065f46;
          line-height: 1;
        }
        
        .score-grade {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: #059669;
          margin: 4px 0;
        }
        
        .score-label {
          display: block;
          font-size: 12px;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .score-description {
          flex: 1;
        }
        
        .score-description h4 {
          margin: 0 0 16px 0;
          font-size: 28px;
          font-weight: 800;
          color: #065f46;
        }
        
        .score-description p {
          margin: 0;
          font-size: 16px;
          color: #6b7280;
          line-height: 1.6;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .metric-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .metric-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .metric-icon {
          font-size: 32px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          flex-shrink: 0;
        }
        
        .metric-info {
          flex: 1;
        }
        
        .metric-info h4 {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .metric-value {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        
        .value-number {
          font-size: 28px;
          font-weight: 800;
          color: #065f46;
        }
        
        .value-unit {
          font-size: 14px;
          color: #6b7280;
          font-weight: 600;
        }
        
        .card-content {
          margin-top: 16px;
        }
        
        .progress-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }
        
        .carbon-progress {
          background: linear-gradient(90deg, #16a34a, #059669);
        }
        
        .water-progress {
          background: linear-gradient(90deg, #0ea5e9, #0284c7);
        }
        
        .eco-progress {
          background: linear-gradient(90deg, #059669, #16a34a);
        }
        
        .metric-insight {
          margin: 0;
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
        }
        
        .offset-button {
          background: linear-gradient(135deg, #16a34a, #059669);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.3s ease;
        }
        
        .offset-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(22, 163, 74, 0.4);
        }
        
        .eco-percentage {
          font-size: 16px;
          font-weight: 700;
          color: #059669;
          margin-bottom: 8px;
        }
        
        .impact-visualization {
          margin-bottom: 32px;
        }
        
        .impact-visualization h4 {
          margin: 0 0 24px 0;
          color: #065f46;
          font-size: 20px;
          font-weight: 700;
        }
        
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .impact-item {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .impact-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .impact-icon {
          font-size: 32px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-radius: 12px;
          flex-shrink: 0;
        }
        
        .impact-content {
          flex: 1;
        }
        
        .impact-value {
          display: block;
          font-size: 24px;
          font-weight: 800;
          color: #059669;
          line-height: 1;
        }
        
        .impact-label {
          display: block;
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
          margin-top: 4px;
        }
        
        .sustainability-trends {
          margin-bottom: 32px;
        }
        
        .sustainability-trends h4 {
          margin: 0 0 16px 0;
          color: #065f46;
          font-size: 20px;
          font-weight: 700;
        }
        
        .trend-cards {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .trend-card {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid #bbf7d0;
        }
        
        .trend-card.positive {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
        }
        
        .trend-icon {
          font-size: 20px;
        }
        
        .trend-text {
          font-size: 14px;
          font-weight: 600;
          color: #065f46;
        }
        
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 32px;
        }
        
        .insight-section {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .insight-section h4 {
          margin: 0 0 24px 0;
          color: #065f46;
          font-size: 20px;
          font-weight: 700;
        }
        
        .factors-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .factor-badge {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          border: 1px solid #22c55e;
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .factor-badge:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
        }
        
        .factor-badge.empty {
          background: linear-gradient(135deg, #f9fafb, #f3f4f6);
          border-color: #d1d5db;
        }
        
        .badge-icon {
          font-weight: 700;
          color: #059669;
        }
        
        .factor-badge.empty .badge-icon {
          color: #6b7280;
        }
        
        .badge-text {
          font-size: 13px;
          font-weight: 600;
          color: #065f46;
        }
        
        .factor-badge.empty .badge-text {
          color: #6b7280;
        }
        
        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .recommendation-card {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border: 1px solid #f59e0b;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        
        .recommendation-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(245, 158, 11, 0.2);
        }
        
        .recommendation-card.action {
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          border-color: #3b82f6;
        }
        
        .rec-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        
        .rec-text {
          font-size: 14px;
          font-weight: 600;
          color: #92400e;
          flex: 1;
        }
        
        .recommendation-card.action .rec-text {
          color: #1e40af;
        }
        
        .action-button {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        
        .action-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        
        .carbon-offset-modal {
          background: white;
          border-radius: 20px;
          padding: 32px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .modal-header h3 {
          margin: 0;
          color: #065f46;
          font-size: 24px;
          font-weight: 700;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        
        .close-button:hover {
          background: #f3f4f6;
          color: #374151;
        }
        
        .modal-content p {
          margin: 0 0 24px 0;
          color: #6b7280;
          line-height: 1.6;
        }
        
        .offset-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .offset-option {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border: 1px solid #bbf7d0;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
        }
        
        .offset-option h4 {
          margin: 0 0 8px 0;
          color: #065f46;
          font-size: 18px;
          font-weight: 700;
        }
        
        .offset-option p {
          margin: 0 0 16px 0;
          color: #059669;
          font-size: 20px;
          font-weight: 700;
        }
        
        .offset-btn {
          background: linear-gradient(135deg, #059669, #16a34a);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .offset-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
        }
        
        @media (max-width: 768px) {
          .sustainability-dashboard {
            padding: 20px;
          }
          
          .hero-metric {
            flex-direction: column;
            text-align: center;
            gap: 24px;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .insights-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-tabs {
            flex-direction: column;
          }
          
          .tab-button {
            padding: 16px;
          }
          
          .impact-grid {
            grid-template-columns: 1fr;
          }
          
          .carbon-offset-modal {
            padding: 24px;
            margin: 20px;
          }
          
          .offset-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SustainabilityDashboard;
