// src/config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export async function probarConexion() {
  try {
    await db.authenticate();
    console.log("🔌 Conectado correctamente a PostgreSQL");
  } catch (error) {
    console.error("❌ Error al conectar a PostgreSQL:", error);
  }
}
