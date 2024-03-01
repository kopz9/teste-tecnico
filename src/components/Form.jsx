import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

    // Verificar se algum campo está vazio
    if (
      formData.contratante.trim() === "" ||
      formData.cache.trim() === "" ||
      formData.dataEvento.trim() === "" ||
      formData.enderecoEvento.trim() === ""
    ) {
      alert("Preencha todos os campos");
      return;
    }

    // Verificar se a data já foi selecionada
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
    // Limpar os campos após o envio
    setFormData({
      contratante: "",
      cache: "",
      dataEvento: "",
      enderecoEvento: "",
    });
    setShowSuccessMessage(true); // Exibir mensagem de sucesso
  };

  return (
    <div>
      {selectedArtist && (
        <div>
          <h2>Artista Selecionado</h2>
          <p>{selectedArtist.name}</p>
          <p>{selectedArtist.id}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Contratante:
          <input
            type="text"
            name="contratante"
            value={formData.contratante}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Cache:
          <input
            type="text"
            name="cache"
            value={formData.cache}
            onChange={handleChange}            
          />
        </label>
        <label>
          Data do Evento:
          <input
            type="date"
            name="dataEvento"
            value={formData.dataEvento}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Endereço do Evento:
          <input
            type="text"
            name="enderecoEvento"
            value={formData.enderecoEvento}
            onChange={handleChange}            
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {showSuccessMessage && <p>Formulário enviado com sucesso!</p>}
      <Link
        className='inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'
        to="/"
      >
        continuar contratando
      </Link>
      <Link
        className='inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'
        to="/hiredArtists"
      >
        ver artistas contratados
      </Link>
    </div>
  );
};
