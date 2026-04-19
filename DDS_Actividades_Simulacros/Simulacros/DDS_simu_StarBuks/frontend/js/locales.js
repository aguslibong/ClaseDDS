const cargarlocals = () =>{
    const locales =  fetch("http://localhost:3000/locales");

    //ejecutar promesa de{locals
    locales
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((locales) =>{
            document.getElementById("datos").innerHTML = '';
            for (let local of locales) {
                let row = `
                <tr>
                    <td>${local.STORE_NUMBER}</td>
                    <td>${local.STORE_NAME}</td>
                    <td>${local.STREET_ADDRESS}</td>
                    <td>${local.CITY}</td>
                    <td>${local.LATITUDE}</td>
                    <td>${local.LONGITUDE}</td>
                </tr>
                `;
                console.log("holagai")
                document.getElementById("datos").innerHTML += row;
            }
        })
        .catch((error) => console.log("Error al cargar los museos: ", error));
        console.log("Carga pendiente de museos...");
}

cargarlocals();

function soloInterior () {
    const locales =  fetch("http://localhost:3000/locales/interior");

    //ejecutar promesa de{locals
    locales
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((locales) =>{
            document.getElementById("datos").innerHTML = '';
            for (let local of locales) {
                let row = `
                <tr>
                    <td>${local.STORE_NUMBER}</td>
                    <td>${local.STORE_NAME}</td>
                    <td>${local.STREET_ADDRESS}</td>
                    <td>${local.CITY}</td>
                    <td>${local.LATITUDE}</td>
                    <td>${local.LONGITUDE}</td>
                </tr>
                `;
                console.log("holagai")
                document.getElementById("datos").innerHTML += row;
            }
        })
        .catch((error) => console.log("Error al cargar los museos: ", error));
        console.log("Carga pendiente de museos...");
}