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
        console.log("Categories fetched:", data); // Debugging
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
        console.log("Products fetched:", data); // Debugging
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

  console.log("Television Category ID:", televisionCategoryId); // Debugging

  // Ensure products and categories are both loaded before filtering
  const filteredProducts = televisionCategoryId
    ? products.filter((item) => item.category?.id === televisionCategoryId)
    : [];

  console.log("Filtered Television Products:", filteredProducts); // Debugging

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center">
          <h2>Televisions</h2>
        </Col>

        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Only show ProductsList if both products and categories are loaded */}
        {!loading && !error && televisionCategoryId && filteredProducts.length > 0 && (
          <ProductsList data={filteredProducts} /> // Display filtered television products
        )}
        {!loading && !error && televisionCategoryId && filteredProducts.length === 0 && (
          <p>No televisions available at the moment.</p> // Handle no products for the category
        )}
        {!loading && !error && !televisionCategoryId && (
          <p>Television category not found.</p> // Handle missing television category
        )}
      </Row>
    </Container>
  );
}
