import express from 'express';
import { getAllUsers, getCurrentUser, login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import authorize from '../middleware/rbac.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', protectRoute, getCurrentUser);

router.get('/allusers', protectRoute, authorize(['admin']), getAllUsers);

export default router;