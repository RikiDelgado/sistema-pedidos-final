// frontend/src/api/productosApi.js
import { pedir } from "./cliente";

export function listarProductos({ page = 1, limit = 10 } = {}) {
  return pedir(`/api/productos?page=${page}&limit=${limit}`, "GET");
}

export function obtenerProductos(page = 1, limit = 10) {
  return pedir(`/api/productos?page=${page}&limit=${limit}`, "GET");
}

export function crearProducto(data) {
  return pedir("/api/productos", "POST", data);
}

export function actualizarProducto(id, data) {
  return pedir(`/api/productos/${id}`, "PUT", data);
}

export function eliminarProducto(id) {
  return pedir(`/api/productos/${id}`, "DELETE");
}
