import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecuperarPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      if (!email.includes("@")) {
        throw new Error("Por favor, ingrese un correo electrónico válido");
      }

      // Simulación de una llamada a API para recuperación de contraseña
      setTimeout(() => {
        setMessage("Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setError(error.message || "Error al enviar la solicitud");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Recuperar Contraseña</h1>
            <p className="text-gray-600 mt-2">Ingresa tu correo electrónico para restablecer tu contraseña</p>
          </div>

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p>{message}</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {isLoading ? "Enviando..." : "Enviar Enlace"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Recordaste tu contraseña? {" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPassword;
