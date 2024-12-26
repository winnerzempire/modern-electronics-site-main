import { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import ProductsList from "./ProductsList"; // Import ProductsList to display filtered products

export default function Television() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // To store category data
  const [products, setProducts] = useState([]); // To store products data

  // Fetch categories and products in parallel
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://viqtech.co.ke/api/products/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://viqtech.co.ke/api/products/products/"); // Adjust the URL if needed
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchCategories();  // Fetch categories
    fetchProducts();    // Fetch products
  }, []);

  // Find the television category ID based on category title
  const televisionCategoryId = categories.find(
    (category) => category.title.toLowerCase() === "televisions"
  )?.id;

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center">
          <h2>Televisions</h2>
        </Col>

        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* If products are fetched, filter by the television category */}
        {!loading && !error && televisionCategoryId && (
          <ProductsList
            data={products.filter((item) => item.category?.id === televisionCategoryId)} // Filter products by television category
          />
        )}
      </Row>
    </Container>
  );
}
