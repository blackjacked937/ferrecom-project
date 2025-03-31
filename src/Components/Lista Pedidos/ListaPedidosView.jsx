import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerPedidos, actualizarEstatusPedido, cancelarPedido, obtenerDetallesPedido } from "../../APIS/apiPedidos";

const ListaPedidosView = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'confirmar' o 'cancelar'
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await obtenerPedidos();
        setPedidos(data);
      } catch (error) {
        console.error("Error obteniendo pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  const handleConfirmarPedido = async () => {
    if (selectedPedido) {
      try {
        await actualizarEstatusPedido(selectedPedido.id, "Entregado");
        const updatedPedidos = pedidos.map(pedido => 
          pedido.id === selectedPedido.id 
            ? {...pedido, estatus: "Entregado"} 
            : pedido
        );
        setPedidos(updatedPedidos);
        setIsConfirmModalOpen(false);
        setSelectedPedido(null);
      } catch (error) {
        console.error("Error al confirmar pedido:", error);
      }
    }
  };

  const handleCancelarPedido = async () => {
    if (selectedPedido) {
      try {
        await cancelarPedido(selectedPedido.id);
        const updatedPedidos = pedidos.map(pedido => 
          pedido.id === selectedPedido.id 
            ? {...pedido, estatus: "Cancelado"} 
            : pedido
        );
        setPedidos(updatedPedidos);
        setIsConfirmModalOpen(false);
        setSelectedPedido(null);
      } catch (error) {
        console.error("Error al cancelar pedido:", error);
      }
    }
  };

  const openModal = (pedido, type) => {
    setSelectedPedido(pedido);
    setModalType(type);
    setIsConfirmModalOpen(true);
  };

  const handleOrderSelect = (pedido) => {
    setSelectedOrders(prev => 
      prev.includes(pedido) 
        ? prev.filter(p => p !== pedido)
        : [...prev, pedido]
    );
  };

  const handleConvertToOrdenCompra = () => {
    if (selectedOrders.length === 1) {
      navigate('/convertir_orden', { 
        state: { pedido: selectedOrders[0] } 
      });
    }
  };

  const handlePrintPedido = async (pedido) => {
    try {
      // Obtener los detalles del pedido (productos, cantidades, etc.)
      // Asumimos que hay una función en tu API para obtener estos detalles
      const detallesPedido = await obtenerDetallesPedido(pedido.id);
      
      // Crear el contenido de la ventana de impresión
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Pedido ${pedido.documento}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              font-size: 12px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 10px;
            }
            .logo {
              font-weight: bold;
              font-size: 18px;
            }
            .titulo {
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              margin: 10px 0;
            }
            .info-pedido {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .info-cliente, .info-referencia {
              width: 48%;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .footer {
              margin-top: 30px;
              font-size: 10px;
              color: #666;
              border-top: 1px solid #ccc;
              padding-top: 10px;
            }
            .page-info {
              text-align: right;
              margin-top: 20px;
              font-size: 10px;
            }
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">COMERCIAL METALERA FERRECOM S.A. de C.V.</div>
            <div>
              <p>Cerezos, No. 86, La Perla,<br>
              Nezahualcóyotl, Estado de México C.P. 57820<br>
              (55) 2605-6300, 2605-6301<br>
              contacto@ferrecom.com</p>
            </div>
          </div>
  
          <div class="titulo">
            Pedido ${pedido.documento}
          </div>
  
          <div class="info-pedido">
            <div class="info-cliente">
              <p><strong>Fecha:</strong> ${pedido.fecha_pedido}</p>
              <p><strong>Cliente:</strong> ${pedido.cliente}</p>
              <p><strong>R.F.C.:</strong> ${detallesPedido?.rfc || 'XAXX010101000'}</p>
              <p><strong>Vendedor:</strong> ${pedido.vendedor}</p>
            </div>
            <div class="info-referencia">
              <p><strong>Referencia:</strong> ${pedido.referencia}</p>
              <p><strong>Almacén:</strong> ${pedido.almacen}</p>
              <p><strong>Estatus:</strong> ${pedido.estatus}</p>
            </div>
          </div>
  
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Descripción</th> <!-- Cambié "Producto" a "Descripción" -->
                <th>UM</th>
                <th>Cantidad</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              ${detallesPedido?.items?.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.id || ''}</td>
                  <td>${item.producto || ''}</td>  <!-- Aquí se toma correctamente el nombre "producto" -->
                  <td>${item.unidad_medida || ''}</td>
                  <td>${item.cantidad || ''}</td>
                  <td>${item.observaciones || ''}</td>
                </tr>
              `).join('') || `
                <tr>
                  <td>1</td>
                  <td>10531646</td>
                  <td>TUBO PVC SANITARIO REFORZADO 100mm 4" x 6.00 mts</td>
                  <td>CME H87</td>
                  <td>1.00</td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>10531646</td>
                  <td>TUBO PVC SANITARIO REFORZADO 100mm 4" x 6.00 mts</td>
                  <td>CME H87</td>
                  <td>1.00</td>
                  <td></td>
                </tr>
              `}
            </tbody>
          </table>
  
          <div class="footer">
            <p><strong>Condiciones Generales del Servicio:</strong></p>
            <p>Los precios y las existencias están sujetas a cambio, sin previo aviso...</p>
          </div>
  
          <div class="page-info">
            Página 1 de 1
          </div>
        </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Esperar a que los estilos y contenidos se carguen correctamente
      printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
        // No cerramos la ventana automáticamente para que el usuario pueda 
        // cancelar la impresión si lo desea
      };
    } catch (error) {
      console.error("Error al imprimir pedido:", error);
    }
  };

  const renderAccionesMenu = (pedido) => (
    <div className="relative group">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Acciones
      </button>
      <div className="absolute hidden group-hover:block bg-white border rounded shadow-lg z-10 right-0 w-48">
        <button 
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          onClick={() => handlePrintPedido(pedido)} // Modificado para usar nuestra nueva función
        >
          Imprimir
        </button>
        
        <button 
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          onClick={() => openModal(pedido, 'confirmar')}
        >
          Confirmar pedido
        </button>
        <button 
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          onClick={() => openModal(pedido, 'cancelar')}
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-6 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800">Lista de Pedidos</h2>
          {selectedOrders.length === 1 && (
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleConvertToOrdenCompra}
            >
              Convertir a Orden de Compra
            </button>
          )}
        </div>
        
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-blue-800 to-purple-800 text-white">
              <tr>
                <th className="p-4 text-left">
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.length === pedidos.length}
                    onChange={() => {
                      setSelectedOrders(
                        selectedOrders.length === pedidos.length ? [] : [...pedidos]
                      );
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </th>
                {["Fecha", "Documento", "Referencia", "Cliente", "Costo Total", "Vendedor", "Almacén", "Estatus", "Acciones"].map((header) => (
                  <th key={header} className="p-4 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedOrders.includes(pedido)}
                      onChange={() => handleOrderSelect(pedido)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                  <td className="p-4">{pedido.fecha_pedido}</td>
                  <td className="p-4 text-blue-600">{pedido.documento}</td>
                  <td className="p-4">{pedido.referencia}</td>
                  <td className="p-4">{pedido.cliente}</td>
                  <td className="p-4 font-semibold">{pedido.costo_total}</td>
                  <td className="p-4">{pedido.vendedor}</td>
                  <td className="p-4">{pedido.almacen}</td>
                  <td className="p-4 font-bold bg-blue-100 text-blue-700">{pedido.estatus}</td>
                  <td className="p-4">{renderAccionesMenu(pedido)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Confirmación o Cancelación */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              {modalType === 'confirmar' 
                ? 'Confirmar Pedido' 
                : 'Cancelar Pedido'}
            </h3>
            <p>
              {modalType === 'confirmar' 
                ? '¿Está seguro de que desea confirmar el pedido y cambiarlo a estado "Entregado"?' 
                : '¿Está seguro de que desea cancelar este pedido?'}
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button 
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={modalType === 'confirmar' 
                  ? handleConfirmarPedido 
                  : handleCancelarPedido}
              >
                {modalType === 'confirmar' ? 'Confirmar' : 'Cancelar Pedido'}
              </button>
            </div>
          </div>
        </div>
      )}
       <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white text-center py-4 w-full">
        <p className="text-sm">© 2025 FullStock. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default ListaPedidosView;