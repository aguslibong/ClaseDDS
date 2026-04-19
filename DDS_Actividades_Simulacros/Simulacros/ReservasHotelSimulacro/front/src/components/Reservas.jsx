import React, { useState, useEffect } from 'react';
import Consulta from './ReservaHijos/Consulta.jsx';
import Registro from './ReservaHijos/Registro.jsx';
import service from '../services/reservas.services.js'
import { Link } from 'react-router-dom';
import './Reservas.css'


export default function Reservas() {
    const [action, setAction] = useState('C');
    const [rows, setRows] = useState([]);
    const [selectedReserva, setSelectedReserva] = useState(null);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = async () => {
        const data = await service.getReservas();
        setRows(data);
    };

    const onRegistrar = () => {
        setSelectedReserva (null)
        setAction('R'); 
    };

    const onModificar = (reserva) => {
        setSelectedReserva (reserva)
        setAction('M')
    }

    const onDelete = async(reserva) => {
        await service.deleteReserva(reserva);
        loadData()
    }

    return (
        <div>
            {
                (action === 'R' || action === 'M')  && (
                    <Registro setAction={setAction} loadData={loadData} reserva={selectedReserva} />
                )
            }
            {
                action === 'C' && (
                    <>
                        <Consulta rows={rows} onRegistrar={onRegistrar} onModificar={onModificar} onDelete={onDelete} />
                        <Link to="/" className="btn btn-primary position-absolute bottom-0 start-0 m-3">Menu</Link>

                    </>
                    
                )
            }
        </div>
    )
}
