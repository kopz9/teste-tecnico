import React from "react";

export const HiredArtists = () => {
  const formDataList = JSON.parse(localStorage.getItem("formDataList")) || [];
  const selectedArtist = JSON.parse(localStorage.getItem("selectedArtist")) || [];
  return (
    <div>
      <h2>Artistas Contratados</h2>
      <ul>
        {formDataList.map((formData, index) => (
          <li key={index}>
            <strong>Contratante:</strong> {formData.contratante},{" "}
            <strong>Cache:</strong> {formData.cache},{" "}
            <strong>Data do Evento:</strong> {formData.dataEvento},{" "}
            <strong>Endereço do Evento:</strong> {formData.enderecoEvento}
            <strong>Artista:</strong> {selectedArtist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
