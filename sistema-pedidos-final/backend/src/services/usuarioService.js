// src/services/usuarioService.js
import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function crearUsuario({ nombre, correo, password }) {
  const existe = await prisma.usuario.findUnique({
    where: { correo }
  });

  if (existe) {
    throw new Error("Ese correo ya está registrado");
  }

  const hash = await bcrypt.hash(password, 10);

  return prisma.usuario.create({
    data: {
      nombre,
      correo,
      password: hash
    }
  });
}

export async function autenticarUsuario({ correo, password }) {
  const usuario = await prisma.usuario.findUnique({
    where: { correo }
  });

  if (!usuario) throw new Error("Credenciales incorrectas");

  const ok = await bcrypt.compare(password, usuario.password);

  if (!ok) throw new Error("Credenciales incorrectas");

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }
  };
}

export async function obtenerPerfil(id) {
  return prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nombre: true,
      correo: true,
      rol: true
    }
  });
}
