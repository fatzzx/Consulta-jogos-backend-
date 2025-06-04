import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Nome do jogo não fornecido" });
  }

  const cleanedName = name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  try {
    const searchRes = await axios.get("https://www.cheapshark.com/api/1.0/games", {
      params: {
        title: cleanedName,
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

    if (!gameInfo.deals || gameInfo.deals.length === 0) {
      return res.json({
        isFree: false,
        offers: [],
        lowestHistoricalPrice: null
      });
    }

    const storeMapRes = await axios.get("https://www.cheapshark.com/api/1.0/stores");
    const storeMap = storeMapRes.data;
    const storeName = (id) => {
      const store = storeMap.find((s) => s.storeID === id);
      return store ? store.storeName : `Loja ${id}`;
    };

    const offers = gameInfo.deals.map((deal) => ({
      store: storeName(deal.storeID),
      currentPrice: parseFloat(deal.price),
      originalPrice: parseFloat(deal.retailPrice),
      discount: `${Math.round((1 - deal.price / deal.retailPrice) * 100)}%`
    }));

    const cheapest = gameInfo.cheapestPriceEver;
    const cheapestDate = new Date(cheapest.date * 1000)
      .toISOString()
      .split("T")[0];

    res.json({
      isFree: parseFloat(offers[0].currentPrice) === 0,
      offers,
      lowestHistoricalPrice: {
        price: parseFloat(cheapest.price),
        date: cheapestDate
      }
    });
  } catch (err) {
    console.error("Erro ao buscar preço:", err.message);
    res.status(500).json({ isFree: true, error: "Erro ao buscar preço" });
  }
});

export default router;
