import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/home.css";
import "./AnimatedLetters";
import "./trending.css";
import AnimatedLetters from "./AnimatedLetters";
import { useState, useEffect } from "react";
import ViqTechLogo from "../assets/images/Viq_Tech.png";

const Trending = ({ products = [], year }) => {
  const [letterClass, setLetterClass] = useState("text-animate");
  
  // Ensure that products is always an array
  const scoreArr = products.map((item) => parseInt(item.total_rating) || 0);

  const max_score = Math.max(...scoreArr);
  const trending_item = products.filter(
    (item) => parseInt(item.total_rating) === max_score
  );

  // Provide fallback values for image and description
  const image = trending_item[0]?.imgUrl ?? products[0]?.imgUrl ?? "";
  const desc = trending_item[0]?.description ?? products[0]?.description ?? "No description available";

  const title = "Tech it to the Next Level";
  const descArray = [];

  if (title) {
    for (const char of title) {
      descArray.push(char);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <Col lg="6" md="6">
        <div className="hero__content">
          <img src={ViqTechLogo} alt="viqTechLogo" className="main__logo" />

          <h1 className="mt-4">
            <AnimatedLetters
              strArray={descArray}
              letterClass={letterClass}
              idx={15}
            />
          </h1>
          <p className="hero__subtitle">Trending product in {year}</p>
          <p>{desc}</p>
          <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
            <Link to="/shop">SHOP NOW</Link>
          </motion.button>
        </div>
      </Col>
      <Col lg="6" md="6">
        <div className="hero__i">
          {image && <img src={image} alt="heroImg" />}
        </div>
      </Col>
    </Row>
  );
};

export default Trending;