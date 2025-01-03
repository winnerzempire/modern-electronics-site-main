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
                <ProductsList data={trendingProducts} />
              </Row>
            </Container>
          </section>

          {/* Television Products Section */}
          
            <section className="trending__products">
              <Container>
                <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
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

            <section className="trending__products">
              <Container>
                <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
                  <Cookers data={cookerProducts} />
                </Row>
              </Container>
            </section>

            <section className="trending__products">
              <Container>
                <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
                  <Fridge data={fridgeProducts} />
                </Row>
              </Container>
            </section>

            <section className="trending__products">
              <Container>
                <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
                  <Gaming data={gamingProducts} />
                </Row>
              </Container>
            </section>
        
        </Helmet>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
