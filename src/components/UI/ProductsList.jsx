import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import './product.css'; // Import the CSS file

const ProductsList = ({ searchTerm, filterCriteria }) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Fetch products and categories from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get('https://viqtech.co.ke/api/products/');
        setCategories(categoryResponse.data);

        // Fetch products
        const productResponse = await axios.get('https://viqtech.co.ke/api/products/products/');
        setData(productResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on selected category, search term, and filterCriteria
  useEffect(() => {
    let filtered = data;

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.category?.id.toString() === selectedCategory // Ensure type consistency
      );
    }

    if (filterCriteria) {
      filtered = filtered.filter(filterCriteria);
    }

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        item.productName?.toLowerCase().includes(searchTermLower)
      );
    }

    setFilteredData(filtered);
  }, [data, selectedCategory, filterCriteria, searchTerm]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* Category Filter */}
      <div className="category-filter">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title} {/* Ensure that the category has 'id' and 'title' */}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="products-list">
        {filteredData.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredData.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsList;
