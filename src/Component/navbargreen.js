import React from 'react';
import '../Css/navbargreen.css';
import { Link } from 'react-router-dom';
//import Popover from './Popover';

const AmazonNavigationBarg = () => {
  return (
    <div className="amazon-nav">
      <div className="amazon-nav-section">
        <ul className="amazon-nav-list">
          <Link style={{textDecoration: 'none'}} to = "/green">
            <li><a href="#" style={{ color: '#146eb4' }}>Home</a></li>
          </Link>
          <li className="divider">|</li>
  <li><a href="#">Get it Fast</a></li>
  <li><a href="#">New Arrivals</a></li>
  <li><a href="#">Deals</a></li>
  {/* <li><a href="#">Dinner Made Easy</a></li>
  <li><a href="#">Pharmacy Delivery</a></li> */}
  <li><a href="#">Trending</a></li>
  {/* <li><a href="#">Back to School</a></li> */}
  <li><a href="#">My Items</a></li>
  <li><a href="#">Auto Service</a></li>
  <li><a href="#">Only at Walmart</a></li>
  <li><a href="#">Registry</a></li>
  <li><a href="#">Walmart+</a></li>
          <Link style={{textDecoration: 'none'}} to = "/seller">
          <li><a href="#" style={{ color: '#146eb4' }}>Seller</a></li>
          </Link>
          <Link style={{textDecoration: 'none'}} to = "/education">
          <li><a href="#" style={{ color: '#146eb4' }}>Educational Section</a></li>
          </Link>
          <Link style={{textDecoration: 'none'}} to = "/sustainability">
          <li><a href="#" style={{ color: '#146eb4' }}>Sustainability Reports</a></li>
          </Link>
          <li><a href="#">More</a></li>

          {/* <Link style={{textDecoration: 'none'}} to = "/green">
            <button className="button">Greenovation Zone</button>
          </Link> */}
          </ul>
      </div>
    </div>
  );
};

export default AmazonNavigationBarg;
