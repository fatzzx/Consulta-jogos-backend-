import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  return user.save();
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Usuário não encontrado');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Senha incorreta');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { token, user };
};
