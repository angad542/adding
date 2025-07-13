import React, { useEffect, useState } from 'react';
import '../Css/navbar.css'; // Import your CSS file for styling
import {Link} from "react-router-dom";

const AmazonNavigationBar = () => {
  const [showPopover, setShowPopover] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const closePopover = () => {
    setDontShowAgain(true);
    setShowPopover(false);
  };

  // useEffect(() => {
  //   if(showPopover) {
  //     const timeout = setTimeout(() => {
  //       setShowPopover(false);
  //     }, 5000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [showPopover]);

  useEffect(() => {
    const item = document.getElementById('itemToTrack');

    const handleScroll = () => {
      const itemRect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (itemRect.top < windowHeight && itemRect.bottom > 70) {
        setShowPopover(true);
      } else {
        setShowPopover(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="amazon-nav">
      <div className="amazon-nav-section">
        <ul className="amazon-nav-list">
  <li className="icon-tab">
    <img src="/images/grid.png" alt="Departments" height="16" />
    <a href="#">Departments</a>
  </li>
  <li className="icon-tab">
    <img src="/images/grid.png" alt="Services" height="16" />
    <a href="#">Services</a>
  </li>
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

  <div className='popover_trigger_nav'>
    <Link to="/green">
      <button id='itemToTrack' className="button">Greenovation Zone</button>
    </Link>
    {showPopover && !dontShowAgain && (
      <div className='popover_content_nav'>
        <div className='triangle'></div>
        <p>Introducing our brand new section<br />Greenovation Zone</p>
        <button onClick={closePopover} className='got_it'>Got It</button>
      </div>
    )}
  </div>
</ul>

      </div>
    </div>
  );
};

export default AmazonNavigationBar;
