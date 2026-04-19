

const animales = [
    { nombre: 'Chancho', descripcion: 'Gordo gay', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXnF7lSzRE-hPZIJHlizRLev03m-a5WJU1g&s' },
    {
        nombre: "Misterio",
        descripcion: "Gato negro que aparece solo de noche",
        foto: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg"
    },
    {
        nombre: "Pepito",
        descripcion: "Loro que repite todo, le encanta la música",
        foto: "https://cdn.pixabay.com/photo/2017/01/20/00/30/macaw-1996338_1280.jpg"
    }
]

async function getDatos () {
    return animales
};

async function registrarAnimal(data){
    animales.push(data)
};

export default {getDatos, registrarAnimal}