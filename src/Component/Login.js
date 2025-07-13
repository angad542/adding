
import React, { useState } from 'react';
import '../Css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (activeTab === 'register') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'Please agree to terms and conditions';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === 'login') {
        // Simulate successful login
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: 'John Doe'
        }));
        navigate('/');
      } else {
        // Registration successful
        setActiveTab('login');
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        alert('Registration successful! Please login.');
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter your email first' });
      return;
    }
    alert(`Password reset instructions sent to ${formData.email}`);
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <div className="login__branding">
            <img src="../images/greenWalmart.png" alt="Walmart" className="login__logo" />
            <h1>Welcome to Walmart</h1>
            <p>Save money. Live better. Shop sustainably.</p>
          </div>
          
          <div className="login__features">
            <div className="feature__item">
              <span className="feature__icon">🛒</span>
              <div>
                <h3>Easy Shopping</h3>
                <p>Browse millions of products with fast delivery</p>
              </div>
            </div>
            <div className="feature__item">
              <span className="feature__icon">🌱</span>
              <div>
                <h3>Sustainable Choices</h3>
                <p>Discover eco-friendly products in our Greenovation Zone</p>
              </div>
            </div>
            <div className="feature__item">
              <span className="feature__icon">💰</span>
              <div>
                <h3>Great Deals</h3>
                <p>Everyday low prices and exclusive member benefits</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="login__right">
          <div className="login__form-container">
            <div className="login__tabs">
              <button 
                className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button 
                className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                Create Account
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="login__form">
              {activeTab === 'register' && (
                <>
                  <div className="form__row">
                    <div className="form__group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && <span className="error__message">{errors.firstName}</span>}
                    </div>
                    <div className="form__group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && <span className="error__message">{errors.lastName}</span>}
                    </div>
                  </div>
                </>
              )}
              
              <div className="form__group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error__message">{errors.email}</span>}
              </div>
              
              <div className="form__group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Enter your password"
                />
                {errors.password && <span className="error__message">{errors.password}</span>}
              </div>
              
              {activeTab === 'register' && (
                <>
                  <div className="form__group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? 'error' : ''}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <span className="error__message">{errors.confirmPassword}</span>}
                  </div>
                  
                  <div className="form__group">
                    <label>Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="form__checkbox">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className={errors.agreeToTerms ? 'error' : ''}
                    />
                    <label>
                      I agree to Walmart's <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
                    </label>
                    {errors.agreeToTerms && <span className="error__message">{errors.agreeToTerms}</span>}
                  </div>
                </>
              )}
              
              <button 
                type="submit" 
                className="login__submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading__spinner">Loading...</span>
                ) : (
                  activeTab === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
              
              {activeTab === 'login' && (
                <div className="login__forgot">
                  <button 
                    type="button" 
                    className="forgot__password"
                    onClick={handleForgotPassword}
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>
            
            <div className="login__divider">
              <span>or</span>
            </div>
            
            <div className="social__login">
              <button className="social__btn social__btn--google">
                <span>Continue with Google</span>
              </button>
              <button className="social__btn social__btn--facebook">
                <span>Continue with Facebook</span>
              </button>
            </div>
            
            <div className="login__footer">
              <p>
                {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button 
                  className="toggle__tab"
                  onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                >
                  {activeTab === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
