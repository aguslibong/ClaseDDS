import { useEffect, useState } from "react";

import "../style/granja.css"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Consultar from "./Consultar.jsx";
import Registrar from "./Registrar.jsx";
import service from "../service/service.js";


function GranjaFeliz() {

    // Granja = G, Domesticos = D
    const [estado, setEstado] = useState("G")
    const [datos, setDatos] = useState([])

    useEffect(()=>{
        fetchData()
    } ,[]);

    async function fetchData(){
        const datos = await service.getDatos();
        setDatos(datos)
        console.log(datos)
        return datos;
    };

    return (
        <div className="container">
            <h1 className="titulo-granja">Granja Feliz</h1>
            <p>Hola putitos a la granja feliz.</p>
            {(estado === "G") ? (
                <Consultar datos={datos}></Consultar>
            ) : (
                <Registrar></Registrar>
            )}

            <div>
                <Button variant="outline-info" onClick= {() => {setEstado((estado === "D")?"G":"D");}}>{(estado==="D")?"Consultar":"Registrar"}</Button>
            </div>
        </div>
    );
}

export default GranjaFeliz;