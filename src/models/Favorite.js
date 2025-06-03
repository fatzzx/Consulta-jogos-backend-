import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: String, required: true },
  title: { type: String, required: true },
  cover: { type: String },
});

export default mongoose.model('Favorite', FavoriteSchema);
