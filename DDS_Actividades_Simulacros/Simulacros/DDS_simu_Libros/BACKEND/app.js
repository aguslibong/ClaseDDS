//instalar los paqueted necesario
//importar los modulos, los voy a importar a medida los necesite
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const express = require("express");
const cors = require ("cors")
const DataTypes = require("sequelize");
const {Op} = require("sequelize");

//crear servidor
const app = express(); 
app.use(express.json());
app.use(cors());

//model Libro
const Libro = sequelize.define("Libro",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo:{
        type: DataTypes.STRING
    },
    autor:{
        type: DataTypes.STRING
    },
    genero:{
        type: DataTypes.STRING
    },
    año_publicacion:{
        type: DataTypes.INTEGER
    },
    editorial:{
        type: DataTypes.STRING,
    }
})

//cmo nos dan los datos de los libros, vamos a crear su clase Libro
async function inicializarBaseDeDatos() {
    await sequelize.sync({ force: true });
    await Libro.bulkCreate([
        { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", año_publicacion: 1967, editorial: "Sudamericana" },
        { id: 2, titulo: "1984", autor: "George Orwell", genero: "Distopía", año_publicacion: 1949, editorial: "Secker & Warburg" },
        { id: 3, titulo: "El señor de los anillos", autor: "J.R.R. Tolkien", genero: "Fantasía épica", año_publicacion: 1954, editorial: "Allen & Unwin" },
        { id: 4, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Novela satírica", año_publicacion: 1605, editorial: "Juan de la Cuesta" },
        { id: 5, titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", genero: "Fantasía", año_publicacion: 1997, editorial: "Bloomsbury" },
        { id: 6, titulo: "Orgullo y prejuicio", autor: "Jane Austen", genero: "Novela romántica", año_publicacion: 1813, editorial: "T. Egerton" },
        { id: 7, titulo: "El amor en los tiempos del cólera", autor: "Gabriel García Márquez", genero: "Novela romántica", año_publicacion: 1985, editorial: "Oveja Negra" },
        { id: 8, titulo: "Moby Dick", autor: "Herman Melville", genero: "Novela de aventuras", año_publicacion: 1851, editorial: "Richard Bentley" },
        { id: 9, titulo: "La Odisea", autor: "Homero", genero: "Epopeya", año_publicacion: "Siglo VIII a.C.", editorial: "Desconocida" },
        { id: 10, titulo: "El retrato de Dorian Gray", autor: "Oscar Wilde", genero: "Novela filosófica", año_publicacion: 1890, editorial: "Lippincott's Monthly Magazine" }
    ]);
}

//desarrolle su servidor backend aqui 
// vamos a ver si podemos hacer un ENDPIONT para un get q muestre los libros

/*app.get('/libros', async(req,res) => {
    try {
        console.log(req.query.titulo)
        if ((req.query.titulo !== undefined) && (req.query.titulo !== '')){
            const libros = await Libro.findAll({
                where:{
                    titulo: {
                        [Op.like]: `%${req.query.titulo}%`  
                    }
                }
            });
            res.json(libros); 
        }else{
            const libros = await Libro.findAll();
            res.json(libros)
        }   
    } catch (error){
        console.log (error)
    } 
})*/

app.get('/libros/:titulo', async(req,res) => {
    try {
        const libros = await Libro.findAll({
            where:{
                titulo: {
                    [Op.like]: `%${req.params.titulo}%`  
                }
            }
        }) 
        res.json(libros)
    }
        catch (error){
        console.log (error)
    } 
})

app.get('/libros', async(req,res) => {
    try {
        const libro = await Libro.findAll();
        res.json(libro)    
    }
        catch (error){
        console.log (error)
    } 
})


// vamos a pobra si levanta servidor
inicializarBaseDeDatos() 
    .then (()=>{
        app.listen(3000, console.log("LISTO REY SERVIDOR ANDANDO"))
    })


