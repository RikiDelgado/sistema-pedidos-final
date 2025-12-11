// backend/src/controllers/usuarioController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

const SECRET = process.env.JWT_SECRET || "secreto_local";

export async function registrar(req, res) {
  try {
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const password = req.body.password ?? req.body.contrasena;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios." });
    }

    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ mensaje: "Ese correo ya está registrado." });
    }

    const hash = await bcrypt.hash(password, 10);

    const nuevo = await Usuario.create({
      nombre,
      correo,
      password: hash,
      rol: "cliente",
    });

    return res.json({
      ok: true,
      mensaje: "Usuario creado correctamente.",
      usuario: {
        id: nuevo.id,
        nombre: nuevo.nombre,
        correo: nuevo.correo,
        rol: nuevo.rol,
      },
    });
  } catch (error) {
    console.error("Error registrar:", error);
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
}

export async function login(req, res) {
  try {
    const correo = req.body.correo;
    const password = req.body.password ?? req.body.contrasena;

    if (!correo || !password) {
      return res.status(400).json({ mensaje: "Faltan credenciales." });
    }

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Datos incorrectos." });
    }

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      return res.status(400).json({ mensaje: "Datos incorrectos." });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      // secure: true // activar en producción (HTTPS)
    });

    res.json({ ok: true, mensaje: "Ingreso correcto." });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
}

export async function perfil(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ["id", "nombre", "correo", "rol"],
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: "No encontrado." });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Error perfil:", error);
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.json({ ok: true, mensaje: "Sesión cerrada." });
  } catch (error) {
    console.error("Error logout:", error);
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
}
