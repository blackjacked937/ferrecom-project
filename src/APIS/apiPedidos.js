import { supabase } from "../supabase";

export const agregarPedido = async (pedido) => {
  try {
    const { data, error } = await supabase.from("pedidos").insert([pedido]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al agregar pedido:", error);
    throw error;  
  }
};

export const obtenerPedidos = async () => {
  try {
    const { data, error } = await supabase.from("pedidos").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    throw error;  
  }
};

export const actualizarEstatusPedido = async (pedidoId, nuevoEstatus) => {
  try {
    const { data, error } = await supabase
      .from("pedidos")
      .update({ estatus: nuevoEstatus })
      .eq('id', pedidoId);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al actualizar estatus del pedido:", error);
    throw error;
  }
};

export const cancelarPedido = async (pedidoId) => {
  try {
    const { data, error } = await supabase
      .from("pedidos")
      .update({ estatus: "Cancelado" })
      .eq('id', pedidoId);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al cancelar pedido:", error);
    throw error;
  }
};

export const registrarProductoProveedor = async (pedidoId, producto, proveedor) => {
  try {
    const { data, error } = await supabase
      .from("pedidos")
      .update({ producto, proveedor })
      .eq('id', pedidoId);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al registrar producto y proveedor:", error);
    throw error;
  }
};

export const obtenerDetallesPedido = async (pedidoId) => {
  try {
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .eq("id", pedidoId)
      .single(); // `.single()` 

    if (error) throw error;
    return data; 
  } catch (error) {
    console.error("Error al obtener detalles del pedido:", error);
    throw error;
  }
};
