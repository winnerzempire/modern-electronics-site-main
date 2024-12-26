import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col } from 'reactstrap';
import ProductCard from './ProductCard';
import './product.css'; // Import your styles if necessary

const Cookers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch categories and products in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get('https://viqtech.co.ke/api/products/');
        setCategories(categoryResponse.data);
        console.log("Categories fetched:", categoryResponse.data); // Log categories

        // Fetch products
        const productResponse = await axios.get('https://viqtech.co.ke/api/products/products/');
        setProducts(productResponse.data);
        console.log("Products fetched:", productResponse.data); // Log products
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Ensure proper logging of categories and matching IDs
  const cookersCategoryId = categories.find(
    (category) =>
      category.title.toLowerCase().trim() === 'cookers' // Match the 'Cookers' category
  )?.id;

  console.log("Cookers Category ID:", cookersCategoryId); // Log category ID

  // Filter products based on Cookers category ID
  const filteredProducts = products.filter(
    (item) => item.category?.id === cookersCategoryId
  );

  console.log("Filtered Products:", filteredProducts); // Log filtered products

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <Col lg="12" className="text-center mb-5">
        <h2 className="section__title" id="cooker">
          Cookers
        </h2>
      </Col>

      {/* Display filtered products directly */}
      <div className="products-list">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))
        )}
      </div>
    </>
  );
};

export default Cookers;
