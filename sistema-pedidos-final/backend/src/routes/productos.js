// backend/src/routes/productos.js
import { Router } from "express";
import { Producto } from "../models/Producto.js";
import { verificarToken, soloAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Listar paginado: /api/productos?page=1&limit=10
router.get("/", async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const offset = (page - 1) * limit;

    const { count, rows } = await Producto.findAndCountAll({
      order: [["id", "ASC"]],
      limit,
      offset,   
    });

    res.json({
      pagina: page,
      total: count,
      datos: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
});

// Obtener por id
router.get("/:id", async (req, res) => {
  try {
    const p = await Producto.findByPk(req.params.id);
    if (!p) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error" });
  }
});

// Crear (solo admin)
router.post("/", verificarToken, soloAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    if (!nombre || precio == null) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const nuevo = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock: stock ?? 0,
    });

    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al crear producto" });
  }
});

// Actualizar (solo admin)
router.put("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const p = await Producto.findByPk(req.params.id);
    if (!p) return res.status(404).json({ mensaje: "Producto no encontrado" });

    p.nombre = nombre ?? p.nombre;
    p.descripcion = descripcion ?? p.descripcion;
    p.precio = precio ?? p.precio;
    p.stock = stock ?? p.stock;

    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al actualizar" });
  }
});

// Eliminar (solo admin)
router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const p = await Producto.findByPk(req.params.id);
    if (!p) return res.status(404).json({ mensaje: "Producto no encontrado" });

    await p.destroy();
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
});

export default router;
