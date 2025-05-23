import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";  // Asegúrate de que la ruta de importación de supabase es correcta
import PerfilUsuarioController from "./PerfilUsuarioController";

const PerfilUsuarioView = () => {
  const [controller] = useState(new PerfilUsuarioController());
  const [imagen, setImagen] = useState(controller.getImagen());
  const [userData, setUserData] = useState({ correo: "", rol: "" });
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      // Obtener el usuario autenticado
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError) {
        console.error("Error al obtener el usuario autenticado:", authError);
        setLoading(false); // Detener la carga si hay error en la autenticación
        return;
      }

      if (user) {
        // Obtener datos del usuario desde la base de datos
        const { data, error } = await supabase
          .from('usuarios') // Asegúrate de que la tabla de usuarios sea correcta
          .select('correo, rol')
          .eq('id', user.id) // Filtramos por el ID del usuario autenticado
          .single();

        if (error) {
          console.error("Error al obtener los datos del usuario:", error);
        } else {
          setUserData({ correo: data.correo, rol: data.rol });
        }
      } else {
        console.error("Usuario no autenticado");
      }

      setLoading(false); // Detener la carga al finalizar
    };

    obtenerDatosUsuario();
  }, []);

  const manejarCambioImagen = (event) => {
    controller.manejarCambioImagen(event);
    setImagen(controller.getImagen());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-6 flex-grow transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Perfil</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center">
            {/* Imagen de perfil */}
            <div className="w-32 h-32 border-2 border-gray-300 rounded-full overflow-hidden shadow-lg">
              <img src={imagen} alt="Foto de perfil" className="w-full h-full object-cover" />
            </div>
            {/* Botón para subir imagen */}
            <label className="mt-2 text-blue-600 hover:text-blue-800 cursor-pointer transition-all duration-300">
              Subir Foto
              <input type="file" accept="image/*" className="hidden" onChange={manejarCambioImagen} />
            </label>
          </div>

          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold">Correo</label>
                <input
                  type="email"
                  value={userData.correo || "Cargando..."}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  disabled
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Rol</label>
                <input
                  type="text"
                  value={userData.rol || "Cargando..."}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  disabled
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <input type="checkbox" id="changePassword" className="w-4 h-4" />
                <label htmlFor="changePassword" className="text-gray-700">Cambiar Contraseña</label>
              </div>
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300">
                Regresar
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white text-center py-4 mt-6">
        <p className="text-sm">© 2025 FullStock. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default PerfilUsuarioView;
