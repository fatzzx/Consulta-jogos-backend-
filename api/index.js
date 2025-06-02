import app from '../src/app.js';
import connectDB from '../src/database/configdb.js';

let isConnected = false;

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }
    return app(req, res);
  } catch (error) {
    console.error("Erro ao iniciar handler:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
