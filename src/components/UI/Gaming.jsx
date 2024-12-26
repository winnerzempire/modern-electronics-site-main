import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import ProductCard from './ProductCard'; // Assuming ProductCard is used to display each product
import './product.css'; // Import your styles if needed

function Gaming() {
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

  // Find the Gaming category ID (ID is 5 in your response)
  const gamingCategoryId = categories.find(
    (category) => category.title.toLowerCase().trim() === 'gaming'
  )?.id;

  console.log('Gaming Category ID:', gamingCategoryId); // Log to check category ID

  // Filter products based on Gaming category ID
  const filteredGamingProducts = products.filter(
    (item) => item.category?.id === gamingCategoryId
  );

  console.log('Filtered Gaming Products:', filteredGamingProducts); // Log filtered products

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <Container>
        <Row className="d-flex flex-sm-column flex-md-row align-items-center justify-content-between gap-5">
          <Col lg="12" className="text-center mb-5">
            <h2 className="section__title" id="gaming">
              Gaming
            </h2>
          </Col>

          {/* Display filtered gaming products */}
          <div className="products-list">
            {filteredGamingProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredGamingProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))
            )}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Gaming;
