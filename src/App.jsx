// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

import Login from './components/Login'; // <-- IMPORTAMOS EL NUEVO COMPONENTE

import { db } from './firebaseConfig'; 
import { collection, getDocs, addDoc } from "firebase/firestore";

const App = () => {
  // --- NUEVOS ESTADOS PARA EL LOGIN ---
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState({ nombres: '', correo: '' });

  // --- ESTADOS DEL CATÁLOGO (Los que ya tenías) ---
  const [productos, setProductos] = useState([]); 
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [cargando, setCargando] = useState(true); 
  const [errorNet, setErrorNet] = useState(null); 

  // Esta función se ejecuta cuando el usuario llena el formulario correctamente
const manejarInicioSesion = async (nombre, correo) => {
    try {
      await addDoc(collection(db, "usuarios"), {
        nombre: nombre,
        correo: correo,
        fechaRegistro: new Date().toLocaleString() 
      });

      setDatosUsuario({ nombre, correo });
      setSesionIniciada(true);
      
    } catch (error) {
      console.error("Error al guardar el usuario en Firebase:", error);
      // EN LUGAR DEL ALERT, LANZAMOS EL ERROR HACIA EL LOGIN
      throw new Error("Sin conexión"); 
    }
  };

  useEffect(() => {
    // Solo cargamos los productos SI la sesión está iniciada
    if (!sesionIniciada) return;

    const obtenerDatosDeFirebase = async () => {
      try {
        setCargando(true);
        setErrorNet(null);

        const productosRef = collection(db, "productos");
        const snapshot = await getDocs(productosRef);

        const productosLimpios = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, 
            nombre: data.nombre || "Producto sin nombre",
            precio: Number(data.precio) || 0,
            precioAntiguo: Number(data.precioAntiguo) || 0,
            descuento: data.descuento || "",
            imagen: data.imagen || "https://via.placeholder.com/150"
          };
        });

        setProductos(productosLimpios);

      } catch (err) {
        console.error("Error al conectar con Firebase:", err);
        setErrorNet("Error de conexión con la base de datos.");
      } finally {
        setCargando(false);
      }
    };

    obtenerDatosDeFirebase();
  }, [sesionIniciada]); // <-- El useEffect ahora depende de que se inicie sesión

  const incrementarCarrito = () => {
    setCantidadCarrito(cantidadCarrito + 1);
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  // --- CONDICIONAL PRINCIPAL ---
  // Si la sesión NO está iniciada, mostramos la pantalla de Login
  if (!sesionIniciada) {
    return (
      <>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Login onIniciarSesion={manejarInicioSesion} />
      </>
    );
  }

  console.log("Productos cargados:", productos);
  // Si la sesión SÍ está iniciada, mostramos el catálogo
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header cantidad={cantidadCarrito} />

      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-grow">
        
        {/* Mensaje de bienvenida personalizado */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            ¡Hola, {datosUsuario.nombre}!
          </h2>
          <p className="text-sm text-gray-500">Revisa nuestros productos disponibles.</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar en el catálogo..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            disabled={cargando}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg font-sans text-sm outline-none focus:border-emerald-600 shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mb-12">
          
          <section className="text-left lg:col-span-3">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-bold text-gray-800">Catálogo en Tiempo Real</h3>
              {!cargando && (
                <span className="text-xs text-gray-500 font-sans">{productosFiltrados.length} disponibles</span>
              )}
            </div>

            {cargando && (
              <div className="text-center py-12 font-sans text-gray-500 animate-pulse">
                <p className="text-base font-semibold">Conectando con la nube...</p>
              </div>
            )}

            {errorNet && !cargando && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg font-sans text-sm">
                <p className="font-bold">Error de conexión:</p>
                <p className="text-xs">{errorNet}</p>
              </div>
            )}

            {!cargando && !errorNet && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                {productosFiltrados.length === 0 ? (
                  <p className="col-span-full text-gray-500 font-sans text-sm py-8">
                    No hay coincidencias para "{terminoBusqueda}".
                  </p>
                ) : (
                  productosFiltrados.map((item) => (
                    <Card
                      key={item.id}
                      producto={item}
                      alAgregar={incrementarCarrito}
                    />
                  ))
                )}
              </div>
            )}
          </section>

          <section className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-left">
            <h3 className="font-bold text-gray-800 text-base mb-2">Estado del Servidor</h3>
            <div className="flex items-center gap-2 mb-4 font-sans text-xs">
              <span className={`w-3 h-3 rounded-full ${errorNet ? 'bg-red-500' : cargando ? 'bg-amber-400' : 'bg-emerald-500'}`}></span>
              <span className="text-gray-500">
                {errorNet ? 'Desconectado' : cargando ? 'Sincronizando...' : 'Online (Nube)'}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2 mb-2 font-sans text-sm text-gray-700">
              <span>Canasta:</span>
              <span className="font-bold text-emerald-600">{cantidadCarrito} uds</span>
            </div>
            <button 
              onClick={() => alert(`¡Orden procesada para ${datosUsuario.correo}!`)}
              className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-3 rounded-md"
            >
              Procesar Orden
            </button>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;