// CÓDIGO ACTUALIZADO PARA RESOLVER EL ERROR DE COMPILACIÓN

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import Roberts from "./assets/Roberts.jpeg";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import SuccessPage from "./SucessPage";

// Componente para la tarjeta de producto, ahora recibe navigate como prop
const ProductCard = ({
  title,
  price,
  description,
  features,
  isPopular,
  navigate,
}) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 ${
        isPopular ? "border-2 border-orange-400" : ""
      }`}
    >
      {isPopular && (
        <div className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
          MÁS POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="text-4xl font-bold mb-2">${price}</div>
      <p className="text-blue-100 mb-6">{description}</p>
      <ul className="space-y-2 text-left mb-8 text-blue-100">
        {features.map((feature, index) => (
          <li key={index}>✓ {feature}</li>
        ))}
      </ul>
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect" }}
        createOrder={async () => {
          console.log(
            `➡️ Frontend: Solicitando crear una orden para ${title}...`
          );
          try {
            const response = await fetch("/api/orders", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ price: price }),
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
        }}
        onApprove={async (data) => {
          console.log(
            `➡️ Frontend: Aprobando pago para la orden ID: ${data.orderID}`
          );
          try {
            const response = await fetch(
              `/api/orders/${data.orderID}/capture`,
              {
                method: "post",
                headers: { "Content-Type": "application/json" },
              }
            );
            if (!response.ok) {
              throw new Error("❌ Fallo al capturar el pago en el servidor.");
            }
            const details = await response.json();
            console.log(
              "✅ Frontend: Pago capturado con éxito. Detalles:",
              details
            );

            // Redirige al usuario a la página de éxito
            navigate("/pago-exitoso");
          } catch (error) {
            console.error("❌ Frontend: Error en onApprove:", error);
            throw error;
          }
        }}
      />
    </div>
  );
};

// Componente principal que contiene toda la UI y la lógica
const HomePage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

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
    <div className="min-h-screen bg-white antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Levántate y Pelea
              </span>
            </div>
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" /> // Icono de 'X' si el menú está abierto
                ) : (
                  <Menu className="block h-6 w-6" /> // Icono de menú si está cerrado
                )}
              </button>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("synopsis")}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Sinopsis
              </button>
              <button
                onClick={() => scrollToSection("author")}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Sobre el Autor
              </button>
              <button
                onClick={() => scrollToSection("comprar")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Adquirir Libro
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => scrollToSection("synopsis")}
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Sinopsis
              </button>
              <button
                onClick={() => scrollToSection("author")}
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Sobre el Autor
              </button>
              <button
                onClick={() => scrollToSection("comprar")}
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Adquirir Libro
              </button>
            </div>
          </div>
        )}
      </nav>
      {/* Sección de Encabezado/Hero */}
      <header className="relative pt-40 pb-16 md:py-60 overflow-hidden rounded-b-lg text-white">
        {/* Imagen de fondo con superposición */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/ruta/a/tu/imagen-de-fondo.jpg')` }}
        >
          {/* Capa de color semitransparente */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-purple-800/80"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 transition-all duration-800 ease-out ${
              isAnimated
                ? "opacity-100 transform-none"
                : "opacity-0 -translate-y-5"
            }`}
          >
            Levántate y Pelea
          </h1>

          <p
            className={`text-xl sm:text-2xl md:text-3xl font-light mb-8 transition-all duration-800 ease-out delay-200 ${
              isAnimated
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-5"
            }`}
          >
            Descubre un libro donde lo imposible se hace realidad.
          </p>

          <p
            className={`text-lg sm:text-xl font-medium mb-10 transition-all duration-800 ease-out delay-400 ${
              isAnimated
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-5"
            }`}
          >
            Por Roberts Live
          </p>

          <a
            href="#comprar"
            className={`inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 hover:text-blue-800 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${
              isAnimated ? "opacity-100 transform-none" : "opacity-0 scale-80"
            }`}
          >
            ¡Pre-ordena tu copia ahora!
          </a>
        </div>
        {/* Elementos de fondo decorativos */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>
      </header>
      <section
        id="synopsis"
        className="py-20 bg-gradient-to-r from-gray-50 to-white overflow-hidden"
      >
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
            UN DÍA DECIDÍ LEVANTARME
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              Recuperé la fe, me alejé de lo tóxico, de personas y situaciones
              que solo me hacían daño. Comprendí que cuando uno dice{" "}
              <span className="font-bold">"todo suma"</span>, es verdad: suma lo
              bueno... pero también lo malo, porque de ambas cosas aprendemos.
            </p>
            <p>
              Hoy, con 60 años, puedo decir que he vivido intensamente y que la
              mejor etapa de mi vida estaba aún por llegar. Por eso, este es mi
              mensaje para ti:{" "}
              <span className="font-bold">levántate, valórate</span> y sigue
              caminando con esperanza. El milagro que esperas puede estar más
              cerca de lo que imaginas.
            </p>
            <p>
              El éxito es voluntad, y tú tienes un potencial enorme. No te dejes
              humillar, no permitas que nadie apague tu luz. Eres increíble.
              Mantente fiel a tus principios, sigue intentándolo y recuerda que
              cada paso cuenta.
            </p>
            <p>
              En este libro,{" "}
              <span className="font-bold">"Levántate y pelea"</span>, comparto
              mi historia, mis luchas y las lecciones que me permitieron
              recuperar mi fuerza. Quiero inspirarte a creer en ti mismo y a
              entender que, sin importar cuántas veces caigas, siempre puedes
              volver a levantarte.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Sobre el Autor */}
      <section
        id="author"
        className="py-20 bg-gray-900 text-white overflow-hidden"
      >
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2 relative p-4">
            <div className="relative z-10">
              <img
                src={Roberts}
                alt="Foto del autor"
                className="rounded-full shadow-2xl mx-auto w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-blue-500"
              />
            </div>
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30"></div>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-orange-400">
              PROTAGONISTA DE TU HISTORIAS
            </h2>
            <p className="text-xl leading-relaxed text-gray-300 mb-6">
              Creo que ninguna biografía es realmente relevante: lo único
              verdaderamente valioso en esta vida es el aquí y el ahora.
            </p>
            <p className="text-lg leading-relaxed text-gray-400">
              Podría contarte que me tomó 40 años atreverme a hablar en público,
              pero bastó un solo día para despertar la conciencia de lo
              importante que es comunicar y ser el protagonista de tu propia
              historia...esa historia que comienza hoy.{" "}
              <span className="font-bold text-orange-400">
                ¡Vamos, que se puede!
              </span>
            </p>
          </div>
        </div>
      </section>
      {/* Purchase Section */}
      <section
        id="comprar"
        className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Adquiere el Libro Ya</h2>
          <p className="text-xl mb-12 text-blue-100">
            Comienza tu transformación hoy mismo. No esperes a que la vida te dé
            otra lección.
          </p>

          <PayPalScriptProvider options={{ clientId: paypalClientId }}>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Versión Digital /grids-cols-2 ==> Para cuadricula 2 columnas */}
              <ProductCard
                title="Versión Digital"
                price="19.99"
                description="Acceso inmediato • Formatos PDF y ePub"
                features={[
                  "Descarga instantánea",
                  "Compatible con todos los dispositivos",
                  "Búsqueda de texto integrada",
                  "Notas y marcadores digitales",
                ]}
                isPopular={false}
                navigate={navigate}
              />

              {/* Versión Física */}
              <ProductCard
                title="Libro Físico"
                price="29.99"
                description="Envío gratuito • Tapa dura premium"
                features={[
                  "Libro físico de alta calidad",
                  "Tapa dura con acabado mate",
                  "Envío gratuito mundial",
                  "Ideal para regalar",
                ]}
                isPopular={true}
                navigate={navigate}
              />
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
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-xl font-bold">Levántate y Pelea</span>
            </div>
            <div className="text-gray-400">
              © 2025 Levántate y Pelea. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Componente principal que envuelve las rutas
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pago-exitoso" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
