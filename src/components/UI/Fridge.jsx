import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import ProductCard from './ProductCard'; // Assuming you are using ProductCard to display each product
import './product.css'; // Import styles if needed

function Fridge() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get('https://viqtech.co.ke/api/products/');
        setCategories(categoryResponse.data);
        console.log('Categories fetched:', categoryResponse.data);

        // Fetch products
        const productResponse = await axios.get('https://viqtech.co.ke/api/products/products/');
        setProducts(productResponse.data);
        console.log('Products fetched:', productResponse.data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Find the Fridge category ID (based on the exact title "Fridges")
  const fridgeCategoryId = categories.find(
    (category) => category.title.toLowerCase().trim() === 'fridges'
  )?.id;

  console.log('Fridge Category ID:', fridgeCategoryId); // Log to check category ID

  // Filter products based on Fridge category ID
  const filteredProducts = products.filter(
    (item) => item.category?.id === fridgeCategoryId
  );

  console.log('Filtered Fridge Products:', filteredProducts); // Log filtered products

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <Container>
        <Row className="d-flex flex-sm-column flex-md-row align-items-center justify-content-between gap-5">
          <Col lg="12" className="text-center mb-5">
            <h2 className="section__title" id="fridge">
              Fridges
            </h2>
          </Col>

          {/* Display filtered products */}
          <div className="products-list">
            {filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))
            )}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Fridge;
