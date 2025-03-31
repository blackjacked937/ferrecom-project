import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../../APIS/apiInicioSesion"; // API para iniciar sesión
import { useAuth } from "../../context/AuthContext";

const LoginView = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Usar el hook de autenticación
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const goToRegister = () => {
    navigate("/registro");
  };

  const goToRecoverPassword = () => {
    navigate("/recuperar-password");
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validación básica
      if (!credentials.email || !credentials.password) {
        throw new Error("Por favor, complete todos los campos");
      }

      if (!credentials.email.includes('@')) {
        throw new Error("Por favor, ingrese un correo electrónico válido");
      }

      // Llamada a la API de autenticación
      const response = await iniciarSesion(credentials.email, credentials.password);
      
      // Usar la función login del contexto en lugar de guardar directamente en localStorage
      login(response.token, response.userData);
      
      console.log('Login exitoso, redirigiendo...');
      // Cambiamos la redirección a /home para que sea consistente con nuestras rutas protegidas
      navigate('/home');
    } catch (error) {
      setError(error.message || "Error al iniciar sesión. Verifique sus credenciales.");
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
            <p className="text-gray-600 mt-2">Sistema de Gestión de Inventario</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="nombre@ejemplo.com"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <a onClick={goToRecoverPassword} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
  ¿Olvidaste tu contraseña?
</a>

              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={goToRegister}
                className="text-blue-600 hover:text-blue-800"
              >
                Regístrate aquí
              </button>
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

export default LoginView;