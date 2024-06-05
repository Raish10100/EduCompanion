import { Router } from 'express';
import { contactUs } from '../controllers/miscellaneous.controller.js';


const router = new Router();

router.route('/contact').post(contactUs);

export default router;