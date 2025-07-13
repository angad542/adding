import React, { useState, useEffect } from "react";
import "../Css/Orders.css";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import OrderedProduct from "./orderedProduct";

function Orders() {
  const [{ history }] = useStateValue();

  const reversedHistory = [...history].reverse();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src="../images/greenad.png" alt="Eco-Friendly Promotion" />
        <div>
          <h2 className="checkout__title">Your Orders</h2>
          {reversedHistory.length > 0 ? (
            <div className="orders__list">
              {reversedHistory.map((item, index) => (
                <OrderedProduct
                  key={index}
                  id={item.id}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                  title={item.title}
                  badge_id={item.badge_id}
                />
              ))}
            </div>
          ) : (
            <div className="orders__empty">
              <h3>No orders yet</h3>
              <p>Start shopping to see your orders here!</p>
              <button 
                className="orders__browse-btn"
                onClick={() => window.location.href = '/green'}
              >
                Browse Eco-Friendly Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
