import { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import ProductsList from "./ProductsList"; // Import ProductsList to display filtered products

export default function Television() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // To store category data
  const [products, setProducts] = useState([]); // To store products data
  const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered television products

  // Fetch categories and products in parallel
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://viqtech.co.ke/api/products/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Categories fetched:", data);
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
        console.log("Products fetched:", data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      }
    };

    // Call both fetches
    const fetchAllData = async () => {
      await Promise.all([fetchCategories(), fetchProducts()]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  // Filter products after both categories and products are fetched
  useEffect(() => {
    if (categories.length > 0 && products.length > 0) {
      const televisionCategoryId = categories.find(
        (category) => category.title.toLowerCase() === "televisions"
      )?.id;

      console.log("Television Category ID:", televisionCategoryId);

      if (televisionCategoryId) {
        const filteredTelevisionProducts = products.filter(
          (item) => item.category?.id === televisionCategoryId
        );
        console.log("Filtered Television Products:", filteredTelevisionProducts);
        setFilteredProducts(filteredTelevisionProducts);
      }
    }
  }, [categories, products]);

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center">
          <h2>Televisions</h2>
        </Col>

        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Display filtered products */}
        {!loading && !error && filteredProducts.length > 0 && (
          <ProductsList data={filteredProducts} />
        )}
      </Row>
    </Container>
  );
}
