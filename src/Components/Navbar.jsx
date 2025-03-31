import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Esta función ya redirige al login automáticamente
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-purple-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Ferrecom</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/home" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Inicio
            </Link>
            <Link to="/lista_pedidos" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Pedidos
            </Link>
            <Link to="/ordenes" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Órdenes
            </Link>
            <Link to="/productos" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Productos
            </Link>
            <Link to="/perfil" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Perfil
            </Link>
            <button 
              onClick={handleLogout}
              className="px-3 py-2 bg-red-600 rounded-md text-sm font-medium hover:bg-red-700 transition duration-150"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;