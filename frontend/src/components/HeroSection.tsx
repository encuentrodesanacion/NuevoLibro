// src/components/HeroSection.tsx

import React from "react";
import { motion } from "framer-motion";
import crackedScreen from "../assets/pantalla.png"; // Importa tu imagen

const HeroSection = () => (
  <header className="relative pt-40 pb-16 md:py-60 overflow-hidden rounded-b-lg text-white">
    {/* Imagen de fondo con superposición */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('/ruta/a/tu/imagen-de-fondo.jpg')` }}
    >
      {/* Capa de color semitransparente */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-purple-800/80"></div>
    </div>

    {/* Efecto de pantalla rota */}
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: [0, 0.1, 0] }}
      transition={{ duration: 0.6, delay: 2.1 }}
      className="absolute inset-0 bg-cover bg-center "
      style={{ backgroundImage: `url(${crackedScreen})` }}
    />
    <div className="container mx-auto px-5 text-center relative z-30">
      <motion.h1
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        animate={{ opacity: 0, y: 0, rotate: 400 }}
        transition={{
          duration: 1,
          delay: 2,
          type: "spring",
          stiffness: 500,
        }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4"
      >
        Levántate y Pelea
      </motion.h1>

      <br></br>
      <br></br>
      <br></br>
      <motion.p
        initial={{ opacity: 0, y: 0, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="text-xl sm:text-2xl md:text-3xl font-light mb-8"
      >
        Descubre un libro donde lo imposible se hace realidad.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        className="text-lg sm:text-xl font-medium mb-10"
      >
        Por Roberts Live
      </motion.p>

      <motion.a
        href="#comprar"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 1,
          type: "spring",
          stiffness: 200,
        }}
        whileHover={{ scale: [1.1, 1.25, 1.1] }}
        className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 hover:text-blue-800 transition-all duration-300 ease-in-out transform hover:shadow-2xl"
      >
        ¡Ordena tu copia ahora!
      </motion.a>
    </div>
    {/* Elementos de fondo decorativos */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
    </div>
  </header>
);

export default HeroSection;
