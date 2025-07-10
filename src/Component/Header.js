import React from "react";
import { Link } from "react-router-dom";
import "../Css/Header.css";
import { useStateValue } from '../StateProvider';

function Header() {
  const [{ basket }] = useStateValue();

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="/images/walmart_logo.png"
          alt="walmart logo"
        />
      </Link>

      <div className="header__location">
        <img src="/images/location.png" alt="location" />
        <div>
          <div className="header__locTitle">
            Pickup or delivery?
            <span className="header__downArrow">▼</span>
          </div>
          <div className="header__locSubtitle">Sacramento, 95829 · Sacramento Supercenter</div>
        </div>
      </div>

      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          placeholder="Search everything at Walmart online and in store"
        />
        <img
          src="/images/search_icon.png"
          className="header__searchIcon"
          alt="search"
        />
      </div>

      <div className="header__nav">
        <Link to="/reorder">
          <div className="header__iconBlock">
            <img src="/images/heart.png" alt="reorder" />
            <span className="header__iconTextBold">My Items</span>
          </div>
        </Link>

        <Link to="/login">
          <div className="header__iconBlock">
            <img src="/images/user.png" alt="user" />
            <span className="header__iconTextBold">Account</span>
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Dashboard</span>
          </div>
        </Link>

        <Link to="/checkout">
          <div className="header__cartBlock">
            <img src="/images/cart_icon.png" alt="cart" />
            <span className="header__cartBadge">{basket?.length || 0}</span>
            <span className="header__cartPrice">$0.00</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
