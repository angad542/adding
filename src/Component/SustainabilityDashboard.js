import React, { useMemo } from 'react';
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
    co2 *= 0.6; // Eco-certified products have lower footprint
  }
  
  // Local production bonus (assumed for eco products)
  if (product.badge_id > 0) {
    co2 *= 0.9; // Assume more local sourcing
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

// Helper functions moved outside component
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
  // Assuming average person shops 2-3 times per month
  const monthlyMultiplier = 2.5;
  return {
    carbon: Math.round(carbon * monthlyMultiplier * 10) / 10,
    water: Math.round(water * monthlyMultiplier)
  };
};

const getScoreColor = (score) => {
  if (score >= 80) return '#10b981';
  if (score >= 65) return '#22c55e';
  if (score >= 50) return '#84cc16';
  if (score >= 35) return '#eab308';
  if (score >= 20) return '#f97316';
  return '#ef4444';
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
          <h3>🌱 Sustainability Dashboard</h3>
          <p>Add eco-friendly items to see your environmental impact</p>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <small>Start shopping to see your sustainability score!</small>
        </div>
      </div>
    );
  }
  
  return (
    <div className="sustainability-dashboard">
      <div className="dashboard-header">
        <h3>🌱 Sustainability Dashboard</h3>
        <p>Your environmental impact summary</p>
      </div>
      
      <div className="dashboard-metrics">
        <div className="metric-card score-card">
          <div className="metric-icon">
            {getGradeEmoji(sustainabilityMetrics.sustainabilityGrade)}
          </div>
          <div className="metric-content">
            <h4>Sustainability Score</h4>
            <div className="score-display">
              <span 
                className="score-number-large" 
                style={{ color: getScoreColor(sustainabilityMetrics.averageScore) }}
              >
                {sustainabilityMetrics.averageScore}
              </span>
              <span className="score-grade">{sustainabilityMetrics.sustainabilityGrade}</span>
            </div>
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{ 
                  width: `${sustainabilityMetrics.averageScore}%`, 
                  backgroundColor: getScoreColor(sustainabilityMetrics.averageScore) 
                }}
              />
            </div>
            <p className="score-description">
              {sustainabilityMetrics.averageScore >= 80 ? "Outstanding!" :
               sustainabilityMetrics.averageScore >= 65 ? "Great choices!" :
               sustainabilityMetrics.averageScore >= 50 ? "Good progress!" :
               sustainabilityMetrics.averageScore >= 35 ? "Room for improvement" :
               "Consider eco alternatives"}
            </p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">🌍</div>
          <div className="metric-content">
            <h4>Carbon Footprint</h4>
            <div className="carbon-display">
              <span className="carbon-number">{sustainabilityMetrics.totalCarbon}</span>
              <span className="carbon-unit">kg CO₂e</span>
            </div>
            <div className="monthly-impact">
              <small>Monthly: ~{sustainabilityMetrics.monthlyImpact.carbon} kg CO₂e</small>
            </div>
            <p className="carbon-comparison">
              {sustainabilityMetrics.totalCarbon < 8 ? 
                "🌟 Excellent low-carbon choices!" : 
                sustainabilityMetrics.totalCarbon < 20 ? 
                "✅ Good environmental impact" : 
                sustainabilityMetrics.totalCarbon < 40 ?
                "⚠️ Moderate carbon footprint" :
                "🚨 High impact - consider offsetting"}
            </p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">💧</div>
          <div className="metric-content">
            <h4>Water Usage</h4>
            <div className="water-display">
              <span className="water-number">{sustainabilityMetrics.totalWater}</span>
              <span className="water-unit">liters</span>
            </div>
            <div className="monthly-impact">
              <small>Monthly: ~{sustainabilityMetrics.monthlyImpact.water} liters</small>
            </div>
            <p className="water-comparison">
              {sustainabilityMetrics.totalWater < 50 ? 
                "💧 Water-efficient choices!" : 
                sustainabilityMetrics.totalWater < 150 ? 
                "✅ Moderate water usage" : 
                "⚠️ High water impact"}
            </p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">♻️</div>
          <div className="metric-content">
            <h4>Eco-Friendly Items</h4>
            <div className="eco-display">
              <span className="eco-number">{sustainabilityMetrics.ecoFriendlyCount}</span>
              <span className="eco-total">/ {basket.length}</span>
            </div>
            <div className="eco-percentage">
              {Math.round((sustainabilityMetrics.ecoFriendlyCount / basket.length) * 100)}% of cart
            </div>
            <div className="eco-progress">
              <div 
                className="eco-bar" 
                style={{ 
                  width: `${(sustainabilityMetrics.ecoFriendlyCount / basket.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-insights">
        <div className="insights-section">
          <h4>🔍 Sustainability Highlights</h4>
          <div className="factors-grid">
            {sustainabilityMetrics.uniqueFactors.length > 0 ? (
              sustainabilityMetrics.uniqueFactors.map((factor, index) => (
                <span key={index} className="factor-badge">
                  ✓ {factor}
                </span>
              ))
            ) : (
              <span className="factor-badge empty">No eco-features detected</span>
            )}
          </div>
        </div>
        
        <div className="insights-section">
          <h4>💡 Recommendations</h4>
          <div className="recommendations-list">
            {sustainabilityMetrics.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-item">
                <span className="rec-text">{rec}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="insights-section">
          <h4>🏆 Environmental Impact</h4>
          <div className="impact-comparisons">
            <div className="comparison-item">
              <span className="comparison-icon">🌳</span>
              <div className="comparison-content">
                <span className="comparison-label">Trees needed to offset:</span>
                <span className="comparison-value">
                  {Math.max(1, Math.round(sustainabilityMetrics.totalCarbon * 0.037))} trees
                </span>
              </div>
            </div>
            <div className="comparison-item">
              <span className="comparison-icon">🚗</span>
              <div className="comparison-content">
                <span className="comparison-label">Equivalent driving:</span>
                <span className="comparison-value">
                  {Math.round(sustainabilityMetrics.totalCarbon * 2.4)} miles
                </span>
              </div>
            </div>
            <div className="comparison-item">
              <span className="comparison-icon">🏠</span>
              <div className="comparison-content">
                <span className="comparison-label">Home energy equivalent:</span>
                <span className="comparison-value">
                  {Math.round(sustainabilityMetrics.totalCarbon * 0.12)} kWh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .sustainability-dashboard {
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          border-radius: 16px;
          padding: 24px;
          margin: 24px 0;
          border: 1px solid #bbf7d0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .sustainability-dashboard.empty {
          text-align: center;
          padding: 40px 24px;
        }
        
        .dashboard-header {
          text-align: center;
          margin-bottom: 24px;
        }
        
        .dashboard-header h3 {
          margin: 0 0 8px 0;
          color: #059669;
          font-size: 24px;
          font-weight: 700;
        }
        
        .dashboard-header p {
          margin: 0;
          color: #6b7280;
          font-size: 14px;
        }
        
        .empty-state {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .dashboard-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        
        .metric-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .score-card {
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          border: 2px solid #10b981;
        }
        
        .metric-icon {
          font-size: 32px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 12px;
          flex-shrink: 0;
        }
        
        .metric-content {
          flex: 1;
          min-width: 0;
        }
        
        .metric-content h4 {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .score-display {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .score-number-large {
          font-size: 32px;
          font-weight: 800;
          line-height: 1;
        }
        
        .score-grade {
          font-size: 20px;
          font-weight: 700;
          color: #6b7280;
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 6px;
        }
        
        .score-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        .score-fill {
          height: 100%;
          transition: width 0.6s ease;
          border-radius: 4px;
        }
        
        .score-description {
          margin: 0;
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
        }
        
        .carbon-display, .water-display {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 4px;
        }
        
        .carbon-number, .water-number {
          font-size: 28px;
          font-weight: 700;
          color: #059669;
        }
        
        .carbon-unit, .water-unit {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }
        
        .monthly-impact {
          margin-bottom: 8px;
        }
        
        .monthly-impact small {
          color: #9ca3af;
          font-size: 11px;
          font-weight: 500;
        }
        
        .carbon-comparison, .water-comparison {
          margin: 0;
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
        }
        
        .eco-display {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 4px;
        }
        
        .eco-number {
          font-size: 28px;
          font-weight: 700;
          color: #059669;
        }
        
        .eco-total {
          font-size: 18px;
          color: #6b7280;
          font-weight: 600;
        }
        
        .eco-percentage {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .eco-progress {
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .eco-bar {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #059669);
          border-radius: 3px;
          transition: width 0.6s ease;
        }
        
        .dashboard-insights {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .insights-section {
          margin-bottom: 24px;
        }
        
        .insights-section:last-child {
          margin-bottom: 0;
        }
        
        .insights-section h4 {
          margin: 0 0 16px 0;
          color: #374151;
          font-size: 16px;
          font-weight: 600;
        }
        
        .factors-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .factor-badge {
          background: #dcfce7;
          color: #059669;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid #bbf7d0;
        }
        
        .factor-badge.empty {
          background: #f3f4f6;
          color: #6b7280;
          border-color: #d1d5db;
        }
        
        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .recommendation-item {
          background: #fef3c7;
          border: 1px solid #fbbf24;
          border-radius: 8px;
          padding: 12px;
          font-size: 14px;
          color: #92400e;
          font-weight: 500;
        }
        
        .impact-comparisons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }
        
        .comparison-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        
        .comparison-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 8px;
          flex-shrink: 0;
        }
        
        .comparison-content {
          flex: 1;
          min-width: 0;
        }
        
        .comparison-label {
          display: block;
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 2px;
        }
        
        .comparison-value {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #059669;
        }
        
        @media (max-width: 768px) {
          .dashboard-metrics {
            grid-template-columns: 1fr;
          }
          
          .metric-card {
            padding: 16px;
          }
          
          .impact-comparisons {
            grid-template-columns: 1fr;
          }
          
          .sustainability-dashboard {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default SustainabilityDashboard;