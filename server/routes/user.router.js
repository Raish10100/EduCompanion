import { Router } from 'express';
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword } from '../controllers/user.controller.js';
import isLoggedIn from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:resetToken', resetPassword);
router.post('/changePassword', isLoggedIn, changePassword)

export default router; 