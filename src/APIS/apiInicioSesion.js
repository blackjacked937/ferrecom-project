import { supabase } from "../supabase";

export const registrarUsuario = async (correo, contraseña, rol) => {
    // Inserta el usuario directamente en tu base de datos (sin usar Supabase Auth)
    const { data, error } = await supabase
      .from("usuarios") // Nombre de la tabla donde se guardan los usuarios
      .insert([
        {
          correo: correo, // El correo del usuario
          contraseña: contraseña, // La contraseña del usuario
          rol: rol, // El rol del usuario (como "CEO", "Contador", "Vendedor")
        },
      ]);
  
    if (error) {
      throw new Error(error.message); // Maneja cualquier error
    }
  
    return data; // Devuelve los datos insertados o el objeto del usuario
  };

// Iniciar sesión verificando la base de datos directamente
export const iniciarSesion = async (correo, contraseña) => {
    // Verifica si el usuario existe en la base de datos
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("correo", correo)
      .eq("contraseña", contraseña)  // Asegúrate de que la contraseña esté encriptada en la base de datos.
      .single(); // Usamos `.single()` para obtener solo un usuario.
  
    if (error) {
      throw new Error("El usuario no existe o las credenciales son incorrectas");
    }
  
    // Si se encuentra el usuario, devuelve la información de usuario
    return { token: 'token_aqui', userData: data };
  };
  
  // Obtener información del usuario actual
  export const obtenerUsuario = async () => {
    const { data, error } = await supabase.auth.getUser();
  
    if (error) throw new Error(`Error al obtener usuario: ${error.message}`);
  
    return data;
  };
  
  // Cerrar sesión
  export const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(`Error al cerrar sesión: ${error.message}`);
  };