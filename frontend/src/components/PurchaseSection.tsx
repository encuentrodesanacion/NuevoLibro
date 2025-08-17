import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PurchaseSection = () => {
  const navigate = useNavigate();
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  // Componente de tarjeta de producto
  const ProductCard = ({
    title,
    price,
    description,
    features,
    isPopular,
    isSoldOut,
    reservePrice,
    reserveInfo,
  }) => {
    const handlePurchase = async () => {
      // Usar el precio del abono si se ha especificado, si no, el precio completo
      const finalPrice = reservePrice ? reservePrice : price;
      console.log(`➡️ Frontend: Solicitando crear una orden de pago...`);
      try {
        const response = await fetch("/api/orders", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: finalPrice }),
        });
        if (!response.ok) {
          throw new Error("❌ Fallo al crear la orden en el servidor.");
        }
        const order = await response.json();
        console.log("✅ Frontend: Orden creada, ID recibido:", order.id);
        return order.id;
      } catch (error) {
        console.error("❌ Frontend: Error en createOrder:", error);
        throw error;
      }
    };

    const handleApprove = async (data) => {
      console.log(
        `➡️ Frontend: Aprobando pago para la orden ID: ${data.orderID}`
      );
      try {
        const response = await fetch(`/api/orders/${data.orderID}/capture`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("❌ Fallo al capturar el pago en el servidor.");
        }
        const details = await response.json();
        console.log(
          "✅ Frontend: Pago capturado con éxito. Detalles:",
          details
        );
        navigate("/pago-exitoso");
      } catch (error) {
        console.error("❌ Frontend: Error en onApprove:", error);
        throw error;
      }
    };

    return (
      <div
        className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 ${
          isPopular ? "border-2 border-orange-400" : ""
        }`}
      >
        {isPopular && (
          <div className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
            TIENES EL PODER
          </div>
        )}
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <div className="text-4xl font-bold mb-2">
          {reservePrice ? `$${reservePrice}` : `$${price}`}
        </div>
        <p className="text-blue-100 mb-6">{description}</p>
        <ul className="space-y-2 text-left mb-8 text-blue-100">
          {features.map((feature, index) => (
            <li key={index}>✓ {feature}</li>
          ))}
        </ul>

        {isSoldOut ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 rounded-2xl text-white text-3xl font-extrabold text-center leading-tight p-4">
            <div className="text-red-500 font-extrabold">AGOTADO</div>
          </div>
        ) : (
          <>
            <PayPalButtons
              style={{ layout: "vertical", color: "gold", shape: "rect" }}
              createOrder={handlePurchase}
              onApprove={handleApprove}
            />
            {reserveInfo && (
              <p className="mt-4 text-center text-white font-bold text-lg leading-tight">
                {reserveInfo}
              </p>
            )}
          </>
        )}
      </div>
    );
  };

  if (!paypalClientId) {
    console.error(
      "❌ ERROR: La variable de entorno VITE_PAYPAL_CLIENT_ID no está definida."
    );
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-600 font-bold">
          Error de configuración de PayPal. Por favor, revisa tus variables de
          entorno.
        </p>
      </div>
    );
  }

  return (
    <section
      id="comprar"
      className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">LEVÁNTATE Y PELEA</h2>
        <PayPalScriptProvider options={{ clientId: paypalClientId }}>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Versión Completa */}
            <ProductCard
              title="Versión Física"
              price="19900"
              description="Envio Gratuito"
              features={[
                "Impresión de alta calidad",
                "Tapa blanda resistente",
                "Ideal para regalar",
                "Incluye marcapaginas exclusivo",
              ]}
              isPopular={false}
              isSoldOut={true}
              reservePrice={null}
              reserveInfo={null}
            />
            {/* Versión de Abono */}
            <ProductCard
              title="ABONO PARA RESERVAR"
              price="19900"
              description="Reserva tu copia hoy mismo"
              features={[
                "Paga un abono de $6.990",
                "El resto se paga al momento de la entrega",
                "Entrega en diciembre",
              ]}
              isPopular={true}
              isSoldOut={false}
              reservePrice="6990"
              reserveInfo="Entrega en diciembre"
            />

            {/* Edición Especial Firmada
            <ProductCard
              title="🌟 Edición Especial Firmada"
              price="29900"
              description="Solo 100 copias impresas"
              features={[
                "Incluye firma personalizada",
                "Portada exclusiva",
                "Acceso a evento online con el autor",
                "Certificado de autenticidad",
              ]}
              isPopular={true}
              isSoldOut={false}
              reservePrice={null}
              reserveInfo={null}
            /> */}
          </div>
        </PayPalScriptProvider>
        <div className="text-center space-y-4">
          <p className="text-blue-100">
            🔒 Compra 100% segura • 💯 Garantía de satisfacción de 30 días
          </p>
          <p className="text-sm text-blue-200">
            ¿Tienes preguntas? Contáctanos en contacto@levantayypelea.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default PurchaseSection;
