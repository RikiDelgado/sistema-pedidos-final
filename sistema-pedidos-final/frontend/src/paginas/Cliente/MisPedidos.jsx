import { useQuery } from "@tanstack/react-query";
import { pedir } from "../../api/cliente";

export default function MisPedidos() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["misPedidos"],
    queryFn: () => pedir("/api/pedidos/mios"),
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar tus pedidos</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>

      {data.length === 0 && <p>No tenés pedidos aún.</p>}

      <div className="grid gap-4">
        {data.map((p) => (
          <div key={p.id} className="bg-white shadow p-4 rounded border">
            <h2 className="font-bold">
              Pedido #{p.id} — Estado: {p.estado}
            </h2>

            <div className="mt-2">
              {p.detalles.map((d) => (
                <p key={d.id}>
                  {d.producto.nombre} × {d.cantidad}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
