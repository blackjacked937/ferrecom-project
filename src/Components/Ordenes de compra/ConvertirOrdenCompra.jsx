import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registrarProductoProveedor } from "../../APIS/apiPedidos"; // Asegúrate de tener esta API
import { useLocation } from "react-router-dom";

const ConvertirOrdenCompra = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pedido = location.state?.pedido;
  const [producto, setProducto] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Estado para el modal de éxito

  const handleCerrar = () => {
    if (onClose) onClose();
    navigate("/lista_pedidos");
  };

  const handleConvertir = async () => {
    if (!pedido || !pedido.id) {
      console.error("Error: Pedido no definido o sin ID.", pedido);
      return;
    }
  
    try {
      console.log("Pedido antes de registrar:", pedido);
      console.log("Producto ingresado:", producto);
      console.log("Proveedor ingresado:", proveedor);
      
      // Registrar producto y proveedor en la base de datos
      await registrarProductoProveedor(pedido.id, producto, proveedor);
      
      console.log("Registro exitoso");

      // Mostrar modal de éxito
      setIsSuccessModalOpen(true);
      
      // Cerrar después de un pequeño retraso (2 segundos)
      setTimeout(() => {
        handleCerrar();
      }, 2000);
      
    } catch (error) {
      console.error("Error al registrar producto y proveedor:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Convertir en Orden de Compra</h2>
          <button onClick={handleCerrar} className="text-white hover:bg-blue-700 rounded-full p-2">✕</button>
        </div>

        <div className="p-6">
          <div className="text-sm text-gray-600 mb-4 bg-blue-50 p-3 rounded">
            Ingrese el producto y proveedor para registrar en el pedido.
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Producto:</label>
            <input 
              type="text" 
              value={producto} 
              onChange={(e) => setProducto(e.target.value)} 
              placeholder="Ingrese el nombre del producto"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Proveedor:</label>
            <input 
              type="text" 
              value={proveedor} 
              onChange={(e) => setProveedor(e.target.value)} 
              placeholder="Ingrese el nombre del proveedor"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button onClick={handleCerrar} className="mr-4 px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Cancelar
            </button>
            <button 
              onClick={handleConvertir}
              disabled={!producto || !proveedor}
              className={`px-6 py-2 rounded ${producto && proveedor
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Registrar Producto y Proveedor
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Éxito */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-xl transform transition-all duration-300 scale-100 animate__animated animate__fadeIn">
            <h3 className="text-xl font-bold">¡Éxito!</h3>
            <p>El producto y proveedor han sido registrados correctamente.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertirOrdenCompra;
