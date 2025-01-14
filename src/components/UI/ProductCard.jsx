import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import "./image-style.css";
import { getAunthentication } from "../../redux/slices/loginSlice";
import PriceFormat from "../Format";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAunthentication);

  const addToCart = () => {
    dispatch(
      addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );
    toast.success("Product added to cart!");
  };

  return (
    <Col lg="3" md="4" sm="6" xs="12" className="product__card-column">
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
        className="product__card shadow-sm rounded overflow-hidden"
      >
        {/* Product Image */}
        <div className="product__image-wrapper position-relative">
          <Link to={`/shop/${item.id}`} className="product__image-link">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={item.imgUrl}
              alt={item.productName}
              className="product__img img-fluid"
            />
          </Link>
          <span className="product__badge badge bg-primary text-white">New</span>
        </div>

        {/* Product Details */}
        <div className="product__info p-3 text-center">
          {/* Product Name */}
          <h5 className="product__name mb-2">{item.productName}</h5>

          {/* Product Price */}
          <PriceFormat price={item.price} className="product__price mb-3" />

          {/* Buttons */}
          <div className="d-flex flex-column gap-2">
            {/* {isAuthenticated ? ( */}
              <Link
                to={`/shop/${item.id}`}
                className="btn btn-sm btn-primary rounded-pill"
                aria-label={`View details of ${item.productName}`}
              >
                View Details
              </Link>
            {/* ) : (
              <Link
              Link to={`/shop/${item.id}`}
                // className="btn btn-sm btn-danger rounded-pill"
                // onClick={() => toast.error("Log in to view details")}
                // aria-label="Log in to view product"
              >
               View Details 
              </Link>
            )} */}

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="btn btn-sm btn-outline-primary rounded-pill"
              onClick={addToCart}
              aria-label={`Add ${item.productName} to cart`}
            >
              <i className="ri-add-line"></i> Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Col>
  );
};

export default ProductCard;
