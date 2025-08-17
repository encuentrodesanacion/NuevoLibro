// src/components/Synopsis.tsx

import React from "react";
import TextToSpeechButton from "./TextToSpeechButton"; // Importa el nuevo componente

const Synopsis = () => {
  const fullText = `
    Recuperé la fe, me alejé de lo tóxico, de personas y situaciones que solo me hacían daño. Comprendí que cuando uno dice "todo suma", es verdad: suma lo bueno... pero también lo malo, porque de ambas cosas aprendemos.

    Hoy, con 60 años, puedo decir que he vivido intensamente y que la mejor etapa de mi vida estaba aún por llegar. Por eso, este es mi mensaje para ti: levántate, valórate y sigue caminando con esperanza. El milagro que esperas puede estar más cerca de lo que imaginas.

    El éxito es voluntad, y tú tienes un potencial enorme. No te dejes humillar, no permitas que nadie apague tu luz. Eres increíble. Mantente fiel a tus principios, sigue intentándolo y recuerda que cada paso cuenta.

    En este libro, "Levántate y pelea", comparto mi historia, mis luchas y las lecciones que me permitieron recuperar mi fuerza. Quiero inspirarte a creer en ti mismo y a entender que, sin importar cuántas veces caigas, siempre puedes volver a levantarte.
  `;

  return (
    <section
      id="synopsis"
      className="py-20 bg-gradient-to-r from-gray-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
          UN DÍA DECIDÍ LEVANTARME{" "}
          <div className="mt-8 text-left">
            <TextToSpeechButton text={fullText} />
          </div>
        </h2>

        <div className="space-y-6 text-lg text-gray-700">
          <p>
            Recuperé la fe, me alejé de lo tóxico, de personas y situaciones que
            solo me hacían daño. Comprendí que cuando uno dice{" "}
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
            <span className="font-bold">"Levántate y pelea"</span>, comparto mi
            historia, mis luchas y las lecciones que me permitieron recuperar mi
            fuerza. Quiero inspirarte a creer en ti mismo y a entender que, sin
            importar cuántas veces caigas, siempre puedes volver a levantarte.
          </p>
        </div>

        {/* Aquí agregamos el nuevo botón de altavoz */}
      </div>
    </section>
  );
};

export default Synopsis;
