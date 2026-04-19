import MUSEO from "../model/modelMUSEO.js";
import {Op} from "sequelize";

async function getMuseos() {
    return await MUSEO.findAll()
}

async function getMuseoUbicaion(ubi){
    return await MUSEO.findAll({
        where:{ 
            ubicacion: {[Op.like]: `${ubi}%`}
        }
    })
}

export default {getMuseoUbicaion , getMuseos}

