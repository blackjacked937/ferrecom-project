import React, { useEffect, useState } from 'react';
import { obtenerDetallesOrden } from '../../APIS/apiDetallesOrden';

const DetalleOrdenCompraView = ({ ordenId }) => {
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const data = await obtenerDetallesOrden(ordenId);
        setDetalles(data);
      } catch (error) {
        console.error('Error obteniendo detalles:', error);
      }
    };

    if (ordenId) {
      fetchDetalles();
    }
  }, [ordenId]); 

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <div className="w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Detalles de la Orden de Compra</h2>
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
              {detalles.map((detalle, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all duration-300">
                  <td className="p-3">{detalle.codigo}</td>
                  <td className="p-3">{detalle.concepto}</td>
                  <td className="p-3">{detalle.cantidad}</td>
                  <td className="p-3">{detalle.cantidad_pendiente}</td>
                  <td className="p-3">{detalle.unidad}</td>
                  <td className="p-3">{detalle.precio_unitario}</td>
                  <td className="p-3">{detalle.descuento}</td>
                  <td className="p-3">{detalle.impuesto}</td>
                  <td className="p-3 font-semibold">{detalle.importe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetalleOrdenCompraView;
