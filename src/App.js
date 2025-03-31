import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { PublicRoute } from './Components/PublicRoute';
import MainLayout from './layouts/MainLayout';
import LoginView from "./Components/Login/LoginView";
import Home from "./Components/Home/HomeView";
import OrdenesDeCompra from "./Components/Ordenes de compra/OrdenesDeCompraView";
import PerfilUsuario from "./Components/Perfil/PerfilUsuarioView";
import ListaPedidos from "./Components/Lista Pedidos/ListaPedidosView";
import ProductosView from "./Components/Productos/ProductosView";
import ConvertirOrdenCompra from "./Components/Ordenes de compra/ConvertirOrdenCompra";
import RegisterView from "./Components/Singup/RegisterView";

const App = () => {
  return (
    
    <Router>
      <AuthProvider>
        <Routes>
          {/* Redirección de la ruta principal a login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Rutas públicas */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginView />} />
            <Route path="/registro" element={<RegisterView />} />
          </Route>
          
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/ordenes" element={<OrdenesDeCompra />} />
              <Route path="/lista_pedidos" element={<ListaPedidos />} />
              <Route path="/productos" element={<ProductosView />} />
              <Route path="/perfil" element={<PerfilUsuario />} />
              <Route path="/convertir_orden" element={<ConvertirOrdenCompra />} />
            </Route>
          </Route>
          
          {/* Redirección para rutas no definidas */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;