import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { search, page = 1, size = 5 } = req.query;

  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: process.env.RAWG_API_KEY,
        search,
        page,
        page_size: size,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro RAWG:', error.message);
    res.status(500).json({ error: 'Erro ao buscar jogos da RAWG' });
  }
});

export default router;
