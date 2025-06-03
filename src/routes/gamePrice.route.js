import express from "express";
import axios from "axios";

const router = express.Router();

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
