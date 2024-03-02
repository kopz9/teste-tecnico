import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { NavigationBar } from "./NavBar";

function SearchBar() {
  const [artist, setArtist] = useState("");
  const [artists, setArtists] = useState([]);
  const [hiredArtists, setHiredArtists] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (artist.trim() === "") {
      alert("Campo não pode ser vazio");

      return;
    }

    // Check if the date was already used
    if (hiredArtists.some((hiredArtist) => hiredArtist.data === selectedDate)) {
      alert("data selecionada");
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
      <NavigationBar />
      <div className="flex flex-col justify-center items-center ">
        <h2 className="font-medium font-mono text-white text-3xl mt-7 mb-3">
          StarSeeker
        </h2>
        <div className="flex items-center">
          <Input
            className="border-2 h-8 px-2 pr-16 rounded-lg text-sm text-white focus:outline-none"
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <form onSubmit={handleSearch} className="ml-2">
            <Button
              className="bg-white hover:bg-slate-400 text-black font-bold py-2 px-4 rounded"
              type="submit"
            >
              Buscar
            </Button>
          </form>
        </div>
        {artists.length === 0 ? (
          <p className="text-white mt-8">
            Digite o nome de um artista na barra de busca!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {artists.map((artist, index) => (
              <div
                key={index}
                className="transition-transform duration-300 hover:translate-y-[-5px] bg-white p-6 rounded shadow flex flex-col"
              >
                {artist.data.visuals &&
                  artist.data.visuals.avatarImage &&
                  artist.data.visuals.avatarImage.sources[0] && (
                    <img
                      src={artist.data.visuals.avatarImage.sources[0].url}
                      alt="artist image"
                      className="w-full h-48 object-cover mb-2 rounded scale-110 mb-5"
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                {artist.data.profile && artist.data.profile.name && (
                  <h2 className="text-lg font-semibold">
                    {artist.data.profile.name}
                  </h2>
                )}
                <Link
                  to="/form"
                  className="mt-auto inline-block  bg-neutral-800 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded text-center"
                  onClick={() => {
                    setHiredArtists([
                      ...hiredArtists,
                      {
                        hiredArtist: artist.data.profile.name,
                        date: selectedDate,
                      },
                    ]);
                    localStorage.setItem(
                      "selectedArtist",
                      JSON.stringify(artist.data.profile)
                    );
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
