import { Router } from "express";
import { buySubscription, getRazorpayApiKey } from '../controllers/payment.controller.js'
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();


router
    .route('/razorpay-key')
    .get(
        isLoggedIn,
        getRazorpayApiKey
    );

router
    .route('/subscribe')
    .post(
        isLoggedIn,
        buySubscription
    )


export default router;