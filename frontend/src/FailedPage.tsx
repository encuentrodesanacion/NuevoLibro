import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const FailedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 antialiased flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-lg">
        <XCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ❌ ¡El Pago Falló!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Lo sentimos, ha ocurrido un error al procesar tu pago. Por favor,
          revisa los detalles de tu tarjeta e inténtalo de nuevo.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Volver a la Página Principal
        </Link>
      </div>
    </div>
  );
};

export default FailedPage;
