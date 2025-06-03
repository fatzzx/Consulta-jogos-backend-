import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * @swagger
 * /api/gamePrice:
 *   get:
 *     summary: Busca o preço de um jogo na API externa
 *     tags: [GamePrice]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do jogo a ser consultado
 *     responses:
 *       200:
 *         description: Preços encontrados
 *       400:
 *         description: Nome do jogo não fornecido
 *       500:
 *         description: Erro ao buscar preço
 */
router.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Nome do jogo não fornecido" });
  }

  try {
    const response = await axios.get(
      `https://api.ship.shark/prices?name=${encodeURIComponent(name)}`
    );

    res.json(response.data);
  } catch (err) {
    console.error("Erro ao buscar preço:", err.message);
    res.status(500).json({ error: "Erro ao buscar preço" });
  }
});

export default router;
