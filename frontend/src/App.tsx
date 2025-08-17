// src/App.tsx

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Roberts from "./assets/Roberts.jpeg";
import SuccessPage from "./SucessPage";

// Importar los nuevos componentes
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Synopsis from "./components/Synopsis";
import Author from "./components/Author";
import PurchaseSection from "./components/PurchaseSection";
import Footer from "./components/Footer";

// Componente principal que contiene toda la UI y la lógica de la página de inicio
const HomePage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-white antialiased">
      <Navigation
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <HeroSection isAnimated={isAnimated} />
      <Synopsis />
      <Author />
      <PurchaseSection />
      <Footer />
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
