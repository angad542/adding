import React from "react";
import "../Css/Sustainability.css";
// import { useSpring, animated } from "react-spring";

// function Number({ n }) {
//   const { number } = useSpring({
//     from: { number: 0 },
//      number: n,
//     delay: 200,
//     config: { mass: 1, tension: 20, friction: 10 },
//   });
//   return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
// }

function SustainabilityReportsSection() {
  return (
    <div className="Susback">
      <div className="sustainability-header">
        <h1>🌍 Sustainability Impact</h1>
        <p>Leading the retail industry towards a more sustainable future through innovation, responsibility, and environmental stewardship.</p>
      </div>
      
      <img src="../images/SusImage.png" alt="" width="100%" />

      <div className="links">
      <span className="reports-heading">Sustainability Reports :  </span> 
        <a href="https://sustainabilityreports.com/reports/walmart-inc-2023-esg-highlights-pdf/">
          2023 /
        </a>
        <a href="https://sustainabilityreports.com/company/walmart-inc/">
           2022 /
        </a>
        <a href="https://sustainabilityreports.com/company/walmart-inc/">
          2021 /
        </a>
      </div>
      <div className="parameters">
        <div className="one">
          <p style={{color: "#533A2B"}}><h1 style={{color: "#89B753"}}> 234,000+ </h1><b>ZERO PLASTIC PRODUCTS SOLD</b></p>
        </div>
        <div className="two">
          
          <p style={{color: "#533A2B"}}>
          <h1 style={{color: "#00B099"}}>10,000 Kgs</h1>
            <b>PLASTIC POLLUTION PREVENTED</b>
          </p>
        </div>
        <div className="three">
          
          <p style={{color: "#533A2B"}}>
          <h1 style={{color: "#00B099"}}>17,936 tons</h1><b>CARBON EMISSIONS PREVENTED</b></p>
        </div>
      </div>

      <div className="Text"></div>

      <img
        src="../images/Overview.png"
        alt=""
        width="80%"
        className="Overview"
      />
      <img src="../images/Reports.png" alt="" width="80%" className="Results" />
    </div>
  );
}

export default SustainabilityReportsSection;
