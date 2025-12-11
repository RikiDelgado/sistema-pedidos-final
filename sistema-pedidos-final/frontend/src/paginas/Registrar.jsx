// frontend/src/paginas/Registrar.jsx
import { useState } from "react";
import { registrarUsuario } from "../api/usuariosApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Registrar() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    repetir: "",
  });

  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);

  const [error, setError] = useState("");

  async function enviar(e) {
    e.preventDefault();
    setError("");

    if (form.contrasena !== form.repetir) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registrarUsuario({
        nombre: form.nombre,
        correo: form.correo,
        contrasena: form.contrasena,
      });
      navigate("/login");
    } catch (e) {
      setError(e.mensaje || "Error al registrar");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Crear cuenta
        </h1>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={enviar} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg"
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg"
              onChange={(e) => setForm({ ...form, correo: e.target.value })}
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Contraseña
            </label>

            <div className="relative">
              <input
                type={mostrar ? "text" : "password"}
                required
                className="w-full px-4 py-2 border rounded-lg pr-10"
                onChange={(e) =>
                  setForm({ ...form, contrasena: e.target.value })
                }
              />

              <button
                type="button"
                onClick={() => setMostrar(!mostrar)}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                {mostrar ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Repetir Contraseña */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Repetir contraseña
            </label>

            <div className="relative">
              <input
                type={mostrar2 ? "text" : "password"}
                required
                className="w-full px-4 py-2 border rounded-lg pr-10"
                onChange={(e) =>
                  setForm({ ...form, repetir: e.target.value })
                }
              />

              <button
                type="button"
                onClick={() => setMostrar2(!mostrar2)}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                {mostrar2 ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-center mt-6 text-gray-700">
          ¿Ya tenés cuenta?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Iniciá sesión
          </a>
        </p>
      </div>
    </div>
  );
}
