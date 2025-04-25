import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import whatsappIcon from "../assets/whatsapp-line.svg";
import { formatPrice } from "../helpers/helpers";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, fetchUserDataByProduct } =
    useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const productDataById = await fetchProductById(id);
      setProduct(productDataById);
    };
    loadProduct();
  }, [id]);

  useEffect(() => {
    const getProductData = async () => {
      const productData = await fetchUserDataByProduct(id);
      setUserData(productData);
    };
    getProductData();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-5">Cargando producto...</p>;
  }

  return (
    <Container className="mt-4">
      <Row className="mb-5">
        <Col className="justify-content-center">
          <div>
            <Card className="product">
              <Row>
                <Col>
                  <Card.Img
                    variant="top"
                    src={product.foto || "placeholder.jpg"}
                    alt={product.nombre}
                    className="product-image"
                  />
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title className="product-name">
                      {product.nombre}
                    </Card.Title>

                    <Card.Text>
                      <strong>Marca:</strong> {product.marca}
                    </Card.Text>
                    <Card.Text>
                      <strong>Tipo:</strong> {product.tipo}
                    </Card.Text>
                    <Card.Text>
                      <strong>Cuerpo:</strong> {product.cuerpo}
                    </Card.Text>
                    <Card.Text>
                      <strong>Color:</strong> {product.color}
                    </Card.Text>
                    <Card.Text>
                      <strong>Ancho:</strong> {product.ancho} cm
                    </Card.Text>
                    <Card.Text>
                      <strong>Alto:</strong> {product.alto} cm
                    </Card.Text>
                    <Card.Text className="product-price">
                    <strong>Precio: </strong>{formatPrice(product.precio)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Stock:</strong> {product.stock}
                    </Card.Text>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                      Volver atrás
                    </Button>
                  </Card.Body>
                  {/* Contenedor de datos del cliente */}
                  <div className="m-4 p-3 border rounded">
                    <h5>Información del vendedor</h5>
                    {userData ? (
                      <>
                        <p>
                          <strong>Nombre:</strong> {userData.nombre}{" "}
                          {userData.apellido}
                        </p>
                        <p>
                          <strong>Email:</strong> {userData.email}
                        </p>
                        <div className="DatosUsuario">
                          <strong>Teléfono:</strong> {userData.fono}{" "}
                          <a
                            href={`https://wa.me/${userData.fono}?text=Quiero información sobre un producto`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-link"
                          >
                            <img
                              src={whatsappIcon}
                              alt="WhatsApp"
                              style={{ width: '20px', height: '20px', marginLeft: '5px' }} // Ajusta el tamaño como necesites
                            />
                          </a>
                        </div>
                      </>
                    ) : (
                      <p>Cargando datos del vendedor...</p>
                    )}
                  </div>
                </Col>

              </Row>

            </Card>
            <div className="mt-4">
              <strong>Descripcion:</strong>
              <Card.Text className="product-description">
                {product.detalle}
              </Card.Text>
            </div>

          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
