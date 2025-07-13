import React, { useState, useEffect } from "react";
import "../Css/Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct.js";
import { useStateValue } from '../StateProvider.js';
import { Link } from "react-router-dom";
import SustainabilityDashboard from './SustainabilityDashboard';
import { getBasketTotal } from "./reducer.js";


// Your Gemini API configuration
const GEMINI_API_KEY = "AIzaSyBzf276Tr5sgWJcp29tZSh0kEi7uFlvnOA";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

function RecommendationCard({ product, onAddToCart }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const renderStars = (rating) => {
    return Array(rating).fill().map((_, index) => (
      <span key={index}>⭐</span>
    ));
  };

  // Fallback images for different categories
  const getFallbackImage = (category) => {
    const fallbackImages = {
      clothing: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
      electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
      home: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
      kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
      accessories: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
      personal_care: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200&h=200&fit=crop",
      default: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
    };
    return fallbackImages[category] || fallbackImages.default;
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <div className="recommendation-card">
      <div className="recommendation-card__image-container">
        {!imageLoaded && (
          <div className="recommendation-card__image-placeholder">
            <div className="loading-spinner-small"></div>
          </div>
        )}
        <img 
          src={imageError ? getFallbackImage(product.category) : product.image} 
          alt={product.title} 
          className={`recommendation-card__image ${imageLoaded ? 'loaded' : 'loading'}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="recommendation-card__heart"
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <div className="recommendation-card__eco-badge">
          🌱 Eco
        </div>
      </div>
      
      <div className="recommendation-card__content">
        <h4 className="recommendation-card__title">{product.title}</h4>
        
        <div className="recommendation-card__eco-features">
          <small>✓ {product.eco_features}</small>
        </div>
        
        <div className="recommendation-card__rating">
          {renderStars(product.rating)}
          <span className="recommendation-card__rating-text">({product.rating}.0)</span>
        </div>
        
        <div className="recommendation-card__price-container">
          <span className="recommendation-card__price">${product.price}</span>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          className="recommendation-card__add-btn"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Enhanced image validation with keyword matching
  const validateAndFixImageUrl = (url, category, productTitle) => {
    // Enhanced image mapping based on product keywords
    const getImageByKeywords = (title) => {
      const titleLower = title.toLowerCase();
      
      // Specific product type mappings
      const productImages = {
        // Straws and drinking accessories
        straw: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
        "reusable straw": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
        "bamboo straw": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
        "steel straw": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
        "metal straw": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
        
        // Bottles and containers
        bottle: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
        "water bottle": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
        "glass bottle": "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop",
        "drink bottle": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
        
        // Bags and totes
        bag: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
        "tote bag": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
        "shopping bag": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
        "eco bag": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
        
        // Cups and mugs
        cup: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop",
        mug: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop",
        "coffee cup": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop",
        "travel mug": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop",
        
        // Containers and storage
        container: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
        "food container": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
        "storage container": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
        "lunch box": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
        
        // Clothing items
        shirt: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
        "t-shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
        dress: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
        pants: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop",
        jeans: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop",
        socks: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop",
        
        // Electronics
        charger: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop",
        "phone case": "https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop",
        "charging pad": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop",
        "wireless charger": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop",
        
        // Personal care
        soap: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200&h=200&fit=crop",
        shampoo: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200&h=200&fit=crop",
        toothbrush: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200&h=200&fit=crop",
        "body wash": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200&h=200&fit=crop",
        
        // Kitchen items
        bowl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
        plate: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
        utensil: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
        cutlery: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
        spoon: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
        fork: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
        knife: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
      };
      
      // Check for exact matches first
      for (const [keyword, imageUrl] of Object.entries(productImages)) {
        if (titleLower.includes(keyword)) {
          return imageUrl;
        }
      }
      
      return null;
    };
    
    // First, check if the existing URL is valid
    if (url && url.includes('unsplash.com') && url.includes('w=200') && url.includes('h=200')) {
      return url;
    }
    
    // Try to get image based on product title keywords
    const keywordImage = getImageByKeywords(productTitle);
    if (keywordImage) {
      return keywordImage;
    }
    
    // Fallback to category-based images (more specific now)
    const categoryImages = {
      clothing: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop", // shirt
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop", // dress
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop", // pants
        "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop"  // socks
      ],
      electronics: [
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop", // charger
        "https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop", // phone case
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop", // general electronics
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop"   // tech accessories
      ],
      home: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop", // containers
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop", // home items
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop", // bottles
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop"   // home decor
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop", // straws
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop", // bowls/plates
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop", // cups/mugs
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop"  // bottles
      ],
      accessories: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop", // bags
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop", // straws (often categorized as accessories)
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop", // bottles
        "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop"  // accessories
      ],
      personal_care: [
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200&h=200&fit=crop", // soap/shampoo
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop"   // personal care items
      ]
    };
    
    // For category fallback, use the first image (most representative)
    const categoryImageList = categoryImages[category] || categoryImages.accessories;
    return categoryImageList[0]; // Use first image instead of random
  };

  // Generate dynamic recommendations using Gemini AI
  const generateDynamicRecommendations = async (basketItems) => {
    if (basketItems.length === 0) {
      setRecommendations([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create a detailed prompt based on cart contents
      const cartAnalysis = basketItems.map(item => ({
        title: item.title,
        price: item.price,
        category: item.category || 'general',
        is_eco: item.badge_id > 0
      }));

      const prompt = `
        Analyze this shopping cart and recommend 4-6 eco-friendly products that would complement these items:

        Cart Contents:
        ${cartAnalysis.map(item => `- ${item.title} (${item.price}) - Category: ${item.category} - Eco-friendly: ${item.is_eco ? 'Yes' : 'No'}`).join('\n')}

        Please generate recommendations that:
        1. Are from similar/complementary categories
        2. Are eco-friendly alternatives or additions
        3. Would logically go well with the current cart items
        4. Are realistically priced
        5. Are different from what's already in the cart

        Return ONLY a valid JSON array with this exact structure:
        [
          {
            "id": 1001,
            "title": "Product Name",
            "price": 29.99,
            "rating": 4,
            "category": "clothing",
            "eco_features": "Brief eco-friendly description"
          }
        ]

        Make sure:
        - Each product has a unique ID starting from 1001
        - Prices are realistic for the category
        - Category should be one of: clothing, electronics, home, kitchen, accessories, personal_care
        - Eco_features should be a brief sentence about sustainability
        - Rating should be 3, 4, or 5
        - Products should be genuinely relevant to the cart contents
        - DO NOT include image URLs in the response
      `;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from the response
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }

      const recommendedProducts = JSON.parse(jsonMatch[0]);
      
      // Validate and enhance the recommendations with proper images
      const validRecommendations = recommendedProducts.map((product, index) => ({
        ...product,
        badge_id: 1, // Mark as eco-friendly
        image: validateAndFixImageUrl(product.image, product.category, product.title)
      }));

      setRecommendations(validRecommendations);
      
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setError('Failed to generate recommendations. Please try again.');
      
      // Fallback to some default recommendations
      const fallbackRecommendations = generateFallbackRecommendations(basketItems);
      setRecommendations(fallbackRecommendations);
    } finally {
      setLoading(false);
    }
  };

  // Fallback recommendations if AI fails
  const generateFallbackRecommendations = (basketItems) => {
    const categories = [...new Set(basketItems.map(item => item.category).filter(Boolean))];
    const hasClothing = categories.includes('clothing');
    const hasElectronics = categories.includes('electronics');
    const hasHome = categories.includes('home');
    
    const fallbacks = [];
    
    if (hasClothing) {
      fallbacks.push({
        id: 2001,
        title: "Organic Cotton Eco Tote Bag",
        price: 19.99,
        rating: 4,
        category: "clothing",
        eco_features: "Made from 100% organic cotton, reusable",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
        badge_id: 1
      });
    }
    
    if (hasElectronics) {
      fallbacks.push({
        id: 2002,
        title: "Bamboo Wireless Charging Pad",
        price: 34.99,
        rating: 5,
        category: "electronics",
        eco_features: "Sustainable bamboo construction, energy efficient",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop",
        badge_id: 1
      });
    }
    
    if (hasHome) {
      fallbacks.push({
        id: 2003,
        title: "Recycled Glass Water Bottle",
        price: 24.99,
        rating: 4,
        category: "home",
        eco_features: "Made from recycled glass, plastic-free",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop",
        badge_id: 1
      });
    }
    
    // Add universal eco-friendly items with verified images
    fallbacks.push({
      id: 2004,
      title: "Biodegradable Phone Case",
      price: 16.99,
      rating: 4,
      category: "accessories",
      eco_features: "100% biodegradable, compostable materials",
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop",
      badge_id: 1
    });
    
    return fallbacks.slice(0, 4);
  };

  // Generate recommendations when basket changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateDynamicRecommendations(basket);
    }, 1000); // Debounce API calls

    return () => clearTimeout(timeoutId);
  }, [basket]);

  const addToBasket = (product) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
        badge_id: product.badge_id,
        category: product.category
      }
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_BASKET"
    });
  };

  const retryRecommendations = () => {
    generateDynamicRecommendations(basket);
  };

  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="checkout__header">
          <h1 className="checkout__title">Cart ({basket.length} items)</h1>
          <div className="checkout__actions">
            <button className="checkout__clear" onClick={clearCart}>
              Clear cart
            </button>
            <button className="checkout__save">Save for later</button>
          </div>
        </div>
        
        <div className="checkout__content">
          <div className="checkout__left">
            <div className="checkout__items">
              {basket.length === 0 ? (
                <div className="checkout__empty">
                  <h2>Your cart is empty</h2>
                  <p>Browse our eco-friendly products and discover your next favorite thing.</p>
                  <Link to="/" className="checkout__shop-now">
                    Start shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="checkout__items-header">
                    <span className="checkout__delivery-info">
                      🚚 Free delivery on orders $35+ | 🌱 Carbon neutral shipping
                    </span>
                  </div>
                  {basket.map((item, index) => (
                    <CheckoutProduct
                      key={index}
                      id={item.id}
                      price={item.price}
                      rating={item.rating}
                      image={item.image}
                      title={item.title}
                      badge_id={item.badge_id}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
          
          <div className="checkout__right">
            <Subtotal />
            <div className="checkout__summary">
              <div className="checkout__promo">
                <h3>Available offers</h3>
                <div className="checkout__offer">
                  <span className="checkout__offer-icon">🎁</span>
                  <div>
                    <p><strong>GreenPlus</strong> members get free delivery + 10% off eco items</p>
                    <small>Try free for 30 days</small>
                  </div>
                </div>
                <div className="checkout__offer checkout__eco-offer">
                  <span className="checkout__offer-icon">🌱</span>
                  <div>
                    <p><strong>Carbon Neutral Shipping</strong> - We offset 100% of shipping emissions</p>
                    <small>Free with all orders</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add the Sustainability Dashboard here */}
      <SustainabilityDashboard />
        
        {/* AI-Powered Dynamic Recommendations */}
        {basket.length > 0 && (
          <div className="checkout__recommendations">
            <div className="checkout__recommendations-header">
              <h3>🤖 AI-Powered Eco-Friendly Recommendations</h3>
              <small>Based on your current cart contents</small>
            </div>
            
            {loading ? (
              <div className="checkout__loading">
                <div className="loading-spinner"></div>
                <p>🤖 AI is analyzing your cart to find perfect eco-friendly matches...</p>
              </div>
            ) : error ? (
              <div className="checkout__error">
                <p>❌ {error}</p>
                <button onClick={retryRecommendations} className="retry-btn">
                  Try Again
                </button>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="checkout__recommended-items">
                {recommendations.map((product) => (
                  <RecommendationCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToBasket}
                  />
                ))}
              </div>
            ) : (
              <div className="checkout__no-recommendations">
                <p>🔄 Add some items to your cart to see personalized recommendations!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
