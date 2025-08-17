import React from "react";
import ShippingForm from "./components/ShippingForm";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-white antialiased flex flex-col items-center justify-center p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ ¡Pago Exitoso!
        </h1>
        <p className="text-xl text-gray-700">
          Gracias por tu compra. Ahora, por favor, completa tus datos de envío
          para que podamos enviarte tu libro.
        </p>
      </div>

      <ShippingForm />
    </div>
  );
};

export default SuccessPage;
