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
            <li><button className="nav-button-blue">Home</button></li>
          </Link>
          <li className="divider">|</li>
  <li><button className="nav-button-blue">Get it Fast</button></li>
  <li><button className="nav-button-blue">New Arrivals</button></li>
  <li><button className="nav-button-blue">Deals</button></li>
  {/* <li><a href="#">Dinner Made Easy</a></li>
  <li><a href="#">Pharmacy Delivery</a></li> */}
  <li><button className="nav-button-blue">Trending</button></li>
  {/* <li><a href="#">Back to School</a></li> */}
  <li><button className="nav-button-blue">My Items</button></li>
  <li><button className="nav-button-blue">Auto Service</button></li>
  <li><button className="nav-button-blue">Only at Walmart</button></li>
  <li><button className="nav-button-blue">Registry</button></li>
  <li><button className="nav-button-blue">Walmart+</button></li>
          <Link style={{textDecoration: 'none'}} to = "/seller">
          <li><button className="nav-button-blue">Seller</button></li>
          </Link>
          <Link style={{textDecoration: 'none'}} to = "/education">
          <li><button className="nav-button-blue">Educational Section</button></li>
          </Link>
          <Link style={{textDecoration: 'none'}} to = "/sustainability">
          <li><button className="nav-button-blue">Sustainability Reports</button></li>
          </Link>
          <Link style={{textDecoration: 'none'}} to = "/rewards">
          <li><button className="nav-button-blue">Rewards</button></li>
          </Link>
          <li><button className="nav-button-blue">More</button></li>

          {/* <Link style={{textDecoration: 'none'}} to = "/green">
            <button className="button">Greenovation Zone</button>
          </Link> */}
          </ul>
      </div>
    </div>
  );
};

export default AmazonNavigationBarg;