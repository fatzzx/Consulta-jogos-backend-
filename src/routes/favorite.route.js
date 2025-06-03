import express from 'express';
import { addFavorite, getFavorites, deleteFavorite } from '../controller/favorite.controller.js';
import authenticate from '../middleware/jwt.token.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Rotas protegidas para jogos favoritos
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Adiciona um jogo aos favoritos
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gameId
 *               - title
 *             properties:
 *               gameId:
 *                 type: string
 *               title:
 *                 type: string
 *               cover:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jogo favoritado
 */
router.post('/', authenticate, addFavorite);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Lista os favoritos do usuário
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jogos favoritos
 */
router.get('/', authenticate, getFavorites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Remove um favorito pelo ID
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do favorito
 *     responses:
 *       200:
 *         description: Favorito removido
 */
router.delete('/:id', authenticate, deleteFavorite);

export default router;
