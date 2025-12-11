// frontend/src/api/reportesApi.js
import { pedir } from "./cliente";

// Reporte simple de ventas
export function reporteVentas() {
  return pedir("/api/reportes/ventas");
}
