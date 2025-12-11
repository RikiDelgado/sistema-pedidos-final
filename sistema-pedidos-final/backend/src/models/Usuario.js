// src/models/Usuario.js
import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Usuario = db.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // guardamos la contraseña en 'password' para que sea consistente
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: "cliente",
    },
  },
  {
    tableName: "Usuario",
    freezeTableName: true,
    timestamps: false,
  }
);
