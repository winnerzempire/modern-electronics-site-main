import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'; // Assuming ProductCard is used to display each product
import './product.css'; // Import your styles if necessary

const SoundBarAndAudio = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [soundProducts, setSoundProducts] = useState([]);

  // Fetch categories and products in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get('https://viqtech.co.ke/api/products/');
        setCategories(categoryResponse.data);

        // Fetch products
        const productResponse = await axios.get('https://viqtech.co.ke/api/products/products/');
        setProducts(productResponse.data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Find the SoundBar and Audio category ID based on the category title
  const soundBarAndAudioCategoryId = categories.find(
    (category) => category.title.toLowerCase() === 'soundbarandaudio'
  )?.id;

  // Filter products based on SoundBar and Audio category ID
  const filteredProducts = products.filter(
    (item) => item.category?.id === soundBarAndAudioCategoryId
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2 className="section__title">Sound Bar and Audio</h2>

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
    </div>
  );
};

export default SoundBarAndAudio;
