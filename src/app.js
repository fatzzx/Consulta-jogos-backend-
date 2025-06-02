import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import exampleRoutes from './routes/example.route.js';
import rawgRoutes from './routes/rawg.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';
import favoriteRoutes from './routes/favorite.routes.js';


dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://consulta-nutricional.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parser
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/example', exampleRoutes);
app.use('/api/rawg', rawgRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/favorites', favoriteRoutes);


app.get('/', (req, res) => {
  res.send('API Consulta Jogos está operacional. Consulte /docs para a documentação.');
});

export default app;
