import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import PriceFormat from "../Format";

const ProductCard = ({ item }) => {
  // Early return if the item is missing
  if (!item) {
    return <div className="loading">Loading...</div>; // Or any fallback UI you prefer
  }

  // Destructure the item properties
  const { id, productName, price, imgUrl } = item;

  // Return early if required properties are missing
  if (!id || !productName || !price || !imgUrl) {
    return <div className="error">Product details are incomplete.</div>; // Fallback UI for incomplete product data
  }

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addItem({
        id,
        productName,
        price,
        imgUrl,
      })
    );
    toast.success("Product added to cart!");
  };

  return (
    <div className="product-card">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="product-card-inner"
      >
        {/* Product Image */}
        <div className="product-image">
          <Link to={`/shop/${id}`}>
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={imgUrl}
              alt={productName}
              className="product-img"
            />
          </Link>
          <span className="product-badge">New</span>
        </div>

        {/* Product Details */}
        <div className="product-info">
          <h5 className="product-name">{productName}</h5>
          <PriceFormat price={price} className="product-price" />
          <div className="product-buttons">
            <Link to={`/shop/${id}`} className="view-details">
              View Details
            </Link>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="add-to-cart"
              onClick={addToCart}
            >
              <i className="ri-add-line"></i> Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
