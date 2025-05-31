import Favorite from '../models/Favorite.js';

export const addFavorite = async (req, res) => {
  const { gameId, title, cover } = req.body;

  try {
    const favorite = await Favorite.create({
      userId: req.user.id,
      gameId,
      title,
      cover,
    });

    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Favorito removido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar favorito' });
  }
};
