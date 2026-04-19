function cargarMuseos(){
    const MUSEOS = fetch("http://localhost:3021/museos")

    MUSEOS
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((MUSEOS) => {
            document.getElementById('lista-museos').innerHTML = ''
            for (let museos of MUSEOS) {
            const row =`
                <tr>
                    <td>${museos.nombre}</td>
                    <td>${museos.ubicacion}</td>
                    <td>${museos.exposiciones}</td>
                    <td>${museos.horarios}</td>
                    <td>${museos.precioEntrada}</td>
                </tr>`
            document.getElementById('lista-museos').innerHTML += row
            }
        })
        .catch ((error) => {
            console.log(error)
        })  
} 

cargarMuseos()