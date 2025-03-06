import React, { useState } from "react";
import ProductosController from "./ProductosController";

const ProductosView = () => {
  const [controller] = useState(new ProductosController());
  const [search, setSearch] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("Todos");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    controller.setSearch(e.target.value);
  };

  const handleCategoriaFilterChange = (categoria) => {
    setCategoriaFilter(categoria);
    controller.setCategoriaFilter(categoria);
  };

  const filteredData = controller.getFilteredData();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-6 flex-grow transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Lista de Productos</h2>

        {/* Filtros y búsqueda */}
        <div className="mb-6 flex justify-between items-center space-x-4">
          <div className="flex space-x-2">
            {["Todos", "FERRE AC", "FERRE CM", "FERRE EO", "TERRE CC"].map((categoria) => (
              <button
                key={categoria}
                onClick={() => handleCategoriaFilterChange(categoria)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  categoriaFilter === categoria
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Tabla de productos */}
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-blue-800 to-purple-800 text-white">
              <tr>
                {["Código", "Descripción", "Precio", "Categoría"].map((header) => (
                  <th key={header} className="p-4 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all duration-300">
                  <td className="p-4">{row.Codigo}</td>
                  <td className="p-4">{row.Descripcion}</td>
                  <td className="p-4 font-semibold">{row.Precio}</td>
                  <td className="p-4 text-center font-bold rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                    {row.Categoria}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white text-center py-4 mt-6">
        <p className="text-sm">© 2025 FullStock. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default ProductosView;
