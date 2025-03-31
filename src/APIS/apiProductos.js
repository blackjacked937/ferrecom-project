import { supabase } from "../supabase";

export const obtenerProductos = async () => {
  const { data, error } = await supabase.from("productos").select("*");
  if (error) throw error;
  return data;
};

export const agregarProducto = async (producto) => {
  const { data, error } = await supabase.from("productos").insert([producto]);
  if (error) throw error;
  return data;
};
