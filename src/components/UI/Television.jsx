import { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import ProductList from "./ProductsList";

export default function Television() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://viqtech.co.ke/api/products/products/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const televisionProducts = products.filter(
    (product) =>
      product.category && // Ensure category exists
      typeof product.category === "string" && // Ensure category is a string
      product.category.toLowerCase() === "television"
  );

  return (
    <Container>
      <Row className="d-flex justify-content-between gap-5">
        <Col lg="12" className="text-center">
          <h2 className="section__title" id="television">
            Television
          </h2>
        </Col>

        {loading ? (
          <Col lg="12" className="text-center">
            <p>Loading products...</p>
          </Col>
        ) : error ? (
          <Col lg="12" className="text-center">
            <p>{error}</p>
          </Col>
        ) : televisionProducts.length > 0 ? (
          <ProductList data={televisionProducts} />
        ) : (
          <Col lg="12" className="text-center">
            <p>No television products available at the moment.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}
