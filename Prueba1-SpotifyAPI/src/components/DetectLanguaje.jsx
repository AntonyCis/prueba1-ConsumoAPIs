import React, { useState } from "react";
import axios from "axios";

const DetectLanguaje = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const detectarIdioma = async () => {
    if (!text.trim()) return alert("Por favor ingresa un texto");
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("https://api-back-prueba1.onrender.com/api/detect", { text });
      console.log("Respuesta del backend:", res.data);

      let deteccion = null;

      if (res.data?.data?.detections) {
        deteccion = res.data.data.detections[0];
      }

      else if (Array.isArray(res.data) && res.data.length > 0) {
        deteccion = res.data[0];
      }

      else {
        alert("No se pudo interpretar la respuesta del servidor. Revisa la consola.");
        console.warn("Respuesta inesperada:", res.data);
      }

      if (deteccion) setResult(deteccion);
    } catch (err) {
      console.error("Error al detectar idioma:", err);
      alert("Error al detectar idioma. Ver consola para más detalles.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md transition duration-300">
      <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-3">
        🌎 Detección de idioma (API Privada)
      </h2>

      <textarea
        rows="4"
        className="w-full resize-none border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder="Escribe un texto para detectar el idioma..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="flex justify-center mt-4">
        <button
          onClick={detectarIdioma}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Detectando..." : "Detectar idioma"}
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Resultados del análisis
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Idioma detectado:</strong>{" "}
            <span className="text-blue-700 dark:text-blue-400 font-medium">{result.language}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            <strong>Confianza:</strong>{" "}
            <span className="text-blue-700 dark:text-blue-400 font-medium">
              {result.confidence ? (result.confidence * 100).toFixed(1) + "%" : "N/A"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DetectLanguaje;
