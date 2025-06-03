import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import swaggerSpec from './docs/swagger.js';

import userRoutes from './routes/user.route.js';
import exampleRoutes from './routes/example.route.js';
import rawgRoutes from './routes/rawg.route.js';
import favoriteRoutes from './routes/favorite.route.js';
import gamePriceRoutes from './routes/gamePrice.route.js';

dotenv.config();
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const allowedOrigins = [
  'http://localhost:5173',
  'https://consulta-nutricional.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.endsWith('.github.dev') || allowedOrigins.includes(origin)) {
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


app.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.get('/docs', (req, res) => {
  const filePath = path.join(__dirname, 'src', 'docs', 'swagger.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  res.send(html);
});


app.use('/api/users', userRoutes);
app.use('/api/example', exampleRoutes);
app.use('/api/rawg', rawgRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/gamePrice', gamePriceRoutes);


app.get('/', (req, res) => {
  res.send('API Consulta Jogos está operacional. Consulte /docs para a documentação.');
});


console.log('\n=== ROTAS REGISTRADAS PELO EXPRESS ===');
app._router.stack.forEach((layer) => {
  if (layer.route && layer.route.path) {
    const métodos = Object
      .keys(layer.route.methods)
      .map(m => m.toUpperCase())
      .join(', ');
    console.log(`${métodos}\t${layer.route.path}`);
  }
});
console.log('======================================\n');

export default app;
