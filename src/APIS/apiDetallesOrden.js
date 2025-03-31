import { supabase } from '../supabase';


export const obtenerDetallesOrden = async (idOrden) => {
  const { data, error } = await supabase
    .from("detalle_orden_compra")
    .select("*")
    .eq("orden_id", idOrden); 

  if (error) throw error;
  return data;
};

export const agregarDetalleOrden = async (detalle) => {
  const { data, error } = await supabase.from("detalle_orden_compra").insert([detalle]);
  if (error) throw error;
  return data;
};
