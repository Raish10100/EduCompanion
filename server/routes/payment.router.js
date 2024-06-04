import { Router } from "express";
import { getRazorpayApiKey } from '../controllers/payment.controller.js'
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();


router
    .route('/razorpay-key')
    .get(
        isLoggedIn,
        getRazorpayApiKey
    )


export default router;