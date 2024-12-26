import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";
import ProductCard from "./ProductCard";

export default function Television() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [televisionProducts, setTelevisionProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await fetch("https://viqtech.co.ke/api/products/");
        if (!categoryResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoryResponse.status}`);
        }
        const categories = await categoryResponse.json();

        // Find the "Televisions" category
        const televisionCategoryId = categories.find(
          (category) => category.title.toLowerCase() === "televisions"
        )?.id;

        if (!televisionCategoryId) {
          throw new Error("Television category not found");
        }

        // Fetch products
        const productResponse = await fetch("https://viqtech.co.ke/api/products/products/");
        if (!productResponse.ok) {
          throw new Error(`Failed to fetch products: ${productResponse.status}`);
        }
        const fetchedProducts = await productResponse.json();

        // Filter products for the "Televisions" category
        const filteredProducts = fetchedProducts.filter(
          (product) => product.category?.id === televisionCategoryId
        );

        setProducts(filteredProducts); // Store only television products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Container><p>Loading products...</p></Container>;
  if (error) return <Container><p style={{ color: "red" }}>Error: {error}</p></Container>;

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center">
          <h2>Televisions</h2>
        </Col>

        {/* Display television products */}
        <div className="products-list">
          {products.length === 0 ? (
            <p>No television products available.</p>
          ) : (
            products.map((item) => <ProductCard key={item.id} item={item} />)
          )}
        </div>
      </Row>
    </Container>
  );
}
