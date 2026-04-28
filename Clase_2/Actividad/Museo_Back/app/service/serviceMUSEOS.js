import MUSEO from "../model/modelMUSEO.js";
import {Op} from "sequelize";

//service
async function obtenerTodos() {
  return await MUSEO.findAll();
}

async function crearMuseo(datosMuseo) {
  return await MUSEO.create(datosMuseo);
}
async function actualizarMuseo(id, datosActualizados) {
  const museo = await MUSEO.findByPk(id);

  if (!museo) {
    return null;
  }

  await museo.update(datosActualizados);

  return museo;
}
async function eliminarMuseo(id) {
  const museo = await MUSEO.findByPk(id);

  if (!museo) {
    return null;
  }

  await museo.destroy();

  return museo;
}
export default {
  obtenerTodos,
  crearMuseo,
  actualizarMuseo,
  eliminarMuseo,
};