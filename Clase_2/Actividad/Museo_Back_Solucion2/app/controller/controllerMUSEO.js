import { Router } from 'express';
import service from '../service/serviceMUSEOS.js';
import serviceMUSEOS from '../service/serviceMUSEOS.js';

const router = Router();

/**
 * @swagger
 * /museos:
 *   get:
 *     summary: Obtener todos los museos
 *     tags: [Museos]
 *     responses:
 *       200:
 *         description: Lista de museos obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/museos", async (req, res) => {
  try {
    const museos = await service.obtenerTodos();
    res.status(200).json(museos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener museos",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /museos:
 *   post:
 *     summary: Crear un nuevo museo
 *     tags: [Museos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Museo creado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.post("/museos", async (req, res) => {
  try {
    const nuevoMuseo = await service.crearMuseo(req.body);

    res.status(201).json({
      mensaje: "Museo creado correctamente",
      museo: nuevoMuseo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear museo",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /museos/{id}:
 *   put:
 *     summary: Actualizar un museo existente
 *     tags: [Museos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del museo
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Museo actualizado correctamente
 *       404:
 *         description: Museo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/museos/:id", async (req, res) => {
  try {
    const museoActualizado = await service.actualizarMuseo(
      req.params.id,
      req.body
    );

    if (!museoActualizado) {
      return res.status(404).json({
        mensaje: "Museo no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Museo actualizado correctamente",
      museo: museoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar museo",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /museos/{id}:
 *   delete:
 *     summary: Eliminar un museo
 *     tags: [Museos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del museo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Museo eliminado correctamente
 *       404:
 *         description: Museo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/museos/:id", async (req, res) => {
  try {
    const museoEliminado = await service.eliminarMuseo(req.params.id);

    if (!museoEliminado) {
      return res.status(404).json({
        mensaje: "Museo no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Museo eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar museo",
      error: error.message,
    });
  }
});

export default router;