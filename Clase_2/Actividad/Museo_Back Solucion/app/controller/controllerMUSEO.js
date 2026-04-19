import { Router } from 'express';
import service from '../service/serviceMUSEOS.js';

const router = Router();

// GET todos los museos
router.get('/museos', async (req, res) => {
  try {
    const museos = await service.getAll();
    res.status(200).json(museos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los museos' });
  }
});

// GET museo por id
router.get('/museos/:id', async (req, res) => {
  try {
    const museo = await service.getById(req.params.id);

    if (!museo) {
      return res.status(404).json({ mensaje: 'Museo no encontrado' });
    }

    res.status(200).json(museo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el museo' });
  }
});

// POST crear museo
router.post('/museos', async (req, res) => {
  try {
    const nuevoMuseo = await service.create(req.body);
    res.status(201).json(nuevoMuseo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el museo' });
  }
});

// PUT modificar museo
router.put('/museos/:id', async (req, res) => {
  try {
    const museoActualizado = await service.update(req.params.id, req.body);

    if (!museoActualizado) {
      return res.status(404).json({ mensaje: 'Museo no encontrado' });
    }

    res.status(200).json(museoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el museo' });
  }
});

// DELETE eliminar museo
router.delete('/museos/:id', async (req, res) => {
  try {
    const museoEliminado = await service.remove(req.params.id);

    if (!museoEliminado) {
      return res.status(404).json({ mensaje: 'Museo no encontrado' });
    }

    res.status(200).json({ mensaje: 'Museo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el museo' });
  }
});

export default router;
