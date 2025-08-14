import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-white antialiased flex flex-col items-center justify-center text-center p-6">
      <div className="bg-green-100 rounded-full p-4 mb-6">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        ¡Pago Exitoso!
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Tu compra ha sido procesada con éxito. En breve recibirás un correo
        electrónico de confirmación con los detalles de tu pedido.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Volver a la página de inicio
      </Link>
    </div>
  );
};

export default SuccessPage;
