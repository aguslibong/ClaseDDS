import MUSEO from "../model/modelMUSEO.js";
import {Op} from "sequelize";

async function getAll() {
  return await MUSEO.findAll();
}

async function getById(id) {
  return await MUSEO.findByPk(id);
}

async function create(data) {
  return await MUSEO.create(data);
}

async function update(id, data) {
  const museo = await MUSEO.findByPk(id);

  if (!museo) {
    return null;
  }

  await museo.update(data);
  return museo;
}

async function remove(id) {
  const museo = await MUSEO.findByPk(id);

  if (!museo) {
    return null;
  }

  await museo.destroy();
  return museo;
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
