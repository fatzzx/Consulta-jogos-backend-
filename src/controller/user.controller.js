import { registerUser, loginUser } from '../services/user.service.js';

export const register = async (req, res) => {
  try {
    console.log('[POST] /register - Data received:', req.body);

    const user = await registerUser(req.body);

    console.log('[SUCCESS] User registered successfully:', user.email);

    res.status(201).json({
      message: "Account created successfully. You can now log in."
    });
  } catch (err) {
    console.error('[ERROR] Registration failed:', err.message);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log('[POST] /login - Attempting to authenticate:', req.body.email);

    const data = await loginUser(req.body);

    console.log('[SUCCESS] Login successful:', data.user?.email);

    res.json(data);
  } catch (err) {
    console.error('[ERROR] Login failed:', err.message);
    res.status(401).json({ error: "Invalid email or password" });
  }
};
