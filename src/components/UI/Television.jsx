import { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import ProductList from "./ProductsList";

export default function Television() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://viqtech.co.ke/api/products/products/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  const televisionProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.category && // Ensure category exists
          typeof product.category.title === "string" && // Ensure title is a string
          product.category.title.toLowerCase() === "television" // Check for "television"
      )
    : [];

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center">
          <h2>Television</h2>
        </Col>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && televisionProducts.length > 0 ? (
          <ProductList data={televisionProducts} />
        ) : (
          <p>No television products available.</p>
        )}
      </Row>
    </Container>
  );
}
