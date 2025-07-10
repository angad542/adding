import React, { useState, useRef, useEffect } from "react";
import "../Css/Footer.css";

const Footer = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "incoming",
      message: "Hi there 👋\nHow can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatboxRef = useRef(null);
  const textareaRef = useRef(null);

  // !!! IMPORTANT: Replace with your actual Gemini API Key !!!
  const API_KEY = "AIzaSyBzf276Tr5sgWJcp29tZSh0kEi7uFlvnOA";

  const SUSTAINABILITY_ADVOCATE_PROMPT = `You are a highly knowledgeable and enthusiastic Sustainability Advocate for "Greenovation" products sold at Walmart. Your primary goal is to educate Walmart customers about the environmental benefits, sustainable features, and positive impact of choosing Greenovation products.

Key directives:
- **Be informative and helpful:** Provide accurate details about product sustainability, materials, certifications, and how they contribute to a greener planet.
- **Connect to Walmart's initiatives:** Briefly mention how Greenovation products align with Walmart's broader sustainability goals (e.g., Project Gigaton, waste reduction, renewable energy, responsible sourcing).
- **Encourage conscious choices:** Guide customers towards making environmentally friendly purchasing decisions.
- **Maintain a positive and encouraging tone:** Be approachable and enthusiastic about sustainability.
- **Focus on benefits:** Explain *why* a customer should choose Greenovation, highlighting benefits like reduced waste, energy savings, recycled content, etc.
- **Keep it concise where possible:** Provide enough detail without overwhelming the user.
- **Do not make up product names or specific features not directly related to general sustainability.** If a specific Greenovation product isn't known, speak in general terms about sustainable product categories.
- **Avoid being overly pushy or salesy.** Focus on education and empowerment.

When a customer asks a question, answer from this perspective, advocating for sustainable choices and highlighting Greenovation products.`;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Auto-scroll chatbox to bottom
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const generateResponse = async (message) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const messages = [
      {
        role: "user",
        parts: [{ text: SUSTAINABILITY_ADVOCATE_PROMPT }]
      },
      {
        role: "model",
        parts: [{ text: "Hello! I'm ready to help you discover greener choices at Walmart. What would you like to know about Greenovation products or sustainability?" }]
      },
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages,
      })
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error && errorData.error.message ? errorData.error.message : 'API request failed';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        throw new Error("No valid response from API");
      }
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const message = userMessage.trim();
    setUserMessage("");

    // Add user message to chat history
    setChatHistory(prev => [...prev, { type: "outgoing", message }]);

    // Add loading message
    setIsLoading(true);
    setChatHistory(prev => [...prev, { type: "incoming", message: "Thinking...", isLoading: true }]);

    try {
      const response = await generateResponse(message);
      
      // Replace loading message with actual response
      setChatHistory(prev => 
        prev.map((chat, index) => 
          index === prev.length - 1 && chat.isLoading 
            ? { type: "incoming", message: response }
            : chat
        )
      );
    } catch (error) {
      // Replace loading message with error
      setChatHistory(prev => 
        prev.map((chat, index) => 
          index === prev.length - 1 && chat.isLoading 
            ? { type: "incoming", message: `Oops! Something went wrong: ${error.message}. Please try again.`, isError: true }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (message) => {
    // Simple markdown-like formatting
    return message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  return (
    <footer className="footer">
      {/* Feedback Section */}
      <div className="footer__feedback">
        <p className="footer__feedbackText">We'd love to hear what you think!</p>
        <button className="footer__feedbackButton">Give feedback</button>
      </div>

      {/* Back to Top */}
      <div className="footer__backToTop" onClick={scrollToTop}>
        Back to top
      </div>

      {/* Footer Links */}
      <div className="footer__linkContainer">
        <div className="footer__links">
          <h3 className="footer__linksTitle">All Departments</h3>
          <p className="footer__link">Store Directory</p>
          <p className="footer__link">Careers</p>
          <p className="footer__link">Our Company</p>
          <p className="footer__link">Sell on Walmart.com</p>
          <p className="footer__link">Help</p>
        </div>
        
        <div className="footer__links">
          <h3 className="footer__linksTitle">Services</h3>
          <p className="footer__link">Product Recalls</p>
          <p className="footer__link">Accessibility</p>
          <p className="footer__link">Tax Exempt Program</p>
          <p className="footer__link">Get the Walmart App</p>
          <p className="footer__link">Safety Data Sheet</p>
        </div>
        
        <div className="footer__links">
          <h3 className="footer__linksTitle">Customer Service</h3>
          <p className="footer__link">Terms of Use</p>
          <p className="footer__link">Privacy Notice</p>
          <p className="footer__link">California Supply Chain Act</p>
          <p className="footer__link">Your Privacy Choices</p>
          <p className="footer__link">Notice at Collection</p>
        </div>
        
        <div className="footer__links">
          <h3 className="footer__linksTitle">My Account</h3>
          <p className="footer__link">AdChoices</p>
          <p className="footer__link">Consumer Health Data Privacy Notices</p>
          <p className="footer__link">Brand Shop Directory</p>
          <p className="footer__link">Pharmacy</p>
          <p className="footer__link">Walmart Business</p>
        </div>
        
        <div className="footer__links">
          <h3 className="footer__linksTitle">Tools & Apps</h3>
          <p className="footer__link">#IYWYK</p>
          <p className="footer__link">Delete Account</p>
          <p className="footer__link">Walmart+</p>
          <p className="footer__link">Store Locator</p>
          <p className="footer__link">Weekly Ad</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__copyright">
        <p>© 2025 Walmart. The trademarks Walmart and the Walmart Spark design are registered with the US Patent and Trademark Office. All Rights Reserved.</p>
      </div>

      {/* Chatbot */}
      <div className="chatbot-container">
        {/* Chatbot Toggle Button */}
        <button 
          className={`chatbot-toggler ${showChatbot ? 'active' : ''}`}
          onClick={() => setShowChatbot(!showChatbot)}
        >
          <span className="material-symbols-rounded">
            {showChatbot ? 'close' : 'mode_comment'}
          </span>
        </button>

        {/* Chatbot Interface */}
        {showChatbot && (
          <div className="chatbot">
            <header className="chatbot-header">
              <h2>Sustainability Assistant</h2>
              <span 
                className="close-btn material-symbols-outlined"
                onClick={() => setShowChatbot(false)}
              >
                close
              </span>
            </header>
            
            <ul className="chatbox" ref={chatboxRef}>
              {chatHistory.map((chat, index) => (
                <li key={index} className={`chat ${chat.type}`}>
                  {chat.type === 'incoming' && (
                    <span className="material-symbols-outlined">smart_toy</span>
                  )}
                  <p 
                    className={chat.isError ? 'error' : ''}
                    dangerouslySetInnerHTML={{ __html: formatMessage(chat.message) }}
                  />
                </li>
              ))}
            </ul>
            
            <div className="chat-input">
              <textarea
                ref={textareaRef}
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a message..."
                rows="1"
                disabled={isLoading}
              />
              <span 
                className={`material-symbols-rounded send-btn ${userMessage.trim() ? 'visible' : ''}`}
                onClick={handleSendMessage}
              >
                send
              </span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .footer {
          position: relative;
        }

        .chatbot-container {
          position: fixed;
          bottom: 30px;
          right: 35px;
          z-index: 1000;
        }

        .chatbot-toggler {
          height: 50px;
          width: 50px;
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #2d4e39;
          border: none;
          outline: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(114, 74, 232, 0.3);
        }

        .chatbot-toggler:hover {
          background: #5f3dc4;
          transform: scale(1.05);
        }

        .chatbot-toggler.active {
          transform: rotate(90deg);
        }

        .chatbot-toggler span {
          color: #fff;
          font-size: 1.5rem;
        }

        .chatbot {
          position: absolute;
          right: 0;
          bottom: 70px;
          width: 420px;
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 0 128px 0 rgba(0,0,0,0.1),
                      0 32px 64px -48px rgba(0,0,0,0.5);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .chatbot-header {
          padding: 16px 0;
          position: relative;
          text-align: center;
          color: #fff;
          background: #2d4e39;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .chatbot-header h2 {
          font-size: 1.2rem;
          margin: 0;
        }

        .close-btn {
          position: absolute;
          right: 15px;
          top: 50%;
          cursor: pointer;
          transform: translateY(-50%);
          color: #fff;
          font-size: 1.2rem;
        }

        .chatbox {
          overflow-y: auto;
          height: 400px;
          padding: 20px;
          margin: 0;
          list-style: none;
          background: #f8f9fa;
        }

        .chatbox::-webkit-scrollbar {
          width: 6px;
        }

        .chatbox::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .chatbox::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }

        .chat {
          display: flex;
          margin-bottom: 15px;
          align-items: flex-start;
        }

        .chat.outgoing {
          justify-content: flex-end;
        }

        .chat.incoming span {
          width: 32px;
          height: 32px;
          color: #fff;
          text-align: center;
          line-height: 32px;
          background: #2d4e39;
          border-radius: 50%;
          margin-right: 10px;
          flex-shrink: 0;
        }

        .chat p {
          max-width: 75%;
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0;
        }

        .chat.outgoing p {
          background: #2d4e39;
          color: #fff;
          border-bottom-right-radius: 6px;
        }

        .chat.incoming p {
          background: #fff;
          color: #333;
          border-bottom-left-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .chat p.error {
          background: #fee;
          color: #d63384;
          border: 1px solid #f8d7da;
        }

        .chat-input {
          display: flex;
          gap: 10px;
          padding: 15px 20px;
          background: #fff;
          border-top: 1px solid #e9ecef;
          align-items: flex-end;
        }

        .chat-input textarea {
          flex: 1;
          border: 1px solid #e9ecef;
          border-radius: 20px;
          padding: 10px 15px;
          font-size: 0.9rem;
          resize: none;
          outline: none;
          font-family: inherit;
          max-height: 100px;
        }

        .chat-input textarea:focus {
          border-color: #2d4e39;
          box-shadow: 0 0 0 2px rgba(114, 74, 232, 0.1);
        }

        .send-btn {
          color: #2d4e39;
          cursor: pointer;
          font-size: 1.5rem;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s ease;
          opacity: 0.5;
        }

        .send-btn.visible {
          opacity: 1;
        }

        .send-btn:hover {
          background: rgba(114, 74, 232, 0.1);
          transform: scale(1.1);
        }

        @media (max-width: 490px) {
          .chatbot-container {
            right: 20px;
            bottom: 20px;
          }
          
          .chatbot {
            width: 90vw;
            max-width: 350px;
            right: -10px;
          }
          
          .close-btn {
            display: block;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;