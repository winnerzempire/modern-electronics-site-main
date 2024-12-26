import { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import ProductsList from "./ProductsList"; // Import ProductsList to display filtered products

export default function Television() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories to filter the products later
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://viqtech.co.ke/api/products/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const televisionCategoryId = categories.find(
    (category) => category.title.toLowerCase() === "televisions"
  )?.id;

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center">
          <h2>Television</h2>
        </Col>

        {loading && <p>Loading categories...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Pass the television category filter to ProductsList */}
        {!loading && !error && televisionCategoryId && (
          <ProductsList
            filterCriteria={(item) => item.category?.id === televisionCategoryId}
          />
        )}
      </Row>
    </Container>
  );
}
