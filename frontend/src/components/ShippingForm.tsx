import React, { useState } from "react";

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    numero_telefono: "",
    region: "",
    comuna: "",
    direccion_casa: "",
    correo_electronico: "",
    codigo_postal: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Enviando...");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/registro-envio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ ¡Información de envío guardada con éxito!");
        setIsSuccess(true);
        setFormData({
          nombre_completo: "",
          numero_telefono: "",
          region: "",
          comuna: "",
          direccion_casa: "",
          correo_electronico: "",
          codigo_postal: "",
        });
      } else {
        setMessage(`❌ Error al guardar la información: ${data.error}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("❌ Error de red. Por favor, inténtalo de nuevo.");
      setIsSuccess(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Ingresa tus Datos de Envío
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nombre_completo"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombre_completo"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="numero_telefono"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Teléfono
          </label>
          <input
            type="tel"
            id="numero_telefono"
            name="numero_telefono"
            value={formData.numero_telefono}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="correo_electronico"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo_electronico"
            name="correo_electronico"
            value={formData.correo_electronico}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            Región
          </label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="comuna"
            className="block text-sm font-medium text-gray-700"
          >
            Comuna
          </label>
          <input
            type="text"
            id="comuna"
            name="comuna"
            value={formData.comuna}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="direccion_casa"
            className="block text-sm font-medium text-gray-700"
          >
            Dirección (calle, número)
          </label>
          <input
            type="text"
            id="direccion_casa"
            name="direccion_casa"
            value={formData.direccion_casa}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="codigo_postal"
            className="block text-sm font-medium text-gray-700"
          >
            Código Postal (opcional)
          </label>
          <input
            type="text"
            id="codigo_postal"
            name="codigo_postal"
            value={formData.codigo_postal}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar Datos de Envío
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center font-bold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ShippingForm;
