import React from "react";
import { BookOpen, Menu, X } from "lucide-react";

const Navigation = ({ scrollToSection, isMenuOpen, setIsMenuOpen }) => (
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
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
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
);

export default Navigation;
