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
    const searchRes = await axios.get("https://www.cheapshark.com/api/1.0/games", {
      params: {
        title: name,
        limit: 1
      }
    });

    const games = searchRes.data;

    if (!games || games.length === 0) {
      return res.status(404).json({ error: "Jogo não encontrado" });
    }

    const gameID = games[0].gameID;

    const infoRes = await axios.get("https://www.cheapshark.com/api/1.0/games", {
      params: { id: gameID }
    });

    const gameInfo = infoRes.data;

    const bestDeal = gameInfo.deals.reduce((lowest, current) =>
      parseFloat(current.price) < parseFloat(lowest.price) ? current : lowest
    );

    const storeMapRes = await axios.get("https://www.cheapshark.com/api/1.0/stores");
    const storeMap = storeMapRes.data;

    const store = storeMap.find((s) => s.storeID === bestDeal.storeID);

    res.json({
      isFree: parseFloat(bestDeal.price) === 0,
      price: `$${parseFloat(bestDeal.price).toFixed(2)}`,
      store: store ? store.storeName : `Loja ${bestDeal.storeID}`
    });
  } catch (err) {
    console.error("Erro ao buscar preço:", err.message);
    res.status(500).json({ isFree: true, error: "Erro ao buscar preço" });
  }
});

export default router;
