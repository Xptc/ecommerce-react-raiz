import React from 'react';

const Header = ({ cantidad }) => {
  return (
    // bg-white: fondo blanco | shadow-sm: sombra sutil | p-4: padding | sticky top-0 z-50: fijo arriba al hacer scroll
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50 font-sans">
      
      {/* Logotipo */}
      <div className="header-logo">
        {/* text-xl: tamaño | font-bold: negrita | text-sky-800: color verde orgánico de oxapampa */}
        <span className="text-xl font-bold text-sky-800 tracking-wide">Raíz Selva</span>
      </div>

      {/* Navegación de Iconos */}
      <nav className="flex items-center gap-4">
        
        {/* Botón Buscar (Lupa generada con código SVG) */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
          </svg>
        </button>

        {/* Botón Favoritos (Corazón generado con código SVG) */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        {/* Contenedor relativo para posicionar el badge de notificación */}
        <div className="relative">
          {/* Botón Carrito (Carrito generado con código SVG) */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>
          
          {/* Badge atómico: rojo, centrado, tipografía pequeña */}
          <span className="absolute top-1 right-1 bg-sky-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-semibold">
            {cantidad}
          </span>
        </div>

      </nav>
    </header>
  );
};

export default Header;