import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const __dirname = path.resolve();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Consulta Jogos API',
      version: '1.0.0',
      description: 'Documentação da API com autenticação e acesso a jogos via RAWG',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor local',
      },
      {
        url: 'https://consulta-jogos-backend.vercel.app',
        description: 'Servidor em produção',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, 'src/routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
