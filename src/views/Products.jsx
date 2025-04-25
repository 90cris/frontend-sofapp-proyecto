import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Container, Row, Col, Dropdown, Stack, Card, Button } from "react-bootstrap";
import { formatPrice } from "../helpers/helpers";
import Spinner from "../components/Spinner";

const Products = () => {
  const { getProducts, fetchProductsByBrand, fetchProductsByType, fetchProductsByBody } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBody, setSelectedBody] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error("La respuesta no es un array válido.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

useEffect(() => {
  const loadFilteredProducts = async () => {
    setLoading(true);
    try {
      let data = [];
      
      if (selectedBrand) {
        data = await fetchProductsByBrand(selectedBrand);
      } else if (selectedType) {
        data = await fetchProductsByType(selectedType);
      } else if (selectedBody) {
        data = await fetchProductsByBody(selectedBody);
      } else {
        // Recarga de productos
        data = await getProducts();
      }

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        throw new Error("La respuesta no es un array válido.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  // Solo ejecutamos la búsqueda si hay algún filtro seleccionado
  if (selectedBrand || selectedType || selectedBody) {
    loadFilteredProducts();
  }
}, [selectedBrand, selectedType, selectedBody]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center">Productos disponibles</h1>
      <p className="text-center">
        Encuentra el sofá que buscas y haz clic en "Ver Detalles" para más información.
      </p>

      <Container id="filtros" className="mb-3">
  <Stack direction="horizontal" gap={2} className="justify-content-center">
    Filtrar por:
    
    <Dropdown onSelect={(eventKey) => setSelectedBrand(eventKey)}>
      <Dropdown.Toggle variant="success">
        {selectedBrand || "Marca"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="Mueblez vintaje">Mueblez vintaje</Dropdown.Item>
        <Dropdown.Item eventKey="Rosen">Rosen</Dropdown.Item>
        <Dropdown.Item eventKey="Ikea">IKEA</Dropdown.Item>
        <Dropdown.Item eventKey="Otra">Otra</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    
    <Dropdown onSelect={(eventKey) => setSelectedType(eventKey)}>
      <Dropdown.Toggle variant="success">
        {selectedType || "Tipo"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="Sillon">Sillón</Dropdown.Item>
        <Dropdown.Item eventKey="Bergere">Bergere</Dropdown.Item>
        <Dropdown.Item eventKey="Sofa">Sofá</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown onSelect={(eventKey) => setSelectedBody(eventKey)}>
      <Dropdown.Toggle variant="success">
        {selectedBody || "Cuerpo"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="1">1 cuerpo</Dropdown.Item>
        <Dropdown.Item eventKey="2">2 cuerpos</Dropdown.Item>
        <Dropdown.Item eventKey="3">3 cuerpos</Dropdown.Item>
        <Dropdown.Item eventKey="4">4 cuerpos</Dropdown.Item>
        <Dropdown.Item eventKey="5">5 cuerpos</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Button
      variant="secondary"
      onClick={() => window.location.reload()}
    >
      Reiniciar Filtros
    </Button>
  </Stack>
</Container>


      <Row className="mb-3">
        {products.length === 0 ? (
          <p className="text-center w-100">No hay productos disponibles.</p>
        ) : (
          products.map((producto) => (
            <Col key={producto.id} sm={6} md={4} lg={3} className="mb-2">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="text-center">{producto.nombre}</Card.Title>
                </Card.Body>
                <Card.Img variant="top" src={producto.foto} className="product-image" />

                <Card.Footer>
                  <Row>
                    <Col className="text-center align-self-center">
                    <strong>Precio: </strong>{formatPrice(producto.precio)}
                    </Col>
                    <Col>
                      <Button
                        variant="warning"
                        onClick={() => navigate(`/product/${producto.id}`)}
                      >
                        Ver Detalles
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Products;
