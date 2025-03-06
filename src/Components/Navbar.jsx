import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="bg-white text-gray-700 p-4 shadow-md w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <img src={require("../Assets/Logo.png")} alt="Logo" className="h-12 w-auto" />
        <ul className="flex space-x-6 text-lg font-semibold">
          <li><Link className="hover:text-gray-500" to="/home">Inicio</Link></li>
          <li><Link className="hover:text-gray-500" to="/ordenes">Órdenes de Compra</Link></li>
          <li><Link className="hover:text-gray-500" to="/lista_pedidos">Lista de pedidos</Link></li>
          <li><Link className="hover:text-gray-500" to="/productos">Lista de productos</Link></li>
          <li><Link className="hover:text-gray-500" to="/perfil">Perfil</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
