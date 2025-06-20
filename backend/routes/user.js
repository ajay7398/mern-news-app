// routes/auth.js
import getUser from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.get('/user', getUser);


export default router;
