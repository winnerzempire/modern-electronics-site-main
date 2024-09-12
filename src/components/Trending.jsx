import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "../styles/home.css";
import "./UI/trending.css";
import Tvcover from "../assets/images/tvscover.png";
import cover from "../assets/images/cover.png";
import soundbarscover from "../assets/images/soundbarscover.png";
import fridgecover from "../assets/images/fridgecover.png";
import AnimatedLetters from "./AnimatedLetters";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Trending = ({ products = [], year }) => {
  const [letterClass, setLetterClass] = useState("text-animate");

  const scoreArr = products.map((item) => parseInt(item.total_rating) || 0);
  const max_score = Math.max(...scoreArr);
  const trending_item = products.filter(
    (item) => parseInt(item.total_rating) === max_score
  );

  const image = trending_item[0]?.imgUrl ?? products[0]?.imgUrl ?? "";
  const desc =
    trending_item[0]?.description ?? products[0]?.description ?? "No description available";

  const title = "Tech it to the Next Level";
  const descArray = title.split("");

  const slides = [
    {
      title: "",
      image: cover,
      description:
        "Upgrade your tech with our cutting-edge devices, high-performance computing, and smart home solutions. Don’t miss out on the newest innovations tailored to fit your lifestyle.",
    },
    {
      title: "Slide 2 Title",
      image: soundbarscover,
      description:
        "Transform your home entertainment with our state-of-the-art sound bars, designed to deliver an immersive audio experience that puts you at the center of the action.",
    },
    {
      title: "Slide 3 Title",
      image: cover,
      description:
        "Step into a world of breathtaking visuals and vibrant colors with our cutting-edge TVs. Whether you’re a movie enthusiast, a sports fan, or a gamer, our range of TVs offers stunning picture quality.",
    },
    {
      title: "Slide 4 Title",
      image: fridgecover,
      description:
        "Upgrade your kitchen with our modern refrigerators, designed to keep your food fresher for longer while adding a touch of style to your home.",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <div className="slide-content-image-container">
              <div className="slide-content">
                <h1 className="mt-4">
                  <AnimatedLetters
                    strArray={descArray}
                    letterClass={letterClass}
                    idx={15}
                  />
                </h1>
                <p className="hero__subtitle">Trending product in {year}</p>
                <p>{slide.description}</p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
              <div className="slide-image">
                <img src={slide.image} alt={`slide-${index}`} className="img-fluid" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
 
export default Trending