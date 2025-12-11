// frontend/src/paginas/Panel.jsx
// frontend/src/paginas/Panel.jsx
import { useEffect, useState } from "react";
import { obtenerPerfil } from "../api/usuariosApi";
import { Link } from "react-router-dom";
import BarraSuperior from "../componentes/BarraSuperior";

export default function Panel() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    obtenerPerfil()
      .then((data) => setUsuario(data))
      .catch(() => {});
  }, []);

  if (!usuario) return null;

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <BarraSuperior nombre={usuario.nombre} />

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">
          Bienvenido, {usuario.nombre}
        </h2>

        {/* SI ES ADMIN */}
        {usuario.rol === "admin" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Panel de Administración</h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/admin/productos"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Gestionar Productos
              </Link>

              <Link
                to="/admin/pedidos"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Gestión de Pedidos
              </Link>

              <Link
                to="/admin/reportes"
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Reportes
              </Link>

            </div>
          </div>
        )}

        {/* SI ES CLIENTE */}
        {usuario.rol !== "admin" && (
          <div>
            <p className="text-lg mb-4">
              Tus pedidos aparecerán aquí pronto.
            </p>

            <Link
              to="/mis-pedidos"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Ver mis pedidos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
