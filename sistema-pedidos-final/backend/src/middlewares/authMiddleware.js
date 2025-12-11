// backend/src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ mensaje: "No estás autenticado" });

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET || "secreto_local");
    req.usuario = datos;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
}

export function soloAdmin(req, res, next) {
  if (!req.usuario) return res.status(401).json({ mensaje: "No autenticado" });
  if (req.usuario.rol !== "admin") return res.status(403).json({ mensaje: "No tenés permiso" });
  next();
}
