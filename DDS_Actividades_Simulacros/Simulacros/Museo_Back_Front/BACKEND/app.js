import Express from "express";
import Cors from "cors";
import sequelize from "./data/db.js";
import MUSEO from "./model/modelMUSEO.js"
import service from "./service/serviceMUSEOS.js";

const app = Express();
app.use(Express.json());
app.use(Cors()); 


async function inicializarBaseDeDatos() {
    await sequelize.sync({ force: true });
    await MUSEO.bulkCreate([
        { nombre: 'Museo del Prado', ubicacion: 'Madrid, España', exposiciones: 'Clásicos del Renacimiento', horarios: '09:00 - 18:00', precioEntrada: '15€' },
        { nombre: 'Louvre', ubicacion: 'París, Francia', exposiciones: 'Arte y Cultura Egipcia', horarios: '09:00 - 20:00', precioEntrada: '17€' },
        { nombre: 'Museo de Arte Moderno de Buenos Aires', ubicacion: 'Buenos Aires, Argentina', exposiciones: 'Arte Contemporáneo Latinoamericano', horarios: '10:00 - 19:00', precioEntrada: '500 ARS' },
        { nombre: 'Museo Nacional de Bellas Artes', ubicacion: 'Buenos Aires, Argentina', exposiciones: 'Arte Europeo y Argentino', horarios: '11:00 - 20:00', precioEntrada: 'Gratis' },
        { nombre: 'MALBA', ubicacion: 'Buenos Aires, Argentina', exposiciones: 'Frida Kahlo y Diego Rivera', horarios: '12:00 - 20:00', precioEntrada: '630 ARS' },
        { nombre: 'Museo de Arte Tigre', ubicacion: 'Tigre, Buenos Aires, Argentina', exposiciones: 'Arte Argentino del Siglo XIX', horarios: '10:00 - 18:00', precioEntrada: '240 ARS' },
        { nombre: 'Smithsonian', ubicacion: 'Washington D.C., USA', exposiciones: 'Historia Natural', horarios: '10:00 - 17:30', precioEntrada: 'Gratis' },
        { nombre: 'Museo Egipcio de Turín', ubicacion: 'Turín, Italia', exposiciones: 'Artefactos del Antiguo Egipto', horarios: '09:00 - 19:00', precioEntrada: '15€' },
        { nombre: 'Museo Van Gogh', ubicacion: 'Ámsterdam, Países Bajos', exposiciones: 'Obra de Vincent van Gogh', horarios: '09:00 - 18:00', precioEntrada: '19€' },
        { nombre: 'Museo Guggenheim', ubicacion: 'Bilbao, España', exposiciones: 'Arte Moderno y Contemporáneo', horarios: '10:00 - 20:00', precioEntrada: '13€' },
    ]);
};


app.get('/museos', async(req,res) => {
    console.log (req.params.ubicacion)
    if (req.params.ubicacion !== undefined && req.params.ubicacion !== ''){
        const resultado = service.getMuseoUbicaion(req.params.ubicacion);
        res.json(resultado)
    } else {
        const resultado = await service.getMuseos();
    res.json(resultado)
    }
})


inicializarBaseDeDatos().then(() => {
    app.listen(3021, () => console.log(':::::::::::::::::::::::)'));
});
