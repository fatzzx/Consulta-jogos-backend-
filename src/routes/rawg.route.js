import express from 'express';
import axios from 'axios';

const router = express.Router();

/**
 * @swagger
 * /api/rawg/search:
 *   get:
 *     summary: Busca jogos pela API da RAWG
 *     tags: [RAWG]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de busca (nome do jogo)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página de resultados
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Número de resultados por página
 *     responses:
 *       200:
 *         description: Lista de jogos da RAWG
 *       500:
 *         description: Erro ao buscar jogos
 */
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
