import React, { useState } from 'react';
import toast from 'react-hot-toast'; // Usaremos esto para TODOS los mensajes

const Login = ({ onIniciarSesion }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [procesando, setProcesando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    // 1. Validación de campos vacíos (Ahora usa un Toast)
    if (!nombre.trim() || !correo.trim()) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    // 2. Validación de formato de correo (Tal como pedía el PDF)
    const emailRegex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    if (!emailRegex.test(correo)) {
      toast.error('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // 3. Verificación instantánea de internet
    if (!navigator.onLine) {
      toast.error('Sin conexión. Revisa tu internet.');
      return;
    }

    // Si todo está correcto, activamos el botón de carga
    setProcesando(true);

    try {
      await onIniciarSesion(nombre, correo);
      toast.success('¡Bienvenido a Raíz Selva!');
      
    } catch (error) {
      toast.error('Hubo un problema al iniciar sesión.');
      console.error(error);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Bienvenido a Raíz Selva
        </h2>

        <form onSubmit={manejarEnvio} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={procesando}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-emerald-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            {/* OJO AQUÍ: Cambiamos type="email" a type="text" para que el navegador no meta su propio mensaje */}
            <input
              type="text"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={procesando}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-emerald-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={procesando}
            className={`w-full text-white font-bold py-3 rounded transition-colors flex justify-center items-center gap-2 mt-4 ${
              procesando ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {procesando ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ingresando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;