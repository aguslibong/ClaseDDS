document.addEventListener('DOMContentLoaded', () => {

    
    const API_URL = 'http://localhost:3000/api/pacientes'; // URL de la API de pacientes

    async function fetchPacientes(nombre) {
        try {
            const response = await fetch(`http://localhost:3000/api/pacientes?propietario=${nombre}`); // Paso 1: Llamar a la API
            if (!response.ok) {
                throw new Error('Error al obtener los pacientes');
            }
    
            const pacientes = await response.json(); // Paso 2: Convertir a JSON
            
            console.log(pacientes)
    
    
            // Paso 4: Llenar la tabla con los datos
            pacientes.forEach(paciente => {
                row = `
                    <tr>
                        <td>${paciente.IdPaciente}</td>
                        <td>${paciente.NombreMascota}</td>
                        <td>${paciente.Propietario}</td>
                        <td>${paciente.Telefono}</td>
                        <td>
                            <button class="btn btn-sm btn-warning">Editar</button>
                            <button class="btn btn-sm btn-danger">Eliminar</button>
                        </td>
                    </tr>
                    `
                ;
                document.getElementById("patientsTableBody").innerHTML += row
            });
            
    
        } catch (error) {
            console.error(error);
            window.alert("No se pudieron cargar los pacientes");
        }
    }
    
    // Llamar a la función al cargar la página
    fetchPacientes();
    

}); // Fin DOMContentLoaded