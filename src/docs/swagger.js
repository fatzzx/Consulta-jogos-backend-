import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Consulta Jogos API',
      version: '1.0.0',
      description: 'Documentação da API com autenticação e jogos',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor local',
      },
      {
        url: 'https://consulta-jogos-backend-hnh4.vercel.app',
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

  
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
