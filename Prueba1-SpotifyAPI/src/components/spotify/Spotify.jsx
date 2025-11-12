import { useState } from "react";
import { Search, Music, PlayCircle, Disc } from 'lucide-react';

const Spotify = () => {

    const [busqueda, setBusqueda] = useState("");
    const [canciones, setCanciones] = useState([]);
    const [estaCargando, setEstaCargando] = useState(false);
    const [sinResultados, setSinResultados] = useState(false);

    // Formulario de busqueda
    function handleSearch(e) {
        e.preventDefault();
        if (busqueda.trim() === "") {
            alert("Por favor ingresa el nombre de una canción");
            return;
        }
        setSinResultados(false);
        getSongs(busqueda);
    }

    // Configuracion de la API
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    async function getSongs(terminoDeBusqueda) {
        setEstaCargando(true);
        setCanciones([]);
        try {
            const url = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(terminoDeBusqueda)}&type=tracks&offset=0&limit=20&numberOfTopResults=5`;
            const response = await fetch(url, options);
            const data = await response.json();

            const cancionesValidas = data.tracks.items.filter(item => 
                item.data?.albumOfTrack?.coverArt?.sources?.[0]?.url
            );

            if (cancionesValidas.length === 0) {
                setSinResultados(true);
            } else {
                setCanciones(cancionesValidas);
            }

        } catch (error) {
            console.error("Error al buscar canciones:", error);
            setSinResultados(true);
        } finally {
            setEstaCargando(false);
        }
    }

    //Renderizado del componente
    return (
        <div className="bg-[#121212] min-h-screen text-white w-full">
            <div className="px-4 sm:px-8 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white flex items-center justify-center gap-4">
                        <Music size={48} className="text-[#1DB954]" />
                        Búsqueda Spotify
                    </h1>
                    <p className="text-gray-400 mt-2">Encuentra tus canciones favoritas.</p>
                </header>

                <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto mb-12">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                            placeholder="Buscar canción, artista..."
                            className="w-full pl-10 pr-4 py-3 text-white bg-[#282828] border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all duration-300 placeholder-gray-500"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <button
                        type="submit"
                        disabled={estaCargando}
                        className="px-6 py-3 font-bold text-black bg-[#1DB954] rounded-full hover:bg-[#1ED760] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#191414] focus:ring-[#1ED760] transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {estaCargando ? '...' : 'Buscar'}
                    </button>
                </form>

                {estaCargando && <p className="text-center text-lg">Buscando...</p>}
                
                {sinResultados && !estaCargando && (
                    <div className="text-center text-gray-400 mt-10">
                        <h3 className="text-2xl mb-2">No se encontraron resultados</h3>
                        <p>Intenta con otra búsqueda.</p>
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {canciones.map((song) => (
                        <div key={song.data.id} className="bg-[#181818] p-4 rounded-lg shadow-lg flex flex-col group transition-all duration-300 hover:bg-[#282828] cursor-pointer">
                            <div className="relative mb-4">
                                <img
                                    src={song.data.albumOfTrack?.coverArt?.sources[0]?.url}
                                    alt={`Portada de ${song.data.name}`}
                                    className="w-full h-auto aspect-square rounded-md object-cover shadow-md"
                                />
                                <a href={song.data.uri} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-transparent bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                    <PlayCircle size={64} className="text-white transform transition-transform duration-300 group-hover:scale-110" />
                                </a>
                            </div>

                            <div className="flex flex-col items-start text-left w-full min-h-[100px]">
                                <h2 className="font-bold text-base truncate w-full" title={song.data.name}>
                                    {song.data.name}
                                </h2>
                                <p className="text-sm text-gray-400 truncate w-full" title={song.data.artists?.items[0]?.profile?.name}>
                                    {song.data.artists?.items[0]?.profile?.name}
                                </p>

                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 w-full">
                                    <Disc size={14} />
                                    <p className="truncate" title={song.data.albumOfTrack.name}>
                                        {song.data.albumOfTrack.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Spotify;