import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import OrdenesDeCompra from "./Components/Ordenes de compra/OrdenesDeCompraView";
import PerfilUsuario from "./Components/Perfil/PerfilUsuarioView";
import ListaPedidos from "./Components/Lista Pedidos/ListaPedidosView";
import Navbar from "./Components/Navbar"; 
import Home from "./Components/Home/HomeView";
import ProductosView from "./Components/Productos/ProductosView";
import ConvertirOrdenCompra from "./Components/Ordenes de compra/ConvertirOrdenCompra";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/ordenes" element={<OrdenesDeCompra />} />
        <Route path="/lista_pedidos" element={<ListaPedidos />} />
        <Route path="/productos" element={<ProductosView />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/convertir_orden" element={<ConvertirOrdenCompra />} />
      </Routes> 
    </Router>
  );
};

export default App;
