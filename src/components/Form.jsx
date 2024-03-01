import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "./NavBar";

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
      alert("Preencha todos os campos");
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
   
<div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
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
      <input
        className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        type="text"
        name="contratante"
        value={formData.contratante}
        onChange={handleChange}
        required
      />
    </label>
    <label className="block mb-4">
      <span className="text-gray-700">Cache:</span>
      <input
        className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        type="text"
        name="cache"
        value={formData.cache}
        onChange={handleChange}
      />
    </label>
    <label className="block mb-4">
      <span className="text-gray-700">Data do Evento:</span>
      <input
        className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        type="date"
        name="dataEvento"
        value={formData.dataEvento}
        onChange={handleChange}
        required
      />
    </label>
    <label className="block mb-4">
      <span className="text-gray-700">Endereço do Evento:</span>
      <input
        className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        type="text"
        name="enderecoEvento"
        value={formData.enderecoEvento}
        onChange={handleChange}
      />
    </label>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Enviar
    </button>
  </form>
  {showSuccessMessage && (
    <p className="mt-4 text-green-600">Formulário enviado com sucesso!</p>
  )}
  <div className="mt-6">
    <Link
      className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
      to="/"
    >
      Continuar Contratando
    </Link>
    <Link
      className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      to="/hiredArtists"
    >
      Ver Artistas Contratados
    </Link>

  </div>
</div>
  );
};
