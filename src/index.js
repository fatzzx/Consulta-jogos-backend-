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

const corsOptions = {
  origin: ['https://consulta-nutricional.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

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
