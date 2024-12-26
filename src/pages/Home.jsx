import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Television from "../components/UI/Television"; // Adjust according to your component structure

const Home = () => {
  const [products, setProducts] = useState([]);  // To store products data
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state
  const [televisionProducts, setTelevisionProducts] = useState([]); // To store filtered television products

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://viqtech.co.ke/api/products/products/");  // Adjust the URL if needed
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter television products
  useEffect(() => {
    if (products.length > 0) {
      const filteredTelevision = products.filter(product => product.category === "Television");
      setTelevisionProducts(filteredTelevision);
    }
  }, [products]);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      {/* Television Section */}
      {televisionProducts.length > 0 && (
        <section className="television-section">
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">Televisions</h2>
            </Col>
            <Television television={televisionProducts} />  {/* Display filtered television products */}
          </Row>
        </section>
      )}
    </Container>
  );
};

export default Home;
