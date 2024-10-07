import express from 'express';
import { createTheater, deleteTheater, getAllTheaters} from '../controllers/theater.controller.js';
import authorize from '../middleware/rbac.middleware.js';

const router = express.Router();

router.get('/alltheaters', getAllTheaters);
router.post('/create', authorize(['theaterOwner']), createTheater);
router.delete('/delete/:id', authorize(['theaterOwner', 'admin']), deleteTheater);

export default router;