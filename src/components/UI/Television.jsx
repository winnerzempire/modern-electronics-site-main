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
        console.log("Fetched products:", data); // Debugging: Log fetched products
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err); // Debugging: Log error
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  const televisionProducts = products.filter((product) => {
    if (product.category && product.category.title) {
      console.log("Category:", product.category.title); // Log category title for debugging
      return product.category.title.toLowerCase() === "televisions";
    }
    return false;
  });

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
