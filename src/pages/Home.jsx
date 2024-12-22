import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import Services from "../services/Services";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import counterImg from "../assets/images/counter-timer-img.png";
import Spinner from "../components/Spinner";
import Trending from "../components/Trending";
import Television from "../components/UI/Television";
import Gaming from "../components/UI/Gaming";
import {
  fetchProducts,
  getError,
  getStatus,
  selectAll,
} from "../redux/slices/product";
import Cookers from "../components/UI/Cookers";
import SoundBarAndAudio from "../components/UI/SoundBarAndAudio";
import Fridge from "../components/UI/Fridge";
import LimitedOffers from "../components/UI/LimitedOffers";

const Home = () => {
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const products = useSelector(selectAll);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const [productOnOffer, setProductOnOffer] = useState(null);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [televisionProducts, setTelevisionProducts] = useState([]);
  const [cookerProducts, setCookerProducts] = useState([]);
  const [soundProducts, setSoundProducts] = useState([]);
  const [fridgeProducts, setFridgeProducts] = useState([]);
  const [gamingProducts, setGamingProducts] = useState([]);
  const [soundItem, setSoundItem] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Filter the products based on category
      const filteredTrendingProducts = products.filter(product => product.category === "Trending");
      setTrendingProducts(filteredTrendingProducts);

      const filteredTelevisionProducts = products.filter(product => product.category === "Televisions");
      setTelevisionProducts(filteredTelevisionProducts);

      const filteredCookerProducts = products.filter(product => product.category === "Cookers");
      setCookerProducts(filteredCookerProducts);

      const filteredSoundProducts = products.filter(product => product.category === "Sound bars and Audios");
      setSoundProducts(filteredSoundProducts);

      const filteredFridgeProducts = products.filter(product => product.category === "Fridges");
      setFridgeProducts(filteredFridgeProducts);

      const filteredGamingProducts = products.filter(product => product.category === "Gaming");
      setGamingProducts(filteredGamingProducts);

      // Assuming you want the first product on offer:
      setProductOnOffer(products[0]);
    }
  }, [products]);

  if (status === "loading") {
    return <Spinner />;
  } else if (status === "error") {
    return <h3 className="text-center">{error}</h3>;
  }

  const year = new Date().getFullYear();

  return (
    <>
      {products.length > 0 ? (
        <Helmet title={"Home"}>
          <section className="hero__section">
            <Container>
              <Trending products={products} year={year} />
            </Container>
          </section>
          <Services />

          {/* Trending Products Section */}
          {/* <section className="trending__products">
            <Container>
              <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
                <Col lg="12" className="text-center">
                  <h2 className="section__title">Trending Products</h2>
                </Col>
                <ProductsList data={trendingProducts} />
              </Row>
            </Container>
          </section> */}

          {/* Television Products Section */}
          {televisionProducts.length > 0 && (
            <section className="best__sales">
              <Television television={televisionProducts} />
            </section>
          )}

          {/* Limited Offers Section */}
          {productOnOffer && (
            <section className="timer__count">
              <LimitedOffers productOnOffer={productOnOffer} />
            </section>
          )}

          {/* New Arrivals Section */}
          <section className="new__arrivals">
            <Container>
              <Row className="d-flex flex-sm-column flex-md-row align-items-center justify-content-between gap-5">
                {cookerProducts.length > 0 && <Cookers cooker={cookerProducts} />}
                {soundProducts.length > 0 && <SoundBarAndAudio soundItem={soundProducts} />}
              </Row>
            </Container>
          </section>

          {/* Fridge Products Section */}
          {fridgeProducts.length > 0 && (
            <section className="popular__category">
              <Fridge fridgeProducts={fridgeProducts} />
            </section>
          )}

          {/* Gaming Products Section */}
          {gamingProducts.length > 0 && (
            <section className="popular__category">
              <Gaming gamingProducts={gamingProducts} />
            </section>
          )}
        </Helmet>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
