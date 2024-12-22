import { Container, Col, Row } from "reactstrap";
import ProductList from "./ProductsList";

export default function Television({ products }) {
  // Filter products by category 'television'
  const televisionProducts = products.filter(product => product.category === 'television');
  
  return (
    <Container>
      <Row className="d-flex justify-content-between gap-5">
        <Col lg="12" className="text-center">
          <h2 className="section__title" id="television">
            Television
          </h2>
        </Col>
        <ProductList data={televisionProducts} />
      </Row>
    </Container>
  );
}
