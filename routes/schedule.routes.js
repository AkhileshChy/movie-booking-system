import express from 'express';
import authorize from '../middleware/rbac.middleware.js';
import { createSchedule } from '../controllers/schedule.controller.js';

const router = express.Router();

router.post('/create', authorize(['theaterOwner']), createSchedule);

export default router;