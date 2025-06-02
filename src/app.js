import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import exampleRoutes from './routes/example.route.js';
import rawgRoutes from './routes/rawg.route.js';
import favoriteRoutes from './routes/favorite.route.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';

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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 
}));

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(200);
});

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/example', exampleRoutes);
app.use('/api/rawg', rawgRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('API Consulta Jogos está operacional. Consulte /docs para a documentação.');
});

export default app;
