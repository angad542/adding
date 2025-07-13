
import React, { useState } from 'react';
import '../Css/SellerSection.css';
import Headergreen from './Headergreen';
import AmazonNavigationBarg from './navbargreen';

function SellerSection() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([
    { id: 1, name: 'Eco-Friendly Water Bottle', price: 25.99, stock: 50, sales: 125, sustainability: 85 },
    { id: 2, name: 'Bamboo Phone Case', price: 15.99, stock: 30, sales: 89, sustainability: 92 },
    { id: 3, name: 'Solar Power Bank', price: 45.99, stock: 20, sales: 67, sustainability: 88 }
  ]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    sustainability: '',
    description: ''
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      sales: 0,
      sustainability: parseInt(newProduct.sustainability)
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', stock: '', category: '', sustainability: '', description: '' });
  };

  const renderDashboard = () => (
    <div className="seller__dashboard">
      <div className="dashboard__stats">
        <div className="stat__card">
          <h3>Total Products</h3>
          <p className="stat__number">{products.length}</p>
          <span className="stat__change">+2 this week</span>
        </div>
        <div className="stat__card">
          <h3>Total Sales</h3>
          <p className="stat__number">${products.reduce((sum, p) => sum + (p.sales * p.price), 0).toFixed(2)}</p>
          <span className="stat__change">+15% this month</span>
        </div>
        <div className="stat__card">
          <h3>Sustainability Score</h3>
          <p className="stat__number">{Math.round(products.reduce((sum, p) => sum + p.sustainability, 0) / products.length)}%</p>
          <span className="stat__change">+5% improvement</span>
        </div>
        <div className="stat__card">
          <h3>Active Listings</h3>
          <p className="stat__number">{products.filter(p => p.stock > 0).length}</p>
          <span className="stat__change">All in stock</span>
        </div>
      </div>
      
      <div className="dashboard__charts">
        <div className="chart__container">
          <h3>Sales Trend</h3>
          <div className="chart__placeholder">
            <div className="chart__bars">
              <div className="bar" style={{height: '60%'}}></div>
              <div className="bar" style={{height: '80%'}}></div>
              <div className="bar" style={{height: '45%'}}></div>
              <div className="bar" style={{height: '90%'}}></div>
              <div className="bar" style={{height: '75%'}}></div>
            </div>
          </div>
        </div>
        
        <div className="sustainability__insights">
          <h3>Sustainability Insights</h3>
          <div className="insight__item">
            <span className="insight__icon">🌱</span>
            <div>
              <h4>Carbon Footprint Reduction</h4>
              <p>Your products have helped reduce 2.5 tons of CO2 this month</p>
            </div>
          </div>
          <div className="insight__item">
            <span className="insight__icon">♻️</span>
            <div>
              <h4>Recycled Materials</h4>
              <p>85% of your products use recycled or sustainable materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="seller__products">
      <div className="products__header">
        <h2>Your Products</h2>
        <button 
          className="btn btn--primary"
          onClick={() => setActiveTab('add-product')}
        >
          Add New Product
        </button>
      </div>
      
      <div className="products__table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Sustainability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.sales}</td>
                <td>
                  <div className="sustainability__badge">
                    <span className={`badge ${product.sustainability >= 80 ? 'badge--high' : product.sustainability >= 60 ? 'badge--medium' : 'badge--low'}`}>
                      {product.sustainability}%
                    </span>
                  </div>
                </td>
                <td>
                  <button className="btn btn--small">Edit</button>
                  <button className="btn btn--small btn--danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAddProduct = () => (
    <div className="seller__add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct} className="product__form">
        <div className="form__group">
          <label>Product Name</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            required
          />
        </div>
        
        <div className="form__row">
          <div className="form__group">
            <label>Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              required
            />
          </div>
          <div className="form__group">
            <label>Stock Quantity</label>
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="form__row">
          <div className="form__group">
            <label>Category</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Garden</option>
              <option value="beauty">Beauty & Personal Care</option>
              <option value="sports">Sports & Outdoors</option>
            </select>
          </div>
          <div className="form__group">
            <label>Sustainability Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={newProduct.sustainability}
              onChange={(e) => setNewProduct({...newProduct, sustainability: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="form__group">
          <label>Product Description</label>
          <textarea
            value={newProduct.description}
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            rows="4"
            placeholder="Describe your product's features and sustainability benefits..."
          />
        </div>
        
        <div className="form__actions">
          <button type="button" className="btn btn--secondary" onClick={() => setActiveTab('products')}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="seller">
      <Headergreen />
      <AmazonNavigationBarg />
      
      <div className="seller__container">
        <div className="seller__sidebar">
          <div className="seller__profile">
            <img src="../images/amazon_seller.png" alt="Seller" className="seller__avatar" />
            <h3>EcoVendor Store</h3>
            <p>Sustainable Seller</p>
            <div className="seller__rating">
              <span>⭐⭐⭐⭐⭐</span>
              <span>4.8 (234 reviews)</span>
            </div>
          </div>
          
          <nav className="seller__nav">
            <button 
              className={`nav__item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav__item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              📦 Products
            </button>
            <button 
              className={`nav__item ${activeTab === 'add-product' ? 'active' : ''}`}
              onClick={() => setActiveTab('add-product')}
            >
              ➕ Add Product
            </button>
            <button 
              className={`nav__item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              🛒 Orders
            </button>
            <button 
              className={`nav__item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              📈 Analytics
            </button>
            <button 
              className={`nav__item ${activeTab === 'sustainability' ? 'active' : ''}`}
              onClick={() => setActiveTab('sustainability')}
            >
              🌱 Sustainability
            </button>
          </nav>
        </div>
        
        <div className="seller__content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'add-product' && renderAddProduct()}
          {activeTab === 'orders' && (
            <div className="seller__placeholder">
              <h2>Orders Management</h2>
              <p>Order management features coming soon...</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="seller__placeholder">
              <h2>Analytics & Reports</h2>
              <p>Advanced analytics dashboard coming soon...</p>
            </div>
          )}
          {activeTab === 'sustainability' && (
            <div className="seller__placeholder">
              <h2>Sustainability Metrics</h2>
              <p>Detailed sustainability reporting coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerSection;
