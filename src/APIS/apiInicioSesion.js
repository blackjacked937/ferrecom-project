import { supabase } from "../supabase";

export const registrarUsuario = async (correo, contraseña, rol) => {
    const { data, error } = await supabase
      .from("usuarios") 
      .insert([
        {
          correo: correo, 
          contraseña: contraseña, 
          rol: rol, 
        },
      ]);
  
    if (error) {
      throw new Error(error.message); 
    }
  
    return data; 
  };


export const iniciarSesion = async (correo, contraseña) => {
 
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("correo", correo)
      .eq("contraseña", contraseña)  
      .single(); 
  
    if (error) {
      throw new Error("El usuario no existe o las credenciales son incorrectas");
    }
  
    return { token: 'token_aqui', userData: data };
  };
  
  export const obtenerUsuario = async () => {
    const { data, error } = await supabase.auth.getUser();
  
    if (error) throw new Error(`Error al obtener usuario: ${error.message}`);
  
    return data;
  };

  export const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(`Error al cerrar sesión: ${error.message}`);
  };

  export const enviarPasswordPorCorreo = async (correo) => {
    // Buscar el usuario en la base de datos
    const { data, error } = await supabase
      .from("usuarios")
      .select("contraseña")
      .eq("correo", correo)
      .single();
  
    if (error) {
      throw new Error("El correo no está registrado en nuestro sistema.");
    }
  
    // Contenido del correo (Usando la función de correo de Supabase)
    const { error: mailError } = await supabase.functions.invoke("enviar-correo", {
      body: {
        to: correo,
        subject: "Recuperación de contraseña",
        text: `Tu contraseña es: ${data.contraseña}`,
      },
    });
  
    if (mailError) {
      throw new Error("Error al enviar el correo.");
    }
  
    return "Correo enviado con éxito.";
  };