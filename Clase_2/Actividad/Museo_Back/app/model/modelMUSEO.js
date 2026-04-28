import sequelize from "../../config/data/db.js";
import DataTypes from "sequelize";


const Museo = sequelize.define('Museo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING
    },
    exposiciones: {
        type: DataTypes.TEXT // Usamos TEXT por si la descripción es larga
    },
    horarios: {
        type: DataTypes.STRING
    },
    precioEntrada: {
        type: DataTypes.DECIMAL(10, 2) // Ideal para precios/moneda
    }
}, {
    timestamps: false,
    tableName: 'museos' // Opcional: para definir el nombre exacto de la tabla
});
    
 
{ timestamps: false };


export default Museo;



