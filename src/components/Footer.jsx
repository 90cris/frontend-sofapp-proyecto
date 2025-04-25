import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/sofapp-logo.svg";

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-4 mt-auto">
            <div className="container text-center text-md-left">
                <div className="row">
                    <div className="col-md-4">
                        <img src={logo} alt="Logo" width="50"
          height="50" className="mb-3" />
                    </div>
                    <div className="col-md-4">
                        <h5 className="text-uppercase">¡Visita nuestras redes sociales!</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://facebook.com" className="text-white">Facebook</a>
                            </li>
                            <li>
                                <a href="https://twitter.com" className="text-white">Twitter</a>
                            </li>
                            <li>
                                <a href="https://instagram.com" className="text-white">Instagram</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5 className="text-uppercase">© 2025</h5>
                        <p>Todos los derechos reservados</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;