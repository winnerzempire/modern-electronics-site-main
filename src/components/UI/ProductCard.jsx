import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import PriceFormat from "../Format";

const ProductCard = ({ item }) => {
  // If the item is undefined or null, we return a loading state or fallback message
  if (!item) {
    return <div className="loading">Loading...</div>;
  }

  const dispatch = useDispatch();

  // Add item to the cart
  const addToCart = () => {
    // Safely access item properties with optional chaining
    dispatch(
      addItem({
        id: item?.id,
        productName: item?.productName,
        price: item?.price,
        imgUrl: item?.imgUrl,
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
          <Link to={`/shop/${item.id}`}>
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={item.imgUrl}
              alt={item.productName}
              className="product-img"
            />
          </Link>
          <span className="product-badge">New</span>
        </div>

        {/* Product Details */}
        <div className="product-info">
          <h5 className="product-name">{item.productName}</h5>
          <PriceFormat price={item.price} className="product-price" />
          <div className="product-buttons">
            <Link to={`/shop/${item.id}`} className="view-details">
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
