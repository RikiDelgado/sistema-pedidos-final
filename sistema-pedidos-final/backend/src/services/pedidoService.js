// src/services/pedidoService.js
import { prisma } from "../config/prisma.js";

export async function crearPedidoDB({ descripcion, usuarioId }) {
  return prisma.pedido.create({
    data: {
      descripcion,
      usuarioId
    }
  });
}

export async function obtenerPedidosDeUsuario(usuarioId) {
  return prisma.pedido.findMany({
    where: { usuarioId },
    orderBy: { creadoEn: "desc" }
  });
}

export async function cambiarEstadoDB({ pedidoId, estado }) {
  return prisma.pedido.update({
    where: { id: pedidoId },
    data: { estado }
  });
}

export async function obtenerTodosLosPedidos() {
  return prisma.pedido.findMany({
    include: { usuario: true },
    orderBy: { creadoEn: "desc" }
  });
}
