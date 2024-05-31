import { Router } from 'express';
import { forgotPassword, getProfile, login, logout, register } from '../controllers/user.controller.js';
import isLoggedIn from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/forgotPassword', forgotPassword);

export default router; 