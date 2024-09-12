import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Correctly imported from react-redux
import { Col } from 'react-bootstrap';
import axios from 'axios';
import ProductsList from '../components/UI/ProductsList';
import { selectAll } from '../redux/slices/product'; // Adjust path as per your structure

const CategoryFilter = ({ handleFilter }) => {
  const products = useSelector(selectAll); // Use the selector to get products from the Redux state
  const [productsData, setProductsData] = useState(products);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(value.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  return (
    <>
      <Col lg="3" md="6">
        <div className="filter__widget">
          <select onChange={handleFilter}>
            <option value="">Filter By Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
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

      <Col lg="6" md="12">
        <div className="search__box">
          <input type="text" placeholder="search..." onChange={handleSearch} />
          <span>
            <i className="ri-search-line"></i>
          </span>
        </div>
      </Col>

      <section className="pt-0">
        {productsData.length === 0 ? (
          <h1 className="text-center">No Products Found!!!</h1>
        ) : (
          <ProductsList data={productsData} />
        )}
      </section>
    </>
  );
};

export default CategoryFilter;
