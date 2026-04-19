const URL = 'http://localhost:3001/reservas';

const getReservas = async() => {
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data)
        return data;
        
    } catch (error) {
        console.error('Error fetching reservas:', error);
        return [];
    }
}

const saveReserva = async(reserva) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserva)
        };

        const res = await fetch(URL, requestOptions);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error saving reserva:', error);
        return null;
    }
}

const deleteReserva = async (reserva) => {
    console.log(reserva)
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserva)
        };

        const res = await fetch(URL, requestOptions);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error Elminando reserva:', error);
        return null;
    }
}

const updateReserva = async (reserva) => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserva)
        };

        const res = await fetch(URL, requestOptions);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error Elminando reserva:', error);
        return null;
    }
}



export default {getReservas,saveReserva,deleteReserva,updateReserva}
