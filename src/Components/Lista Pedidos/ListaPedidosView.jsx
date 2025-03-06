import React, { useState } from "react";
import ListaPedidosController from "./ListaPedidosController";
import DetallePedidoView from "./DetallePedidoView";

const ListaPedidosView = () => {
  const [controller] = useState(new ListaPedidosController());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [almacenFilter, setAlmacenFilter] = useState("Todos");
  const [sucursalFilter, setSucursalFilter] = useState("Todos");
  const [selectedPedido, setSelectedPedido] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    controller.setSearch(e.target.value);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    controller.setStatusFilter(status);
  };

  const handleAlmacenFilterChange = (e) => {
    setAlmacenFilter(e.target.value);
    controller.setAlmacenFilter(e.target.value);
  };

  const handleSucursalFilterChange = (e) => {
    setSucursalFilter(e.target.value);
    controller.setSucursalFilter(e.target.value);
  };

  const handleRowClick = (pedido) => {
    setSelectedPedido(pedido);
  };

  const handleCloseDetalle = () => {
    setSelectedPedido(null);
  };

  const filteredData = controller.getFilteredData();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      {selectedPedido ? (
        <DetallePedidoView pedido={selectedPedido} onClose={handleCloseDetalle} />
      ) : (
        <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-6 flex-grow transform transition-all duration-300 hover:shadow-3xl">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Lista de Pedidos</h2>
          
          <div className="mb-6 flex justify-between items-center space-x-4">
            <div className="flex space-x-2">
              {["Todos", "En Preparación", "Aplicados", "Facturados", "Cancelados"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilterChange(status)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    statusFilter === status 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {status}
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
            <select 
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={almacenFilter} 
              onChange={handleAlmacenFilterChange}
            >
              <option value="Todos">Todos los almacenes</option>
              <option value="Almacén 1">Almacén 1</option>
            </select>
            <select 
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={sucursalFilter} 
              onChange={handleSucursalFilterChange}
            >
              <option value="Todos">Todas las sucursales</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-blue-800 to-purple-800 text-white">
                <tr>
                  {["Fecha", "Documento", "Referencia", "Cliente", "Costo Total", "Vendedor", "Almacén", "Estatus"].map((header) => (
                    <th key={header} className="p-4 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    <td className="p-4">{row.Fecha_Pedido}</td>
                    <td className="p-4 text-blue-600 hover:text-blue-800 transition-all duration-300">{row.ID_Documento}</td>
                    <td className="p-4">{row.Referencia_Entrega}</td>
                    <td className="p-4">{row.Cliente}</td>
                    <td className="p-4 font-semibold">{row.Costo_Total}</td>
                    <td className="p-4">{row.Vendedor}</td>
                    <td className="p-4">{row.Almacen}</td>
                    <td className="p-4 text-center font-bold rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">{row.Estatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaPedidosView;
