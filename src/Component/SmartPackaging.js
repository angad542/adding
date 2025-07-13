
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider.js';

const SmartPackaging = () => {
  const [{ basket }] = useStateValue();
  const [packagingAnalysis, setPackagingAnalysis] = useState({});
  const [selectedOptimization, setSelectedOptimization] = useState(null);
  const [showPackagingPreview, setShowPackagingPreview] = useState(false);

  useEffect(() => {
    analyzePackaging();
  }, [basket]);

  const analyzePackaging = () => {
    if (basket.length === 0) {
      setPackagingAnalysis({});
      return;
    }

    // Smart packaging analysis
    const totalItems = basket.length;
    const packagingOptions = [
      {
        id: 'minimal',
        name: 'Minimal Packaging',
        description: 'Use minimal biodegradable packaging with smart space optimization',
        wasteReduction: 75,
        carbonSavings: 2.4,
        cost: 0,
        icon: '📦',
        features: ['Biodegradable materials', 'Space-optimized', 'Minimal waste']
      },
      {
        id: 'reusable',
        name: 'Reusable Container',
        description: 'Premium reusable container that customers can return for credits',
        wasteReduction: 90,
        carbonSavings: 4.1,
        cost: 5,
        credit: 2,
        icon: '♻️',
        features: ['100% reusable', 'Return credit program', 'Premium protection']
      },
      {
        id: 'plantable',
        name: 'Plantable Packaging',
        description: 'Innovative packaging embedded with seeds that can be planted',
        wasteReduction: 100,
        carbonSavings: 3.8,
        cost: 3,
        icon: '🌱',
        features: ['Embedded seeds', 'Completely compostable', 'Grows into plants']
      }
    ];

    const currentPackaging = {
      standardBoxes: Math.ceil(totalItems / 3),
      wasteGenerated: totalItems * 0.3, // kg
      carbonFootprint: totalItems * 0.8, // kg CO2
      recyclingRate: 45
    };

    setPackagingAnalysis({
      current: currentPackaging,
      options: packagingOptions,
      totalItems,
      estimatedDelivery: '2-3 days'
    });
  };

  const selectPackagingOption = (option) => {
    setSelectedOptimization(option);
    setShowPackagingPreview(true);
  };

  const getImpactColor = (value, type) => {
    if (type === 'waste' || type === 'carbon') {
      if (value >= 80) return '#059669';
      if (value >= 60) return '#16a34a';
      if (value >= 40) return '#65a30d';
      return '#ca8a04';
    }
    return '#059669';
  };

  return (
    <div className="smart-packaging">
      <div className="packaging-header">
        <div className="header-content">
          <div className="header-icon">📦</div>
          <h2>Smart Packaging AI</h2>
          <p>Optimizing your order's environmental impact through intelligent packaging</p>
        </div>
        <div className="ai-status">
          <div className="status-indicator active"></div>
          <span>AI Analyzing...</span>
        </div>
      </div>

      {basket.length === 0 ? (
        <div className="empty-packaging">
          <div className="empty-icon">🛒</div>
          <h3>Add items to analyze packaging</h3>
          <p>Our AI will optimize packaging based on your cart contents</p>
        </div>
      ) : (
        <>
          <div className="current-analysis">
            <h3>📊 Current Packaging Analysis</h3>
            <div className="analysis-grid">
              <div className="analysis-card">
                <div className="analysis-icon">📦</div>
                <div className="analysis-info">
                  <span className="analysis-value">{packagingAnalysis.current?.standardBoxes}</span>
                  <span className="analysis-label">Standard boxes needed</span>
                </div>
              </div>
              <div className="analysis-card">
                <div className="analysis-icon">⚖️</div>
                <div className="analysis-info">
                  <span className="analysis-value">{packagingAnalysis.current?.wasteGenerated} kg</span>
                  <span className="analysis-label">Packaging waste</span>
                </div>
              </div>
              <div className="analysis-card">
                <div className="analysis-icon">🌍</div>
                <div className="analysis-info">
                  <span className="analysis-value">{packagingAnalysis.current?.carbonFootprint} kg</span>
                  <span className="analysis-label">Carbon footprint</span>
                </div>
              </div>
              <div className="analysis-card">
                <div className="analysis-icon">♻️</div>
                <div className="analysis-info">
                  <span className="analysis-value">{packagingAnalysis.current?.recyclingRate}%</span>
                  <span className="analysis-label">Recycling rate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="packaging-options">
            <h3>🚀 Smart Packaging Options</h3>
            <div className="options-grid">
              {packagingAnalysis.options?.map(option => (
                <div key={option.id} className="packaging-option">
                  <div className="option-header">
                    <div className="option-icon">{option.icon}</div>
                    <div className="option-info">
                      <h4>{option.name}</h4>
                      <p>{option.description}</p>
                    </div>
                    {option.cost > 0 && (
                      <div className="option-cost">
                        +${option.cost}
                        {option.credit && (
                          <span className="credit-info">
                            (${option.credit} credit on return)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="impact-metrics">
                    <div className="metric">
                      <span className="metric-label">Waste Reduction</span>
                      <div className="metric-bar">
                        <div 
                          className="metric-fill"
                          style={{ 
                            width: `${option.wasteReduction}%`,
                            backgroundColor: getImpactColor(option.wasteReduction, 'waste')
                          }}
                        ></div>
                      </div>
                      <span className="metric-value">{option.wasteReduction}%</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Carbon Savings</span>
                      <span className="metric-value">{option.carbonSavings} kg CO₂</span>
                    </div>
                  </div>

                  <div className="option-features">
                    {option.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>

                  <button 
                    className="select-option-btn"
                    onClick={() => selectPackagingOption(option)}
                  >
                    Choose This Option
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="innovative-features">
            <h3>🔬 Innovative Packaging Technology</h3>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <div className="feature-content">
                  <h4>AI-Optimized Sizing</h4>
                  <p>Machine learning algorithms calculate the perfect box size to minimize waste and shipping costs</p>
                  <div className="tech-indicator">
                    <span className="tech-badge">AI-Powered</span>
                  </div>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <div className="feature-content">
                  <h4>Smart QR Tracking</h4>
                  <p>QR codes on packages provide real-time tracking and easy return instructions</p>
                  <div className="tech-indicator">
                    <span className="tech-badge">IoT Enabled</span>
                  </div>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🌡️</div>
                <div className="feature-content">
                  <h4>Temperature-Responsive</h4>
                  <p>Packaging materials adapt to temperature changes to protect contents and reduce damage</p>
                  <div className="tech-indicator">
                    <span className="tech-badge">Smart Materials</span>
                  </div>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <div className="feature-content">
                  <h4>Circular Return System</h4>
                  <p>Automated pickup scheduling for package returns with blockchain-verified credits</p>
                  <div className="tech-indicator">
                    <span className="tech-badge">Blockchain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="packaging-impact">
            <h3>🌍 Environmental Impact Projection</h3>
            <div className="impact-comparison">
              <div className="impact-before">
                <h4>Standard Packaging</h4>
                <div className="impact-stats">
                  <div className="stat">
                    <span className="stat-icon">🗑️</span>
                    <span className="stat-value">{(packagingAnalysis.totalItems * 0.3).toFixed(1)} kg waste</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">🌍</span>
                    <span className="stat-value">{(packagingAnalysis.totalItems * 0.8).toFixed(1)} kg CO₂</span>
                  </div>
                </div>
              </div>
              
              <div className="impact-arrow">→</div>
              
              <div className="impact-after">
                <h4>Smart Packaging</h4>
                <div className="impact-stats">
                  <div className="stat improved">
                    <span className="stat-icon">✅</span>
                    <span className="stat-value">75% less waste</span>
                  </div>
                  <div className="stat improved">
                    <span className="stat-icon">🌱</span>
                    <span className="stat-value">60% carbon reduction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showPackagingPreview && selectedOptimization && (
        <div className="modal-overlay" onClick={() => setShowPackagingPreview(false)}>
          <div className="packaging-preview-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📦 Packaging Preview</h3>
              <button className="close-button" onClick={() => setShowPackagingPreview(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="preview-visualization">
                <div className="package-3d">
                  <div className="package-front">{selectedOptimization.icon}</div>
                  <div className="package-side"></div>
                  <div className="package-top"></div>
                </div>
                <div className="preview-details">
                  <h4>{selectedOptimization.name}</h4>
                  <p>{selectedOptimization.description}</p>
                  <div className="preview-benefits">
                    <div className="benefit">
                      <span className="benefit-icon">🌱</span>
                      <span>{selectedOptimization.wasteReduction}% waste reduction</span>
                    </div>
                    <div className="benefit">
                      <span className="benefit-icon">🌍</span>
                      <span>{selectedOptimization.carbonSavings} kg CO₂ saved</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowPackagingPreview(false)}>
                  Back to Options
                </button>
                <button className="confirm-btn">
                  Apply Smart Packaging
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .smart-packaging {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .packaging-header {
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

        .header-icon {
          font-size: 48px;
          margin-bottom: 16px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .packaging-header h2 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .packaging-header p {
          margin: 0;
          color: #64748b;
          font-size: 16px;
          font-weight: 500;
        }

        .ai-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #10b981, #059669);
          padding: 12px 20px;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
        }

        .status-indicator.active {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .empty-packaging {
          text-align: center;
          padding: 80px 40px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 24px;
        }

        .empty-packaging h3 {
          margin: 0 0 16px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .empty-packaging p {
          margin: 0;
          color: #64748b;
          font-size: 16px;
        }

        .current-analysis {
          margin-bottom: 40px;
        }

        .current-analysis h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .analysis-card {
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

        .analysis-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .analysis-icon {
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

        .analysis-info {
          flex: 1;
        }

        .analysis-value {
          display: block;
          font-size: 20px;
          font-weight: 800;
          color: #1e293b;
          line-height: 1;
        }

        .analysis-label {
          display: block;
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          margin-top: 4px;
        }

        .packaging-options {
          margin-bottom: 40px;
        }

        .packaging-options h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .packaging-option {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .packaging-option:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .option-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .option-icon {
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

        .option-info {
          flex: 1;
        }

        .option-info h4 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 18px;
          font-weight: 700;
        }

        .option-info p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
        }

        .option-cost {
          text-align: right;
          color: #059669;
          font-weight: 700;
          font-size: 16px;
        }

        .credit-info {
          display: block;
          font-size: 12px;
          color: #10b981;
          font-weight: 500;
        }

        .impact-metrics {
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(248, 250, 252, 0.8);
          border-radius: 10px;
        }

        .metric {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .metric:last-child {
          margin-bottom: 0;
        }

        .metric-label {
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
          min-width: 100px;
        }

        .metric-bar {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .metric-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }

        .metric-value {
          font-size: 13px;
          color: #1e293b;
          font-weight: 700;
          min-width: 80px;
          text-align: right;
        }

        .option-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .feature-tag {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #059669;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .select-option-btn {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .select-option-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }

        .innovative-features {
          margin-bottom: 40px;
        }

        .innovative-features h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .feature-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .feature-content h4 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 16px;
          font-weight: 700;
        }

        .feature-content p {
          margin: 0 0 16px 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
        }

        .tech-indicator {
          display: flex;
          justify-content: flex-end;
        }

        .tech-badge {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .packaging-impact h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .impact-comparison {
          display: flex;
          align-items: center;
          gap: 32px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          padding: 32px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .impact-before, .impact-after {
          flex: 1;
          text-align: center;
        }

        .impact-before h4, .impact-after h4 {
          margin: 0 0 20px 0;
          color: #1e293b;
          font-size: 18px;
          font-weight: 700;
        }

        .impact-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stat {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: rgba(248, 250, 252, 0.8);
          border-radius: 8px;
        }

        .stat.improved {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #059669;
        }

        .stat-icon {
          font-size: 16px;
        }

        .stat-value {
          font-weight: 600;
          font-size: 14px;
        }

        .impact-arrow {
          font-size: 24px;
          color: #059669;
          font-weight: bold;
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

        .packaging-preview-modal {
          background: white;
          border-radius: 20px;
          padding: 32px;
          max-width: 600px;
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
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #64748b;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: #f1f5f9;
          color: #374151;
        }

        .preview-visualization {
          display: flex;
          gap: 32px;
          margin-bottom: 32px;
          align-items: center;
        }

        .package-3d {
          position: relative;
          width: 150px;
          height: 150px;
          transform-style: preserve-3d;
          animation: rotate 6s infinite linear;
        }

        @keyframes rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        .package-front, .package-side, .package-top {
          position: absolute;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          border: 2px solid #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
        }

        .package-front {
          width: 150px;
          height: 150px;
          transform: translateZ(75px);
        }

        .package-side {
          width: 150px;
          height: 150px;
          transform: rotateY(90deg) translateZ(75px);
        }

        .package-top {
          width: 150px;
          height: 150px;
          transform: rotateX(90deg) translateZ(75px);
        }

        .preview-details {
          flex: 1;
        }

        .preview-details h4 {
          margin: 0 0 12px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 700;
        }

        .preview-details p {
          margin: 0 0 20px 0;
          color: #64748b;
          line-height: 1.6;
        }

        .preview-benefits {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .benefit {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          padding: 8px 12px;
          border-radius: 8px;
          color: #059669;
          font-weight: 600;
          font-size: 14px;
        }

        .benefit-icon {
          font-size: 16px;
        }

        .modal-actions {
          display: flex;
          gap: 16px;
        }

        .cancel-btn, .confirm-btn {
          flex: 1;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .cancel-btn {
          background: #f1f5f9;
          color: #374151;
        }

        .cancel-btn:hover {
          background: #e2e8f0;
        }

        .confirm-btn {
          background: linear-gradient(135deg, #059669, #16a34a);
          color: white;
        }

        .confirm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
        }

        @media (max-width: 768px) {
          .smart-packaging {
            padding: 20px;
          }

          .packaging-header {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }

          .analysis-grid, .options-grid, .features-grid {
            grid-template-columns: 1fr;
          }

          .impact-comparison {
            flex-direction: column;
            gap: 20px;
          }

          .impact-arrow {
            transform: rotate(90deg);
          }

          .preview-visualization {
            flex-direction: column;
            text-align: center;
          }

          .modal-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default SmartPackaging;
