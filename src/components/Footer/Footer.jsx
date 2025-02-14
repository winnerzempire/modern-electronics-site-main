import React from "react";
import "./footer.css";
import viqtechLogo from "../../assets/images/viqtech.jpg";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
        <Row>
  <Col lg="4" md="6" className="mb-4">
    <div className="logo">
      <div className="viqTechLogo">
        <img src={viqtechLogo} alt="logo" />
        <h1>ViqTech</h1>
        <p>
          We are dedicated to revolutionizing the way you experience technology. 
          As a premier provider of cutting-edge electronics and comprehensive ICT services, 
          we deliver innovative solutions tailored to meet the dynamic needs of individuals and businesses alike.
        </p>
      </div>
    </div>
  </Col>

  <Col lg="3" md="6" className="mb-4">
    <div className="footer__quick-links">
      <h4 className="quick__links-title">Top Category</h4>
      <ListGroup>
        <ListGroupItem className="ps-0 border-0">
          <Link to="#television">Television</Link>
        </ListGroupItem>
        <ListGroupItem className="ps-0 border-0">
          <Link to="#cooker">Cookers</Link>
        </ListGroupItem>
        <ListGroupItem className="ps-0 border-0">
          <Link to="#fridge">Fridge</Link>
        </ListGroupItem>
        <ListGroupItem className="ps-0 border-0">
          <Link to="#gaming">Gaming</Link>
        </ListGroupItem>
        <ListGroupItem className="ps-0 border-0">
          <Link to="#sound">Sound Bar and Audio</Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  </Col>

  <Col lg="2" md="6" className="mb-4">
    <div className="footer__quick-links">
      <h4 className="quick__links-title">Useful Links</h4>
      <ListGroup>
        <ListGroupItem className="ps-0 border-0">
          <Link to="/shop">Shop</Link>
        </ListGroupItem>
        <ListGroupItem className="ps-0 border-0">
          <Link to="/cart">Cart</Link>
        </ListGroupItem>
        <ListGroupItem className="ps-0 border-0">
          <Link to=".login">Login</Link>
        </ListGroupItem>
        <ListGroupItem className="ps-0 border-0">
          <Link to="#">Privacy Policy</Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  </Col>

  <Col lg="3" md="6" className="mb-4">
    <div className="footer__quick-links">
      <h4 className="quick__links-title">Contact</h4>
      <ListGroup className="footer__contact">
        <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
          <span>
            <i className="ri-phone-line"></i>
          </span>
          <p>+254706542804</p>
        </ListGroupItem>
      </ListGroup>
    </div>
  </Col>
</Row>

          <Col lg="12">
            <p className="footer__copyright text-center">
              Copyright &#169; {year} developed by D&W webtech solutions. All
              rights reserved
            </p>
          </Col>
          <Col lg="12">
            <div className="d-flex justify-content-center gap-4 fw-bold social__links">
              <Link to="https://www.facebook.com">
                <span className="ri-facebook-line"></span>
              </Link>
              <Link to="https://www.instagram.com/viqtech_ke">
                <span className="ri-instagram-line"></span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
