import { supabase } from "../supabase";

export const obtenerOrdenesDeCompra = async () => {
  const { data, error } = await supabase.from("ordenes_de_compra").select("*");
  if (error) throw error;
  return data;
};

export const agregarOrdenDeCompra = async (orden) => {
  const { data, error } = await supabase.from("ordenes_de_compra").insert([orden]);
  if (error) throw error;
  return data;
};

export const obtenerOrdenPorId = async (id) => {
  const { data, error } = await supabase.from("ordenes_de_compra").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
};

export const crearOrdenYDetalle = async (ordenData, detallesData) => {
  try {
    const { data: orden, error: ordenError } = await supabase
      .from("ordenes_de_compra")
      .insert([ordenData])
      .select()
      .single();

    if (ordenError) {
      throw new Error(`Error al crear la orden: ${ordenError.message}`);
    }

    const detallesConOrdenId = detallesData.map((detalle) => ({
      ...detalle,
      orden_id: orden.id,
    }));

    const { data: detalles, error: detallesError } = await supabase
      .from("detalle_orden_compra")
      .insert(detallesConOrdenId);

    if (detallesError) {
      throw new Error(`Error al crear los detalles de la orden: ${detallesError.message}`);
    }

    return { orden, detalles };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const actualizarEstadoOrden = async (ordenId, nuevoEstado) => {
  const { data, error } = await supabase
    .from("ordenes_de_compra")
    .update({ estatus: nuevoEstado })
    .eq("id", ordenId)
    .select()
    .single();

  if (error) throw new Error(`Error al actualizar el estado: ${error.message}`);

  return data;
};
