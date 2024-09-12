import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap'; // Make sure you have imported Col from react-bootstrap
import axios from 'axios'; // Or use fetch if you prefer

const CategoryFilter = ({ handleFilter }) => {
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/'); // Replace with your API endpoint
      setCategories(response.data); // Assuming the data is an array of categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Col lg="3" md="6">
      <div className="filter__widget">
        <select onChange={handleFilter}>
          <option value="">Filter By Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.title}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </Col>
  );
};

export default CategoryFilter;




