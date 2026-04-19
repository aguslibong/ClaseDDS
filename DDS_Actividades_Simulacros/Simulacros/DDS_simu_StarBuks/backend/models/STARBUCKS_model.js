import sequelize from "../data/db.js";
import { DataTypes} from "sequelize";


const STARBUCKS_DIRECTORY = sequelize.define(
    "STARBUCKS_DIRECTORY",{
        STORE_NUMBER:{
            type: DataTypes.TEXT,
            allowNull:false,
            primaryKey:true
        },
        STORE_NAME:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        STREET_ADDRESS:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        CITY:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        PROVINCE:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        COUNTRY:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        POSTCODE:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        LONGITUDE:{
            type: DataTypes.REAL,
            allowNull: false
        },
        LATITUDE:{
            type: DataTypes.REAL,
            allowNull: false
        }
    },
    {
        timestamps:false,
        freezeTableName:true,
        tableName: "STARBUCKS_DIRECTORY"
    }
)

export default STARBUCKS_DIRECTORY;