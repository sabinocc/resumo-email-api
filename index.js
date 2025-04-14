const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const API_KEY = process.env.HUGGINGFACE_API_KEY; // Use a variável de ambiente para a chave API

app.post('/resumir', async (req, res) => {
  const { texto } = req.body;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { inputs: texto },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    res.json({ resumo: response.data[0].summary_text });
  } catch (error) {
    res.status(500).send('Erro ao gerar resumo');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
