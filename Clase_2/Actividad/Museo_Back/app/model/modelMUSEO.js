import sequelize from "../../config/data/db.js";
import DataTypes from "sequelize";


const Museo = sequelize.define('Museo', {
    
}, 
{ timestamps: false });


export default Museo;
