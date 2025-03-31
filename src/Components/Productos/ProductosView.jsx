import React, { useState, useEffect } from "react";
import { obtenerProductos } from "../../APIS/apiProductos";

const ProductosView = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("Todos");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const filteredData = productos.filter((producto) => 
    (categoriaFilter === "Todos" || producto.categoria === categoriaFilter) &&
    producto.descripcion.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-6 flex-grow">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Lista de Productos</h2>

        <div className="mb-6 flex justify-between items-center space-x-4">
          <div className="flex space-x-2">
            {["Todos", "FERRE AC", "FERRE CM", "FERRE EO"].map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaFilter(categoria)}
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
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

      
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
              {filteredData.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50 transition-all duration-300">
                  <td className="p-4">{producto.codigo}</td>
                  <td className="p-4">{producto.descripcion}</td>
                  <td className="p-4 font-semibold">{producto.precio}</td>
                  <td className="p-4 text-center font-bold rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                    {producto.categoria}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white text-center py-4 mt-6">
        <p className="text-sm">© 2025 FullStock. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default ProductosView;
