import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import ProductsList from '../components/UI/ProductsList';
import "../pages/schop.css"

const CategoryFilter = () => {
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const storeToken = (token) => {
    localStorage.setItem('authToken', token); // Store the token with a key
  };
  
  const fetchCategories = async () => {
    try {
      // Example token - replace this with your actual token retrieval logic
      const exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2MzE5ODk1LCJpYXQiOjE3MjYzMTk1OTUsImp0aSI6ImVhMTFiY2M4NWI2YjQzN2NiZWU3MGVhMGYzMjQ5YjhlIiwidXNlcl9pZCI6Mn0.fHxfK-5-bVK67HXvnc5vIxwv0i4uA4rd4L-rnQzFkuw';
      
      storeToken(exampleToken); // Store the token in localStorage
  
      // Retrieve the token from localStorage
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('No token found');
      }
  
      // Make the API request with the token
      const response = await axios.get('https://viqtech.co.ke:8000/api/products/', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
  
      // Set the categories data
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error.message || error);
    }
  };
  
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://viqtech.co.ke/api/products/products/');
      setProducts(response.data);
      setProductsData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleFilter = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    let filteredProducts = products;

    if (category) {
      try {
        const response = await axios.get(`http://192.168.156.198:8000/api/products/products/${category}`);
        filteredProducts = response.data;
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    }

    // Apply search filter if search term is present
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProductsData(filteredProducts);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const filteredProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductsData(filteredProducts);
  };

  return (
    <div className="filter-row">
      <Col lg="3" md="6">
        <div className="filter__widget">
          <select onChange={handleFilter}>
            <option value="">Filter By Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </Col>

      <Col lg="3" md="6">
        <div className="filter__widget">
          <select>
            <option value="">Sort By</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </Col>

      <Col lg="3" md="6">
        <div className="search__box">
          <input type="text" onChange={handleSearch} value={searchTerm} />
          <span>
            <i className="ri-search-line"></i>
          </span>
        </div>
      </Col>

      <section className="pt-0">
        <ProductsList searchTerm={searchTerm} />
      </section>
    </div>
  );
};

export default CategoryFilter;
