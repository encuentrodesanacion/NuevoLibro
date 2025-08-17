import React from "react";
import Roberts from "../assets/Roberts.jpeg";

const Author = () => (
  <section id="author" className="py-20 bg-gray-900 text-white overflow-hidden">
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
          pero bastó un solo día para despertar la conciencia de lo importante
          que es comunicar y ser el protagonista de tu propia historia...esa
          historia que comienza hoy.{" "}
          <span className="font-bold text-orange-400">
            ¡Vamos, que se puede!
          </span>
        </p>
      </div>
    </div>
  </section>
);

export default Author;
