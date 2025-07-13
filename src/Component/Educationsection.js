
import React, { useState, useEffect } from "react";
import "../Css/Educationsection.css";
import { Link } from "react-router-dom";

function Educationsection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  const educationVideos = [
    {
      id: 1,
      title: "Smart Box Folding Technique",
      description: "Learn the optimal way to fold and store boxes for maximum space efficiency",
      videoPath: "../images/foldbox.mp4",
      duration: "2:30",
      points: 50
    },
    {
      id: 2,
      title: "Sustainable Packaging Benefits",
      description: "Understand how smart packaging reduces environmental impact",
      videoPath: "../images/carousel_vid.mp4",
      duration: "3:15",
      points: 75
    },
    {
      id: 3,
      title: "Zero Waste Lifestyle Tips",
      description: "Practical tips for reducing waste in daily life",
      videoPath: "../images/food_delivery.mp4",
      duration: "4:00",
      points: 100
    }
  ];

  const interactiveFeatures = [
    {
      icon: "🎯",
      title: "Smart Return System",
      description: "Track your contributions to our circular economy",
      metric: "2,847 boxes returned this month",
      color: "#10b981"
    },
    {
      icon: "📊",
      title: "Environmental Impact",
      description: "See your real-time environmental contributions",
      metric: "127 kg CO2 saved",
      color: "#3b82f6"
    },
    {
      icon: "🏆",
      title: "Green Achievements",
      description: "Unlock badges for sustainable actions",
      metric: "15 badges earned",
      color: "#f59e0b"
    },
    {
      icon: "🌱",
      title: "Community Impact",
      description: "Join thousands making a difference",
      metric: "50,000+ active members",
      color: "#8b5cf6"
    }
  ];

  const quizQuestions = [
    {
      question: "What percentage of packaging waste can be reduced through smart returns?",
      options: ["50%", "65%", "80%", "95%"],
      correct: 2,
      explanation: "Smart returns can reduce packaging waste by up to 80% through reuse and recycling."
    },
    {
      question: "How many trees are saved annually through our program?",
      options: ["500K", "1M", "2M", "5M"],
      correct: 2,
      explanation: "Our smart return system saves approximately 2 million trees annually."
    },
    {
      question: "What triggers a box collection pickup?",
      options: ["Weekly schedule", "Monthly cycle", "Threshold reached", "Customer request"],
      correct: 2,
      explanation: "Collections are triggered when regional thresholds are met for optimal efficiency."
    }
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const faqItems = [
    {
      question: "How does the Smart Return System work?",
      answer: "Our AI-powered system tracks return requests by region. When a specific area reaches the threshold, we schedule optimized pickup routes. You'll receive notifications via app, SMS, or email with pickup details and real-time tracking.",
      category: "system"
    },
    {
      question: "What makes a product eco-friendly in our certification?",
      answer: "Products undergo rigorous evaluation including carbon footprint analysis, sustainable sourcing verification, recyclability assessment, packaging impact, and third-party certifications from recognized environmental organizations.",
      category: "certification"
    },
    {
      question: "How can I track my environmental impact?",
      answer: "Your personalized dashboard shows real-time metrics including CO2 savings, waste reduction, trees saved, and water conserved. You can also compare your impact with community averages and set personal goals.",
      category: "tracking"
    },
    {
      question: "What rewards do I get for participating?",
      answer: "Earn GreenPoints for every sustainable action: returning boxes, buying eco-products, completing education modules. Redeem points for discounts, exclusive products, or donate to environmental causes.",
      category: "rewards"
    },
    {
      question: "Can I provide feedback on eco-friendly claims?",
      answer: "Yes! Use our built-in feedback system to report concerns, suggest improvements, or verify claims. Our team investigates all reports and updates product information accordingly.",
      category: "feedback"
    }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setQuizScore(prev => prev + 1);
      if (quizScore + 1 === quizQuestions.length) {
        setAchievementUnlocked(true);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
  };

  const switchVideo = (index) => {
    setCurrentVideo(index);
  };

  const handleVideoProgress = (e) => {
    const video = e.target;
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrolled / maxScroll) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="education-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Walmart Greenovation Education Hub</h1>
            <p>Master sustainable practices, earn rewards, and join our community of eco-warriors making a real difference.</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">2M+</span>
                <span className="stat-label">Trees Saved</span>
              </div>
              <div className="stat">
                <span className="stat-number">80%</span>
                <span className="stat-label">Waste Reduction</span>
              </div>
              <div className="stat">
                <span className="stat-number">500K</span>
                <span className="stat-label">Active Members</span>
              </div>
            </div>
          </div>
          <div className="hero-video">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              onTimeUpdate={handleVideoProgress}
            >
              <source src={educationVideos[currentVideo].videoPath} type="video/mp4" />
            </video>
            <div className="video-overlay">
              <h3>{educationVideos[currentVideo].title}</h3>
              <p>{educationVideos[currentVideo].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="interactive-features">
        <h2>Track Your Impact</h2>
        <div className="features-grid">
          {interactiveFeatures.map((feature, index) => (
            <div key={index} className="feature-card" style={{ borderColor: feature.color }}>
              <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-metric" style={{ color: feature.color }}>
                {feature.metric}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Learning Section */}
      <section className="video-learning">
        <h2>Interactive Learning Modules</h2>
        <div className="video-selector">
          {educationVideos.map((video, index) => (
            <button 
              key={video.id}
              className={`video-tab ${index === currentVideo ? 'active' : ''}`}
              onClick={() => switchVideo(index)}
            >
              {video.title}
              <span className="video-duration">{video.duration}</span>
              <span className="video-points">+{video.points} pts</span>
            </button>
          ))}
        </div>
        <div className="video-player">
          <video 
            key={currentVideo}
            width="100%" 
            height="400" 
            controls
            onTimeUpdate={handleVideoProgress}
          >
            <source src={educationVideos[currentVideo].videoPath} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Interactive Quiz */}
      <section className="quiz-section">
        <h2>Test Your Knowledge</h2>
        <div className="quiz-container">
          <div className="quiz-progress">
            <span>Question {currentQuiz + 1} of {quizQuestions.length}</span>
            <div className="quiz-score">Score: {quizScore}/{quizQuestions.length}</div>
          </div>
          
          <div className="quiz-question">
            <h3>{quizQuestions[currentQuiz].question}</h3>
            <div className="quiz-options">
              {quizQuestions[currentQuiz].options.map((option, index) => (
                <button 
                  key={index}
                  className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} ${
                    showExplanation && index === quizQuestions[currentQuiz].correct ? 'correct' : ''
                  } ${showExplanation && selectedAnswer === index && index !== quizQuestions[currentQuiz].correct ? 'incorrect' : ''}`}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={showExplanation}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showExplanation && (
              <div className="quiz-explanation">
                <p>{quizQuestions[currentQuiz].explanation}</p>
                {currentQuiz < quizQuestions.length - 1 ? (
                  <button className="next-question" onClick={nextQuestion}>
                    Next Question →
                  </button>
                ) : (
                  <div className="quiz-complete">
                    <h4>Quiz Complete! 🎉</h4>
                    <p>Your Score: {quizScore}/{quizQuestions.length}</p>
                    <button className="restart-quiz" onClick={resetQuiz}>
                      Restart Quiz
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications">
        <h2>Eco-Friendly Certifications</h2>
        <div className="cert-grid">
          <img src="../images/Eco Friendly Badge Certifications.png" alt="Eco Certifications" />
          <img src="../images/edu1.png" alt="Education Certificate 1" />
          <img src="../images/edu2.png" alt="Education Certificate 2" />
        </div>
      </section>

      {/* Enhanced FAQ */}
      <section className="faq-section" id="FAQ">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-controls">
          <input 
            type="text" 
            placeholder="Search FAQs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="faq-search"
          />
          <div className="faq-categories">
            <button 
              className={activeCategory === 'all' ? 'active' : ''}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button 
              className={activeCategory === 'system' ? 'active' : ''}
              onClick={() => setActiveCategory('system')}
            >
              System
            </button>
            <button 
              className={activeCategory === 'certification' ? 'active' : ''}
              onClick={() => setActiveCategory('certification')}
            >
              Certification
            </button>
            <button 
              className={activeCategory === 'tracking' ? 'active' : ''}
              onClick={() => setActiveCategory('tracking')}
            >
              Tracking
            </button>
            <button 
              className={activeCategory === 'rewards' ? 'active' : ''}
              onClick={() => setActiveCategory('rewards')}
            >
              Rewards
            </button>
          </div>
        </div>

        <div className="faq-list">
          {filteredFAQs.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => handleItemClick(index)}>
                <span>{item.question}</span>
                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Achievement Notification */}
      {achievementUnlocked && (
        <div className="achievement-popup">
          <div className="achievement-content">
            <h3>🏆 Achievement Unlocked!</h3>
            <p>Quiz Master - Perfect Score!</p>
            <button onClick={() => setAchievementUnlocked(false)}>Awesome!</button>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join thousands of eco-warriors in creating a sustainable future</p>
        <Link to="/green" className="cta-button">
          Start Your Green Journey
        </Link>
      </section>
    </div>
  );
}

export default Educationsection;
