import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Este email já está registrado.');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Usuário não encontrado');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Senha incorreta');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { token, user };
};
