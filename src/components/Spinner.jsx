import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MySpinner = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setData("");
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : (
        <p className="fade-in">{data}</p>
      )}
    </div>
  );
};

export default MySpinner;

