import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listarPedidos, actualizarPedido } from "../../api/pedidosApi";

export default function AdminPedidos() {
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pedidos"],
    queryFn: listarPedidos,
  });

  const mutEstado = useMutation({
    mutationFn: ({ id, estado }) =>
      actualizarPedido(id, { estado }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pedidos"] }),
  });

  if (isLoading) return <p>Cargando pedidos...</p>;
  if (isError) return <p>Error al cargar pedidos</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrar Pedidos</h1>

      <div className="grid gap-4">
        {data.map((p) => (
          <div key={p.id} className="bg-white shadow p-4 rounded border">
            <h2 className="font-bold">
              Pedido #{p.id} — Cliente: {p.usuario.nombre}
            </h2>
            <p className="text-gray-600">Estado: {p.estado}</p>

            <div className="mt-3">
              <button
                onClick={() => mutEstado.mutate({ id: p.id, estado: "preparando" })}
                className="px-3 py-1 bg-yellow-500 rounded text-white mr-2"
              >
                Preparando
              </button>

              <button
                onClick={() => mutEstado.mutate({ id: p.id, estado: "entregado" })}
                className="px-3 py-1 bg-green-600 rounded text-white"
              >
                Entregado
              </button>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold">Productos:</h3>
              <ul className="list-disc ml-6">
                {p.detalles.map((d) => (
                  <li key={d.id}>
                    {d.producto.nombre} × {d.cantidad}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
