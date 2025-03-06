import React, { useState } from "react";
import OrdenesDeCompraController from "./OrdenesDeCompraController";
import DetalleOrdenCompraView from "./DetalleOrdenCompraView";

const OrdenesDeCompraView = () => {
  const [controller] = useState(new OrdenesDeCompraController());
  const data = controller.getData();
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      {ordenSeleccionada ? (
        // Muestra el detalle de la orden si se ha seleccionado una
        <DetalleOrdenCompraView orden={ordenSeleccionada} onClose={() => setOrdenSeleccionada(null)} />
      ) : (
        <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-6 flex-grow">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Órdenes de Compra</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-blue-800 to-purple-800 text-white">
                <tr>
                  {["Fecha", "Documento", "Referencia", "Cliente", "Comprador", "Capturado", "Almacén", "Costo Total", "Estatus"].map((header) => (
                    <th key={header} className="p-4 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-all duration-300">
                    <td className="p-4">{row.Fecha}</td>
                    <td
                      className="p-4 text-blue-600 cursor-pointer hover:text-blue-800 transition-all duration-300"
                      onClick={() => setOrdenSeleccionada(row)} // Al hacer clic, guarda la orden en el estado
                    >
                      {row.ID_Documento}
                    </td>
                    <td className="p-4">Orden de Compra a partir del Pedido PD #{row.ID_Pedido_de_Referencia}</td>
                    <td className="p-4">{row.Cliente}</td>
                    <td className="p-4">{row.Comprador}</td>
                    <td className="p-4">{row.Capturado}</td>
                    <td className="p-4">{row.Almacen}</td>
                    <td className="p-4 font-semibold">{row.Costo_Total}</td>
                    <td
                      className={`p-4 text-center font-bold rounded-lg ${
                        row.Estatus === "Facturado"
                          ? "bg-green-100 text-green-700"
                          : row.Estatus === "En Preparación"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {row.Estatus}
                    </td>
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

export default OrdenesDeCompraView;
