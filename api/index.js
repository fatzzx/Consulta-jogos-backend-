import app from '../src/app.js';
import connectDB from '../src/database/configdb.js';

export default async function handler(req, res) {
  try {
    await connectDB(); 
    return app(req, res); 
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
