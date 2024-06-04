import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/error.util.js";
import crypto from 'crypto'


const getRazorpayApiKey = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Razorpay API key",
        key: process.env.RAZORPAY_KEY_ID
    });
}

const buySubscription = async (req, res, next) => {
    try {
            const { id } = req.user;
            const user = await User.findById(id);
        
            if(!user) {
                return next(
                    new AppError("User not found", 404)
                )
            }
        
        
            if(user.role === 'ADMIN') {
                return next(
                    new AppError('ADMIN is not allowed to buy subscription', 403)
                )
            };
        
            const subscription = await razorpay.subscriptions.create({
                plan_id: process.env.RAZORPAY_PLAN_ID,
                customer_notify: 1,
                total_count: 12,
            })
            
            user.subscription.id = subscription.id;
            user.subscription.status = subscription.status;
        
            await user.save();
        
            res.status(200).json({
                success: true,
                message: 'Subscribed Successfully',
                subscription_id: subscription.id
            })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

const verifySubscription = async (req, res, next) => {
    const { id } = req.user;
    const { razorpay_payment_id, razorpay_signature, razorpay_order_id } = req.body;

    const user = await User.findById(id);
    if(!user) {
        return next(
            new AppError('User not found', 404)
        )
    };

    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto
                                    .createHmac('sha256', process.env.RAZORPAY_SECRET)
                                    .update(`${razorpay_payment_id}|${subscriptionId}`)
                                    .digest('hex')

    if(generatedSignature === razorpay_signature) {
        return next(
            new AppError('Payment not verified, please try again', 500)
        )
    }

    await Payment.create({
        razorpay_payment_id,
        razorpay_signature,
        razorpay_subscription_id
    })

    user.subscription.status = 'active';
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
    })
}

const cancelSubscription = async (req, res, next) => {
   try {
     const { id } = req.user;
 
     const user = await User.findById(id);
 
     if(!user) {
         return next(
             new AppError('User not found', 403)
         )
     }
 
     if (user.role === 'ADMIN') {
         return next(
             new AppError('ADMIN is not allowed to cancel subscription', 401)
         )
     }
 
 
     const subscriptionId = user.subscription.id;
 
     const subscription = await razorpay.subscriptions.cancel(subscriptionId);
 
     user.subscription.status = subscription.status;
 
     await user.save();
 
     res.status(200).json({
        success: false,
        message: 'Subscription cancelled successfully'
     })
 
   } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
   }

}

const allPayments = async (req, res, next) => {
   try {
     const { count, skip } = req.query;
 
     const allPayments = await razorpay.subscriptions.all({
         count: count || 10,
         skip: skip || 0,
     });


    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const finalMonths = {
        January: 0, Febuary: 0, March: 0, April: 0, May: 0, June: 0, July: 0, August: 0, September: 0, October: 0, November: 0, December: 0
    }


    const monthlyWisePayments = allPayments.items.map((payment) => {
        // payment.start_at is in unix time so we have to convert into total numbers of months
        const monthsInNumbers = new Date(payment.start_at * 1000);  // total months from Unix epoch

        return monthNames[monthsInNumbers.getMonth()]; // return the month name 
    });

    monthlyWisePayments.map((month) => {
        Object.keys(finalMonths).forEach((objMonth) => {
            if(month === objMonth) {
                finalMonths[month] += 1;
            }
        })
    })

    const monthlySalesRecord = [];

  Object.keys(finalMonths).forEach((monthName) => {
    monthlySalesRecord.push(finalMonths[monthName]);
  });


 
     res.status(200).json({
         success: true,
         message: 'All payments fetched successfully',
         allPayments,
         finalMonths,
         monthlySalesRecord
     })
   } catch (error) {
    res.status(400).json({
        success: false,
        message: error
    })
   }
    
}

export {
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments
}