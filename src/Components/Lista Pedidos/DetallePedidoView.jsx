import React from "react";

const DetallePedidoView = ({ pedido, onClose }) => {
  if (!pedido) {
    return (
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <p className="text-gray-600">No hay detalles disponibles.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
        >
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <div className="w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Detalle del Pedido</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Cerrar
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <p><strong>Fecha:</strong> {pedido.Fecha_Pedido}</p>
          <p><strong>Documento:</strong> {pedido.ID_Documento}</p>
          <p><strong>Referencia:</strong> {pedido.Referencia_Entrega}</p>
          <p><strong>Cliente:</strong> {pedido.Cliente}</p>
          <p><strong>Vendedor:</strong> {pedido.Vendedor}</p>
          <p><strong>Almacén:</strong> {pedido.Almacen}</p>
        </div>
        
        <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-800 text-white">
              <tr>
                {["Código", "Concepto", "Cant.", "Cant. Pend.", "Unid.", "P. Unit.", "% Dcto", "Imp.", "Importe"].map((header) => (
                  <th key={header} className="p-3 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(pedido.detalles || []).map((detalle, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all duration-300">
                  <td className="p-3">{detalle.Codigo}</td>
                  <td className="p-3">{detalle.Concepto}</td>
                  <td className="p-3">{detalle.Cantidad}</td>
                  <td className="p-3">{detalle.Cantidad_Pendiente}</td>
                  <td className="p-3">{detalle.Unidad}</td>
                  <td className="p-3">{detalle.Precio_Unitario}</td>
                  <td className="p-3">{detalle.Descuento}</td>
                  <td className="p-3">{detalle.Impuesto}</td>
                  <td className="p-3 font-semibold">{detalle.Importe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 text-right">
          <p className="text-lg font-bold">Total: {pedido.Costo_Total}</p>
        </div>
      </div>
    </div>
  );
};

export default DetallePedidoView;
