import React, { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [artist, setArtist] = useState("");
  const [artists, setArtists] = useState([]);
  const [hiredArtists, setHiredArtists] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    if (artist.trim() === "") {
      alert("Campo não pode ser vazio");
      return;
    }

    // Verificar se a data já foi selecionada
    if (hiredArtists.some((hiredArtist) => hiredArtist.data === selectedDate)) {
      alert("Artista já contratado nesta data");
      return;
    }

    setArtist("");
    getArtist(artist);
  }

  async function getArtist(artist) {
    try {
      let url = `http://localhost:3001/api/search?artist=${artist}`;
      let data = await fetch(url);
      let res = await data.json();
      setArtists(res.artists.items);
      console.log(res.artists.items);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="h-screen w-screen bg-indigo-500 ">
        <h2>Spotify API</h2>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <form onSubmit={handleSearch}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Buscar
          </button>
        </form>
        {artists.length === 0 ? (
          <p>Digite o nome de um artista na barra de busca!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artists.map((artist, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                {artist.data.visuals &&
                  artist.data.visuals.avatarImage &&
                  artist.data.visuals.avatarImage.sources[0] && (
                    <img
                      src={artist.data.visuals.avatarImage.sources[0].url}
                      alt=""
                      className="w-full h-82 object-cover mb-2 rounded"
                      loading="lazy"
                    />
                  )}
                {artist.data.profile && artist.data.profile.name && (
                  <h2 className="text-lg font-semibold">
                    {artist.data.profile.name}
                  </h2>
                )}
                <Link
                  to="/form"
                  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setHiredArtists([...hiredArtists, { hiredArtist: artist.data.profile.name, date: selectedDate }]);
                    localStorage.setItem("selectedArtist", JSON.stringify(artist.data.profile));
                  }}
                >
                  Contratar
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;