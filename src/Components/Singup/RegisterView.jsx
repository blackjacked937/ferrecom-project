import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../../APIS/apiInicioSesion"; 

const RegisterView = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rol: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!credentials.email || !credentials.password || !credentials.rol) {
        throw new Error("Por favor, complete todos los campos");
      }
      if (!credentials.email.includes("@")) {
        throw new Error("Ingrese un correo electrónico válido");
      }

      await registrarUsuario(credentials.email, credentials.password, credentials.rol);

      navigate("/home");
    } catch (error) {
      setError(error.message || "Error al registrar usuario.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Ferrecom</h1>
            <p className="text-gray-600 mt-2">Registro de Usuario</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="nombre@ejemplo.com"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                name="rol"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={credentials.rol}
                onChange={handleChange}
              >
                <option value="">Seleccione un rol</option>
                <option value="CEO">CEO</option>
                <option value="Contador">Contador</option>
                <option value="Vendedor">Vendedor</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {isLoading ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta? <a href="/login" className="text-blue-600 hover:text-blue-800">Inicia sesión aquí</a>
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white text-center py-4 w-full">
        <p className="text-sm">© 2025 FullStock. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default RegisterView;
