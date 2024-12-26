import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, InputGroup, InputGroupText, Input } from "reactstrap";
import viqtechLogo from "../../assets/images/Viq Tech-1.png";
import userIcon from "../../assets/images/user-icon.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { totalQuantity } from "../../redux/slices/cartSlice";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { toast } from "react-toastify";
import "./navbar.scss";

const navLinks = [
  { path: "/", display: "Home" },
  { path: "/shop", display: "Shop" },
  { path: "/services", display: "Services" },
  { path: "/cart", display: "Cart" },
];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileActionsRef = useRef(null);
  const total = useSelector(totalQuantity);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleProfileActions = () =>
    profileActionsRef.current.classList.toggle("show__profileActions");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  // WhatsApp information
  const whatsappInfo = {
    phoneNumber: "+254702122421",
    showPopup: true,
    accountName: "disonobudho233",
    placeholder: "Type a message...",
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            {/* Logo Section */}
            <div className="logo">
              <Link to="/">
                <img src={viqtechLogo} alt="ViqTech" className="logo__img" />
                <h1 className="logo__text">ViqTech</h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="navigation" ref={menuRef}>
              <ul className="nav__links">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "nav__link--active" : "nav__link"
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search Bar Section */}
            <Col lg="4" className="search__bar">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <InputGroupText onClick={handleSearchSubmit}>
                  <i className="ri-search-line"></i>
                </InputGroupText>
              </InputGroup>
            </Col>

            {/* User Profile & Cart Icons */}
            <div className="nav__icons">
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser?.photoURL || userIcon}
                  alt="User"
                  className="profile__img"
                  onClick={toggleProfileActions}
                />
                <div className="profile__actions" ref={profileActionsRef}>
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="auth__links">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>

              <span className="cart__icon" onClick={() => navigate("/cart")}>
                <i className="ri-shopping-bag-line"></i>
                <span className="cart__badge">{total}</span>
              </span>

              {/* WhatsApp Icon */}
              <FloatingWhatsApp {...whatsappInfo} />
            </div>

            {/* Mobile Menu */}
            <div className="mobile__menu" onClick={() => menuRef.current.classList.toggle("active__menu")}>
              <i className="ri-menu-line"></i>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
