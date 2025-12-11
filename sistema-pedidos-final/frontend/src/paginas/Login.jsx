// frontend/src/paginas/Login.jsx
import { useState } from "react";
import { loginUsuario } from "../api/usuariosApi";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
  });

  const [mostrarPass, setMostrarPass] = useState(false);
  const [error, setError] = useState("");

  function actualizar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function enviar(e) {
    e.preventDefault();
    setError("");

    try {
      await loginUsuario(form);
      navigate("/panel");
    } catch (err) {
      setError(err.mensaje || "Error al iniciar sesión.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={enviar}>
          <label className="block mb-2 font-medium">Correo</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={actualizar}
            required
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2 font-medium">Contraseña</label>

          <div className="relative">
            <input
              type={mostrarPass ? "text" : "password"}
              name="contrasena"
              value={form.contrasena}
              onChange={actualizar}
              required
              className="w-full p-2 border rounded pr-10"
            />

            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
              onClick={() => setMostrarPass(!mostrarPass)}
            >
              {mostrarPass ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mt-4"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-blue-600 hover:underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
