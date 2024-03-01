import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.get('/api/search', async (req, res) => {
  const { artist } = req.query;
  const url = `https://spotify23.p.rapidapi.com/search/?q=${artist}&type=artists&offset=0&limit=12&numberOfTopResults=5`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c57ec4b048mshf8d88185a6b44dep132c3cjsn23499f236a2c',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar dados' });
  }
});

app.listen(3001, () => {
  console.log('Servidor backend rodando na porta 3001');
});
