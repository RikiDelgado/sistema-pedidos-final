// frontend/src/api/cliente.js
const API = "http://localhost:4000";

export async function pedir(ruta, metodo = "GET", datos = null) {
  const opciones = {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (datos) opciones.body = JSON.stringify(datos);

  const res = await fetch(API + ruta, opciones);

  const texto = await res.text();
  let json = {};

  try {
    json = texto ? JSON.parse(texto) : {};
  } catch {
    json = { mensaje: texto };
  }

  if (!res.ok) {
    throw { status: res.status, ...json };
  }

  return json;
}
