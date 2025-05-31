// example.route.js
import express from 'express';
import auth from '../middleware/jwt.token.middleware.js';

const router = express.Router();

router.get('/private', auth, (req, res) => {
  res.json({ message: 'Acesso permitido!', user: req.user });
});

export default router;
