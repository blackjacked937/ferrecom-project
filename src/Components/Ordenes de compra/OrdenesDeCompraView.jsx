import React, { useEffect, useState } from "react";
import { obtenerOrdenesDeCompra, actualizarEstadoOrden, obtenerOrdenPorId } from "../../APIS/apiOrdenes";
import { obtenerDetallesOrden } from "../../APIS/apiDetallesOrden";
import DetalleOrdenCompraView from "./DetalleOrdenCompraView";

const PrintOrdenCompra = ({ ordenId, onClose }) => {
  const [orden, setOrden] = useState(null);
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    const fetchOrdenDetalles = async () => {
      try {
        const ordenCompleta = await obtenerOrdenPorId(ordenId);
        setOrden(ordenCompleta);
        const detallesOrden = await obtenerDetallesOrden(ordenId);
        setDetalles(detallesOrden || []);
      } catch (error) {
        console.error("Error obteniendo detalles de la orden:", error);
        alert("No se pudieron cargar los detalles de la orden");
      }
    };

    if (ordenId) {
      fetchOrdenDetalles();
    }
  }, [ordenId]);

  // Función para convertir número a formato de moneda mexicana
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  // Función para convertir número a palabras
  const numeroALetras = (numero) => {
    const unidades = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
    const decenas = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
    const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

    const parteEntera = Math.floor(numero);
    const parteDecimal = Math.round((numero - parteEntera) * 100);

    return `${centenas[Math.floor(parteEntera / 100)]} PESOS ${parteDecimal}/100 M.N.`;
  };

  // Calcular totales
  const calcularSubtotal = () => {
    return detalles.reduce((total, detalle) => 
      total + (detalle.cantidad * detalle.precio_unitario), 0);
  };

  const calcularIVA = () => {
    const subtotal = calcularSubtotal();
    return subtotal * 0.16; // IVA 16%
  };

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    return subtotal + calcularIVA();
  };

  // Si aún no se han cargado los datos, mostrar un mensaje de carga
  if (!orden) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <p>Cargando detalles de la orden...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 p-8 overflow-y-auto print-container">
      <div className="max-w-2xl mx-auto">
        <div className="text-right mb-4">
          <button 
            onClick={onClose} 
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
          <button 
            onClick={() => window.print()} 
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Imprimir
          </button>
        </div>
        
        <div className="border p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Orden de Compra</h1>
              <p>OC {orden.id_documento}</p>
            </div>
            <div className="text-right">
              <p>Fecha: {orden.fecha}</p>
              <p>Forma de pago: {orden.forma_pago || 'N/A'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-bold">Proveedor:</h3>
              <p>{orden.cliente}</p>
              <p>{orden.domicilio_proveedor}</p>
            </div>
            <div className="text-right">
              <p>Condiciones: {orden.condiciones || 'N/A'}</p>
              <p>Uso del CFDI: {orden.uso_cfdi || 'P01 - Por definir'}</p>
            </div>
          </div>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Descripción</th>
                <th className="border p-2">UM</th>
                <th className="border p-2">Cantidad</th>
                <th className="border p-2">Precio Unitario</th>
                <th className="border p-2">Desc. (%)</th>
                <th className="border p-2">Importe</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{detalle.descripcion}</td>
                  <td className="border p-2">{detalle.unidad_medida}</td>
                  <td className="border p-2">{detalle.cantidad}</td>
                  <td className="border p-2">{formatCurrency(detalle.precio_unitario)}</td>
                  <td className="border p-2">{detalle.descuento || '0.00'}</td>
                  <td className="border p-2">{formatCurrency(detalle.cantidad * detalle.precio_unitario)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Importe con letras:</p>
              <p>{numeroALetras(calcularTotal())}</p>
              <p className="mt-4">Horario de Recepción: lunes a viernes de 8:30 a 17:30 horas.</p>
              <p>Sábado: Previa Cita.</p>
            </div>
            <div className="text-right">
              <p>Subtotal: {formatCurrency(calcularSubtotal())}</p>
              <p>Descuento: {formatCurrency(0)}</p>
              <p>Impuestos (I.V.A. 16%): {formatCurrency(calcularIVA())}</p>
              <p className="font-bold">Total: {formatCurrency(calcularTotal())}</p>
            </div>
          </div>

          <div className="mt-6 text-sm">
            <p>Contacto: (55) 2605-6300, 2605-6301</p>
            <p>Dirección: Cerezos, No. 86, La Perla, Nezahualcóyotl, Estado de México C.P. 57820</p>
            <p>Email: contacto@ferrecom.com</p>
          </div>
        </div>
      </div>
      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

const OrdenesDeCompraView = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [ordenImprimir, setOrdenImprimir] = useState(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const data = await obtenerOrdenesDeCompra();
        setOrdenes(data);
      } catch (error) {
        console.error("Error obteniendo órdenes:", error);
      }
    };

    fetchOrdenes();
  }, []);

  const toggleSeleccion = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const confirmarPedido = async () => {
    try {
      for (const ordenId of seleccionadas) {
        await actualizarEstadoOrden(ordenId, "Entregado");
      }
      alert("Estado actualizado correctamente");
      setSeleccionadas([]);
      const data = await obtenerOrdenesDeCompra();
      setOrdenes(data);
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  const convertirEnCompra = async () => {
    try {
      for (const ordenId of seleccionadas) {
        await actualizarEstadoOrden(ordenId, "Aplicada");
      }
      alert("Órdenes convertidas en compra correctamente");
      setSeleccionadas([]);
      const data = await obtenerOrdenesDeCompra();
      setOrdenes(data);
    } catch (error) {
      console.error("Error convirtiendo en compra:", error);
    }
  };

  const handleImprimir = async (row) => {
    setOrdenImprimir(row.id);
  };

  const handleCancelar = async (ordenId) => {
    try {
      await actualizarEstadoOrden(ordenId, "Cancelada");
      alert("Orden cancelada correctamente");
      const data = await obtenerOrdenesDeCompra();
      setOrdenes(data);
    } catch (error) {
      console.error("Error cancelando la orden:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      {ordenSeleccionada ? (
        <DetalleOrdenCompraView ordenId={ordenSeleccionada.id} />
      ) : (
        <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-6 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-4xl font-bold text-gray-800">Órdenes de Compra</h2>
            <div className="flex space-x-4">
            
             
             
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-blue-800 to-purple-800 text-white">
                <tr className="text-left">
                  <th className="p-4 text-center">✔</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Documento</th>
                  <th className="p-4">Referencia</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Comprador</th>
                  <th className="p-4">Capturado</th>
                  <th className="p-4">Almacén</th>

                  <th className="p-4 text-center">Estado</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {ordenes.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-all duration-300 border-b">
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={seleccionadas.includes(row.id)}
                        onChange={() => toggleSeleccion(row.id)}
                      />
                    </td>
                    <td className="p-4">{row.fecha}</td>
                    <td
                      className="p-4 text-blue-600 cursor-pointer hover:text-blue-800 transition-all duration-300"
                      onClick={() => setOrdenSeleccionada(row)}
                    >
                      {row.id_documento}
                    </td>
                    <td className="p-4">Orden de Compra a partir del Pedido PD #{row.id_pedido_de_referencia}</td>
                    <td className="p-4">{row.cliente}</td>
                    <td className="p-4">{row.comprador}</td>
                    <td className="p-4">{row.capturado}</td>
                    <td className="p-4">{row.almacen}</td>
                    
                    <td
                      className={`p-4 text-center font-bold rounded-lg ${
                        row.estatus === "Facturado"
                          ? "bg-green-100 text-green-700"
                          : row.estatus === "En Preparación"
                          ? "bg-yellow-100 text-yellow-700"
                          : row.estatus === "Cancelada"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {row.estatus}
                    </td>
                    <td className="p-4 flex justify-center space-x-2">
                      <button 
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleImprimir(row)}
                      >
                        Imprimir
                      </button>
                      <button 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleCancelar(row.id)}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {ordenImprimir && (
            <PrintOrdenCompra 
              ordenId={ordenImprimir} 
              onClose={() => setOrdenImprimir(null)} 
            />
          )}
        </div>
      )}

<footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white text-center py-4 w-full">
        <p className="text-sm">© 2025 FullStock. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default OrdenesDeCompraView;
