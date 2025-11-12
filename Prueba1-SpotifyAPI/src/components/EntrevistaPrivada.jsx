// src/components/EntrevistaPrivada.jsx
import { useState } from "react";
import axios from "axios";

export default function EntrevistaPrivada() {
  const [respuesta, setRespuesta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const analizarRespuesta = async () => {
    if (!respuesta.trim()) {
      setError("Por favor escribe una respuesta antes de analizar.");
      return;
    }

    setCargando(true);
    setError("");

    try {
    const res = await axios.post(
      "https://api-back-prueba1.onrender.com/api/analizar",
      { respuesta },
      { headers: { "x-access-token": "mi_token_super_privado" } }
    );
    setResultado(res.data); // ✅ corregido
  } catch (err) {
    console.error(err);
    setError("Error al conectar con la API privada.");
  } finally {
    setCargando(false);
  }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg mt-6 border">
      <h2 className="text-2xl font-bold mb-3 text-blue-700 dark:text-blue-400">
        🤖 Evaluador de Respuestas (API Privada)
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-2">
        Escribe tu respuesta a una pregunta de entrevista laboral y obtén retroalimentación simulada con IA.
      </p>

      <textarea
        className="w-full border rounded-lg p-3 focus:outline-blue-500 text-gray-800 bg-white placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-300"
        rows="4"
        placeholder="Ejemplo: Me considero una persona proactiva, responsable y con gusto por trabajar en equipo..."
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
      ></textarea>

      <button
        onClick={analizarRespuesta}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mt-3 disabled:opacity-50"
        disabled={cargando}
      >
        {cargando ? "Analizando..." : "Analizar Respuesta"}
      </button>

      {error && (
        <p className="text-red-500 mt-3 bg-red-100 dark:bg-red-900/30 p-2 rounded">{error}</p>
      )}

      {resultado && (
        <div className="mt-5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded-lg shadow-inner border">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Resultados del Análisis
          </h3>
          <p><strong>Puntaje:</strong> <span className="font-medium">{resultado.puntaje}</span></p>
          <p><strong>Nivel:</strong> <span className="font-medium">{resultado.nivel}</span></p>
          <p className="mt-2"><strong>Retroalimentación:</strong></p>
          <p className="mt-1">{resultado.retroalimentacion}</p>
          {resultado.feedback && typeof resultado.feedback === "object" && (
  <>
    <hr className="my-3 border-gray-300 dark:border-gray-700" />
    <div className="text-sm">
      <p><strong>Técnico:</strong> {resultado.feedback.tecnico}</p>
      <p><strong>Comunicación:</strong> {resultado.feedback.comunicacion}</p>
      <p><strong>Actitud:</strong> {resultado.feedback.actitud}</p>
    </div>
  </>
)}
          <p className="mt-3 text-sm italic text-gray-600 dark:text-gray-300">{resultado.recomendacion}</p>
        </div>
      )}
    </div>
  );
}
