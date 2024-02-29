import React, { useState } from 'react';

export const Form = () => {
  const selectedArtist = JSON.parse(localStorage.getItem("selectedArtist"));
  const [formData, setFormData] = useState({
    contratante: '',
    cache: '',
    dataEvento: '',
    enderecoEvento: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    localStorage.setItem('formData', JSON.stringify(formData));
    // Aqui você também pode enviar os dados para o servidor se necessário
    console.log(formData);
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
      <form>
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
            required
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
            required
          />
        </label>
        <button type="button" onClick={handleSubmit}>Enviar</button>
      </form>
    </div>
  );
}