
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider.js';

const AIRecommendations = () => {
  const [{ basket }] = useStateValue();
  const [recommendations, setRecommendations] = useState([]);
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI analysis delay
    setLoading(true);
    setTimeout(() => {
      generateRecommendations();
      setLoading(false);
    }, 1500);
  }, [basket]);

  const generateRecommendations = () => {
    // Simulate AI-generated recommendations based on basket analysis
    const mockRecommendations = [
      {
        id: 1,
        type: 'alternative',
        title: 'Eco-Friendly Alternative',
        description: 'Switch to bamboo paper towels instead of regular ones',
        impact: 'Reduces CO₂ by 2.5kg annually',
        confidence: 95,
        category: 'household',
        icon: '🌿',
        action: 'Replace in cart'
      },
      {
        id: 2,
        type: 'addition',
        title: 'Complete Your Eco Kit',
        description: 'Add reusable shopping bags to maximize sustainability',
        impact: 'Eliminates 500+ plastic bags per year',
        confidence: 87,
        category: 'lifestyle',
        icon: '♻️',
        action: 'Add to cart'
      },
      {
        id: 3,
        type: 'optimization',
        title: 'Bulk Purchase Opportunity',
        description: 'Buy organic products in bulk to reduce packaging waste',
        impact: 'Saves 40% packaging materials',
        confidence: 92,
        category: 'efficiency',
        icon: '📦',
        action: 'View bulk options'
      },
      {
        id: 4,
        type: 'certification',
        title: 'Upgrade to Certified Organic',
        description: 'Choose USDA Organic version for better sustainability',
        impact: 'Supports regenerative farming practices',
        confidence: 78,
        category: 'quality',
        icon: '🌱',
        action: 'Upgrade product'
      }
    ];

    setRecommendations(mockRecommendations);

    // Generate insights
    const ecoItems = basket.filter(item => item.badge_id > 0);
    setInsights({
      totalItems: basket.length,
      ecoItems: ecoItems.length,
      ecoPercentage: basket.length > 0 ? Math.round((ecoItems.length / basket.length) * 100) : 0,
      potentialSavings: {
        carbon: '15.2 kg CO₂',
        water: '340 liters',
        waste: '2.1 kg'
      },
      sustainabilityTrend: 'improving',
      nextGoal: 'Reach 70% eco-friendly products'
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return '#059669';
    if (confidence >= 80) return '#16a34a';
    if (confidence >= 70) return '#65a30d';
    return '#ca8a04';
  };

  const getTypeColor = (type) => {
    const colors = {
      alternative: '#3b82f6',
      addition: '#059669',
      optimization: '#8b5cf6',
      certification: '#f59e0b'
    };
    return colors[type] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="ai-recommendations loading">
        <div className="loading-content">
          <div className="ai-brain">🧠</div>
          <h3>AI is analyzing your cart...</h3>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Generating personalized sustainability recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-recommendations">
      <div className="recommendations-header">
        <div className="header-content">
          <div className="ai-icon">🤖</div>
          <h2>AI Sustainability Assistant</h2>
          <p>Personalized recommendations to maximize your environmental impact</p>
        </div>
        <div className="confidence-indicator">
          <span className="confidence-label">AI Confidence</span>
          <div className="confidence-meter">
            <div className="confidence-fill" style={{ width: '89%' }}></div>
          </div>
          <span className="confidence-value">89%</span>
        </div>
      </div>

      <div className="insights-summary">
        <h3>📊 Cart Analysis</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">🛒</div>
            <div className="insight-content">
              <span className="insight-value">{insights.ecoPercentage}%</span>
              <span className="insight-label">Eco-friendly items</span>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🌍</div>
            <div className="insight-content">
              <span className="insight-value">{insights.potentialSavings?.carbon}</span>
              <span className="insight-label">Potential CO₂ savings</span>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">💧</div>
            <div className="insight-content">
              <span className="insight-value">{insights.potentialSavings?.water}</span>
              <span className="insight-label">Water conservation</span>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <span className="insight-value">{insights.nextGoal}</span>
              <span className="insight-label">Next milestone</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recommendations-section">
        <h3>💡 Smart Recommendations</h3>
        <div className="recommendations-list">
          {recommendations.map(rec => (
            <div key={rec.id} className="recommendation-card">
              <div className="rec-header">
                <div className="rec-icon">{rec.icon}</div>
                <div className="rec-info">
                  <h4>{rec.title}</h4>
                  <p>{rec.description}</p>
                </div>
                <div className="rec-confidence">
                  <div 
                    className="confidence-badge"
                    style={{ backgroundColor: getConfidenceColor(rec.confidence) }}
                  >
                    {rec.confidence}%
                  </div>
                </div>
              </div>
              
              <div className="rec-details">
                <div className="impact-info">
                  <span className="impact-icon">🌱</span>
                  <span className="impact-text">{rec.impact}</span>
                </div>
                <div 
                  className="category-tag"
                  style={{ backgroundColor: getTypeColor(rec.type) }}
                >
                  {rec.category}
                </div>
              </div>
              
              <div className="rec-actions">
                <button className="action-button primary">
                  {rec.action}
                </button>
                <button className="action-button secondary">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ai-learning-section">
        <h3>🧠 AI Learning Progress</h3>
        <div className="learning-stats">
          <div className="learning-item">
            <span className="learning-icon">📈</span>
            <div className="learning-info">
              <h4>Accuracy Improving</h4>
              <p>Our AI learns from your preferences to provide better recommendations</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '73%' }}></div>
              </div>
              <span className="progress-text">73% personalization complete</span>
            </div>
          </div>
          
          <div className="learning-item">
            <span className="learning-icon">🎯</span>
            <div className="learning-info">
              <h4>Sustainability Goals</h4>
              <p>Based on your shopping patterns, we predict you'll reach carbon neutrality in 8 months</p>
              <div className="goals-timeline">
                <div className="timeline-point active">✓ 25% eco products</div>
                <div className="timeline-point active">✓ 50% eco products</div>
                <div className="timeline-point current">📍 65% eco products</div>
                <div className="timeline-point">🎯 Carbon neutral</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ai-recommendations {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f0f9ff 100%);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .ai-recommendations.loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .loading-content {
          text-align: center;
        }

        .ai-brain {
          font-size: 64px;
          margin-bottom: 24px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .loading-content h3 {
          margin: 0 0 16px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .loading-dots span {
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          animation: loading-bounce 1.5s infinite;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes loading-bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .loading-content p {
          color: #64748b;
          font-size: 16px;
        }

        .recommendations-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          padding: 32px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header-content {
          flex: 1;
        }

        .ai-icon {
          font-size: 48px;
          margin-bottom: 16px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .recommendations-header h2 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .recommendations-header p {
          margin: 0;
          color: #64748b;
          font-size: 16px;
          font-weight: 500;
        }

        .confidence-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          padding: 20px 24px;
          border-radius: 16px;
          color: white;
          min-width: 150px;
        }

        .confidence-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.9;
        }

        .confidence-meter {
          width: 100px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          background: white;
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }

        .confidence-value {
          font-size: 20px;
          font-weight: 800;
        }

        .insights-summary {
          margin-bottom: 40px;
        }

        .insights-summary h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .insight-card {
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

        .insight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .insight-icon {
          font-size: 28px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .insight-content {
          flex: 1;
        }

        .insight-value {
          display: block;
          font-size: 20px;
          font-weight: 800;
          color: #1e293b;
          line-height: 1;
        }

        .insight-label {
          display: block;
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          margin-top: 4px;
        }

        .recommendations-section {
          margin-bottom: 40px;
        }

        .recommendations-section h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .recommendation-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .recommendation-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .rec-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }

        .rec-icon {
          font-size: 32px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .rec-info {
          flex: 1;
        }

        .rec-info h4 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 18px;
          font-weight: 700;
        }

        .rec-info p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
        }

        .rec-confidence {
          flex-shrink: 0;
        }

        .confidence-badge {
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
        }

        .rec-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 12px 16px;
          background: rgba(248, 250, 252, 0.8);
          border-radius: 10px;
        }

        .impact-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .impact-icon {
          font-size: 16px;
        }

        .impact-text {
          font-size: 13px;
          color: #059669;
          font-weight: 600;
        }

        .category-tag {
          color: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .rec-actions {
          display: flex;
          gap: 12px;
        }

        .action-button {
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          border: none;
        }

        .action-button.primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          flex: 1;
        }

        .action-button.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .action-button.secondary {
          background: transparent;
          color: #3b82f6;
          border: 1px solid #3b82f6;
        }

        .action-button.secondary:hover {
          background: #3b82f6;
          color: white;
        }

        .ai-learning-section h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .learning-stats {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .learning-item {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          display: flex;
          gap: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .learning-icon {
          font-size: 32px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .learning-info {
          flex: 1;
        }

        .learning-info h4 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 18px;
          font-weight: 700;
        }

        .learning-info p {
          margin: 0 0 16px 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
        }

        .progress-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }

        .progress-text {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
        }

        .goals-timeline {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .timeline-point {
          font-size: 14px;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .timeline-point.active {
          background: #dcfce7;
          color: #059669;
        }

        .timeline-point.current {
          background: #dbeafe;
          color: #1d4ed8;
          font-weight: 700;
        }

        .timeline-point:not(.active):not(.current) {
          color: #9ca3af;
        }

        @media (max-width: 768px) {
          .ai-recommendations {
            padding: 20px;
          }

          .recommendations-header {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }

          .insights-grid {
            grid-template-columns: 1fr;
          }

          .rec-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .rec-details {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .rec-actions {
            flex-direction: column;
          }

          .learning-item {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AIRecommendations;
