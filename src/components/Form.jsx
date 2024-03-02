import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "./NavBar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";

export const Form = () => {
  const selectedArtist = JSON.parse(localStorage.getItem("selectedArtist"));
  const [formData, setFormData] = useState({
    contratante: "",
    cache: "",
    dataEvento: "",
    enderecoEvento: "",
  });

  const [formDataList, setFormDataList] = useState(() => {
    const savedFormDataList = localStorage.getItem("formDataList");
    return savedFormDataList ? JSON.parse(savedFormDataList) : [];
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem("formDataList", JSON.stringify(formDataList));
  }, [formDataList]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there is a input field empty
    if (
      formData.contratante.trim() === "" ||
      formData.cache.trim() === "" ||
      formData.dataEvento.trim() === "" ||
      formData.enderecoEvento.trim() === ""
    ) {
      toast.error("Preencha todos os campos");
      return;
    }

    // Check if the current date is already picked
    if (formDataList.some((item) => item.dataEvento === formData.dataEvento)) {
      alert("Artista já contratado nesta data");
      return;
    }

    const newFormData = {
      contratante: formData.contratante,
      cache: formData.cache,
      dataEvento: formData.dataEvento,
      enderecoEvento: formData.enderecoEvento,
    };
    setFormDataList([...formDataList, newFormData]);
    // Clean inputs after submit
    setFormData({
      contratante: "",
      cache: "",
      dataEvento: "",
      enderecoEvento: "",
    });
    setShowSuccessMessage(true); // Show success message
  };

  return (
    <>
      <Toaster />
      <NavigationBar />
      <div className="max-w-lg mx-auto p-6 mt-12 border-black bg-neutral-400 rounded shadow">
        {selectedArtist && (
          <div className="mb-6">
            <h2 className="text-xl font-bold">Artista Selecionado</h2>
            <p>{selectedArtist.name}</p>
            <p>{selectedArtist.id}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Nome do Contratante:</span>
            <Input
              className="form-input mt-1 border-black block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="contratante"
              value={formData.contratante}
              onChange={handleChange}              
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Cache:</span>
            <Input
              className="form-input mt-1 block w-full  rounded-md shadow-sm border-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="cache"
              value={formData.cache}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-4 " >
            <span className="text-gray-700 ">Data do Evento:</span>
            <Input
              className="form-input mt-1 block w-full rounded-md shadow-sm border-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="date"
              name="dataEvento"
              value={formData.dataEvento}
              onChange={handleChange}              
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Endereço do Evento:</span>
            <Input
              className="form-input mt-1 block w-full rounded-md shadow-sm border-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="enderecoEvento"
              value={formData.enderecoEvento}
              onChange={handleChange}
            />
          </label>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-neutral-800 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded"
            >
              Enviar
            </Button>
          </div>
        </form>
        {showSuccessMessage && (
          <p className="text-2xl mt-4 text-green-600 text-center">Formulário enviado com sucesso!</p>          
        )}
        <div className="mt-6">
          <Link
            className="inline-block bg-neutral-800 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded mr-4"
            to="/"
          >
            Continuar Contratando
          </Link>
          <Link
            className="inline-block bg-neutral-800 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded"
            to="/hiredArtists"
          >
            Ver Artistas Contratados
          </Link>
        </div>
      </div>
    </>
  );
};
