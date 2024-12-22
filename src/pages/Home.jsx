import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import Services from "../services/Services";
import Spinner from "../components/Spinner";
import Trending from "../components/Trending";
import Television from "../components/UI/Television";
import Gaming from "../components/UI/Gaming";
import Cookers from "../components/UI/Cookers";
import SoundBarAndAudio from "../components/UI/SoundBarAndAudio";
import Fridge from "../components/UI/Fridge";
import LimitedOffers from "../components/UI/LimitedOffers";
import { fetchProducts, getError, getStatus, selectAll } from "../redux/slices/product";
import "../styles/home.css";

const Home = () => {
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const products = useSelector(selectAll);
  const dispatch = useDispatch();

  const [productOnOffer, setProductOnOffer] = useState(null);
  const [categoriesData, setCategoriesData] = useState({
    trending: [],
    televisions: [],
    cookers: [],
    soundBars: [],
    fridges: [],
    gaming: [],
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const data = {
        trending: products.filter(product => typeof product.category === 'string' && product.category.toLowerCase() === "trending"),
        televisions: products.filter(product => typeof product.category === 'string' && product.category.toLowerCase() === "televisions"),
        cookers: products.filter(product => typeof product.category === 'string' && product.category.toLowerCase() === "cookers"),
        soundBars: products.filter(product => typeof product.category === 'string' && product.category.toLowerCase() === "sound bars and audios"),
        fridges: products.filter(product => typeof product.category === 'string' && product.category.toLowerCase() === "fridges"),
        gaming: products.filter(product => typeof product.category === 'string' && product.category.toLowerCase() === "gaming"),
      };
      setCategoriesData(data);
      setProductOnOffer(products[0]); // Assuming the first product is on offer
    }
  }, [products]);
  
 

  if (status === "loading") return <Spinner />;
  if (status === "error") return <h3 className="text-center">{error}</h3>;

  const year = new Date().getFullYear();

  const categorySections = [
    { title: "Trending Products", data: categoriesData.trending, component: <ProductsList data={categoriesData.trending} /> },
    { title: "Televisions", data: categoriesData.televisions, component: <Television television={categoriesData.televisions} /> },
    { title: "Cookers", data: categoriesData.cookers, component: <Cookers cooker={categoriesData.cookers} /> },
    { title: "Sound Bars and Audio", data: categoriesData.soundBars, component: <SoundBarAndAudio soundItem={categoriesData.soundBars} /> },
    { title: "Fridges", data: categoriesData.fridges, component: <Fridge fridgeProducts={categoriesData.fridges} /> },
    { title: "Gaming", data: categoriesData.gaming, component: <Gaming gamingProducts={categoriesData.gaming} /> },
  ];

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Trending products={products} year={year} />
        </Container>
      </section>

      <Services />

      {/* Display all sections */}
      {categorySections.map(({ title, data, component }, index) => (
        <section key={index} className={title.replace(/\s+/g, '-').toLowerCase()}>
          <Container>
            <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
              <Col lg="12" className="text-center">
                <h2 className="section__title">{title}</h2>
              </Col>
              {/* Show the component or a "No products available" message */}
              {data.length > 0 ? component : <p>No products available</p>}
            </Row>
          </Container>
        </section>
      ))}

      {/* Limited Offers Section */}
      {productOnOffer && (
        <section className="timer__count">
          <LimitedOffers productOnOffer={productOnOffer} />
        </section>
      )}
    </Helmet>
  );
};

export default Home;
