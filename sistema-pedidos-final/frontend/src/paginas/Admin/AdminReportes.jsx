import { useQuery } from "@tanstack/react-query";
import { reporteVentas } from "../../api/reportesApi";

export default function AdminReportes() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reportes"],
    queryFn: reporteVentas,
  });

  if (isLoading) return <p>Cargando reportes...</p>;
  if (isError) return <p>Error al cargar reportes</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reportes de Ventas</h1>

      <div className="bg-white shadow p-4 rounded">
        <p className="text-xl font-semibold">
          Total Vendido: ${data.totalVendido.toFixed(2)}
        </p>
        <p className="text-gray-700 mt-2">
          Pedidos completados: {data.pedidosCompletados}
        </p>
      </div>
    </div>
  );
}
