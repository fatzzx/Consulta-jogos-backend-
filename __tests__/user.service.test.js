import { describe, it, expect, vi, beforeEach } from 'vitest';
import User from '../src/models/User.js';

vi.mock('../src/models/User.js', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn()
  }
}));

vi.mock('bcryptjs', async () => ({
  compare: vi.fn(),
  hash: vi.fn()
}));

import * as userService from '../src/services/user.service.js';
import * as bcrypt from 'bcryptjs';

describe('User Service (teste simplificado)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve registrar um usuário novo (simplificado)', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('senhaHasheada');

    User.create.mockResolvedValue({
      _id: '1',
      name: 'João',
      email: 'joao@example.com',
      password: 'senhaHasheada'
    });

    const result = await userService.registerUser({
      name: 'João',
      email: 'joao@example.com',
      password: 'senha123'
    });

    expect(User.findOne).toHaveBeenCalledWith({ email: 'joao@example.com' });
    expect(User.create).toHaveBeenCalled();
    expect(result.name).toBe('João');
  });

  it('não deve autenticar o usuário com senha incorreta', async () => {
    User.findOne.mockResolvedValue({
      _id: '1',
      name: 'João',
      email: 'joao@example.com',
      password: 'senhaHasheada'
    });

    bcrypt.compare.mockResolvedValue(false);

    await expect(userService.loginUser({
      email: 'joao@example.com',
      password: 'senhaErrada'
    })).rejects.toThrow('Senha incorreta');
  });

  it('deve lançar erro se o usuário não for encontrado', async () => {
    User.findOne.mockResolvedValue(null);

    await expect(userService.loginUser({
      email: 'inexistente@example.com',
      password: 'qualquerSenha'
    })).rejects.toThrow('Usuário não encontrado');
  });
});
