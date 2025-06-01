import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import User from '../src/models/User.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 20000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe('User Auth', () => {
  it('should register and login a user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Gabriel',
        email: 'gabriel@email.com',
        password: '123456',
      });

    if (res.statusCode !== 201) {
      console.log('Erro de registro:', res.body);
    }

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('gabriel@email.com');

    const login = await request(app)
      .post('/api/users/login')
      .send({
        email: 'gabriel@email.com',
        password: '123456',
      });

    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeDefined();
  }, 20000);
});
  