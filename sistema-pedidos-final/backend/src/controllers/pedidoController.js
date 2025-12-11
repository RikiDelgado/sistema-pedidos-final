// src/controllers/pedidoController.js
import { Pedido } from "../models/Pedido.js";

export async function crearPedido(req, res) {
  try {
    const { descripcion } = req.body;

    if (!descripcion) {
      return res.status(400).json({ mensaje: "La descripción es obligatoria." });
    }

    const pedido = await Pedido.create({
      descripcion,
      usuarioId: req.usuario.id,
    });

    res.json(pedido);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
}

export async function misPedidos(req, res) {
  try {
    const pedidos = await Pedido.findAll({
      where: { usuarioId: req.usuario.id },
      order: [["id", "DESC"]],
    });

    res.json(pedidos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
}

export async function cambiarEstado(req, res) {
  try {
    const id = Number(req.params.id);
    const { estado } = req.body;

    const lista = ["pendiente", "en_proceso", "finalizado"];
    if (!lista.includes(estado)) {
      return res.status(400).json({ mensaje: "Estado no válido." });
    }

    const pedido = await Pedido.findByPk(id);
    if (!pedido) return res.status(404).json({ mensaje: "No existe" });

    pedido.estado = estado;
    await pedido.save();

    res.json(pedido);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
}

export async function listarTodos(req, res) {
  try {
    const pedidos = await Pedido.findAll({
      include: { all: true },
      order: [["id", "DESC"]],
    });

    res.json(pedidos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
}
