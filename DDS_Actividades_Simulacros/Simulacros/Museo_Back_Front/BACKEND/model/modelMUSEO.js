import sequelize from "../data/db.js";
import DataTypes from "sequelize";


const Museo = sequelize.define('Museo', {
    nombre: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    exposiciones: DataTypes.STRING,
    horarios: DataTypes.STRING,
    precioEntrada: DataTypes.STRING
}, 
{ timestamps: false });


export default Museo;
