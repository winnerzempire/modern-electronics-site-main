import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import Services from "../services/Services";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
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

  const [productOnOffer, setProductOnOffer] = useState(null);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [televisionProducts, setTelevisionProducts] = useState([]);
  const [cookerProducts, setCookerProducts] = useState([]);
  const [soundProducts, setSoundProducts] = useState([]);
  const [fridgeProducts, setFridgeProducts] = useState([]);
  const [gamingProducts, setGamingProducts] = useState([]);

  useEffect(() => {
    console.log("Dispatching fetchProducts"); // Log to confirm fetchProducts is being dispatched
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("Fetched Products:", products); // Log to see the data structure
    if (products.length > 0) {
      const filteredTrendingProducts = products.filter(product => product.category === "Trending");
      console.log("Filtered Trending Products:", filteredTrendingProducts); // Log filtered results
      setTrendingProducts(filteredTrendingProducts);

      const filteredTelevisionProducts = products.filter(product => product.category === "Television");
      console.log("Filtered Television Products:", filteredTelevisionProducts);
      setTelevisionProducts(filteredTelevisionProducts);

      const filteredCookerProducts = products.filter(product => product.category === "Cookers");
      console.log("Filtered Cooker Products:", filteredCookerProducts);
      setCookerProducts(filteredCookerProducts);

      const filteredSoundProducts = products.filter(product => product.category === "Sound bars and Audios");
      console.log("Filtered Sound Products:", filteredSoundProducts);
      setSoundProducts(filteredSoundProducts);

      const filteredFridgeProducts = products.filter(product => product.category === "Fridges");
      console.log("Filtered Fridge Products:", filteredFridgeProducts);
      setFridgeProducts(filteredFridgeProducts);

      const filteredGamingProducts = products.filter(product => product.category === "Gaming");
      console.log("Filtered Gaming Products:", filteredGamingProducts);
      setGamingProducts(filteredGamingProducts);

      // Assuming you want the first product on offer
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
          <section className="trending__products">
            <Container>
              <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
                <Col lg="12" className="text-center">
                  <h2 className="section__title">Trending Products</h2>
                </Col>
                <ProductsList data={trendingProducts} />
              </Row>
            </Container>
          </section>

          {/* Television Products Section */}
          
            <section className="trending__products">
              <Container>
                <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
                  <Col lg="12" className="text-center">
                    <h2 className="section__title">Televisions</h2>
                  </Col>
                  <Television data={televisionProducts} />
                </Row>
              </Container>
            </section>

          
            <section className="trending__products">
              <Container>
                <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
                  <SoundBarAndAudio data={soundProducts} />
                </Row>
              </Container>
            </section>
          

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
