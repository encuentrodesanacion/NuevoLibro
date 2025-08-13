import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  BookOpen,
  User,
  ShoppingCart,
  Star,
  Quote,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import Roberts from "./assets/Roberts.jpeg";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const App = () => {
  // Estado para controlar la animación (opcional, pero útil para react)
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Al cargar el componente, activamos la animación
    setIsAnimated(true);
  }, []);

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
                onClick={() => scrollToSection("purchase")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Adquirir Libro
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Sección de Encabezado/Hero */}
      <header className="relative bg-gradient-to-r from-blue-500 to-orange-200 text-white py-16 md:py-60 overflow-hidden rounded-b-lg">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 transition-all duration-800 ease-out ${
              isAnimated
                ? "opacity-100 transform-none"
                : "opacity-0 -translate-y-5"
            }`}
          >
            Levantate y Pelea
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
            className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 hover:text-blue-800 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            ¡Pre-ordena tu copia ahora!
          </a>
        </div>
        {/* Elementos de fondo decorativos (opcional) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>
      </header>

      {/* Sección Sobre el Libro */}
      <section
        id="synopsis"
        className="py-16 md:py-20 bg-white rounded-lg mx-4 md:mx-auto mt-8 shadow-lg"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
              Sumérgete en la historia de Roberts
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              "Levantate y Pelea" es una emocionante libro de autoayuda que te
              transportará a un universo de misterio, aventura y
              autodescubrimiento. Sigue a [Nombre del Personaje Principal]
              mientras desentraña secretos ancestrales y se enfrenta a desafíos
              que pondrán a prueba su coraje y su percepción de la realidad.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Con giros inesperados y personajes inolvidables, este libro es una
              lectura obligada para los amantes de [Género del Libro, ej: la
              ciencia ficción, el thriller psicológico, la fantasía épica].
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Placeholder para la imagen de la portada del libro */}
            <img
              src={Roberts}
              alt="Portada del libro Roberts"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Sección Sobre el Autor */}
      <section
        id="author"
        className="py-16 md:py-20 bg-gray-100 rounded-lg mx-4 md:mx-auto mt-8 shadow-lg"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
              Conoce a Roberts
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Roberts es un apasionado narrador con una habilidad única para
              crear y comúnicar. Desde temprana edad, él ha estado fascinado/a
              por [menciona un interés o inspiración, ej: las radios, la física
              cuántica,etc], lo que se refleja en la profundidad y originalidad
              de sus obras.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              "Levántate y Pelea" es su primer libro, y promete consolidar su
              lugar como una voz fresca y influenciadora en la literatura de
              autoayuda.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Placeholder para la imagen del autor */}
            <img
              src="https://placehold.co/300x300/4F46E5/FFFFFF?text=Foto+del+Autor"
              alt="Foto del autor"
              className="rounded-full shadow-lg max-w-full h-auto object-cover w-64 h-64"
            />
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section
        id="purchase"
        className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Adquiere el Libro Ya</h2>
          <p className="text-xl mb-12 text-blue-100">
            Comienza tu transformación hoy mismo. No esperes a que la vida te dé
            otra lección.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Digital Version */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Versión Digital</h3>
              <div className="text-4xl font-bold mb-2">$19.99</div>
              <p className="text-blue-100 mb-6">
                Acceso inmediato • Formatos PDF y ePub
              </p>
              <ul className="space-y-2 text-left mb-8 text-blue-100">
                <li>✓ Descarga instantánea</li>
                <li>✓ Compatible con todos los dispositivos</li>
                <li>✓ Búsqueda de texto integrada</li>
                <li>✓ Notas y marcadores digitales</li>
              </ul>
              {/* Bloque de PayPal comentado para que no genere errores */}
              {/*
              <PayPalScriptProvider options={{ 'client-id': 'TU_CLIENT_ID_DE_PAYPAL' }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return fetch("/api/orders", {
                      method: "post",
                      headers: { "Content-Type": "application/json" },
                    })
                    .then((response) => response.json())
                    .then((order) => order.id);
                  }}
                  onApprove={(data, actions) => {
                    return fetch(`/api/orders/${data.orderID}/capture`, {
                      method: "post",
                      headers: { "Content-Type": "application/json" },
                    })
                    .then((response) => response.json())
                    .then((details) => {
                      alert("¡Pago exitoso! Gracias por tu compra.");
                      console.log("Detalles del pago:", details);
                    });
                  }}
                />
              </PayPalScriptProvider>
              */}
            </div>

            {/* Physical Version */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border-2 border-orange-400">
              <div className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                MÁS POPULAR
              </div>

              <h3 className="text-2xl font-bold mb-4">Libro Físico</h3>
              <div className="text-4xl font-bold mb-2">$29.99</div>
              <p className="text-blue-100 mb-6">
                Envío gratuito • Tapa dura premium
              </p>
              <ul className="space-y-2 text-left mb-8 text-blue-100">
                <li>✓ Libro físico de alta calidad</li>
                <li>✓ Tapa dura con acabado mate</li>
                <li>✓ Envío gratuito mundial</li>
                <li>✓ Ideal para regalar</li>
              </ul>
              {/* Bloque de PayPal comentado para que no genere errores */}
              {/*
              <PayPalScriptProvider options={{ 'client-id': 'TU_CLIENT_ID_DE_PAYPAL' }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return fetch("/api/orders", {
                      method: "post",
                      headers: { "Content-Type": "application/json" },
                    })
                    .then((response) => response.json())
                    .then((order) => order.id);
                  }}
                  onApprove={(data, actions) => {
                    return fetch(`/api/orders/${data.orderID}/capture`, {
                      method: "post",
                      headers: { "Content-Type": "application/json" },
                    })
                    .then((response) => response.json())
                    .then((details) => {
                      alert("¡Pago exitoso! Gracias por tu compra.");
                      console.log("Detalles del pago:", details);
                    });
                  }}
                />
              </PayPalScriptProvider>
              */}
            </div>
          </div>

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

export default App;
