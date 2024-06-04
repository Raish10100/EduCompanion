import { Router } from "express";
import { buySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controller.js'
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

router
    .route('/verify')
    .post(
        isLoggedIn,
        verifySubscription
    )


router
     .route('/unsubscribe')
     .post(
        isLoggedIn,
        cancelSubscription
     )

export default router;