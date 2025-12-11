// frontend/src/api/pedidosApi.js
import { pedir } from "./cliente";

// Listar pedidos (admin)
export function listarPedidos() {
  return pedir("/api/pedidos");
}

// Actualizar estado de un pedido
export function actualizarPedido(id, data) {
  return pedir(`/api/pedidos/${id}`, "PUT", data);
}
