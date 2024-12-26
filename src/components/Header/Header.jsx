import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, InputGroup, InputGroupText, Input } from "reactstrap";
import viqtech from "../../assets/images/Viq Tech-1.png";
import userIcon from "../../assets/images/user-icon.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { totalQuantity } from "../../redux/slices/cartSlice";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const nav__link = [
  {
    path: ".",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "service",
    display: "Services",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const total = useSelector(totalQuantity);
  const navigate = useNavigate();
  const profileActionsRef = useRef(null);
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList?.add("sticky__header");
      } else {
        headerRef.current?.classList?.remove("sticky__header");
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Navigate to the search page or filter the products based on the searchQuery
      navigate(`/search?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const navigateToCart = (nav) => {
    navigate(nav);
  };

  const toggleProfileActions = () =>
    profileActionsRef.current.classList.toggle("show__profileActions");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate(".");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        {/* Logo and Navigation Section */}
        <Row>
          <div className="nav__wrapper">
            <div className="logo logo__animate">
              <img className="animate__image" src={viqtech} alt="logo" />
              <div>
                <h1 onClick={() => navigateToCart("/")}>ViqTech</h1>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li key={index} className="nav__item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Icons */}
            <div className="nav__icons">
              <span
                className="fav__icon"
                onClick={() => navigateToCart("/contact")}
              >
                <i className="ri-mail-send-fill"></i>
              </span>

              <span
                className="cart__icon"
                onClick={() => navigateToCart("/cart")}
              >
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{total}</span>
              </span>

              <Link to="https://www.instagram.com/viqtech_ke">
                <span className="cart__icon">
                  <i className="ri-instagram-line"></i>
                </span>
              </Link>

              <FloatingWhatsApp {...whatsappInfo} />

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser?.photoURL ? currentUser.photoURL : userIcon}
                  alt="Profile"
                  onClick={toggleProfileActions}
                />
                <div
                  className="profile__actions"
                  ref={profileActionsRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center flex-column justify-content-center">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>

        {/* Search Bar Row */}
        <Row className="search__row">
          <Col lg="12" className="text-center">
            <InputGroup>
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <InputGroupText onClick={handleSearchSubmit}>
                <i className="ri-search-line"></i>
              </InputGroupText>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
