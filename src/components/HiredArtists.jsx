import React from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "./NavBar";

export const HiredArtists = () => {
  const formDataList = JSON.parse(localStorage.getItem("formDataList")) || [];
  const selectedArtist =
    JSON.parse(localStorage.getItem("selectedArtist")) || [];
  return (
    <>
    <NavigationBar />
    <div>
      <h2>Artistas Contratados</h2>
      {formDataList.map((formData, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <p>
            <strong>Contratante:</strong> {formData.contratante}
          </p>
          <p>
            <strong>Cache:</strong> {formData.cache}
          </p>
          <p>
            <strong>Data do Evento:</strong> {formData.dataEvento}
          </p>
          <p>
            <strong>Endereço do Evento:</strong> {formData.enderecoEvento}
          </p>
          <p>
            <strong>Artista:</strong>{" "}
            {selectedArtist ? selectedArtist.name : ""}
          </p>
          <Link
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to="/"
          >
            Continuar contratando
          </Link>
        </div>
      ))}
    </div>
    </>
  );
};
