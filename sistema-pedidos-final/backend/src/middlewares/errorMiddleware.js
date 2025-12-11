// src/middlewares/errorMiddleware.js
export function manejarErrores(err, req, res, next) {
  console.error("ERROR:", err);
  res.status(500).json({
    mensaje: "Ocurrió un error en el servidor",
    detalle: err.message
  });
}
