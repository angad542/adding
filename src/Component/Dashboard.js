import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import '../Css/Dashboard.css';

function Home() {
  const [animatedValues, setAnimatedValues] = useState({ co2: 0, greenBits: 0, offers: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Animate counters
    const animateCounter = (target, key) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 30);
    };

    animateCounter(23, 'co2');
    animateCounter(13, 'greenBits');
    animateCounter(8, 'offers');

    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const data = [
    { name: 'Jan', percentReduced: 20, target: 25 },
    { name: 'Feb', percentReduced: 35, target: 30 },
    { name: 'Mar', percentReduced: 25, target: 35 },
    { name: 'Apr', percentReduced: 45, target: 40 },
    { name: 'May', percentReduced: 50, target: 45 },
    { name: 'Jun', percentReduced: 60, target: 50 },
    { name: 'Jul', percentReduced: 80, target: 55 },
  ];

  const pieChartData = [
    { name: '1 Leaf', value: 15, count: 24 },
    { name: '2 Leaf', value: 25, count: 38 },
    { name: '3 Leaf', value: 30, count: 45 },
    { name: '4 Leaf', value: 20, count: 32 },
    { name: '5 Leaf', value: 10, count: 16 },
  ];

  const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-entry" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            <span className="title-gradient">ECO DASHBOARD</span>
          </h1>
          <div className="dashboard-time">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <p className="dashboard-subtitle">Track your environmental impact in real-time</p>
      </div>

      {/* Main Stats Cards */}
      <div className="main-stats-grid">
        {/* CO2 Reduction Card */}
        <div className="stats-card co2-card">
          <div className="card-background-circle"></div>
          <div className="card-header">
            <div className="card-text">
              <h3 className="card-title">Carbon Emission Reduced</h3>
              <p className="card-subtitle">Kilograms this month</p>
            </div>
            <div className="card-icon">
              <span className="emoji-icon">🌱</span>
            </div>
          </div>
          <div className="card-value">{animatedValues.co2}</div>
          <div className="card-trend">
            <span className="trend-positive">↗ 12%</span>
            <span className="trend-text">vs last month</span>
          </div>
        </div>

        {/* Green Bits Card */}
        <div className="stats-card greenbits-card">
          <div className="card-background-circle"></div>
          <div className="card-header">
            <div className="card-text">
              <h3 className="card-title">Green Bits</h3>
              <p className="card-subtitle">Reward points earned</p>
            </div>
            <div className="card-icon">
              <span className="emoji-icon">💎</span>
            </div>
          </div>
          <div className="card-value">{animatedValues.greenBits}</div>
          <div className="card-trend">
            <span className="trend-positive">↗ 8%</span>
            <span className="trend-text">vs last month</span>
          </div>
        </div>

        {/* Offers Card */}
        <div className="stats-card offers-card">
          <div className="card-background-circle"></div>
          <div className="card-header">
            <div className="card-text">
              <h3 className="card-title">Available Offers</h3>
              <p className="card-subtitle">Eco-friendly deals</p>
            </div>
            <div className="card-icon">
              <span className="emoji-icon">🎁</span>
            </div>
          </div>
          <div className="card-value">{animatedValues.offers}</div>
          <div className="card-trend">
            <span className="trend-new">New</span>
            <span className="trend-text">offers available</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Pie Chart */}
        <div className="chart-card">
          <h3 className="chart-title">
            <span className="chart-emoji">📊</span>
            Product Badge Distribution
          </h3>
          <div className="pie-chart-container">
            <div className="pie-chart-wrapper">
              <ResponsiveContainer width={280} height={280}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    startAngle={-90}
                    endAngle={270}
                    outerRadius={100}
                    innerRadius={60}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center-text">
                <div className="pie-total">155</div>
                <div className="pie-label">Total Products</div>
              </div>
            </div>
            <div className="pie-legend">
              {pieChartData.map((entry, index) => (
                <div key={index} className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="legend-text">
                    <div className="legend-name">{entry.name}</div>
                    <div className="legend-count">{entry.count} products</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="chart-card">
          <h3 className="chart-title">
            <span className="chart-emoji">📈</span>
            Plastic Reduction Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReduced" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="percentReduced"
                name="Actual Reduction %"
                stroke="#4ade80"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorReduced)"
              />
              <Area
                type="monotone"
                dataKey="target"
                name="Target %"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#colorTarget)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="additional-stats">
        <div className="mini-card achievement-card">
          <div className="mini-value">89%</div>
          <div className="mini-label">Goal Achievement</div>
        </div>
        <div className="mini-card trees-card">
          <div className="mini-value">156</div>
          <div className="mini-label">Trees Equivalent</div>
        </div>
        <div className="mini-card rank-card">
          <div className="mini-value">4.2k</div>
          <div className="mini-label">Community Rank</div>
        </div>
        <div className="mini-card score-card">
          <div className="mini-value">92%</div>
          <div className="mini-label">Eco Score</div>
        </div>
      </div>
    </div>
  );
}

export default Home;