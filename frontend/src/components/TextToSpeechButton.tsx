// src/components/TextToSpeechButton.tsx

import React, { useState } from "react";
import { Volume2, Pause, Play } from "lucide-react";

const TextToSpeechButton = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;

      // Si el audio está en pausa, lo reanuda
      if (isPaused) {
        synthesis.resume();
        setIsPaused(false);
        setIsPlaying(true);
        return;
      }

      // Si ya está reproduciéndose, lo pausa
      if (synthesis.speaking) {
        synthesis.pause();
        setIsPaused(true);
        setIsPlaying(false);
        return;
      }

      // Si no se está reproduciendo ni pausado, inicia la lectura
      const utterance = new SpeechSynthesisUtterance(text);
      synthesis.speak(utterance);
      setIsPlaying(true);

      // Maneja el final de la lectura
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
    } else {
      alert("Lo siento, tu navegador no soporta la lectura de texto.");
    }
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleSpeak}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        title={isPlaying ? "Pausar lectura" : "Leer texto en voz alta"}
      >
        {isPlaying && !isPaused ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Volume2 className="h-6 w-6" />
        )}
        <span className="text-sm font-medium">
          {isPlaying && !isPaused
            ? "Pausar"
            : isPaused
            ? "Reanudar"
            : "Leer texto"}
        </span>
      </button>

      {(isPlaying || isPaused) && (
        <button
          onClick={handleStop}
          className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
          title="Detener lectura"
        ></button>
      )}
    </div>
  );
};

export default TextToSpeechButton;
