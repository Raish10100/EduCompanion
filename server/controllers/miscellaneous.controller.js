import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import sendEmail from "../utils/sendEmail.js";

const contactUs = async (req, res, next) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message) {
        return next(
            new AppError('Please provide all the required fields', 400)
        )
    };

    try {
        const subject = 'Contact Us Form';
        const textMessage = `${name} - ${email} <br/> ${message}`;

        await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage);

    } catch (error) {
       return next(
        new AppError(error.message, 400)
       )
    }

    res.status(200).json({
        success: true,
        message: 'Your request has been submitted successfully'
    })
}

const userStats = async (req, res, next) => {
    const allUsersCount = await User.countDocuments();

    const subscribedUsersCount = await User.countDocuments({
        'subscription.status' : 'active',
    });

    res.status(200).json({
        success: true,
        message: "All registered users count",
        allUsersCount,
        subscribedUsersCount
    })

}

export {
    contactUs,
    userStats
} 