// backend/src/index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productosRouter from "./routes/productos.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

import { manejarErrores } from "./middlewares/errorMiddleware.js";
import { probarConexion, db } from "./config/db.js";

// importar modelos (asegura que se definan las relaciones)
import "./models/Usuario.js";
import "./models/Pedido.js";
import "./models/Producto.js";


const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS (frontend en 5173)
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Probar conexión a DB (top-level await si tu Node lo permite)
await probarConexion();

// Rutas: montamos auth en /api/auth para coincidir con el frontend
app.use("/api/auth", authRoutes);
app.use("/api/productos", productosRouter);
app.use("/api/pedidos", pedidoRoutes);

// Manejo de errores
app.use(manejarErrores);

const PORT = process.env.PORT || 4000;

async function iniciar() {
  try {
    // sincroniza modelos con la DB (solo en desarrollo)
    await db.sync({ alter: true });
    console.log("Modelos sincronizados.");

    app.listen(PORT, () =>
      console.log(`Servidor backend escuchando en puerto ${PORT}`)
    );
  } catch (error) {
    console.error("Error al iniciar:", error);
  }
}

iniciar();
