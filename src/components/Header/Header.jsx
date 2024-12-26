import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
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
import './navbar.scss';  // Ensure this file exists and styles are defined

const navLinks = [
  { path: "/", display: "Home" },
  { path: "shop", display: "Shop" },
  { path: "service", display: "Services" },
  { path: "cart", display: "Cart" },
  { path: "contact", display: "Contact" } // Contact page
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const total = useSelector(totalQuantity);
  const navigate = useNavigate();
  const profileActionsRef = useRef(null);
  const { currentUser } = useAuth();

  // Sticky header effect
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  const whatsappInfo = {
    phoneNumber: "+254720998118",
    showPopup: true,
    accountName: "ViqTech Support",
    placeholder: "Type a message...",
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            {/* Logo and Company Name */}
            <div className="logo">
              <img className="logo__image" src={viqtech} alt="ViqTech Logo" />
              <h1 onClick={() => navigate("/")}>ViqTech</h1>
            </div>

            {/* Navigation Menu */}
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? "nav__active" : "")}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side icons (Cart, Profile, WhatsApp) */}
            <div className="nav__icons">
              {/* Cart Icon */}
              <span className="cart__icon" onClick={() => navigate("/cart")}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{total}</span>
              </span>

              {/* Profile Icon */}
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser?.photoURL || userIcon}
                  alt="User Profile"
                  onClick={() => profileActionsRef.current.classList.toggle("show__profileActions")}
                />

                {/* Profile Actions */}
                <div
                  className="profile__actions"
                  ref={profileActionsRef}
                  onClick={() => profileActionsRef.current.classList.remove("show__profileActions")}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>

              {/* WhatsApp Floating Icon */}
              <FloatingWhatsApp {...whatsappInfo} />

              {/* Mobile Menu */}
              <div className="mobile__menu" onClick={menuToggle}>
                <span>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
