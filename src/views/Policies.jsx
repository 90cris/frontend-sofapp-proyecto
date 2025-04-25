import React from 'react';

const PoliciesView = () => {
    return (
        <div className="col-10 col-sm-10 col-md-10 mx-auto mt-5 px-3 pt-3 border border-dark rounded">
            <h1 className="policies-title">Políticas del Marketplace</h1>
            <section className="policies-section">
                <h3 className="policies-subtitle">Política de Privacidad</h3>
                <p className="policies-text">
                    En nuestro marketplace, valoramos tu privacidad. Toda la información personal que compartas con nosotros será tratada con la máxima confidencialidad y seguridad.
                </p>
            </section>
            <section className="policies-section">
                <h3 className="policies-subtitle">Política de Envíos</h3>
                <p className="policies-text">
                    Los vendedores son responsables de enviar los productos a los clientes. Los tiempos de entrega pueden variar según la ubicación del vendedor y del cliente.
                </p>
            </section>
            <section className="policies-section">
                <h3 className="policies-subtitle">Política de Comunicación</h3>
                <p className="policies-text">
                    Los vendedores deben mantener una comunicación clara y oportuna con los clientes para resolver cualquier duda o problema relacionado con la compra.
                </p>
            </section>

            <section className="policies-section">
                <h3 className="policies-subtitle">Política de Página</h3>
                <p className="policies-text">
                Esta página no se hace responsable de las negociaciones que se realicen entre el cliente y el vendedor en relación con la venta de productos. El sitio está diseñado exclusivamente para promocionar sillones y sofás, permitiendo a los vendedores llevar a cabo la venta de sus productos. Las negociaciones y acuerdos que se establezcan son responsabilidad exclusiva de las partes involucradas cliente y vendedor.
                </p>
            </section>
        </div>
    );
};

export default PoliciesView;