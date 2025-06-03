import Favorite from '../models/Favorite.js';

export const addFavorite = async (req, res) => {
  const { gameId, title, cover } = req.body;

  try {
    console.log(`🔖 Adicionando favorito para o usuário ${req.user.id}:`, { gameId, title });
    
    const favorite = await Favorite.create({
      userId: req.user.id,
      gameId,
      title,
      cover,
    });

    console.log('✅ Favorito adicionado com sucesso:', favorite);
    res.status(201).json(favorite);
  } catch (err) {
    console.error('❌ Erro ao adicionar favorito:', err);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
};

export const getFavorites = async (req, res) => {
  try {
    console.log(`📥 Buscando favoritos do usuário ${req.user.id}`);
    
    const favorites = await Favorite.find({ userId: req.user.id });

    console.log(`✅ ${favorites.length} favorito(s) encontrado(s)`);
    res.json(favorites);
  } catch (err) {
    console.error('❌ Erro ao buscar favoritos:', err);
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    console.log(`🗑️ Deletando favorito ${req.params.id} do usuário ${req.user.id}`);
    
    await Favorite.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    console.log('✅ Favorito removido com sucesso');
    res.json({ message: 'Favorito removido' });
  } catch (err) {
    console.error('❌ Erro ao deletar favorito:', err);
    res.status(500).json({ error: 'Erro ao deletar favorito' });
  }
};
