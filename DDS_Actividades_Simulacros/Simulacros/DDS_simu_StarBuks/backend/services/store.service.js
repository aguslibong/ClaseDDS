import model from "../models/STARBUCKS_model.js"
import {Op} from 'sequelize';

const get_all_AR = async (req, res) => {
    try{
        const respuesta = await model.findAll({
            where:{
                COUNTRY: "AR"
            }
        });
        res.json(respuesta);
    }
    catch (error){
        console.log(error)
    }
}
//- que devuelve todos los locales de argentina que no pertenecen al AMBA (PROVINCE != C y de B).
const get_all_AR_NO_AMBA = async (req, res) => {
    try{
        const respuesta = await model.findAll({
            where:{
                [Op.and]: [
                    { COUNTRY: "AR" },
                    { [Op.not]: { PROVINCE: ["C", "B"] } }
                ]  
                //COUNTRY: "AR",
                //PROVINCE: {[Op.notIn]: ["C", "B"]}  
            }
        });
        res.json(respuesta);
    }
    catch (error){
        console.log(error)
    }
}

   

export default {get_all_AR, get_all_AR_NO_AMBA};
