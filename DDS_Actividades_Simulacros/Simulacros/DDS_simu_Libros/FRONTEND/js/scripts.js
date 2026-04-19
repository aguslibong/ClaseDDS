const cargarLibros = () => { 
    const libros = fetch ("http://localhost:3000/libros");
    
    //ejecutar promesa de libros
    libros
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((libros) =>{
            document.getElementById("lista-libros").innerHTML += '';
            for (let libro of libros) {
                const row = `
                <tr>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.genero}</td>
                    <td>${libro.editorial}</td>
                    <td>${libro.año_publicacion}</td>
                </tr>
                `;
                document.getElementById("lista-libros").innerHTML += row;
            }
        })
        .catch((error) => console.log("Error al cargar los museos: ", error));
        console.log("Carga pendiente de museos...");
   
       
}

cargarLibros()


const filtro = () => {
    const filtro = document.getElementById("input-filtro").value;
    const libros = fetch (`http://localhost:3000/libros/${filtro}`)
    libros
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((libros) =>{
            for (let libro of libros) {
                const row = `
                <tr>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.genero}</td>
                    <td>${libro.editorial}</td>
                    <td>${libro.año_publicacion}</td>
                </tr>
                `;
                document.getElementById("lista-libros-filtro").innerHTML += row;
            }
        })
        .catch((error) => console.log("Error al cargar los museos: ", error));
        console.log("Carga pendiente de museos...");
}

const limpiar = () => {
    document.getElementById("lista-libros-filtro").innerHTML = '';
}
