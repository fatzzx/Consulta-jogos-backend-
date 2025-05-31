import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro na conexão com o MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
