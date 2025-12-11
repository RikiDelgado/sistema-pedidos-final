// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import Panel from "./paginas/Panel";

// Admin
import AdminProductos from "./paginas/Admin/AdminProductos";
import AdminPedidos from "./paginas/Admin/AdminPedidos";
import AdminReportes from "./paginas/Admin/AdminReportes";

// Cliente
import MisPedidos from "./paginas/Cliente/MisPedidos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registrar />} />

        {/* Panel */}
        <Route path="/panel" element={<Panel />} />

        {/* ADMIN */}
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/pedidos" element={<AdminPedidos />} />
        <Route path="/admin/reportes" element={<AdminReportes />} />

        {/* CLIENTE */}
        <Route path="/mis-pedidos" element={<MisPedidos />} />
      </Routes>
    </BrowserRouter>
  );
}
