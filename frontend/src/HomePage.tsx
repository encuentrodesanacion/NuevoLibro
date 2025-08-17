// src/HomePage.tsx

import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Synopsis from "./components/Synopsis";
import Author from "./components/Author";
import PurchaseSection from "./components/PurchaseSection";
import Footer from "./components/Footer";

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
      <HeroSection />
      <Synopsis />
      <Author />
      <PurchaseSection />
      <Footer />
    </div>
  );
};

export default HomePage;
