import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB conectado com sucesso');
      app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
    })
    .catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));
}
