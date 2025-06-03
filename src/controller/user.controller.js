import { registerUser, loginUser } from '../services/user.service.js';

export const register = async (req, res) => {
  try {
    console.log('[POST] /register - Dados recebidos:', req.body);

    const user = await registerUser(req.body);

    console.log('[SUCESSO] Usuário registrado com sucesso:', user.email);

    res.status(201).json(user);
  } catch (err) {
    console.error('[ERRO] Registro falhou:', err.message);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log('[POST] /login - Tentando autenticar:', req.body.email);

    const data = await loginUser(req.body);

    console.log('[SUCESSO] Login realizado com sucesso:', data.user?.email);

    res.json(data);
  } catch (err) {
    console.error('[ERRO] Login falhou:', err.message);
    res.status(401).json({ error: err.message });
  }
};
