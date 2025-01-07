const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reviewUser = useRef();
  const reviewMsg = useRef();
  const products = useSelector(selectAll);
  const authentication = useSelector(getAunthentication);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [reviewData, setReview] = useState([]);
  const item_id = parseInt(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://viqtech.co.ke/api/products/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
        setReview(data.reviews || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 300);
  }, [id]);

  if (!authentication) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <Spinner />;
  }

  const { imgUrl, productName, price, total_rating, reviews, description, shortDisc, category } = product;

  const addToCart = () => {
    dispatch(
      addItem({
        id,
        imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added successfully");
  };

  const relatedProducts = category?.title
    ? products.filter((item) => item?.category?.title === category?.title)
    : [];

  return (
    <Helmet title={productName}>
      <CommonSection title={"Product Detail"} />
      {/* Render Product Details */}
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="product__title">{productName}</h2>
            </Col>
          </Row>
          <Row className="align-items-center mt-4">
            <Col lg="6">
              <img src={imgUrl} alt={productName} className="img-fluid" />
            </Col>
            <Col lg="6">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">
                    <PriceFormat price={price} />
                  </span>
                </div>
                <h2>Key Features</h2>
                <ul>
                  {shortDisc ? (
                    <li>{shortDisc}</li>
                  ) : description ? (
                    description.split("\r\n").map((line, index) => (
                      <li key={index}>{line}</li>
                    ))
                  ) : (
                    <li>No additional details available.</li>
                  )}
                </ul>
                <div className="mt-2">
                  <span>Category: {category?.title?.toUpperCase() || 'Not available'}</span>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <input type="number" min="1" defaultValue="1" className="quantity__input" />
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="buy__btn"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Render Reviews */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviewData.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">{description}</div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviewData.length > 0 ? (
                        reviewData.map((item, index) => (
                          <li key={index} className="mt-4">
                            <h6>{item?.userName || 'Anonymous'}</h6>
                            <span>{item?.rating || 'No rating'} (average rating)</span>
                            <p>{item?.text || 'No review provided'}</p>
                          </li>
                        ))
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </ul>
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" required placeholder="Enter name" ref={reviewUser} />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <motion.span
                              key={num}
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(num)}
                            >
                              {num}
                              <i className="ri-star-s-fill"></i>
                            </motion.span>
                          ))}
                        </div>
                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            required
                            placeholder="Review message..."
                            ref={reviewMsg}
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
