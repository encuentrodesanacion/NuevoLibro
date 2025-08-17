import React from "react";

const HeroSection = ({ isAnimated }) => (
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
          isAnimated ? "opacity-100 transform-none" : "opacity-0 -translate-y-5"
        }`}
      >
        Levántate y Pelea
      </h1>
      <p
        className={`text-xl sm:text-2xl md:text-3xl font-light mb-8 transition-all duration-800 ease-out delay-200 ${
          isAnimated ? "opacity-100 transform-none" : "opacity-0 translate-y-5"
        }`}
      >
        Descubre un libro donde lo imposible se hace realidad.
      </p>
      <p
        className={`text-lg sm:text-xl font-medium mb-10 transition-all duration-800 ease-out delay-400 ${
          isAnimated ? "opacity-100 transform-none" : "opacity-0 translate-y-5"
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
);

export default HeroSection;
