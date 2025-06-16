

import { describe, it, expect, vi, beforeEach } from 'vitest';
import User from '../src/models/User.js';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import * as userService from '../src/services/user.service.js';



vi.mock('../src/models/User.js', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
  }
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  }
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn()
  }
}));



describe('User Service (Testando o código original)', () => {
  
  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  describe('registerUser', () => {
    
    it('deve registrar um novo usuário com sucesso', async () => {
      const userData = { name: 'João', email: 'joao@example.com', password: 'senha123' };
      
      
      User.findOne.mockResolvedValue(null); 
      bcrypt.hash.mockResolvedValue('senhaHasheada');
      User.create.mockResolvedValue({ _id: '1', ...userData, password: 'senhaHasheada' });

     
      const result = await userService.registerUser(userData);

     
      expect(result.name).toBe('João');
      expect(User.create).toHaveBeenCalledWith({ name: 'João', email: 'joao@example.com', password: 'senhaHasheada' });
    });

    it('deve lançar um erro se o email já estiver registrado', async () => {
      const userData = { name: 'Ana', email: 'ana@example.com', password: '123' };

      
      User.findOne.mockResolvedValue({ email: 'ana@example.com' }); 

      
      await expect(userService.registerUser(userData)).rejects.toThrow('Este email já está registrado.');
    });
  });

  describe('loginUser', () => {

    it('deve autenticar com sucesso e retornar um objeto com token e usuário', async () => {
      const mockUser = { _id: '1', name: 'João', email: 'joao@example.com', password: 'senhaHasheada' };
      const mockLoginData = { email: 'joao@example.com', password: 'senhaCorreta' };
      const mockToken = 'token_jwt_fake';
      
      
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true); 
      jwt.sign.mockReturnValue(mockToken);

      // Execução
      const result = await userService.loginUser(mockLoginData);
      
      
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.token).toBe(mockToken);
      expect(result.user.name).toBe('João');
      expect(jwt.sign).toHaveBeenCalledWith({ id: '1' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });

    it('deve lançar um erro se o usuário não for encontrado', async () => {
      
      User.findOne.mockResolvedValue(null); 

      
      await expect(userService.loginUser({ email: 'errado@errado.com', password: '123' }))
        .rejects.toThrow('Usuário não encontrado');
    });

    it('deve lançar um erro se a senha estiver incorreta', async () => {
      const mockUser = { _id: '1', name: 'João', email: 'joao@example.com', password: 'senhaHasheada' };
      
      
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false); 

      
      await expect(userService.loginUser({ email: 'joao@example.com', password: 'senhaErrada' }))
        .rejects.toThrow('Senha incorreta');
    });
  });
});