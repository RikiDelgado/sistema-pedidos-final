// frontend/src/paginas/AdminProductos.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../api/productosApi";

export default function AdminProductos() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  const [error, setError] = useState("");

  // ✅ React Query v5 — reemplazo FINAL
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productos", page],
    queryFn: () => listarProductos({ page, limit }),
    placeholderData: (old) => old, // reemplazo de keepPreviousData
  });

  // Crear producto
  const crearMut = useMutation({
    mutationFn: (d) => crearProducto(d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["productos"] });
      setForm({ id: null, nombre: "", descripcion: "", precio: "", stock: "" });
    },
    onError: (err) => setError(err?.mensaje || "Error al crear"),
  });

  // Editar producto
  const editarMut = useMutation({
    mutationFn: ({ id, data }) => actualizarProducto(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["productos"] });
      setForm({ id: null, nombre: "", descripcion: "", precio: "", stock: "" });
    },
    onError: (err) => setError(err?.mensaje || "Error al actualizar"),
  });

  // Borrar producto
  const borrarMut = useMutation({
    mutationFn: (id) => eliminarProducto(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["productos"] }),
    onError: (err) => setError(err?.mensaje || "Error al eliminar"),
  });

  function editar(producto) {
    setForm({
      id: producto.id,
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio ?? "",
      stock: producto.stock ?? 0,
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function limpiar() {
    setForm({ id: null, nombre: "", descripcion: "", precio: "", stock: "" });
    setError("");
  }

  async function enviar(e) {
    e.preventDefault();
    setError("");

    if (!form.nombre || form.precio === "") {
      setError("Nombre y precio son obligatorios");
      return;
    }

    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      stock: Number(form.stock || 0),
    };

    try {
      if (form.id) {
        await editarMut.mutateAsync({ id: form.id, data: payload });
      } else {
        await crearMut.mutateAsync(payload);
      }
    } catch (err) {}
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>

        {/* FORMULARIO */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-2">{form.id ? "Editar producto" : "Crear producto"}</h2>

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <form onSubmit={enviar} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="p-2 border rounded"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <input
              className="p-2 border rounded"
              placeholder="Precio"
              type="number"
              step="0.01"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
            />
            <input
              className="p-2 border rounded md:col-span-2"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
            <input
              className="p-2 border rounded"
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <div className="flex gap-2 md:col-span-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {form.id ? "Actualizar" : "Crear"}
              </button>
              <button type="button" onClick={limpiar} className="px-4 py-2 border rounded">
                Limpiar
              </button>
            </div>
          </form>
        </div>

        {/* LISTA */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Productos</h3>

          {isLoading && <p>Cargando...</p>}
          {isError && <p>Error al cargar productos</p>}

          {!isLoading && data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.datos.map((p) => (
                  <div key={p.id} className="border rounded p-3 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold">{p.nombre}</h4>
                      <p className="text-sm">{p.descripcion}</p>
                      <p className="mt-2 font-mono">${Number(p.precio).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Stock: {p.stock}</p>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => editar(p)}
                        className="px-3 py-1 bg-yellow-400 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => borrarMut.mutate(p.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINACIÓN */}
              <div className="mt-4 flex items-center justify-between">
                <div>Página {data.pagina} — Total: {data.total}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((s) => Math.max(1, s - 1))}
                    disabled={data.pagina <= 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setPage((s) => s + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
