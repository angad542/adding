
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider.js';

const GreenRewards = () => {
  const [{ basket }] = useStateValue();
  const [userPoints, setUserPoints] = useState(0);
  const [availableRewards, setAvailableRewards] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  useEffect(() => {
    // Calculate user points based on eco-friendly purchases
    const ecoItems = basket.filter(item => item.badge_id > 0);
    const points = ecoItems.length * 25 + Math.floor(Math.random() * 500); // Simulated points
    setUserPoints(points);

    // Mock rewards data
    setAvailableRewards([
      {
        id: 1,
        title: "Free Eco Product Delivery",
        description: "Free shipping on your next eco-friendly purchase",
        points: 100,
        icon: "🚚",
        type: "shipping"
      },
      {
        id: 2,
        title: "$10 Green Store Credit",
        description: "Credit towards sustainable products only",
        points: 250,
        icon: "💳",
        type: "credit"
      },
      {
        id: 3,
        title: "Plant a Tree",
        description: "We'll plant a tree in your name",
        points: 500,
        icon: "🌳",
        type: "environmental"
      },
      {
        id: 4,
        title: "Carbon Offset Package",
        description: "Offset 50kg of CO2 emissions",
        points: 750,
        icon: "🌍",
        type: "environmental"
      },
      {
        id: 5,
        title: "Exclusive Green Product Access",
        description: "Early access to new sustainable products",
        points: 1000,
        icon: "⭐",
        type: "exclusive"
      }
    ]);

    // Mock challenges data
    setChallenges([
      {
        id: 1,
        title: "Eco Shopper",
        description: "Buy 5 eco-certified products",
        progress: Math.min(ecoItems.length, 5),
        target: 5,
        reward: 100,
        icon: "🛒",
        completed: ecoItems.length >= 5
      },
      {
        id: 2,
        title: "Zero Waste Week",
        description: "Only buy reusable/recyclable items for 7 days",
        progress: 3,
        target: 7,
        reward: 200,
        icon: "♻️",
        completed: false
      },
      {
        id: 3,
        title: "Carbon Conscious",
        description: "Keep cart under 20kg CO2 emissions",
        progress: 15,
        target: 20,
        reward: 150,
        icon: "🌱",
        completed: false
      }
    ]);
  }, [basket]);

  const handleRedeemReward = (reward) => {
    if (userPoints >= reward.points) {
      setSelectedReward(reward);
      setShowRedeemModal(true);
    }
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      setUserPoints(prev => prev - selectedReward.points);
      setShowRedeemModal(false);
      setSelectedReward(null);
      // Here you would typically send the redemption to your backend
      alert(`Successfully redeemed: ${selectedReward.title}!`);
    }
  };

  return (
    <div className="green-rewards">
      <div className="rewards-header">
        <div className="header-content">
          <div className="header-icon">🏆</div>
          <h2>Green Rewards</h2>
          <p>Earn points for sustainable choices and redeem for eco-friendly rewards</p>
        </div>
        
        <div className="points-display">
          <div className="points-icon">🍃</div>
          <div className="points-info">
            <span className="points-label">Your Green Points</span>
            <span className="points-value">{userPoints.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="rewards-content">
        <div className="section">
          <h3>🎯 Eco Challenges</h3>
          <div className="challenges-grid">
            {challenges.map(challenge => (
              <div key={challenge.id} className={`challenge-card ${challenge.completed ? 'completed' : ''}`}>
                <div className="challenge-icon">{challenge.icon}</div>
                <div className="challenge-info">
                  <h4>{challenge.title}</h4>
                  <p>{challenge.description}</p>
                  <div className="challenge-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {challenge.progress}/{challenge.target}
                    </span>
                  </div>
                  <div className="challenge-reward">
                    {challenge.completed ? (
                      <span className="completed-badge">✓ Completed</span>
                    ) : (
                      <span className="reward-points">+{challenge.reward} points</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>🎁 Available Rewards</h3>
          <div className="rewards-grid">
            {availableRewards.map(reward => (
              <div key={reward.id} className="reward-card">
                <div className="reward-icon">{reward.icon}</div>
                <div className="reward-info">
                  <h4>{reward.title}</h4>
                  <p>{reward.description}</p>
                  <div className="reward-footer">
                    <span className="reward-cost">{reward.points} points</span>
                    <button 
                      className={`redeem-button ${userPoints >= reward.points ? 'available' : 'disabled'}`}
                      onClick={() => handleRedeemReward(reward)}
                      disabled={userPoints < reward.points}
                    >
                      {userPoints >= reward.points ? 'Redeem' : 'Need More Points'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>💡 How to Earn Points</h3>
          <div className="earning-methods">
            <div className="earning-item">
              <span className="earning-icon">🛒</span>
              <div className="earning-info">
                <h4>Buy Eco Products</h4>
                <p>Earn 25 points for each eco-certified item</p>
              </div>
            </div>
            <div className="earning-item">
              <span className="earning-icon">♻️</span>
              <div className="earning-info">
                <h4>Return Packaging</h4>
                <p>Get 10 points for each box you return</p>
              </div>
            </div>
            <div className="earning-item">
              <span className="earning-icon">📝</span>
              <div className="earning-info">
                <h4>Write Reviews</h4>
                <p>Earn 15 points for sustainable product reviews</p>
              </div>
            </div>
            <div className="earning-item">
              <span className="earning-icon">👥</span>
              <div className="earning-info">
                <h4>Refer Friends</h4>
                <p>Get 100 points when a friend makes their first eco purchase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRedeemModal && selectedReward && (
        <div className="modal-overlay" onClick={() => setShowRedeemModal(false)}>
          <div className="redeem-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Redeem Reward</h3>
              <button className="close-button" onClick={() => setShowRedeemModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="reward-preview">
                <span className="reward-icon-large">{selectedReward.icon}</span>
                <h4>{selectedReward.title}</h4>
                <p>{selectedReward.description}</p>
                <div className="cost-info">
                  <span className="cost-label">Cost:</span>
                  <span className="cost-value">{selectedReward.points} points</span>
                </div>
                <div className="balance-info">
                  <span className="balance-label">Your balance after redemption:</span>
                  <span className="balance-value">{userPoints - selectedReward.points} points</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="cancel-button" onClick={() => setShowRedeemModal(false)}>
                  Cancel
                </button>
                <button className="confirm-button" onClick={confirmRedeem}>
                  Confirm Redemption
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .green-rewards {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfccb 50%, #f0f9ff 100%);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .rewards-header {
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
        }

        .rewards-header h2 {
          margin: 0 0 8px 0;
          color: #065f46;
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #059669, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .rewards-header p {
          margin: 0;
          color: #6b7280;
          font-size: 16px;
          font-weight: 500;
        }

        .points-display {
          display: flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, #059669, #16a34a);
          padding: 24px 32px;
          border-radius: 16px;
          color: white;
          box-shadow: 0 10px 25px rgba(5, 150, 105, 0.3);
        }

        .points-icon {
          font-size: 32px;
        }

        .points-label {
          display: block;
          font-size: 14px;
          opacity: 0.9;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .points-value {
          display: block;
          font-size: 28px;
          font-weight: 800;
          margin-top: 4px;
        }

        .rewards-content {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .section h3 {
          margin: 0 0 24px 0;
          color: #065f46;
          font-size: 24px;
          font-weight: 700;
        }

        .challenges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .challenge-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          display: flex;
          gap: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .challenge-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .challenge-card.completed {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          border-color: #22c55e;
        }

        .challenge-icon {
          font-size: 40px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .challenge-info {
          flex: 1;
        }

        .challenge-info h4 {
          margin: 0 0 8px 0;
          color: #065f46;
          font-size: 18px;
          font-weight: 700;
        }

        .challenge-info p {
          margin: 0 0 16px 0;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
        }

        .challenge-progress {
          margin-bottom: 12px;
        }

        .progress-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #059669, #16a34a);
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }

        .progress-text {
          font-size: 12px;
          color: #6b7280;
          font-weight: 600;
        }

        .completed-badge {
          background: #22c55e;
          color: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .reward-points {
          color: #059669;
          font-weight: 700;
          font-size: 14px;
        }

        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .reward-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .reward-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .reward-icon {
          font-size: 32px;
          margin-bottom: 16px;
          display: block;
        }

        .reward-info h4 {
          margin: 0 0 8px 0;
          color: #065f46;
          font-size: 18px;
          font-weight: 700;
        }

        .reward-info p {
          margin: 0 0 20px 0;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
        }

        .reward-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .reward-cost {
          color: #059669;
          font-weight: 700;
          font-size: 16px;
        }

        .redeem-button {
          background: linear-gradient(135deg, #059669, #16a34a);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .redeem-button:hover:not(.disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
        }

        .redeem-button.disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .earning-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .earning-item {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .earning-icon {
          font-size: 28px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-radius: 10px;
          flex-shrink: 0;
        }

        .earning-info h4 {
          margin: 0 0 4px 0;
          color: #065f46;
          font-size: 16px;
          font-weight: 700;
        }

        .earning-info p {
          margin: 0;
          color: #6b7280;
          font-size: 13px;
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

        .redeem-modal {
          background: white;
          border-radius: 20px;
          padding: 32px;
          max-width: 500px;
          width: 90%;
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

        .reward-preview {
          text-align: center;
          margin-bottom: 32px;
        }

        .reward-icon-large {
          font-size: 64px;
          display: block;
          margin-bottom: 16px;
        }

        .reward-preview h4 {
          margin: 0 0 8px 0;
          color: #065f46;
          font-size: 24px;
          font-weight: 700;
        }

        .reward-preview p {
          margin: 0 0 24px 0;
          color: #6b7280;
          line-height: 1.6;
        }

        .cost-info, .balance-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 12px 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .cost-label, .balance-label {
          color: #6b7280;
          font-weight: 500;
        }

        .cost-value {
          color: #059669;
          font-weight: 700;
        }

        .balance-value {
          color: #065f46;
          font-weight: 700;
        }

        .modal-actions {
          display: flex;
          gap: 16px;
        }

        .cancel-button, .confirm-button {
          flex: 1;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .cancel-button {
          background: #f3f4f6;
          color: #374151;
        }

        .cancel-button:hover {
          background: #e5e7eb;
        }

        .confirm-button {
          background: linear-gradient(135deg, #059669, #16a34a);
          color: white;
        }

        .confirm-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
        }

        @media (max-width: 768px) {
          .green-rewards {
            padding: 20px;
          }

          .rewards-header {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }

          .challenges-grid, .rewards-grid {
            grid-template-columns: 1fr;
          }

          .earning-methods {
            grid-template-columns: 1fr;
          }

          .redeem-modal {
            padding: 24px;
            margin: 20px;
          }

          .modal-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default GreenRewards;
