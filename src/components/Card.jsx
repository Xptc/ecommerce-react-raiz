import React from 'react';

const Card = ({ producto, alAgregar }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between w-full h-full">
      <img 
        src={producto.imagen} 
        alt={producto.nombre} 
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <div className="text-left mb-3">
        <h3 className="font-bold text-gray-800 text-sm">{producto.nombre}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-emerald-600 font-bold text-sm">S/ {producto.precio}</span>
          {producto.precioAntiguo > 0 && (
            <span className="text-gray-400 line-through text-xs">S/ {producto.precioAntiguo}</span>
          )}
        </div>
        {producto.descuento && (
          <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full inline-block mt-1">
            {producto.descuento}
          </span>
        )}
      </div>
      <button 
        onClick={alAgregar}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded transition-colors mt-auto"
      >
        Agregar
      </button>
    </div>
  );
};

export default Card;