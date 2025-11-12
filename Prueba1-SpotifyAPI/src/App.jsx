import './App.css'
import Landing from './pages/Landing'
import Spotify from './components/spotify/Spotify'
import EntrevistaPrivada from './components/EntrevistaPrivada'
import DetectLanguaje from './components/detectLanguaje'

function App() {
  

  return (
    <>
      <Spotify />
      <h1 className="text-5xl font-extrabold text-white flex items-center justify-left gap-4 py-10">Consumo de API PRIVADA</h1>
      <h2 className="text-2xl font-extrabold text-white flex items-center justify-left gap-4 py-5">API RESPUESTAS</h2>
      <section className="bg-gray-100 dark:bg-gray-950 py-10 border-t border-gray-300 dark:border-gray-700 rounded-lg">
      <EntrevistaPrivada/>
      </section>
      <h2 className="text-2xl font-extrabold text-white flex items-center justify-left gap-4 py-5">API DETECCIÓN DE LENGUAJE</h2>
      <section className="bg-gray-100 dark:bg-gray-950 py-10 border-t border-gray-300 dark:border-gray-700 rounded-lg mt-10">
  <DetectLanguaje />
</section>
    </>
  )
}

export default App
