import React from 'react';
import Card from "../componentes/Card.jsx"

const MenuGranja = ({datos}) => {
    return (
        <div className="cards">
                    {datos.map((d) => (
                        <Card nombre={d.nombre} desc={d.descripcion} foto={d.foto}></Card>
                    ))};
                </div>
    );
};

export default MenuGranja;