import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeController from "./HomeController";

const HomeView = () => {
  const [controller] = useState(new HomeController());

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-6 flex-grow text-center transform transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{controller.getMensaje()}</h1>
        <p className="text-lg text-gray-600 mb-6">{controller.getDescripcion()}</p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/ordenes"
            className="px-6 py-3 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Ver Órdenes de Compra
          </Link>
          <Link
            to="/perfil"
            className="px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-lg shadow-md hover:from-gray-400 hover:to-gray-500 transition-all duration-300"
          >
            Ir a Perfil
          </Link>
        </div>
      </div>
      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white text-center py-4 mt-6">
        <p className="text-sm">© 2025 FullStock. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomeView;