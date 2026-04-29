import sequelize from "../../config/data/db.js";
import DataTypes from "sequelize";


const Museo = sequelize.define('Museo', {
    //atributos del museo (id INTEGER, nombre STRING, ubicacion STRING, exposiciones TEXT, horarios STRING, precioEntrada DECIMAL)
    


    
}, {
    timestamps: false,
    tableName: 'museos' // Opcional: para definir el nombre exacto de la tabla
});
    
 
{ timestamps: false };


export default Museo;



