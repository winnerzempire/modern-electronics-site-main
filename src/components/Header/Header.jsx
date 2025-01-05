import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import viqtech from "../../assets/images/cee.png";
import userIcon from "../../assets/images/user-icon.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { totalQuantity } from "../../redux/slices/cartSlice";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import "./index.scss";
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
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const total = useSelector(totalQuantity);
  const navigate = useNavigate();
  const profileActionsRef = useRef(null);
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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

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

  const whatsappInfo = {
    phoneNumber: "+254720998118",
    showPopup: true,
    accountName: "Viqtech",
    placeholder: "Type a message...",
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo logo__animate">
              <img className="animate__image" src={viqtech} alt="logo" />
              <div>
                <h1 onClick={() => navigateToCart("/")}>ViqTech</h1>
              </div>
            </div>

            {/* Search Bar
            <div className="search">
            <form className="search__bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <i className="ri-search-line"></i>
              </button>
            </form>
            </div> */}
            
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
                  alt="user"
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
      </Container>
    </header>
  );
};

export default Header;
