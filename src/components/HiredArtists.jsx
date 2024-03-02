import React from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "./NavBar";
import { format } from "date-fns";
import { Button } from "./ui/button";

export const HiredArtists = () => {
  const formDataList = JSON.parse(localStorage.getItem("formDataList")) || [];
  const selectedArtist = JSON.parse(localStorage.getItem("selectedArtist")) || [];

  const handleClearLocalStorage = (index) => {
    const updatedFormDataList = [...formDataList];
    updatedFormDataList.splice(index, 1);
    localStorage.setItem("formDataList", JSON.stringify(updatedFormDataList));
    window.location.reload();
  };

  return (
    <>
      <NavigationBar />
      <h2 className="text-white text-center font-mono text-3xl">
        Artistas Contratados
      </h2>
      <div className="m-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {formDataList.map((formData, index) => {
          return (
            <div
              key={index}
              className="bg-neutral-400 p-[40px] rounded-lg shadow-md"
            >
              <p className="mb-3">
                {formData.artista && formData.artista.photoUrl && (
                  <img
                    className="w-full h-[368px] object-cover rounded scale-100 mb-5"
                    src={formData.artista.photoUrl}
                    alt={formData.artista}
                  />
                )}
              </p>
              <p>
                <strong>Contratante:</strong> {formData.contratante}
              </p>
              <p>
                <strong>Cache:</strong> {formData.cache}
              </p>
              <p>
                <strong>Data do Evento:</strong>{" "}
                {format(new Date(formData.dataEvento), "dd/MM/yyyy")}
              </p>
              <p>
                <strong>Endereço do Evento:</strong> {formData.enderecoEvento}
              </p>
              <p>
                <strong>Artista:</strong>{" "}
                {formData.artista ? formData.artista.name : ""}
              </p>
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => handleClearLocalStorage(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Excluir
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
