import { useState } from "react";

function SearchBar() {
  const [artist, setArtist] = useState("");
  const [artists, setArtists] = useState([]);
  const [searched, setSearched] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (artist.trim() === "") {
      alert("Campo não pode ser vazio");
      return;
    }
    setSearched(true);
    setArtist("");
    getArtist(artist);
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c57ec4b048mshf8d88185a6b44dep132c3cjsn23499f236a2c",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  async function getArtist(artist) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${artist}&type=artists&offset=0&limit=10&numberOfTopResults=5`;
      let data = await fetch(url, options);
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
        {searched && artists.length === 0 ? (
          <p>Nenhum artista encontrado</p>
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
                      className="w-full h-32 object-cover mb-2 rounded"
                    />
                  )}
                {artist.data.profile && artist.data.profile.name && (
                  <h2 className="text-lg font-semibold">
                    {artist.data.profile.name}
                  </h2>
                )}
                <a href="#" className="text-blue-500 hover:underline">
                  Contratar
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
