import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userService from '../src/services/user.service.js';
import User from '../src/models/User.js';

// Mock da função User.create apenas
vi.mock('../src/models/User.js', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn()
  }
}));

describe('User Service (teste simplificado)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve registrar um usuário novo (simplificado)', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: '1',
      name: 'João',
      email: 'joao@example.com',
      password: 'senha123' // sem hash
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
});
