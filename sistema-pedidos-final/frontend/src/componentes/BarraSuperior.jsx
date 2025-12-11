// frontend/src/componentes/BarraSuperior.jsx
import { logoutUsuario } from "../api/usuariosApi";
import { useNavigate } from "react-router-dom";

export default function BarraSuperior({ nombre }) {
  const navigate = useNavigate();

  async function salir() {
    await logoutUsuario();
    navigate("/login");
  }

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl">Sistema Pedidos - {nombre}</h1>

      <button
        onClick={salir}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
