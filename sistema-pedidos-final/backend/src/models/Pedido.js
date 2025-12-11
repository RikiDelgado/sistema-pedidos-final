// src/models/Pedido.js
import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import { Usuario } from "./Usuario.js";

export const Pedido = db.define(
  "Pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "pendiente",
    },
    // Si querés, podés definir usuarioId explícitamente
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Pedido",
    freezeTableName: true,
    timestamps: false,
  }
);

Usuario.hasMany(Pedido, { foreignKey: "usuarioId" });
Pedido.belongsTo(Usuario, { foreignKey: "usuarioId" });
