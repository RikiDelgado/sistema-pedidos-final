// frontend/src/api/usuariosApi.js
import { pedir } from "./cliente";

export function registrarUsuario(datos) {
  return pedir("/api/auth/registrar", "POST", {
    nombre: datos.nombre,
    correo: datos.correo,
    password: datos.contrasena,
  });
}

export function loginUsuario(datos) {
  return pedir("/api/auth/login", "POST", {
    correo: datos.correo,
    password: datos.contrasena,
  });
}

export function logoutUsuario() {
  return pedir("/api/auth/logout", "POST");
}

export function obtenerPerfil() {
  return pedir("/api/auth/perfil", "GET");
}
