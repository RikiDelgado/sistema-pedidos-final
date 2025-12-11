// src/routes/pedidoRoutes.js
import { Router } from "express";
import { crearPedido, misPedidos, cambiarEstado, listarTodos } from "../controllers/pedidoController.js";
import { verificarToken, soloAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", verificarToken, crearPedido);
router.get("/mios", verificarToken, misPedidos);
router.put("/:id", verificarToken, cambiarEstado);
router.get("/todos", verificarToken, soloAdmin, listarTodos);

export default router;
