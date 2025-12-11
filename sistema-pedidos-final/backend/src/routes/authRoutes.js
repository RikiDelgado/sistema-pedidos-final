//backend/src/routes/authRoutes.js
import { Router } from "express";
import { registrar, login, perfil, logout } from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/registrar", registrar);
router.post("/login", login);
router.post("/logout", logout);
router.get("/perfil", verificarToken, perfil);

export default router;