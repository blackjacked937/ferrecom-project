import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeController from "./HomeController";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const HomeView = () => {
  const [controller] = useState(new HomeController());

  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenedor principal con flex-grow para empujar el footer hacia abajo */}
      <div className="flex-grow w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-10 mt-10 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 animate-fade-in">
          {controller.getMensaje()}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mb-8 animate-slide-in">
          {controller.getDescripcion()}
        </p>

        {/* Contenedor de botones */}
        <div className="flex justify-center space-x-8">
          <Link
            to="/ordenes"
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <FaShoppingCart className="mr-3 text-lg" />
            Ver Órdenes de Compra
          </Link>

          <Link
            to="/perfil"
            className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-lg shadow-md hover:from-gray-400 hover:to-gray-500 transition-all duration-300 transform hover:scale-105"
          >
            <FaUserCircle className="mr-3 text-lg" />
            Ir a Perfil
          </Link>
        </div>
      </div>

      {/* Footer siempre al final de la página */}
      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white text-center py-4 w-full">
        <p className="text-sm">© 2025 FullStock. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomeView;