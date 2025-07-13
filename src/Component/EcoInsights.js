
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider.js';

const EcoInsights = () => {
  const [{ basket }] = useStateValue();
  const [insights, setInsights] = useState({});
  const [activeView, setActiveView] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  useEffect(() => {
    generateEcoInsights();
  }, [basket, selectedTimeframe]);

  const generateEcoInsights = () => {
    const ecoItems = basket.filter(item => item.badge_id > 0);
    const totalItems = basket.length;
    
    // Advanced sustainability analytics
    const sustainabilityData = {
      ecoScore: totalItems > 0 ? Math.round((ecoItems.length / totalItems) * 100) : 0,
      carbonSaved: ecoItems.length * 2.3 + Math.random() * 10,
      waterSaved: ecoItems.length * 45 + Math.random() * 100,
      wastePrevented: ecoItems.length * 0.8 + Math.random() * 2,
      treesSaved: Math.floor((ecoItems.length * 2.3) / 22), // 22kg CO2 per tree per year
      
      // Trend data
      monthlyTrends: [
        { month: 'Jan', ecoScore: 45, carbonSaved: 12.4 },
        { month: 'Feb', ecoScore: 52, carbonSaved: 15.1 },
        { month: 'Mar', ecoScore: 48, carbonSaved: 14.2 },
        { month: 'Apr', ecoScore: 58, carbonSaved: 18.7 },
        { month: 'May', ecoScore: 63, carbonSaved: 21.3 },
        { month: 'Jun', ecoScore: Math.max(65, Math.round((ecoItems.length / totalItems) * 100)) },
      ],
      
      // Category breakdown
      categoryImpact: [
        { category: 'Home & Garden', percentage: 35, impact: 'High' },
        { category: 'Personal Care', percentage: 28, impact: 'Medium' },
        { category: 'Kitchen', percentage: 22, impact: 'High' },
        { category: 'Clothing', percentage: 15, impact: 'Medium' }
      ],
      
      // Future projections
      yearlyProjection: {
        carbonOffset: (ecoItems.length * 2.3 * 12).toFixed(1),
        waterSaved: Math.round(ecoItems.length * 45 * 12),
        equivalents: {
          treesPlanted: Math.floor((ecoItems.length * 2.3 * 12) / 22),
          carMiles: Math.round(ecoItems.length * 2.3 * 12 * 2.4),
          homeEnergyDays: Math.round(ecoItems.length * 2.3 * 12 * 0.12)
        }
      },
      
      // Personalized recommendations
      recommendations: [
        {
          type: 'switch',
          title: 'Switch to Bamboo Products',
          impact: '+15% eco score',
          carbonSavings: '3.2 kg CO₂/month'
        },
        {
          type: 'reduce',
          title: 'Reduce Plastic Packaging',
          impact: '+8% eco score',
          carbonSavings: '1.8 kg CO₂/month'
        },
        {
          type: 'optimize',
          title: 'Bulk Buying for Essentials',
          impact: '+12% efficiency',
          carbonSavings: '2.5 kg CO₂/month'
        }
      ]
    };

    setInsights(sustainabilityData);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#059669';
    if (score >= 60) return '#16a34a';
    if (score >= 40) return '#65a30d';
    if (score >= 20) return '#ca8a04';
    return '#dc2626';
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toFixed(1);
  };

  return (
    <div className="eco-insights">
      <div className="insights-header">
        <div className="header-content">
          <div className="header-icon">📊</div>
          <h2>Eco Insights Dashboard</h2>
          <p>Deep analytics into your environmental impact and sustainability journey</p>
        </div>
        
        <div className="timeframe-selector">
          <button 
            className={`timeframe-btn ${selectedTimeframe === 'week' ? 'active' : ''}`}
            onClick={() => setSelectedTimeframe('week')}
          >
            Week
          </button>
          <button 
            className={`timeframe-btn ${selectedTimeframe === 'month' ? 'active' : ''}`}
            onClick={() => setSelectedTimeframe('month')}
          >
            Month
          </button>
          <button 
            className={`timeframe-btn ${selectedTimeframe === 'year' ? 'active' : ''}`}
            onClick={() => setSelectedTimeframe('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="insights-navigation">
        <button 
          className={`nav-btn ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          🌍 Overview
        </button>
        <button 
          className={`nav-btn ${activeView === 'trends' ? 'active' : ''}`}
          onClick={() => setActiveView('trends')}
        >
          📈 Trends
        </button>
        <button 
          className={`nav-btn ${activeView === 'projections' ? 'active' : ''}`}
          onClick={() => setActiveView('projections')}
        >
          🔮 Projections
        </button>
        <button 
          className={`nav-btn ${activeView === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveView('recommendations')}
        >
          💡 Recommendations
        </button>
      </div>

      {activeView === 'overview' && (
        <div className="overview-content">
          <div className="hero-metrics">
            <div className="metric-card primary">
              <div className="metric-visual">
                <div className="circular-chart">
                  <svg viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={getScoreColor(insights.ecoScore)}
                      strokeWidth="8"
                      strokeDasharray={`${insights.ecoScore * 2.51} 251`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="chart-center">
                    <span className="score">{insights.ecoScore}</span>
                    <span className="label">Eco Score</span>
                  </div>
                </div>
              </div>
              <div className="metric-info">
                <h3>Sustainability Rating</h3>
                <p>Your environmental impact score based on purchasing choices</p>
                <div className="score-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-label">Products:</span>
                    <span className="breakdown-value">{basket.filter(item => item.badge_id > 0).length}/{basket.length} eco-friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">🌍</div>
              <div className="impact-content">
                <span className="impact-value">{formatNumber(insights.carbonSaved)} kg</span>
                <span className="impact-label">CO₂ Saved</span>
                <div className="impact-comparison">
                  ≈ {Math.round(insights.carbonSaved * 2.4)} miles not driven
                </div>
              </div>
            </div>

            <div className="impact-card">
              <div className="impact-icon">💧</div>
              <div className="impact-content">
                <span className="impact-value">{formatNumber(insights.waterSaved)} L</span>
                <span className="impact-label">Water Conserved</span>
                <div className="impact-comparison">
                  ≈ {Math.round(insights.waterSaved / 340)} bathtubs saved
                </div>
              </div>
            </div>

            <div className="impact-card">
              <div className="impact-icon">🗑️</div>
              <div className="impact-content">
                <span className="impact-value">{formatNumber(insights.wastePrevented)} kg</span>
                <span className="impact-label">Waste Prevented</span>
                <div className="impact-comparison">
                  ≈ {Math.round(insights.wastePrevented * 4)} plastic bottles
                </div>
              </div>
            </div>

            <div className="impact-card">
              <div className="impact-icon">🌳</div>
              <div className="impact-content">
                <span className="impact-value">{insights.treesSaved}</span>
                <span className="impact-label">Trees Equivalent</span>
                <div className="impact-comparison">
                  Annual CO₂ absorption
                </div>
              </div>
            </div>
          </div>

          <div className="category-breakdown">
            <h3>Impact by Category</h3>
            <div className="category-list">
              {insights.categoryImpact?.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{category.category}</span>
                    <span className="category-percentage">{category.percentage}%</span>
                  </div>
                  <div className="category-bar">
                    <div 
                      className="category-fill"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.impact === 'High' ? '#059669' : '#65a30d'
                      }}
                    ></div>
                  </div>
                  <span className={`impact-badge ${category.impact.toLowerCase()}`}>
                    {category.impact} Impact
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === 'trends' && (
        <div className="trends-content">
          <div className="trend-chart-container">
            <h3>Sustainability Trends</h3>
            <div className="chart-wrapper">
              <div className="trend-chart">
                {insights.monthlyTrends?.map((data, index) => (
                  <div key={index} className="trend-bar">
                    <div 
                      className="bar-fill"
                      style={{ height: `${data.ecoScore}%` }}
                    ></div>
                    <span className="bar-label">{data.month}</span>
                    <span className="bar-value">{data.ecoScore}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="trend-insights">
            <h3>Trend Analysis</h3>
            <div className="insight-cards">
              <div className="insight-card positive">
                <div className="insight-icon">📈</div>
                <div className="insight-content">
                  <h4>Growing Eco-Consciousness</h4>
                  <p>Your eco score improved by 18 points over the last 6 months</p>
                </div>
              </div>
              
              <div className="insight-card neutral">
                <div className="insight-icon">🎯</div>
                <div className="insight-content">
                  <h4>Goal Progress</h4>
                  <p>You're 73% toward your goal of 80% eco-friendly purchases</p>
                </div>
              </div>
              
              <div className="insight-card positive">
                <div className="insight-icon">🏆</div>
                <div className="insight-content">
                  <h4>Achievement Unlocked</h4>
                  <p>Reached "Green Champion" status this month!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'projections' && (
        <div className="projections-content">
          <div className="yearly-projection">
            <h3>Annual Impact Projection</h3>
            <div className="projection-grid">
              <div className="projection-card">
                <div className="projection-icon">🌍</div>
                <div className="projection-data">
                  <span className="projection-value">{insights.yearlyProjection?.carbonOffset} kg</span>
                  <span className="projection-label">CO₂ Offset/Year</span>
                </div>
              </div>
              
              <div className="projection-card">
                <div className="projection-icon">💧</div>
                <div className="projection-data">
                  <span className="projection-value">{formatNumber(insights.yearlyProjection?.waterSaved)} L</span>
                  <span className="projection-label">Water Saved/Year</span>
                </div>
              </div>
            </div>
          </div>

          <div className="equivalents-section">
            <h3>Real-World Equivalents</h3>
            <div className="equivalents-grid">
              <div className="equivalent-item">
                <div className="equivalent-icon">🌳</div>
                <div className="equivalent-content">
                  <span className="equivalent-number">{insights.yearlyProjection?.equivalents.treesPlanted}</span>
                  <span className="equivalent-text">Trees planted equivalent</span>
                </div>
              </div>
              
              <div className="equivalent-item">
                <div className="equivalent-icon">🚗</div>
                <div className="equivalent-content">
                  <span className="equivalent-number">{formatNumber(insights.yearlyProjection?.equivalents.carMiles)}</span>
                  <span className="equivalent-text">Car miles avoided</span>
                </div>
              </div>
              
              <div className="equivalent-item">
                <div className="equivalent-icon">🏠</div>
                <div className="equivalent-content">
                  <span className="equivalent-number">{insights.yearlyProjection?.equivalents.homeEnergyDays}</span>
                  <span className="equivalent-text">Days of home energy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="future-goals">
            <h3>Future Sustainability Goals</h3>
            <div className="goals-timeline">
              <div className="goal-item completed">
                <div className="goal-marker"></div>
                <div className="goal-content">
                  <h4>Green Beginner</h4>
                  <p>25% eco-friendly purchases</p>
                  <span className="goal-status">✓ Completed</span>
                </div>
              </div>
              
              <div className="goal-item current">
                <div className="goal-marker"></div>
                <div className="goal-content">
                  <h4>Eco Enthusiast</h4>
                  <p>50% eco-friendly purchases</p>
                  <span className="goal-status">🎯 In Progress</span>
                </div>
              </div>
              
              <div className="goal-item future">
                <div className="goal-marker"></div>
                <div className="goal-content">
                  <h4>Green Champion</h4>
                  <p>75% eco-friendly purchases</p>
                  <span className="goal-status">⏳ Upcoming</span>
                </div>
              </div>
              
              <div className="goal-item future">
                <div className="goal-marker"></div>
                <div className="goal-content">
                  <h4>Sustainability Master</h4>
                  <p>90% eco-friendly purchases</p>
                  <span className="goal-status">🌟 Future Goal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'recommendations' && (
        <div className="recommendations-content">
          <h3>Personalized Eco Recommendations</h3>
          <div className="recommendations-list">
            {insights.recommendations?.map((rec, index) => (
              <div key={index} className={`recommendation-card ${rec.type}`}>
                <div className="rec-header">
                  <div className="rec-type-icon">
                    {rec.type === 'switch' && '🔄'}
                    {rec.type === 'reduce' && '📉'}
                    {rec.type === 'optimize' && '⚡'}
                  </div>
                  <div className="rec-info">
                    <h4>{rec.title}</h4>
                    <p>Expected impact: {rec.impact}</p>
                  </div>
                  <div className="rec-impact">
                    <span className="impact-badge">{rec.carbonSavings}</span>
                  </div>
                </div>
                
                <div className="rec-actions">
                  <button className="action-btn primary">Apply Suggestion</button>
                  <button className="action-btn secondary">Learn More</button>
                </div>
              </div>
            ))}
          </div>

          <div className="eco-challenges">
            <h3>Weekly Eco Challenges</h3>
            <div className="challenges-grid">
              <div className="challenge-card">
                <div className="challenge-icon">🛒</div>
                <div className="challenge-content">
                  <h4>Zero Plastic Week</h4>
                  <p>Avoid all plastic packaged items for one week</p>
                  <div className="challenge-reward">+50 Green Points</div>
                </div>
                <button className="challenge-btn">Accept</button>
              </div>
              
              <div className="challenge-card">
                <div className="challenge-icon">🌱</div>
                <div className="challenge-content">
                  <h4>Organic Only</h4>
                  <p>Buy only organic produce this week</p>
                  <div className="challenge-reward">+30 Green Points</div>
                </div>
                <button className="challenge-btn">Accept</button>
              </div>
              
              <div className="challenge-card">
                <div className="challenge-icon">♻️</div>
                <div className="challenge-content">
                  <h4>Bulk Buyer</h4>
                  <p>Purchase 5 items in bulk to reduce packaging</p>
                  <div className="challenge-reward">+40 Green Points</div>
                </div>
                <button className="challenge-btn">Accept</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .eco-insights {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .insights-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          padding: 32px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header-content {
          flex: 1;
        }

        .header-icon {
          font-size: 48px;
          margin-bottom: 16px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .insights-header h2 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .insights-header p {
          margin: 0;
          color: #64748b;
          font-size: 16px;
          font-weight: 500;
        }

        .timeframe-selector {
          display: flex;
          gap: 4px;
          background: rgba(255, 255, 255, 0.7);
          padding: 4px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .timeframe-btn {
          background: none;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .timeframe-btn.active {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .insights-navigation {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          background: rgba(255, 255, 255, 0.7);
          padding: 8px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .nav-btn {
          background: none;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          transition: all 0.3s ease;
          flex: 1;
          text-align: center;
        }

        .nav-btn.active {
          background: linear-gradient(135deg, #059669, #16a34a);
          color: white;
          box-shadow: 0 6px 16px rgba(5, 150, 105, 0.3);
        }

        .nav-btn:hover:not(.active) {
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
        }

        .overview-content {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-metrics {
          margin-bottom: 32px;
        }

        .metric-card.primary {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 20px;
          padding: 40px;
          display: flex;
          align-items: center;
          gap: 40px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .metric-visual {
          flex-shrink: 0;
        }

        .circular-chart {
          position: relative;
          width: 160px;
          height: 160px;
        }

        .circular-chart svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .chart-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .chart-center .score {
          display: block;
          font-size: 32px;
          font-weight: 800;
          color: #1e293b;
          line-height: 1;
        }

        .chart-center .label {
          display: block;
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
          margin-top: 4px;
        }

        .metric-info {
          flex: 1;
        }

        .metric-info h3 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .metric-info p {
          margin: 0 0 16px 0;
          color: #64748b;
          font-size: 16px;
          line-height: 1.5;
        }

        .score-breakdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .breakdown-label {
          color: #64748b;
          font-weight: 500;
        }

        .breakdown-value {
          color: #059669;
          font-weight: 700;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .impact-card {
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

        .impact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .impact-icon {
          font-size: 32px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
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
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
          margin: 4px 0 8px 0;
        }

        .impact-comparison {
          font-size: 12px;
          color: #6b7280;
          font-style: italic;
        }

        .category-breakdown {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .category-breakdown h3 {
          margin: 0 0 20px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 700;
        }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .category-info {
          min-width: 150px;
          display: flex;
          justify-content: space-between;
        }

        .category-name {
          font-weight: 600;
          color: #1e293b;
        }

        .category-percentage {
          font-weight: 700;
          color: #059669;
        }

        .category-bar {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .category-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }

        .impact-badge {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          min-width: 80px;
          text-align: center;
        }

        .impact-badge.high {
          background: #dcfce7;
          color: #059669;
        }

        .impact-badge.medium {
          background: #fef3c7;
          color: #92400e;
        }

        .trends-content {
          animation: fadeIn 0.5s ease-in-out;
        }

        .trend-chart-container {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .trend-chart-container h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 700;
        }

        .chart-wrapper {
          padding: 20px;
        }

        .trend-chart {
          display: flex;
          align-items: end;
          gap: 16px;
          height: 200px;
        }

        .trend-bar {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .bar-fill {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 4px 4px 0 0;
          transition: height 1s ease-in-out;
          min-height: 10px;
        }

        .bar-label {
          margin-top: 8px;
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
        }

        .bar-value {
          position: absolute;
          top: -25px;
          font-size: 11px;
          color: #1e293b;
          font-weight: 700;
        }

        .trend-insights h3 {
          margin: 0 0 20px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 700;
        }

        .insight-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .insight-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 12px;
          padding: 20px;
          display: flex;
          gap: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .insight-card.positive {
          border-left: 4px solid #059669;
        }

        .insight-card.neutral {
          border-left: 4px solid #3b82f6;
        }

        .insight-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border-radius: 10px;
          flex-shrink: 0;
        }

        .insight-content h4 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 16px;
          font-weight: 700;
        }

        .insight-content p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
        }

        .projections-content {
          animation: fadeIn 0.5s ease-in-out;
        }

        .yearly-projection {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .yearly-projection h3 {
          margin: 0 0 20px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 700;
        }

        .projection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .projection-card {
          background: rgba(248, 250, 252, 0.8);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .projection-icon {
          font-size: 28px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          border-radius: 10px;
          flex-shrink: 0;
        }

        .projection-data {
          flex: 1;
        }

        .projection-value {
          display: block;
          font-size: 20px;
          font-weight: 800;
          color: #059669;
          line-height: 1;
        }

        .projection-label {
          display: block;
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
          margin-top: 4px;
        }

        .equivalents-section {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .equivalents-section h3 {
          margin: 0 0 20px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 700;
        }

        .equivalents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .equivalent-item {
          text-align: center;
          padding: 20px;
          background: rgba(248, 250, 252, 0.8);
          border-radius: 12px;
        }

        .equivalent-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .equivalent-number {
          display: block;
          font-size: 24px;
          font-weight: 800;
          color: #059669;
          line-height: 1;
        }

        .equivalent-text {
          display: block;
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
          margin-top: 4px;
        }

        .future-goals {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .future-goals h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 700;
        }

        .goals-timeline {
          position: relative;
          padding-left: 40px;
        }

        .goals-timeline::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e2e8f0;
        }

        .goal-item {
          position: relative;
          margin-bottom: 24px;
          padding-left: 24px;
        }

        .goal-marker {
          position: absolute;
          left: -25px;
          top: 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e2e8f0;
          border: 2px solid white;
        }

        .goal-item.completed .goal-marker {
          background: #059669;
        }

        .goal-item.current .goal-marker {
          background: #3b82f6;
          animation: pulse 2s infinite;
        }

        .goal-content h4 {
          margin: 0 0 4px 0;
          color: #1e293b;
          font-size: 16px;
          font-weight: 700;
        }

        .goal-content p {
          margin: 0 0 8px 0;
          color: #64748b;
          font-size: 14px;
        }

        .goal-status {
          font-size: 12px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .recommendations-content {
          animation: fadeIn 0.5s ease-in-out;
        }

        .recommendations-content h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }

        .recommendation-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .rec-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .rec-type-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border-radius: 10px;
          flex-shrink: 0;
        }

        .rec-info {
          flex: 1;
        }

        .rec-info h4 {
          margin: 0 0 4px 0;
          color: #1e293b;
          font-size: 16px;
          font-weight: 700;
        }

        .rec-info p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .rec-impact {
          text-align: right;
        }

        .impact-badge {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #059669;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .rec-actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          border: none;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #059669, #16a34a);
          color: white;
          flex: 1;
        }

        .action-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }

        .action-btn.secondary {
          background: transparent;
          color: #059669;
          border: 1px solid #059669;
        }

        .action-btn.secondary:hover {
          background: #059669;
          color: white;
        }

        .eco-challenges h3 {
          margin: 0 0 20px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 700;
        }

        .challenges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .challenge-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .challenge-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .challenge-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .challenge-content h4 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 16px;
          font-weight: 700;
        }

        .challenge-content p {
          margin: 0 0 12px 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
        }

        .challenge-reward {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #92400e;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 16px;
        }

        .challenge-btn {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .challenge-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        @media (max-width: 768px) {
          .eco-insights {
            padding: 20px;
          }

          .insights-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .insights-navigation {
            flex-direction: column;
          }

          .metric-card.primary {
            flex-direction: column;
            text-align: center;
          }

          .impact-grid {
            grid-template-columns: 1fr;
          }

          .trend-chart {
            height: 150px;
          }

          .projection-grid, .equivalents-grid, .challenges-grid {
            grid-template-columns: 1fr;
          }

          .rec-header {
            flex-direction: column;
            text-align: center;
          }

          .rec-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default EcoInsights;
