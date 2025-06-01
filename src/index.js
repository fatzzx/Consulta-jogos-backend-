import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import rawgRoutes from './routes/rawg.route.js'; 
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';
import favoriteRoutes from './routes/favorite.route.js';


import userRoutes from './routes/user.route.js';
import exampleRoutes from './routes/example.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do CORS
app.use(cors({
  origin: ['https://jubilant-palm-tree-pjr6545xrrq9h697x-5173.app.github.dev', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware para adicionar headers CORS em todas as respostas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://jubilant-palm-tree-pjr6545xrrq9h697x-5173.app.github.dev');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Responder imediatamente às requisições OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/example', exampleRoutes);
app.use('/api/rawg', rawgRoutes); 
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/favorites', favoriteRoutes);


app.get('/', (req, res) => {
  res.send('API Consulta-Jogos está no ar! Veja a documentação em /docs');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));
